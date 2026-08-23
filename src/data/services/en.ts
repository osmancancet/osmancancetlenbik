import type { LocaleServiceDict } from "./types";

export const en: LocaleServiceDict = {
  categories: {
    guvenlik: {
      label: "Cyber Security & Penetration Testing",
      blurb: "I test your systems the way an attacker sees them: proof-backed findings, prioritised risk, remediation you can actually ship.",
    },
    gelistirme: {
      label: "Software Development",
      blurb: "Production-grade mobile and web products from a single codebase — with security designed in from day one.",
    },
    veri: {
      label: "Data & Artificial Intelligence",
      blurb: "Models, dashboards and automation that turn raw data into decisions.",
    },
    egitim: {
      label: "Training & Consulting",
      blurb: "In-house training, awareness programmes and technical consulting.",
    },
  },
  services: {
    "web-sizma-testi": {
      title: "Web Application Penetration Testing",
      summary:
        "I test your web application and APIs against real attack scenarios — OWASP Top 10 and beyond: authentication bypass, privilege escalation, SQL injection, XSS, SSRF, business-logic flaws and session management errors.",
      deliverables: [
        "Agreed scope and rules of engagement (black-box / grey-box / white-box)",
        "Evidence-backed report with CVSS scoring and reproduction steps",
        "Executive summary plus technical appendix",
        "Free re-test after remediation",
      ],
    },
    "mobil-sizma-testi": {
      title: "Mobile Application Penetration Testing",
      summary:
        "Static and dynamic analysis of iOS and Android apps under OWASP MASVS/MASTG: reverse-engineering resistance, insecure local storage, certificate pinning, root/jailbreak detection and backend communication.",
      deliverables: [
        "APK / IPA static analysis and reverse-engineering assessment",
        "Runtime analysis (Frida, traffic interception)",
        "Local storage and key management review",
        "MASVS-level compliance matrix",
      ],
    },
    "ag-altyapi-sizma-testi": {
      title: "Network & Infrastructure Penetration Testing",
      summary:
        "I map your external and internal attack surface and exploit the weak points: exposed services, default credentials, unpatched systems, Active Directory misconfiguration and wireless security.",
      deliverables: [
        "External reconnaissance and attack-surface map",
        "Internal lateral-movement and privilege-escalation scenarios",
        "Active Directory hardening recommendations",
        "Wireless (Wi-Fi) security assessment",
      ],
    },
    "sosyal-muhendislik-simulasyonu": {
      title: "Social Engineering & Phishing Simulation",
      summary:
        "I measure the human layer. Controlled phishing, QR-trap and vishing campaigns built around your organisation, reported per department and closed out with awareness training.",
      deliverables: [
        "Bespoke scenario design and legal sign-off process",
        "Click, credential-submission and reporting-rate metrics",
        "Risk map broken down by department",
        "Post-simulation awareness session",
      ],
    },
    "iot-guvenlik-testi": {
      title: "IoT & Embedded Device Security Testing",
      summary:
        "I bring my academic IoT-security work into the field: firmware extraction and analysis, hardware interfaces (UART/JTAG), MQTT and BLE protocol security, and device-to-cloud communication.",
      deliverables: [
        "Firmware extraction, filesystem and hard-coded secret analysis",
        "Hardware interface (UART / JTAG / SPI) assessment",
        "Protocol security testing (MQTT, CoAP, BLE)",
        "Device-to-cloud authentication review",
      ],
    },
    "kaynak-kod-guvenlik-incelemesi": {
      title: "Source Code Security Review",
      summary:
        "Looking from inside the code to find what scanners miss: authorisation logic, cryptography misuse, leaked secrets, dependency-chain risk and CI/CD pipeline security.",
      deliverables: [
        "Manual code review plus triage of SAST findings",
        "Dependency and supply-chain risk report",
        "Secure-coding guide tailored to your team",
        "Security gates wired into your CI/CD pipeline",
      ],
    },
    "mobil-uygulama-gelistirme": {
      title: "Mobile App Development",
      summary:
        "iOS and Android apps from a single React Native / Expo codebase. From idea to App Store and Google Play release — including offline-first behaviour, on-device AI and store submission.",
      deliverables: [
        "Product discovery, flow design and technical architecture",
        "One codebase for iOS + Android (React Native / Expo)",
        "App Store and Google Play submission handled end to end",
        "Analytics, crash reporting and post-launch maintenance",
      ],
    },
    "web-uygulamasi-gelistirme": {
      title: "Web App & Corporate Website Development",
      summary:
        "Fast, accessible, search-ready web applications built with Next.js and TypeScript — from marketing sites to dashboards and internal platforms, with Core Web Vitals and SEO planned from the start.",
      deliverables: [
        "Full-stack delivery from design to production (Next.js + TypeScript)",
        "Admin panel / content management",
        "Core Web Vitals and accessibility optimisation",
        "Vercel deployment, domain and monitoring setup",
      ],
    },
    "api-backend-gelistirme": {
      title: "API & Backend Development",
      summary:
        "End-to-end type-safe, scalable and secure backends. Authentication, authorisation, rate limiting and audit logging come as standard, not as an afterthought.",
      deliverables: [
        "REST / tRPC API design and documentation",
        "PostgreSQL data model and Prisma schema",
        "Authentication, role-based authorisation, rate limiting",
        "Load testing and observability (logging / alerting)",
      ],
    },
    "seo-geo-optimizasyonu": {
      title: "Technical SEO & GEO Optimisation",
      summary:
        "Getting your site found on Google and inside generative engines (GEO) such as ChatGPT, Gemini and Perplexity: technical audit, structured data, canonical/hreflang hygiene and content architecture.",
      deliverables: [
        "Search Console-driven technical audit and issue closure",
        "Schema.org structured data (JSON-LD) implementation",
        "Canonical, hreflang, sitemap and robots configuration",
        "GEO: llms.txt, AI crawler policy and content structuring",
      ],
    },
    "veri-analitigi-yapay-zeka": {
      title: "Data Analytics & AI Solutions",
      summary:
        "Machine learning, natural language processing and explainable AI (XAI) projects. Model accuracy matters, but so does why it decided that way — which is what makes it usable in an enterprise.",
      deliverables: [
        "Data exploration, cleaning and feature engineering",
        "Model development, validation and benchmarking",
        "Explainability report (SHAP / LIME)",
        "Productionisation and model monitoring",
      ],
    },
    "veri-gorsellestirme-panolar": {
      title: "Data Visualisation & Management Dashboards",
      summary:
        "Dashboards that pull scattered data into a single decision screen — from choosing the right metrics to a visual language built for readability first.",
      deliverables: [
        "Metric set and KPI definitions",
        "Data pipeline with automated refresh",
        "Interactive web-based dashboard",
        "Scheduled automated report delivery",
      ],
    },
    "kurumsal-siber-guvenlik-egitimi": {
      title: "Corporate Cyber Security Training",
      summary:
        "Awareness programmes that land with non-technical teams too, drawn from eight-plus years of teaching. Built on live demos and real cases — not slide reading.",
      deliverables: [
        "Curriculum tailored to your organisation",
        "Live attack demos (phishing, QR traps, password cracking)",
        "Assessment and certificate of attendance",
        "Follow-up simulation campaign to measure impact",
      ],
    },
    "teknik-danismanlik": {
      title: "Technical Consulting & Academic Collaboration",
      summary:
        "Product architecture, security roadmaps, technology selection and team mentoring — plus academic support for university–industry collaboration, joint publications and grant applications.",
      deliverables: [
        "Architecture and security roadmap",
        "Technology selection and procurement assessment",
        "Team mentoring and code-review culture",
        "Academic collaboration, joint publication and grant support",
      ],
    },
  },
  faq: [
    {
      q: "What is the difference between a penetration test and a vulnerability scan?",
      a: "A vulnerability scan lists known issues using automated tools and produces many false positives. In a penetration test I manually verify each finding, prove exploitability and demonstrate chained attack scenarios. Every finding ships with reproducible steps.",
    },
    {
      q: "How long does a web penetration test take?",
      a: "Depending on scope, a typical corporate web application takes 5–10 working days. After a scoping call I share a firm timeline and quote. The re-test after remediation is included at no extra cost.",
    },
    {
      q: "Can the testing damage our systems?",
      a: "No. Testing follows a scope and rules of engagement agreed in writing beforehand; destructive techniques that could cause downtime are only used with explicit permission and preferably in a staging environment. Working hours and escalation channels are defined up front.",
    },
    {
      q: "Do you charge separately for iOS and Android in mobile development?",
      a: "No. With React Native / Expo we ship both platforms from one codebase, and because most screens are shared the cost stays well below two separate native apps. Platform-specific requirements are quoted separately.",
    },
    {
      q: "Do you work remotely, or on site as well?",
      a: "Penetration testing and development work are handled remotely. For corporate training, awareness workshops and internal network testing I work on site around Manisa and İzmir in Türkiye, and other locations can be arranged.",
    },
    {
      q: "How do I request a quote?",
      a: "Use the form on the contact page. Describe the need, the scope and any deadline; I usually get back to you within two working days to arrange a scoping call.",
    },
  ],
};
