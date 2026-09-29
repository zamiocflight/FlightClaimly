import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { buildI18nMetadata } from "@/lib/seo";
import { assertLocale, type Locale } from "@/i18n/routing";

const competitors = [
  {
    name: "AirAdvisor",
    standardFee: "30% incl. VAT",
    keep: "€420",
    source: "https://airadvisor.com/en/pricelist",
  },
  {
    name: "ReFly",
    standardFee: "33% incl. VAT",
    keep: "€402",
    source: "https://www.refly.org/terms-and-conditions.html",
  },
  {
    name: "AirHelp",
    standardFee: "35% incl. VAT",
    keep: "€390",
    source: "https://www.airhelp.com/en-int/our-fees/",
  },
  {
    name: "SkyRefund",
    standardFee: "35% incl. VAT",
    keep: "€390",
    source: "https://skyrefund.com/en/price-policy",
  },
];

type Copy = {
  metaTitle: string; metaDescription: string; badge: string; heroA: string; heroB: string; intro: string;
  bullets: string[]; cta: string; example: string; recovered: string; fee: string; keep: string;
  mathsLabel: string; mathsTitle: string; mathsBody: string; compensation: string; ourFee: string;
  compareLabel: string; compareTitle: string; compareBody: string; provider: string; publishedFee: string; source: string;
  ourTerms: string; officialPricing: string; checked: string; why: string; whyTitle: string; whyBody1: string; whyBody2: string;
  familyLabel: string; familyTitle: string; familyBody: string; familyDiff: string; faqLabel: string; faqTitle: string;
  faq: {q:string;a:string}[]; fullConditionsA: string; terms: string; finalLabel: string; finalTitle: string; finalBody: string;
};

