import type { DelayReason } from "@/data/delay-reasons/types";

const names: Record<string, string> = {
  "technical-problems": "Problemy techniczne", "bad-weather": "Złe warunki pogodowe", "air-traffic-control": "Ograniczenia kontroli ruchu lotniczego",
  "airline-staff-strike": "Strajk personelu linii lotniczej", "crew-shortage": "Brak załogi", "late-incoming-aircraft": "Opóźniony przylot samolotu",
  "bird-strike": "Zderzenie z ptakiem", "airport-closure": "Zamknięcie lotniska", "security-issue": "Problem bezpieczeństwa",
  "hidden-manufacturing-defect": "Ukryta wada produkcyjna", "operational-reasons": "Przyczyny operacyjne",
};
const causeCopy: Record<string, { overview: string; rules: string }> = {
  "technical-problems": { overview: "Typowe usterki techniczne powstające w ramach normalnej działalności linii lotniczej co do zasady nie są nadzwyczajnymi okolicznościami w rozumieniu EU261.", rules: "Rutynowe usterki techniczne, problemy mechaniczne i zwykła obsługa techniczna nie zwalniają automatycznie linii z obowiązku wypłaty odszkodowania. Rzeczywiście zewnętrzna i nietypowa wada może wymagać innej oceny." },
  "bad-weather": { overview: "Pogoda może stanowić nadzwyczajną okoliczność, gdy warunki faktycznie uniemożliwiają bezpieczne wykonanie lotu. Ogólne powołanie się na złą pogodę nie jest samo w sobie wystarczające.", rules: "Musi istnieć rzeczywisty związek przyczynowy między pogodą a konkretnym zakłóceniem. Istotne są również rozsądne środki podjęte przez linię w celu uniknięcia lub ograniczenia zakłócenia." },
  "air-traffic-control": { overview: "Decyzje kontroli ruchu lotniczego zwykle pozostają poza kontrolą przewoźnika i mogą stanowić nadzwyczajne okoliczności.", rules: "Ograniczenie ATC musi rzeczywiście spowodować dane zakłócenie. Nawet gdy standardowe odszkodowanie nie przysługuje, prawa do zmiany planu podróży, zwrotu kosztów i opieki mogą nadal obowiązywać." },
  "airline-staff-strike": { overview: "Strajk własnego personelu linii lotniczej nie jest automatycznie nadzwyczajną okolicznością. Strajki wewnętrzne i zewnętrzne mogą być oceniane odmiennie na gruncie prawa UE.", rules: "Kluczowe jest ustalenie, kto strajkował. Spory pracownicze własnych pracowników przewoźnika mogą należeć do normalnej działalności, podczas gdy strajk podmiotu zewnętrznego może wymagać innej oceny." },
  "crew-shortage": { overview: "Planowanie obsady i załóg rezerwowych zwykle należy do bieżącej działalności linii lotniczej. Zwykły brak personelu nie staje się nadzwyczajny tylko dlatego, że przewoźnik określa go jako problem z załogą.", rules: "Decydująca jest pierwotna przyczyna braku załogi. Nietypowe zdarzenie zewnętrzne może wymagać innej oceny." },
  "late-incoming-aircraft": { overview: "Opóźniony przylot samolotu opisuje sposób przeniesienia się opóźnienia, ale nie wyjaśnia pierwotnej przyczyny zakłócenia.", rules: "Należy prześledzić przyczynę wcześniejszego opóźnienia w rotacji samolotu. Wcześniejsze zdarzenie nadzwyczajne może być oceniane inaczej niż typowy problem techniczny, kadrowy lub operacyjny." },
  "bird-strike": { overview: "Zderzenie z ptakiem jest zwykle zdarzeniem zewnętrznym, które może stanowić nadzwyczajną okoliczność.", rules: "Linia musi jednak powiązać zderzenie z konkretnym zakłóceniem i wykazać, że rozsądne środki nie pozwoliły uniknąć końcowego opóźnienia." },
  "airport-closure": { overview: "Zamknięcie lotniska zarządzone przez podmiot zewnętrzny zwykle pozostaje poza kontrolą linii i może stanowić nadzwyczajną okoliczność.", rules: "Standardowe odszkodowanie oraz obowiązki dotyczące zmiany planu podróży, zwrotu kosztów i opieki są odrębnymi kwestiami. Nawet przy zamknięciu lotniska przewoźnik może być zobowiązany rozważyć rozsądne alternatywy." },
  "security-issue": { overview: "Poważne zagrożenia bezpieczeństwa i zewnętrzne środki bezpieczeństwa mogą stanowić nadzwyczajne okoliczności.", rules: "Ogólne powołanie się na bezpieczeństwo nie wystarcza. Trzeba ocenić konkretne zdarzenie, jego związek z lotem i rozsądne działania przewoźnika." },
  "hidden-manufacturing-defect": { overview: "Ukryta wada produkcyjna wskazana przez producenta lub właściwy organ może w niektórych przypadkach stanowić nadzwyczajną okoliczność. To znacznie węższa kategoria niż zwykłe usterki techniczne.", rules: "Linia musi udokumentować rzeczywistą, nietypową wadę produkcyjną i jej związek z zakłóceniem." },
  "operational-reasons": { overview: "„Przyczyny operacyjne” to szerokie określenie, a nie samodzielna nadzwyczajna okoliczność. Należy ustalić rzeczywistą przyczynę źródłową.", rules: "Za tym określeniem mogą kryć się problemy z załogą, rotacją, planowaniem, obsługą naziemną lub techniką. Ocena na podstawie EU261 musi opierać się na faktycznej przyczynie i przebiegu zdarzeń." },
};
export function buildPolishDelayReason(delayReason: DelayReason): DelayReason {
  const title = names[delayReason.slug] ?? delayReason.title, copy = causeCopy[delayReason.slug];
  if (!copy) return delayReason;
  const extraordinary = delayReason.extraordinaryCircumstance;
  return { ...delayReason, title,
    description: `Sprawdź, kiedy ${title.toLowerCase()} mogą wpływać na prawo do odszkodowania za lot na podstawie EU261 oraz jakie inne prawa pasażera mogą nadal obowiązywać.`,
    overview: copy.overview,
    passengerRights: extraordinary ? "Nawet gdy nadzwyczajna okoliczność wyłącza standardowe odszkodowanie, prawa do opieki, zmiany planu podróży lub zwrotu kosztów mogą nadal obowiązywać. Należy ocenić konkretną przyczynę i jej związek z lotem." : "Jeśli zakłócenie spowodowało co najmniej trzy godziny opóźnienia w miejscu docelowym, kwalifikujące się odwołanie lotu lub inne zdarzenie objęte odszkodowaniem, EU261 może zapewniać prawo do odszkodowania po spełnieniu pozostałych warunków.",
    compensationRules: copy.rules,
    statisticsIntro: `Ocena przyczyny „${title.toLowerCase()}” powinna uwzględniać rzeczywistą przyczynę, wpływ na konkretny lot i działania przewoźnika.`,
    statistics: [
      { label: "Nadzwyczajna okoliczność", value: extraordinary ? "Może być" : "Zwykle nie", description: extraordinary ? "Konkretne zdarzenie i związek przyczynowy nadal wymagają wykazania." : "Ten rodzaj przyczyny często należy do normalnej działalności linii, ale decydują konkretne fakty." },
      { label: "Standardowe odszkodowanie EU261", value: extraordinary ? "Zależy od sprawy" : "Może przysługiwać", description: "Zakres zastosowania przepisów, opóźnienie lub odwołanie i rzeczywistą przyczynę ocenia się łącznie." },
      { label: "Opieka i zmiana planu podróży", value: "Odrębne prawa", description: "Prawa te mogą obowiązywać nawet wtedy, gdy standardowe odszkodowanie nie przysługuje." },
    ],
    timelineIntro: `Sprawa dotycząca przyczyny „${title.toLowerCase()}” wymaga powiązania podanej przyczyny z rzeczywistym zakłóceniem lotu.`,
    timeline: [
      { title: "Dochodzi do zakłócenia", description: "Lot zostaje opóźniony, odwołany lub w inny sposób zakłócony." },
      { title: "Ustalamy przyczynę", description: `Analizujemy dokumentację dotyczącą przyczyny „${title.toLowerCase()}” i jej czasu.` },
      { title: "Oceniamy związek przyczynowy i działania", description: "Sprawdzamy, czy wskazana przyczyna rzeczywiście wyjaśnia zakłócenie i jakie rozsądne środki były dostępne." },
      { title: "Oceniamy prawa pasażera", description: "Standardowe odszkodowanie oraz odrębne prawa do opieki, zmiany planu podróży lub zwrotu kosztów ocenia się osobno." },
    ],
    faqIntro: `Najczęściej zadawane pytania o ${title.toLowerCase()} i odszkodowanie za lot.`,
    faq: [
      { question: `Czy ${title.toLowerCase()} zawsze stanowią nadzwyczajną okoliczność?`, answer: extraordinary ? "Nie automatycznie. Zdarzenie musi spełniać wymogi prawne i rzeczywiście spowodować konkretne zakłócenie." : "Zwykle nie jako kategoria, ale zawsze trzeba ocenić rzeczywistą przyczynę źródłową i okoliczności konkretnej sprawy." },
      { question: "Czy nadal mogę mieć prawo do zmiany planu podróży lub opieki?", answer: "Tak. Prawa do zmiany planu podróży, zwrotu kosztów i opieki ocenia się oddzielnie od prawa do standardowego odszkodowania." },
      { question: "Co linia lotnicza powinna udokumentować?", answer: "Przewoźnik powinien wyjaśnić konkretną przyczynę, jej związek z lotem oraz podjęte rozsądne środki." },
    ],
  };
}
