import { NextResponse } from "next/server";

function airportCode(value: string) {
  const match = value.match(/\(([A-Z]{3})\)/);
  return (match?.[1] || value).trim().toUpperCase();
}

const AIRLINE_CODE_MAP: Record<string, string> = {
  SAS: "SK",
  "DY/D8": "NORWEGIAN",
};

function airlineCode(value: string) {
  const match = value.match(/\(([A-Z0-9/]{2,5})\)/);
  const code = (match?.[1] || value).trim().toUpperCase();
  return AIRLINE_CODE_MAP[code] || code;
}

type OagFlight = {
  carrier?: {
    iata?: string;
    icao?: string;
  };
  flightNumber?: number | string;
  serviceSuffix?: string;
  departure?: {
    airport?: {
      iata?: string;
      icao?: string;
    };
    date?: {
      local?: string;
      utc?: string;
    };
    time?: {
      local?: string;
      utc?: string;
    };
  };
  arrival?: {
    airport?: {
      iata?: string;
      icao?: string;
    };
    date?: {
      local?: string;
      utc?: string;
    };
    time?: {
      local?: string;
      utc?: string;
    };
  };
  scheduleInstanceKey?: string;
  statusKey?: string;
  segmentInfo?: {
    numberOfStops?: number;
  };
};

async function fetchOagFlights({
  apiKey,
  date,
  from,
  to,
  airline,
}: {
  apiKey: string;
  date: string;
  from: string;
  to: string;
  airline?: string;
}) {
  const params = new URLSearchParams({
    DepartureDateTime: date,
    DepartureAirport: from,
    ArrivalAirport: to,
    FlightType: "Scheduled",
    CodeType: "IATA",
    version: "v2",
    Limit: "10",
  });

  if (airline) {
    params.set("CarrierCode", airline);
  }

  const res = await fetch(
    `https://api.oag.com/flight-instances/?${params.toString()}`,
    {
      headers: {
        "Subscription-Key": apiKey,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("OAG flight search error", res.status, text);
    throw new Error("Flight search failed");
  }

  const data = await res.json();
  const flights = (data.data || []) as OagFlight[];

  if (!data.paging?.next) {
    return flights;
  }

  const nextRes = await fetch(data.paging.next, {
    headers: {
      "Subscription-Key": apiKey,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!nextRes.ok) {
    const text = await nextRes.text();
    console.error("OAG flight search pagination error", nextRes.status, text);
    return flights;
  }

  const nextData = await nextRes.json();

  return [
    ...flights,
    ...((nextData.data || []) as OagFlight[]),
  ];
}

export async function GET(req: Request) {
  const apiKey = process.env.OAG_FLIGHT_INFO_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing OAG Flight Info API key" },
      { status: 500 }
    );
  }

  const url = new URL(req.url);
  const from = airportCode(url.searchParams.get("from") || "");
  const to = airportCode(url.searchParams.get("to") || "");
  const date = url.searchParams.get("date") || "";
  const airline = airlineCode(url.searchParams.get("airline") || "");

  if (!from || !to || !date) {
    return NextResponse.json(
      { error: "Missing from, to or date" },
      { status: 400 }
    );
  }

  let flights: OagFlight[] = [];

  try {
    if (airline === "NORWEGIAN") {
      const [dy, d8] = await Promise.all([
        fetchOagFlights({ apiKey, date, from, to, airline: "DY" }),
        fetchOagFlights({ apiKey, date, from, to, airline: "D8" }),
      ]);

      flights = [...dy, ...d8];
    } else {
      flights = await fetchOagFlights({
        apiKey,
        date,
        from,
        to,
        airline: airline || undefined,
      });
    }
  } catch {
    return NextResponse.json(
      { error: "Flight search failed" },
      { status: 502 }
    );
  }

  const items = flights
    .filter((flight) => (flight.segmentInfo?.numberOfStops ?? 0) === 0)
    .map((flight, idx) => {
      const carrier = flight.carrier?.iata || "";
      const number = flight.flightNumber ?? "";
      const suffix = flight.serviceSuffix || "";
      const flightNumber = `${carrier}${number}${suffix}`;

      return {
        id:
          flight.scheduleInstanceKey ||
          flight.statusKey ||
          flightNumber ||
          String(idx),
        flightNumber,
        depTime: flight.departure?.time?.local || "—",
        arrTime: flight.arrival?.time?.local || "—",
      };
    })
    .filter((flight) => flight.flightNumber);

  items.sort((a, b) => a.depTime.localeCompare(b.depTime));

  return NextResponse.json({ flights: items });
}