const copy: Record<Locale, Copy> = {
en:{metaTitle:"{t.fee}s: 20% success fee, you keep 80%",metaDescription:"FlightClaimly charges a 20% success fee including VAT. No upfront fee, and no service fee if we do not recover compensation.",badge:"{t.badge}",heroA:"20% fee.",heroB:"{t.keep} 80%.",intro:"{t.intro}",bullets:["{t.finalLabel}","No win, no fee","20% incl. VAT"],cta:"{t.cta}",example:"{t.example}",recovered:"{t.recovered}",fee:"{t.fee}",keep:"{t.keep}",mathsLabel:"{t.mathsLabel}",mathsTitle:"{t.mathsTitle}",mathsBody:"{t.mathsBody}",compensation:"Compensation",ourFee:"Our 20% fee",compareLabel:"{t.compareLabel}",compareTitle:"{t.compareTitle}",compareBody:"Publicly listed standard fees differ between claim companies. The comparison below uses each provider's own published pricing and shows what remains from a €600 recovery before any case-specific or legal-action charges.",provider:"Provider",publishedFee:"Published standard fee",source:"Source",ourTerms:"{t.ourTerms}",officialPricing:"Official pricing",checked:"{t.checked}",why:"{t.why}",whyTitle:"{t.whyTitle}",whyBody1:"{t.whyBody1}",whyBody2:"{t.whyBody2}",familyLabel:"{t.familyLabel}",familyTitle:"{t.familyTitle}",familyBody:"{t.familyBody}",familyDiff:"{t.familyDiff}",faqLabel:"{t.faqLabel}",faqTitle:"{t.faqTitle}",faq:[{q:"How much does FlightClaimly charge?",a:"Our standard service fee is 20% including VAT of the compensation we recover for you."},{q:"Is FlightClaimly no win, no fee?",a:"Yes. There is no upfront service fee. If we do not recover compensation for you, there is no standard service fee."},{q:"How much do I keep from €600?",a:"If we recover €600 and the standard 20% fee applies, our fee is €120 and you keep €480."},{q:"Is VAT included in the 20% fee?",a:"Yes. FlightClaimly's standard 20% service fee includes VAT."},{q:"What if legal action is needed?",a:"If legal action is required, an additional 10% legal action fee applies, bringing our total fee to 30% including VAT. If a case involves exceptional third-party costs, we explain them and obtain your approval before proceeding."}],fullConditionsA:"Full conditions are available in our",terms:"Terms & Conditions",finalLabel:"{t.finalLabel}",finalTitle:"{t.finalTitle}",finalBody:"{t.finalBody}"},
sv:{metaTitle:"FlightClaimly avgifter: 20% provision, du behåller 80%",metaDescription:"FlightClaimly tar 20% i provision inklusive moms. Ingen förskottsavgift och ingen serviceavgift om vi inte får ut ersättning.",badge:"Tydlig prissättning",heroA:"20% avgift.",heroB:"Du behåller 80%.",intro:"FlightClaimly tar en standardavgift på 20% inklusive moms när vi lyckas få ut ersättning åt dig. Du betalar inget i förskott och ingen standardavgift om vi inte får ut ersättning.",bullets:["Ingen förskottsavgift","Ingen ersättning, ingen avgift","20% inkl. moms"],cta:"Kontrollera mitt flyg",example:"Exempel: €600",recovered:"Ersättning utbetald",fee:"FlightClaimlys avgift",keep:"Du behåller",mathsLabel:"Enkel matematik",mathsTitle:"Hur mycket behåller du?",mathsBody:"Vår standardavgift är alltid 20% av den ersättning vi får ut och inkluderar moms.",compensation:"Ersättning",ourFee:"Vår avgift 20%",compareLabel:"Avgiftsjämförelse",compareTitle:"Så jämförs standardavgifterna",compareBody:"Offentligt angivna standardavgifter skiljer sig mellan ersättningsbolag. Jämförelsen använder varje bolags egen publicerade prissättning och visar vad som återstår av €600 före eventuella ärendespecifika eller juridiska avgifter.",provider:"Bolag",publishedFee:"Publicerad standardavgift",source:"Källa",ourTerms:"Våra villkor",officialPricing:"Officiell prislista",checked:"Kontrollerat 29 september 2026. Jämförelsen gäller publicerade standardavgifter, inte abonnemang, kampanjer eller alla möjliga juridiska/ärendespecifika kostnader. Priser kan ändras; se de länkade officiella källorna.",why:"Varför 20%?",whyTitle:"Låga omkostnader — mer av ersättningen stannar hos dig.",whyBody1:"Vi använder automation och modern flygdata för att hantera enkla delar av processen effektivt. Därför kan vi hålla standardavgiften på 20% inklusive moms.",whyBody2:"Du får fortfarande ett hanterat ärende: vi granskar ditt fall, kommunicerar med flygbolaget och håller dig uppdaterad.",familyLabel:"En familj. Ett exempel.",familyTitle:"Fyra ersättningar på €600",familyBody:"Med 20% standardavgift behåller fyra passagerare €1 920 av €2 400. Med 35% standardavgift skulle de behålla €1 560.",familyDiff:"Mer kvar hos familjen",faqLabel:"Vanliga frågor om priset",faqTitle:"Frågor om vår avgift",faq:[{q:"Hur mycket tar FlightClaimly?",a:"Vår standardavgift är 20% inklusive moms av ersättningen vi får ut åt dig."},{q:"Är FlightClaimly no win, no fee?",a:"Ja. Du betalar inget i förskott. Om vi inte får ut ersättning åt dig tar vi ingen standardavgift."},{q:"Hur mycket behåller jag av €600?",a:"Om vi får ut €600 och standardavgiften på 20% gäller är vår avgift €120 och du behåller €480."},{q:"Ingår moms i avgiften på 20%?",a:"Ja. Moms ingår i FlightClaimlys standardavgift på 20%."},{q:"Vad händer om juridiska åtgärder krävs?",a:"Om juridiska åtgärder krävs tillkommer 10%, vilket ger en total avgift på 30% inklusive moms. Om ett ärende medför exceptionella externa kostnader förklarar vi dem och ber om ditt godkännande innan vi går vidare."}],fullConditionsA:"Fullständiga villkor finns i våra",terms:"Allmänna villkor",finalLabel:"Ingen förskottsavgift",finalTitle:"Behåll 80% av din ersättning.",finalBody:"Kontrollera ditt flyg på några minuter. Om ditt ärende kvalificerar kan vi ta det därifrån."},
da:{metaTitle:"FlightClaimly gebyrer: 20% i gebyr, du beholder 80%",metaDescription:"FlightClaimly tager 20% i succesgebyr inklusive moms. Intet gebyr på forhånd og intet standardgebyr, hvis vi ikke opnår kompensation.",badge:"Klar prissætning",heroA:"20% i gebyr.",heroB:"Du beholder 80%.",intro:"FlightClaimly tager et standard succesgebyr på 20% inklusive moms. Du betaler intet på forhånd, og der er intet standardgebyr, hvis vi ikke opnår kompensation til dig.",bullets:["Ingen betaling på forhånd","Ingen gevinst, intet gebyr","20% inkl. moms"],cta:"Tjek mit fly",example:"Eksempel: €600",recovered:"Kompensation opnået",fee:"FlightClaimly-gebyr",keep:"Du beholder",mathsLabel:"Simpelt regnestykke",mathsTitle:"Hvor meget beholder du?",mathsBody:"Vores standardgebyr er altid 20% af den opnåede kompensation og inkluderer moms.",compensation:"Kompensation",ourFee:"Vores gebyr på 20%",compareLabel:"Sammenligning af gebyrer",compareTitle:"Sådan sammenlignes standardgebyrer",compareBody:"Offentliggjorte standardgebyrer varierer mellem selskaber. Sammenligningen bruger hver udbyders egen offentliggjorte prissætning og viser, hvad der er tilbage af €600 før eventuelle sags- eller juridiske gebyrer.",provider:"Udbyder",publishedFee:"Offentliggjort standardgebyr",source:"Kilde",ourTerms:"Vores vilkår",officialPricing:"Officiel prissætning",checked:"Kontrolleret 29. september 2026. Sammenligningen gælder offentliggjorte standardgebyrer, ikke abonnementer, kampagner eller alle mulige juridiske/sagsspecifikke omkostninger. Priser kan ændres; se de officielle kilder.",why:"Hvorfor 20%?",whyTitle:"Lave omkostninger — mere af kompensationen til dig.",whyBody1:"Vi bruger automatisering og moderne flydata til at håndtere enkle dele af processen effektivt. Det hjælper os med at holde standardgebyret på 20% inklusive moms.",whyBody2:"Du får stadig en håndteret sag: vi gennemgår din sag, kommunikerer med flyselskabet og holder dig opdateret.",familyLabel:"Én familie. Ét eksempel.",familyTitle:"Fire krav på €600",familyBody:"Med et standardgebyr på 20% beholder fire passagerer €1.920 af €2.400. Med et standardgebyr på 35% ville de beholde €1.560.",familyDiff:"Forskel, familien beholder",faqLabel:"FAQ om priser",faqTitle:"Spørgsmål om vores gebyr",faq:[{q:"Hvor meget tager FlightClaimly?",a:"Vores standardgebyr er 20% inklusive moms af den kompensation, vi opnår til dig."},{q:"Er FlightClaimly no win, no fee?",a:"Ja. Du betaler intet på forhånd. Hvis vi ikke opnår kompensation, tager vi intet standardgebyr."},{q:"Hvor meget beholder jeg af €600?",a:"Hvis vi opnår €600, og standardgebyret på 20% gælder, er vores gebyr €120, og du beholder €480."},{q:"Er moms inkluderet i gebyret på 20%?",a:"Ja. Moms er inkluderet i FlightClaimlys standardgebyr på 20%."},{q:"Hvad hvis juridiske skridt er nødvendige?",a:"Hvis juridiske skridt er nødvendige, tillægges 10%, så det samlede gebyr bliver 30% inklusive moms. Hvis en sag medfører ekstraordinære eksterne omkostninger, forklarer vi dem og indhenter din godkendelse først."}],fullConditionsA:"De fulde betingelser findes i vores",terms:"Vilkår og betingelser",finalLabel:"Ingen betaling på forhånd",finalTitle:"Behold 80% af din kompensation.",finalBody:"Tjek dit fly på få minutter. Hvis din sag er berettiget, kan vi tage den derfra."},
de:{metaTitle:"FlightClaimly Gebühren: 20% Erfolgsgebühr, Sie behalten 80%",metaDescription:"FlightClaimly berechnet 20% Erfolgsgebühr inklusive MwSt. Keine Vorauszahlung und keine Standardgebühr ohne erfolgreiche Entschädigung.",badge:"Klare Preise",heroA:"20% Gebühr.",heroB:"Sie behalten 80%.",intro:"FlightClaimly berechnet eine Standard-Erfolgsgebühr von 20% inklusive MwSt. Sie zahlen nichts im Voraus und keine Standardgebühr, wenn wir keine Entschädigung für Sie durchsetzen.",bullets:["Keine Vorauszahlung","Kein Erfolg, keine Gebühr","20% inkl. MwSt."],cta:"Flug prüfen",example:"€600 Beispiel",recovered:"Erhaltene Entschädigung",fee:"FlightClaimly-Gebühr",keep:"Sie behalten",mathsLabel:"Einfach gerechnet",mathsTitle:"Wie viel behalten Sie?",mathsBody:"Unsere Standardgebühr beträgt immer 20% der erhaltenen Entschädigung und enthält bereits die MwSt.",compensation:"Entschädigung",ourFee:"Unsere 20%-Gebühr",compareLabel:"Gebührenvergleich",compareTitle:"Standardgebühren im Vergleich",compareBody:"Die veröffentlichten Standardgebühren unterscheiden sich je nach Anbieter. Der Vergleich basiert auf den eigenen Preisangaben der Anbieter und zeigt, was von €600 vor möglichen fallbezogenen oder rechtlichen Gebühren übrig bleibt.",provider:"Anbieter",publishedFee:"Veröffentlichte Standardgebühr",source:"Quelle",ourTerms:"Unsere Bedingungen",officialPricing:"Offizielle Preise",checked:"Geprüft am 29. September 2026. Verglichen werden veröffentlichte Standardgebühren, nicht Abos, Aktionen oder sämtliche möglichen Rechts-/Fallkosten. Preise können sich ändern; maßgeblich sind die verlinkten offiziellen Quellen.",why:"Warum 20%?",whyTitle:"Niedrige Kosten — mehr Entschädigung bleibt bei Ihnen.",whyBody1:"Wir nutzen Automatisierung und moderne Flugdaten, um einfache Teile des Verfahrens effizient abzuwickeln. So können wir unsere Standard-Erfolgsgebühr bei 20% inklusive MwSt. halten.",whyBody2:"Ihr Fall wird dennoch vollständig betreut: Wir prüfen ihn, kommunizieren mit der Fluggesellschaft und halten Sie auf dem Laufenden.",familyLabel:"Eine Familie. Ein Beispiel.",familyTitle:"Vier Ansprüche à €600",familyBody:"Bei 20% Standardgebühr behalten vier Passagiere €1.920 von €2.400. Bei 35% Standardgebühr wären es €1.560.",familyDiff:"Mehr für die Familie",faqLabel:"Preis-FAQ",faqTitle:"Fragen zu unserer Gebühr",faq:[{q:"Wie viel berechnet FlightClaimly?",a:"Unsere Standard-Servicegebühr beträgt 20% inklusive MwSt. der Entschädigung, die wir für Sie erhalten."},{q:"Gilt bei FlightClaimly „Kein Erfolg, keine Gebühr“?",a:"Ja. Sie zahlen nichts im Voraus. Erhalten wir keine Entschädigung für Sie, fällt keine Standardgebühr an."},{q:"Wie viel behalte ich von €600?",a:"Erhalten wir €600 und gilt die Standardgebühr von 20%, beträgt unsere Gebühr €120 und Sie behalten €480."},{q:"Ist die MwSt. in den 20% enthalten?",a:"Ja. Die Standardgebühr von FlightClaimly enthält die MwSt."},{q:"Was passiert, wenn rechtliche Schritte nötig sind?",a:"Sind rechtliche Schritte erforderlich, kommen 10% hinzu; die Gesamtgebühr beträgt dann 30% inklusive MwSt. Bei außergewöhnlichen externen Kosten erklären wir diese und holen vorab Ihre Zustimmung ein."}],fullConditionsA:"Die vollständigen Bedingungen finden Sie in unseren",terms:"Geschäftsbedingungen",finalLabel:"Keine Vorauszahlung",finalTitle:"Behalten Sie 80% Ihrer Entschädigung.",finalBody:"Prüfen Sie Ihren Flug in wenigen Minuten. Ist Ihr Fall berechtigt, übernehmen wir den Rest."},
nl:{metaTitle:"FlightClaimly kosten: 20% succesfee, u houdt 80%",metaDescription:"FlightClaimly rekent 20% succesfee inclusief btw. Geen kosten vooraf en geen standaard servicekosten als we geen compensatie innen.",badge:"Duidelijke prijzen",heroA:"20% kosten.",heroB:"U houdt 80%.",intro:"FlightClaimly rekent een standaard succesfee van 20% inclusief btw. U betaalt niets vooraf en geen standaard servicekosten als we geen compensatie voor u innen.",bullets:["Geen kosten vooraf","Geen resultaat, geen kosten","20% incl. btw"],cta:"Controleer mijn vlucht",example:"Voorbeeld: €600",recovered:"Compensatie ontvangen",fee:"FlightClaimly-kosten",keep:"U houdt",mathsLabel:"Eenvoudige rekensom",mathsTitle:"Hoeveel houdt u over?",mathsBody:"Onze standaardfee is altijd 20% van de ontvangen compensatie en is inclusief btw.",compensation:"Compensatie",ourFee:"Onze 20% fee",compareLabel:"Kostenvergelijking",compareTitle:"Vergelijking van standaardkosten",compareBody:"Gepubliceerde standaardkosten verschillen per claimbedrijf. Deze vergelijking gebruikt de eigen gepubliceerde prijzen van elke aanbieder en laat zien wat van €600 overblijft vóór eventuele zaak- of juridische kosten.",provider:"Aanbieder",publishedFee:"Gepubliceerde standaardfee",source:"Bron",ourTerms:"Onze voorwaarden",officialPricing:"Officiële prijzen",checked:"Gecontroleerd op 29 september 2026. Dit vergelijkt gepubliceerde standaardkosten, niet abonnementen, acties of alle mogelijke juridische/zaakspecifieke kosten. Prijzen kunnen wijzigen; raadpleeg de officiële bronnen.",why:"Waarom 20%?",whyTitle:"Lage overhead — meer compensatie voor u.",whyBody1:"We gebruiken automatisering en moderne vluchtdata om eenvoudige delen van het claimproces efficiënt af te handelen. Zo kunnen we onze standaard succesfee op 20% inclusief btw houden.",whyBody2:"Uw claim wordt nog steeds volledig behandeld: we beoordelen uw zaak, communiceren met de luchtvaartmaatschappij en houden u op de hoogte.",familyLabel:"Eén gezin. Eén voorbeeld.",familyTitle:"Vier claims van €600",familyBody:"Bij 20% standaardfee houden vier passagiers €1.920 van €2.400 over. Bij 35% standaardfee zouden ze €1.560 overhouden.",familyDiff:"Verschil voor het gezin",faqLabel:"Prijs-FAQ",faqTitle:"Vragen over onze kosten",faq:[{q:"Hoeveel rekent FlightClaimly?",a:"Onze standaard servicefee is 20% inclusief btw van de compensatie die we voor u innen."},{q:"Werkt FlightClaimly op basis van no cure, no pay?",a:"Ja. U betaalt niets vooraf. Als we geen compensatie voor u innen, betaalt u geen standaard servicefee."},{q:"Hoeveel houd ik over van €600?",a:"Als we €600 innen en de standaardfee van 20% geldt, is onze fee €120 en houdt u €480 over."},{q:"Is btw inbegrepen in de 20%?",a:"Ja. De standaardfee van 20% van FlightClaimly is inclusief btw."},{q:"Wat als juridische stappen nodig zijn?",a:"Als juridische stappen nodig zijn, komt er 10% bij en bedraagt onze totale fee 30% inclusief btw. Bij uitzonderlijke externe kosten leggen we deze uit en vragen we vooraf uw toestemming."}],fullConditionsA:"De volledige voorwaarden staan in onze",terms:"Algemene voorwaarden",finalLabel:"Geen kosten vooraf",finalTitle:"Houd 80% van uw compensatie.",finalBody:"Controleer uw vlucht binnen enkele minuten. Komt uw zaak in aanmerking, dan nemen wij het over."},
pl:{metaTitle:"Opłaty FlightClaimly: 20% prowizji, zachowujesz 80%",metaDescription:"FlightClaimly pobiera 20% prowizji za sukces, w tym VAT. Bez opłat z góry i bez standardowej opłaty, jeśli nie odzyskamy odszkodowania.",badge:"Jasne ceny",heroA:"20% prowizji.",heroB:"Zachowujesz 80%.",intro:"FlightClaimly pobiera standardową prowizję za sukces w wysokości 20% wraz z VAT. Nie płacisz nic z góry ani standardowej opłaty, jeśli nie odzyskamy dla Ciebie odszkodowania.",bullets:["Bez opłat z góry","Brak wygranej, brak opłaty","20% z VAT"],cta:"Sprawdź mój lot",example:"Przykład: €600",recovered:"Odzyskane odszkodowanie",fee:"Prowizja FlightClaimly",keep:"Zachowujesz",mathsLabel:"Proste wyliczenie",mathsTitle:"Ile zachowujesz?",mathsBody:"Nasza standardowa prowizja to zawsze 20% odzyskanego odszkodowania i obejmuje VAT.",compensation:"Odszkodowanie",ourFee:"Nasza prowizja 20%",compareLabel:"Porównanie opłat",compareTitle:"Porównanie standardowych prowizji",compareBody:"Publicznie podawane standardowe prowizje różnią się między firmami. Porównanie wykorzystuje oficjalnie opublikowane ceny każdego usługodawcy i pokazuje, ile zostaje z €600 przed ewentualnymi opłatami związanymi z konkretną sprawą lub działaniami prawnymi.",provider:"Usługodawca",publishedFee:"Opublikowana standardowa prowizja",source:"Źródło",ourTerms:"Nasze warunki",officialPricing:"Oficjalny cennik",checked:"Sprawdzono 29 września 2026 r. Porównanie dotyczy opublikowanych standardowych prowizji, a nie abonamentów, promocji ani wszystkich możliwych kosztów prawnych lub związanych ze sprawą. Ceny mogą się zmienić; sprawdź oficjalne źródła.",why:"Dlaczego 20%?",whyTitle:"Niższe koszty operacyjne — więcej odszkodowania dla Ciebie.",whyBody1:"Korzystamy z automatyzacji i nowoczesnych danych lotniczych, aby sprawnie obsługiwać proste etapy procesu. Dzięki temu standardowa prowizja wynosi 20% wraz z VAT.",whyBody2:"Nadal otrzymujesz pełną obsługę: analizujemy sprawę, kontaktujemy się z linią lotniczą i informujemy Cię o postępach.",familyLabel:"Jedna rodzina. Jeden przykład.",familyTitle:"Cztery roszczenia po €600",familyBody:"Przy standardowej prowizji 20% czterech pasażerów zachowuje €1 920 z €2 400. Przy prowizji 35% zachowaliby €1 560.",familyDiff:"Różnica dla rodziny",faqLabel:"FAQ o cenach",faqTitle:"Pytania o naszą prowizję",faq:[{q:"Ile pobiera FlightClaimly?",a:"Nasza standardowa prowizja wynosi 20% wraz z VAT od odszkodowania, które dla Ciebie odzyskamy."},{q:"Czy FlightClaimly działa na zasadzie no win, no fee?",a:"Tak. Nie płacisz nic z góry. Jeśli nie odzyskamy odszkodowania, nie pobieramy standardowej prowizji."},{q:"Ile zachowam z €600?",a:"Jeśli odzyskamy €600 i obowiązuje standardowa prowizja 20%, nasza opłata wynosi €120, a Ty zachowujesz €480."},{q:"Czy VAT jest wliczony w 20%?",a:"Tak. Standardowa prowizja FlightClaimly w wysokości 20% obejmuje VAT."},{q:"Co jeśli potrzebne są działania prawne?",a:"Jeśli wymagane są działania prawne, doliczamy 10%, więc łączna prowizja wynosi 30% wraz z VAT. Jeśli pojawią się wyjątkowe koszty zewnętrzne, wyjaśnimy je i poprosimy o zgodę przed podjęciem dalszych działań."}],fullConditionsA:"Pełne warunki znajdziesz w naszych",terms:"Warunkach świadczenia usług",finalLabel:"Bez opłat z góry",finalTitle:"Zachowaj 80% swojego odszkodowania.",finalBody:"Sprawdź swój lot w kilka minut. Jeśli sprawa się kwalifikuje, zajmiemy się resztą."},
fi:{metaTitle:"FlightClaimlyn hinnat: 20% palkkio, sinulle jää 80%",metaDescription:"FlightClaimlyn onnistumispalkkio on 20% sisältäen ALV:n. Ei ennakkomaksua eikä vakiopalvelumaksua, jos emme saa korvausta.",badge:"Selkeä hinnoittelu",heroA:"20% palkkio.",heroB:"Sinulle jää 80%.",intro:"FlightClaimlyn vakio onnistumispalkkio on 20% sisältäen ALV:n. Et maksa mitään etukäteen, eikä vakiopalvelumaksua peritä, jos emme saa sinulle korvausta.",bullets:["Ei ennakkomaksua","Ei korvausta, ei palkkiota","20% sis. ALV"],cta:"Tarkista lentoni",example:"€600 esimerkki",recovered:"Saatu korvaus",fee:"FlightClaimlyn palkkio",keep:"Sinulle jää",mathsLabel:"Yksinkertainen laskelma",mathsTitle:"Paljonko sinulle jää?",mathsBody:"Vakiopalkkiomme on aina 20% saadusta korvauksesta ja sisältää ALV:n.",compensation:"Korvaus",ourFee:"20% palkkiomme",compareLabel:"Palkkiovertailu",compareTitle:"Vakiopalkkioiden vertailu",compareBody:"Julkisesti ilmoitetut vakiopalkkiot vaihtelevat korvauspalveluittain. Vertailu perustuu kunkin palvelun omaan julkaistuun hinnoitteluun ja näyttää, paljonko €600:sta jää ennen mahdollisia tapauskohtaisia tai oikeudellisia lisäkuluja.",provider:"Palvelu",publishedFee:"Julkaistu vakiopalkkio",source:"Lähde",ourTerms:"Ehtomme",officialPricing:"Virallinen hinnasto",checked:"Tarkistettu 29. syyskuuta 2026. Vertailu koskee julkaistuja vakiopalkkioita, ei jäsenyyksiä, kampanjoita tai kaikkia mahdollisia oikeudellisia/tapauskohtaisia kuluja. Hinnat voivat muuttua; tarkista viralliset lähteet.",why:"Miksi 20%?",whyTitle:"Pienemmät kulut — suurempi osuus korvauksesta sinulle.",whyBody1:"Hyödynnämme automaatiota ja nykyaikaista lentodataa prosessin suoraviivaisten vaiheiden tehokkaaseen hoitamiseen. Näin voimme pitää vakiopalkkiomme 20%:ssa sisältäen ALV:n.",whyBody2:"Saat silti hoidetun korvausasian: tarkistamme tapauksesi, viestimme lentoyhtiön kanssa ja pidämme sinut ajan tasalla.",familyLabel:"Yksi perhe. Yksi esimerkki.",familyTitle:"Neljä €600 korvausta",familyBody:"20% vakiopalkkiolla neljälle matkustajalle jää €1 920 saadusta €2 400:sta. 35% vakiopalkkiolla heille jäisi €1 560.",familyDiff:"Perheelle jäävä erotus",faqLabel:"Hinnoittelun UKK",faqTitle:"Kysymyksiä palkkiostamme",faq:[{q:"Paljonko FlightClaimly veloittaa?",a:"Vakiopalvelupalkkiomme on 20% sisältäen ALV:n siitä korvauksesta, jonka saamme sinulle."},{q:"Onko FlightClaimly no win, no fee -palvelu?",a:"Kyllä. Et maksa mitään etukäteen. Jos emme saa sinulle korvausta, emme peri vakiopalvelupalkkiota."},{q:"Paljonko minulle jää €600:sta?",a:"Jos saamme €600 ja 20% vakiopalkkio soveltuu, palkkiomme on €120 ja sinulle jää €480."},{q:"Sisältyykö ALV 20%:n palkkioon?",a:"Kyllä. ALV sisältyy FlightClaimlyn 20%:n vakiopalkkioon."},{q:"Entä jos tarvitaan oikeudellisia toimia?",a:"Jos oikeudellisia toimia tarvitaan, lisäpalkkio on 10%, jolloin kokonaispalkkio on 30% sisältäen ALV:n. Jos tapaukseen liittyy poikkeuksellisia ulkopuolisia kuluja, kerromme niistä ja pyydämme hyväksyntäsi ennen jatkamista."}],fullConditionsA:"Täydelliset ehdot löytyvät",terms:"käyttöehdoistamme",finalLabel:"Ei ennakkomaksua",finalTitle:"Pidä 80% korvauksestasi.",finalBody:"Tarkista lentosi muutamassa minuutissa. Jos tapauksesi täyttää ehdot, hoidamme asian siitä eteenpäin."},
es:{metaTitle:"Tarifas de FlightClaimly: 20% de comisión, tú conservas el 80%",metaDescription:"FlightClaimly cobra una comisión de éxito del 20% con IVA incluido. Sin pago por adelantado y sin comisión estándar si no recuperamos compensación.",badge:"Precios claros",heroA:"20% de comisión.",heroB:"Tú conservas el 80%.",intro:"FlightClaimly cobra una comisión estándar de éxito del 20% con IVA incluido. No pagas nada por adelantado y no hay comisión estándar si no conseguimos una compensación para ti.",bullets:["Sin pago por adelantado","Si no ganamos, no pagas","20% IVA incluido"],cta:"Comprobar mi vuelo",example:"Ejemplo: €600",recovered:"Compensación recuperada",fee:"Comisión de FlightClaimly",keep:"Tú conservas",mathsLabel:"Cálculo sencillo",mathsTitle:"¿Cuánto conservas?",mathsBody:"Nuestra comisión estándar es siempre el 20% de la compensación recuperada e incluye el IVA.",compensation:"Compensación",ourFee:"Nuestra comisión del 20%",compareLabel:"Comparación de tarifas",compareTitle:"Comparación de comisiones estándar",compareBody:"Las comisiones estándar publicadas varían entre empresas de reclamaciones. Esta comparación utiliza los precios publicados por cada proveedor y muestra cuánto queda de €600 antes de posibles cargos específicos del caso o por acciones legales.",provider:"Proveedor",publishedFee:"Comisión estándar publicada",source:"Fuente",ourTerms:"Nuestras condiciones",officialPricing:"Precios oficiales",checked:"Comprobado el 29 de septiembre de 2026. Se comparan comisiones estándar publicadas, no suscripciones, promociones ni todos los posibles costes legales o específicos del caso. Los precios pueden cambiar; consulta las fuentes oficiales enlazadas.",why:"¿Por qué 20%?",whyTitle:"Menos gastos — más compensación para ti.",whyBody1:"Usamos automatización y datos de vuelos modernos para gestionar de forma eficiente las partes más sencillas del proceso. Así podemos mantener nuestra comisión estándar en el 20% con IVA incluido.",whyBody2:"Tu reclamación sigue estando gestionada: revisamos tu caso, nos comunicamos con la aerolínea y te mantenemos informado.",familyLabel:"Una familia. Un ejemplo.",familyTitle:"Cuatro reclamaciones de €600",familyBody:"Con una comisión estándar del 20%, cuatro pasajeros conservan €1.920 de €2.400 recuperados. Con una comisión del 35%, conservarían €1.560.",familyDiff:"Diferencia que conserva la familia",faqLabel:"Preguntas sobre precios",faqTitle:"Preguntas sobre nuestra comisión",faq:[{q:"¿Cuánto cobra FlightClaimly?",a:"Nuestra comisión estándar es del 20% con IVA incluido sobre la compensación que recuperamos para ti."},{q:"¿FlightClaimly funciona sin éxito, sin comisión?",a:"Sí. No pagas nada por adelantado. Si no recuperamos una compensación para ti, no cobramos la comisión estándar."},{q:"¿Cuánto conservo de €600?",a:"Si recuperamos €600 y se aplica la comisión estándar del 20%, nuestra comisión es de €120 y tú conservas €480."},{q:"¿El IVA está incluido en el 20%?",a:"Sí. La comisión estándar del 20% de FlightClaimly incluye el IVA."},{q:"¿Qué ocurre si se necesitan acciones legales?",a:"Si se requieren acciones legales, se añade un 10%, por lo que la comisión total es del 30% con IVA incluido. Si un caso implica costes externos excepcionales, te los explicaremos y pediremos tu aprobación antes de continuar."}],fullConditionsA:"Las condiciones completas están disponibles en nuestros",terms:"Términos y condiciones",finalLabel:"Sin pago por adelantado",finalTitle:"Conserva el 80% de tu compensación.",finalBody:"Comprueba tu vuelo en minutos. Si tu caso cumple los requisitos, nosotros nos encargamos del resto."},
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = assertLocale(raw);
  const t = copy[locale];
  return buildI18nMetadata({ locale, path: "/fees", title: t.metaTitle, description: t.metaDescription });
}

