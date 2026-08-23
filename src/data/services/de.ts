import type { LocaleServiceDict } from "./types";

export const de: LocaleServiceDict = {
  categories: {
    guvenlik: {
      label: "Cybersicherheit & Penetrationstests",
      blurb:
        "Ich teste Ihre Systeme aus der Sicht eines Angreifers: belegte Befunde, priorisierte Risiken und Gegenmaßnahmen, die sich tatsächlich umsetzen lassen.",
    },
    gelistirme: {
      label: "Softwareentwicklung",
      blurb:
        "Produktionsreife Mobil- und Webprodukte aus einer gemeinsamen Codebasis — Sicherheit von Anfang an mitgedacht.",
    },
    veri: {
      label: "Daten & Künstliche Intelligenz",
      blurb:
        "Modelle, Dashboards und Automatisierungen, die aus Rohdaten belastbare Entscheidungen machen.",
    },
    egitim: {
      label: "Schulung & Beratung",
      blurb:
        "Interne Schulungen, Awareness-Programme und technische Beratung.",
    },
  },
  services: {
    "web-sizma-testi": {
      title: "Web-Penetrationstest",
      summary:
        "Ich prüfe Ihre Webanwendung und Ihre APIs anhand realer Angriffsszenarien — OWASP Top 10 und darüber hinaus: Umgehung der Authentifizierung, Rechteausweitung, SQL-Injection, XSS, SSRF, Fehler in der Geschäftslogik und im Session-Management.",
      deliverables: [
        "Abgestimmter Prüfumfang und Rules of Engagement (Black-Box / Grey-Box / White-Box)",
        "Belegter Befundbericht mit CVSS-Bewertung und Reproduktionsschritten",
        "Management-Zusammenfassung plus technischer Anhang",
        "Kostenloser Nachtest nach der Behebung",
      ],
    },
    "mobil-sizma-testi": {
      title: "Penetrationstest für mobile Apps",
      summary:
        "Statische und dynamische Analyse von iOS- und Android-Apps nach OWASP MASVS/MASTG: Reverse-Engineering-Schutz, unsichere lokale Datenhaltung, Certificate Pinning, Root-/Jailbreak-Erkennung und Backend-Kommunikation.",
      deliverables: [
        "Statische Analyse von APK / IPA und Reverse-Engineering-Bewertung",
        "Laufzeitanalyse (Frida, Abfangen des Datenverkehrs)",
        "Prüfung der lokalen Datenhaltung und des Schlüsselmanagements",
        "Konformitätsmatrix nach MASVS-Stufe",
      ],
    },
    "ag-altyapi-sizma-testi": {
      title: "Netzwerk- und Infrastruktur-Penetrationstest",
      summary:
        "Ich kartiere Ihre externe und interne Angriffsfläche und nutze die Schwachstellen aus: offene Dienste, Standardzugangsdaten, ungepatchte Systeme, Fehlkonfigurationen im Active Directory und WLAN-Sicherheit.",
      deliverables: [
        "Externe Aufklärung und Karte der Angriffsfläche",
        "Szenarien für laterale Bewegung und Rechteausweitung im internen Netz",
        "Härtungsempfehlungen für Active Directory",
        "Sicherheitsbewertung des Funknetzes (WLAN)",
      ],
    },
    "sosyal-muhendislik-simulasyonu": {
      title: "Social Engineering & Phishing-Simulation",
      summary:
        "Ich messe die menschliche Ebene. Kontrollierte Phishing-, QR-Fallen- und Vishing-Kampagnen, zugeschnitten auf Ihr Unternehmen, ausgewertet nach Abteilung und mit einer Awareness-Schulung abgeschlossen.",
      deliverables: [
        "Maßgeschneidertes Szenario und rechtliche Freigabe im Vorfeld",
        "Kennzahlen zu Klick-, Eingabe- und Meldequote",
        "Risikokarte aufgeschlüsselt nach Abteilung",
        "Awareness-Sitzung im Anschluss an die Simulation",
      ],
    },
    "iot-guvenlik-testi": {
      title: "IoT- und Embedded-Sicherheitstest",
      summary:
        "Ich bringe meine akademische Arbeit zur IoT-Sicherheit in die Praxis: Firmware-Extraktion und -Analyse, Hardware-Schnittstellen (UART/JTAG), MQTT- und BLE-Protokollsicherheit sowie die Kommunikation zwischen Gerät und Cloud.",
      deliverables: [
        "Firmware-Extraktion, Dateisystem- und Secret-Analyse",
        "Bewertung der Hardware-Schnittstellen (UART / JTAG / SPI)",
        "Prüfung der Protokollsicherheit (MQTT, CoAP, BLE)",
        "Untersuchung der Geräte-zu-Cloud-Authentifizierung",
      ],
    },
    "kaynak-kod-guvenlik-incelemesi": {
      title: "Sicherheitsreview des Quellcodes",
      summary:
        "Der Blick von innen findet, was Scanner übersehen: Autorisierungslogik, falscher Einsatz von Kryptografie, offengelegte Secrets, Risiken in der Abhängigkeitskette und die Sicherheit der CI/CD-Pipeline.",
      deliverables: [
        "Manuelles Code-Review plus Triage der SAST-Befunde",
        "Bericht zu Abhängigkeits- und Lieferkettenrisiken",
        "Leitfaden für sicheres Programmieren, auf Ihr Team zugeschnitten",
        "Sicherheitsprüfungen in Ihrer CI/CD-Pipeline",
      ],
    },
    "mobil-uygulama-gelistirme": {
      title: "Entwicklung mobiler Apps",
      summary:
        "iOS- und Android-Apps aus einer einzigen React-Native-/Expo-Codebasis. Von der Idee bis zur Veröffentlichung im App Store und bei Google Play — inklusive Offline-Betrieb, KI auf dem Gerät und Store-Einreichung.",
      deliverables: [
        "Produkt-Discovery, Flow-Design und technische Architektur",
        "Eine Codebasis für iOS + Android (React Native / Expo)",
        "Einreichung im App Store und bei Google Play, komplett betreut",
        "Analytik, Crash-Reporting und Wartung nach dem Launch",
      ],
    },
    "web-uygulamasi-gelistirme": {
      title: "Web-App- und Unternehmenswebsite-Entwicklung",
      summary:
        "Schnelle, barrierearme und suchmaschinenfertige Webanwendungen mit Next.js und TypeScript — von der Unternehmenswebsite bis zu Dashboards und internen Plattformen, mit Core Web Vitals und SEO von Anfang an.",
      deliverables: [
        "Full-Stack-Umsetzung vom Design bis zur Produktion (Next.js + TypeScript)",
        "Administrationsbereich / Redaktionssystem",
        "Optimierung von Core Web Vitals und Barrierefreiheit",
        "Deployment auf Vercel, Domain- und Monitoring-Einrichtung",
      ],
    },
    "api-backend-gelistirme": {
      title: "API- und Backend-Entwicklung",
      summary:
        "Durchgängig typsichere, skalierbare und sichere Backends. Authentifizierung, Autorisierung, Rate Limiting und Audit-Logging gehören zum Standard, nicht zum Nachtrag.",
      deliverables: [
        "Entwurf und Dokumentation der REST-/tRPC-API",
        "PostgreSQL-Datenmodell und Prisma-Schema",
        "Authentifizierung, rollenbasierte Autorisierung, Rate Limiting",
        "Lasttests und Observability (Logging / Alerting)",
      ],
    },
    "seo-geo-optimizasyonu": {
      title: "Technisches SEO & GEO",
      summary:
        "Damit Ihre Website bei Google und in generativen Suchmaschinen (GEO) wie ChatGPT, Gemini und Perplexity gefunden wird: technisches Audit, strukturierte Daten, saubere Canonical-/hreflang-Struktur und Inhaltsarchitektur.",
      deliverables: [
        "Technisches Audit auf Basis der Search Console und Behebung der Fehler",
        "Umsetzung strukturierter Daten nach Schema.org (JSON-LD)",
        "Konfiguration von Canonical, hreflang, Sitemap und robots",
        "GEO: llms.txt, Richtlinie für KI-Crawler und Inhaltsstruktur",
      ],
    },
    "veri-analitigi-yapay-zeka": {
      title: "Datenanalyse & KI-Lösungen",
      summary:
        "Projekte zu maschinellem Lernen, Sprachverarbeitung und erklärbarer KI (XAI). Die Genauigkeit des Modells zählt, aber ebenso, warum es so entschieden hat — genau das macht den Einsatz im Unternehmen erst möglich.",
      deliverables: [
        "Datenexploration, Bereinigung und Feature Engineering",
        "Modellentwicklung, Validierung und Benchmarking",
        "Erklärbarkeitsbericht (SHAP / LIME)",
        "Produktivsetzung und Modell-Monitoring",
      ],
    },
    "veri-gorsellestirme-panolar": {
      title: "Datenvisualisierung & Management-Dashboards",
      summary:
        "Dashboards, die verstreute Daten in einem einzigen Entscheidungsbildschirm bündeln — von der Auswahl der richtigen Kennzahlen bis zu einer Bildsprache, die auf Lesbarkeit ausgelegt ist.",
      deliverables: [
        "Kennzahlenset und KPI-Definitionen",
        "Datenpipeline mit automatischer Aktualisierung",
        "Interaktives Dashboard im Browser",
        "Automatisierter Versand regelmäßiger Berichte",
      ],
    },
    "kurumsal-siber-guvenlik-egitimi": {
      title: "Cybersicherheitsschulung für Unternehmen",
      summary:
        "Awareness-Programme, die auch bei nicht-technischen Teams ankommen — aus über acht Jahren Lehrerfahrung. Getragen von Live-Demos und echten Fällen, nicht vom Vorlesen von Folien.",
      deliverables: [
        "Auf Ihr Unternehmen zugeschnittenes Curriculum",
        "Live-Angriffsdemos (Phishing, QR-Fallen, Passwortknacken)",
        "Lernerfolgskontrolle und Teilnahmebescheinigung",
        "Anschließende Simulationskampagne zur Wirkungsmessung",
      ],
    },
    "teknik-danismanlik": {
      title: "Technische Beratung & akademische Zusammenarbeit",
      summary:
        "Produktarchitektur, Sicherheits-Roadmaps, Technologieauswahl und Team-Mentoring — dazu akademische Unterstützung bei Kooperationen zwischen Hochschule und Wirtschaft, gemeinsamen Veröffentlichungen und Förderanträgen.",
      deliverables: [
        "Architektur- und Sicherheits-Roadmap",
        "Technologieauswahl und Beschaffungsbewertung",
        "Team-Mentoring und Aufbau einer Code-Review-Kultur",
        "Akademische Zusammenarbeit, gemeinsame Publikationen und Förderanträge",
      ],
    },
  },
  faq: [
    {
      q: "Worin unterscheidet sich ein Penetrationstest von einem Schwachstellenscan?",
      a: "Ein Schwachstellenscan listet bekannte Probleme mit automatisierten Werkzeugen auf und erzeugt viele Fehlalarme. In einem Penetrationstest verifiziere ich jeden Befund manuell, weise die Ausnutzbarkeit nach und zeige verkettete Angriffsszenarien. Jeder Befund kommt mit reproduzierbaren Schritten.",
    },
    {
      q: "Wie lange dauert ein Web-Penetrationstest?",
      a: "Je nach Umfang dauert eine typische Unternehmensanwendung 5 bis 10 Arbeitstage. Nach einem Scoping-Gespräch nenne ich einen verbindlichen Zeitrahmen und Preis. Der Nachtest nach der Behebung ist inbegriffen.",
    },
    {
      q: "Können unsere Systeme durch den Test Schaden nehmen?",
      a: "Nein. Getestet wird innerhalb eines vorab schriftlich vereinbarten Umfangs und Regelwerks; destruktive Techniken, die zu Ausfällen führen könnten, setze ich nur mit ausdrücklicher Erlaubnis und vorzugsweise in einer Testumgebung ein. Arbeitszeiten und Eskalationswege werden vorher festgelegt.",
    },
    {
      q: "Berechnen Sie iOS und Android in der App-Entwicklung getrennt?",
      a: "Nein. Mit React Native / Expo entstehen beide Plattformen aus einer Codebasis, und da der Großteil der Bildschirme geteilt wird, liegen die Kosten deutlich unter zwei getrennten nativen Apps. Plattformspezifische Anforderungen werden separat kalkuliert.",
    },
    {
      q: "Arbeiten Sie remote oder auch vor Ort?",
      a: "Penetrationstests und Entwicklungsarbeit laufen remote. Für Unternehmensschulungen, Awareness-Workshops und interne Netzwerktests bin ich rund um Manisa und İzmir in der Türkei vor Ort; andere Orte lassen sich nach Absprache einrichten.",
    },
    {
      q: "Wie fordere ich ein Angebot an?",
      a: "Nutzen Sie das Formular auf der Kontaktseite oder schreiben Sie direkt eine E-Mail. Beschreiben Sie den Bedarf, den Umfang und etwaige Fristen; in der Regel melde ich mich innerhalb von zwei Arbeitstagen für ein Scoping-Gespräch.",
    },
  ],
};
