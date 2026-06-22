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

function timeOnly(value?: string | null) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

async function fetchSchedules({
  apiKey,
  startDate,
  endDate,
  from,
  to,
  airline,
}: {
  apiKey: string;
  startDate: string;
  endDate: string;
  from: string;
  to: string;
  airline?: string;
}) {
  const params = new URLSearchParams({
    origin: from,
    destination: to,
    include_codeshares: "false",
    include_regional: "true",
    max_pages: "1",
  });

  if (airline) {
    params.set("airline", airline);
  }

  const res = await fetch(
    `https://aeroapi.flightaware.com/aeroapi/schedules/${encodeURIComponent(
      startDate
    )}/${encodeURIComponent(endDate)}?${params.toString()}`,
    {
      headers: {
        "x-apikey": apiKey,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("FlightAware schedules error", res.status, text);
    throw new Error("Flight search failed");
  }

  const data = await res.json();
  return data.scheduled || data.schedules || data.flights || [];
}

export async function GET(req: Request) {
  const apiKey = process.env.FLIGHTAWARE_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing FlightAware API key" },
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

  const startDate = date;
  const nextDay = new Date(`${date}T00:00:00Z`);
  nextDay.setUTCDate(nextDay.getUTCDate() + 1);
  const endDate = nextDay.toISOString().slice(0, 10);

  let schedules: any[] = [];

  try {
    if (airline === "NORWEGIAN") {
      const [dy, d8] = await Promise.all([
        fetchSchedules({ apiKey, startDate, endDate, from, to, airline: "DY" }),
        fetchSchedules({ apiKey, startDate, endDate, from, to, airline: "D8" }),
      ]);

      schedules = [...dy, ...d8];
    } else {
      schedules = await fetchSchedules({
        apiKey,
        startDate,
        endDate,
        from,
        to,
        airline: airline || undefined,
      });
    }
  } catch {
    return NextResponse.json({ error: "Flight search failed" }, { status: 502 });
  }

  const items = schedules.map((f: any, idx: number) => {
    const ident =
      f.ident ||
      f.flight_number ||
      (f.airline && f.flight_number ? `${f.airline}${f.flight_number}` : null) ||
      "Unknown";

    return {
      id: f.fa_flight_id || f.id || ident || String(idx),
      flightNumber: String(ident).replace(/^SAS/, "SK"),
      depTime: timeOnly(
        f.scheduled_out ||
          f.scheduled_off ||
          f.scheduled_departure_time ||
          f.departure_time
      ),
      arrTime: timeOnly(
        f.scheduled_in ||
          f.scheduled_on ||
          f.scheduled_arrival_time ||
          f.arrival_time
      ),
    };
  });

  return NextResponse.json({ flights: items });
}