export default async function FeesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = assertLocale(raw);
  const t = copy[locale];

  const faq = t.faq;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "FlightClaimly flight compensation claim service",
    provider: { "@type": "Organization", name: "FlightClaimly" },
    description: t.metaDescription,
    url: `https://www.flightclaimly.com/${locale}/fees`,
  };

  return (
    <>
      <script
        id="fees-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <script
        id="fees-service-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd).replace(/</g, "\\u003c") }}
      />

      <main className="min-h-screen bg-white text-slate-900">
        <header className="border-b border-white/5 bg-[#050B1A]">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/logo-flightclaimly.svg"
                alt="FlightClaimly"
                width={240}
                height={48}
                priority
                className="h-10 w-auto sm:h-11"
              />
            </Link>
            <Link
              href="/check"
              className="rounded-full bg-[#22E3A5] px-4 py-2 text-sm font-bold text-[#071126] transition hover:brightness-105"
            >
              {t.cta}
            </Link>
          </div>
        </header>

        <section className="relative overflow-hidden bg-[#071126]">
          <div aria-hidden className="absolute left-[12%] top-20 h-72 w-72 rounded-full bg-[#22E3A5]/[0.07] blur-[100px]" />
          <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
            <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-16">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22E3A5]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#22E3A5]">
                    {t.badge}
                  </span>
                </div>
                <h1 className="mt-6 max-w-3xl text-4xl font-extrabold tracking-[-0.045em] text-white sm:text-5xl md:text-[64px] md:leading-[1.02]">
                  {t.heroA} <span className="text-[#22E3A5]">{t.heroB}</span>
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
                  {t.intro}
                </p>
                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-white/80">
                  {t.bullets.map((item) => (
                    <span key={item} className="inline-flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#22E3A5]/30 text-[11px] text-[#22E3A5]">✓</span>
                      {item}
                    </span>
                  ))}
                </div>
                <Link
                  href="/check"
                  className="mt-9 inline-flex rounded-full bg-[#22E3A5] px-6 py-3.5 text-sm font-bold text-[#071126] transition hover:brightness-105"
                >
                  {t.cta}
                </Link>
              </div>

              <div className="rounded-[24px] border border-white/[0.12] bg-white/[0.045] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.20)] sm:p-8">
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">{t.example}</div>
                <div className="mt-7 space-y-5">
                  <div className="flex items-end justify-between border-b border-white/10 pb-5">
                    <span className="text-sm font-medium text-white/60">{t.recovered}</span>
                    <span className="text-4xl font-extrabold text-white">€600</span>
                  </div>
                  <div className="flex items-end justify-between border-b border-white/10 pb-5">
                    <span className="text-sm font-medium text-white/60">{t.fee}</span>
                    <span className="text-2xl font-semibold text-white/75">− €120</span>
                  </div>
                  <div className="flex items-end justify-between pt-2">
                    <span className="font-semibold text-white">{t.keep}</span>
                    <span className="text-[52px] font-extrabold leading-none text-[#22E3A5]">€480</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">{t.mathsLabel}</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{t.mathsTitle}</h2>
            <p className="mt-4 text-slate-600">{t.mathsBody}</p>
          </div>
          <div className="mt-9 overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-sm text-slate-600">
                <tr>
                  <th className="px-5 py-4 font-semibold">{t.compensation}</th>
                  <th className="px-5 py-4 font-semibold">{t.ourFee}</th>
                  <th className="px-5 py-4 font-semibold">{t.keep}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm sm:text-base">
                {[["€250", "€50", "€200"], ["€400", "€80", "€320"], ["€600", "€120", "€480"]].map((row) => (
                  <tr key={row[0]}>
                    <td className="px-5 py-5 font-semibold">{row[0]}</td>
                    <td className="px-5 py-5 text-slate-600">{row[1]}</td>
                    <td className="px-5 py-5 text-lg font-extrabold text-emerald-600">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">{t.compareLabel}</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{t.compareTitle}</h2>
              <p className="mt-4 leading-7 text-slate-600">
                {t.compareBody}
              </p>
            </div>

            <div className="mt-9 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full min-w-[680px] text-left">
                <thead className="bg-[#071126] text-sm text-white/75">
                  <tr>
                    <th className="px-5 py-4 font-semibold">{t.provider}</th>
                    <th className="px-5 py-4 font-semibold">{t.publishedFee}</th>
                    <th className="px-5 py-4 font-semibold">{t.keep} from €600</th>
                    <th className="px-5 py-4 font-semibold">{t.source}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-sm">
                  <tr className="bg-emerald-50/60">
                    <td className="px-5 py-5 font-extrabold">FlightClaimly</td>
                    <td className="px-5 py-5 font-bold">20% incl. VAT</td>
                    <td className="px-5 py-5 text-lg font-extrabold text-emerald-600">€480</td>
                    <td className="px-5 py-5"><Link href="/terms" className="font-semibold underline decoration-slate-300 underline-offset-4">{t.ourTerms}</Link></td>
                  </tr>
                  {competitors.map((item) => (
                    <tr key={item.name}>
                      <td className="px-5 py-5 font-semibold">{item.name}</td>
                      <td className="px-5 py-5 text-slate-700">{item.standardFee}</td>
                      <td className="px-5 py-5 font-bold">{item.keep}</td>
                      <td className="px-5 py-5">
                        <a href={item.source} target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-slate-950">
                          {t.officialPricing} ↗
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 max-w-4xl text-xs leading-5 text-slate-500">
              {t.checked}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/compare/refly" className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-800 hover:border-emerald-400">FlightClaimly vs ReFly →</Link>
              <Link href="/compare/airhelp" className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-800 hover:border-emerald-400">FlightClaimly vs AirHelp →</Link>
              <Link href="/compare/airadvisor" className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-800 hover:border-emerald-400">FlightClaimly vs AirAdvisor →</Link>
              <Link href="/compare/skyrefund" className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-800 hover:border-emerald-400">FlightClaimly vs SkyRefund →</Link>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">{t.why}</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight">{t.whyTitle}</h2>
            <p className="mt-5 leading-7 text-slate-600">
              {t.whyBody1}
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              {t.whyBody2}
            </p>
          </div>
          <div className="rounded-3xl bg-[#071126] p-7 text-white sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#22E3A5]">{t.familyLabel}</p>
            <h3 className="mt-4 text-2xl font-extrabold">{t.familyTitle}</h3>
            <p className="mt-4 leading-7 text-white/65">
              {t.familyBody}
            </p>
            <div className="mt-7 border-t border-white/10 pt-6">
              <div className="text-sm text-white/55">{t.familyDiff}</div>
              <div className="mt-1 text-5xl font-extrabold text-[#22E3A5]">€360</div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-20">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">{t.faqLabel}</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight">{t.faqTitle}</h2>
            <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
              {faq.map((item) => (
                <div key={item.q} className="py-6">
                  <h3 className="text-lg font-bold">{item.q}</h3>
                  <p className="mt-2 leading-7 text-slate-600">{item.a}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-slate-500">
              {t.fullConditionsA} <Link href="/terms" className="font-semibold underline underline-offset-4">{t.terms}</Link>.
            </p>
          </div>
        </section>

        <section className="bg-[#071126]">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 md:py-20">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#22E3A5]">{t.finalLabel}</p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-white">{t.finalTitle}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/65">{t.finalBody}</p>
            <Link href="/check" className="mt-8 inline-flex rounded-full bg-[#22E3A5] px-7 py-3.5 text-sm font-bold text-[#071126] transition hover:brightness-105">
              {t.cta}
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
