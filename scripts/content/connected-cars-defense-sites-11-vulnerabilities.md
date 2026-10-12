**In September 2026, rental cars used by the Norwegian armed forces quietly recorded who got into them, where they went and the access codes soldiers typed at gates. Weeks later, it emerged that Türkiye's leading defense companies, ASELSAN, ROKETSAN, HAVELSAN and TEI, no longer allow foreign electric cars on their campuses. This article explains the technology behind both stories through 11 vulnerability classes, 33 sources and a set of practical recommendations.**

*Türkçe sürüm: [Otoparktaki Casus](/yazilarim/bagli-araclar-savunma-tesisleri-11-zafiyet)*

> The largest connected device entering a secure site is no longer a phone. It is a car. We make visitors leave their phones at the gate, while cars drive in with cameras, a modem and someone else's software.

### At a glance: seven numbers

- **200+** electronic sensors: what Norway's National Security Authority (NSM) says a modern car can carry.
- **800,000** EVs had their data exposed by a single misconfigured cloud bucket (VW Group / Cariad, 2024).
- **30 seconds:** all researchers needed to unlock and track a Kia using only its license plate (2024).
- **Every 3 seconds:** how often, according to the US FTC, GM recorded drivers' locations and turned them into data for sale.
- **84%:** share of 25 car brands reviewed by Mozilla whose policies allow sharing personal data with third parties.
- **$100:** roughly the cost of a receiver that can track cars through their tire-pressure sensors, no camera needed (2026).
- **2027:** the model year from which the US bans connected-vehicle software tied to China and Russia.

**In this article:** how data leaves a connected car · who can access it · 11 documented vulnerability classes · six scenarios for a defense site · how governments are responding · the situation in Türkiye · recommendations for organizations and individuals · FAQ.

## Abstract

A modern car, with its cameras, satellite positioning receiver, built-in SIM card and remotely updated software, is the largest connected device that enters any facility. This article groups the risks connected vehicles pose to sensitive sites into eleven vulnerability classes and illustrates each with a publicly documented incident or study. The central finding on connected vehicle security is this: risk is determined less by a vehicle's country of origin than by where its data goes and who controls its software. The article therefore argues for capability-based (rather than brand-based) access policies, data clauses in rental and fleet contracts, and strict separation between vehicles and phones inside secure sites.

**Keywords:** connected vehicles, telematics, OTA, TCU, data sovereignty, critical infrastructure, defense industry, UNECE R155

**Method:** This work relies on public sources: news agencies, official statements, peer-reviewed conference papers and responsible-disclosure reports by security researchers. Every fact is verified against at least one source listed in the references; inferences drawn from documented incidents are marked as "inference" or "author's assessment". No original testing was performed on any vehicle.

## 1. Introduction: when soldiers were recorded by their own cars

In the first two weeks of October 2026, two news stories raised the same question.

From 14 to 18 September 2026, the Norwegian armed forces held Exercise Hovedstad ("Capital") in and around Oslo with roughly 5,000 personnel. Among the vehicles rented for the exercise were at least two Deepal EVs, a brand of China's Changan. The rental company, Hertz Norway, belongs to Volvo Cars and therefore ultimately to China's Geely group. According to Dagens Næringsliv, soldiers found video stored in the cars showing who got in and out, where the cars went, how long they stopped and the codes typed at gates and doors. The footage was deleted. Whether any of it left the vehicles is unknown.

In the same days, Mahmut Faruk Akşit, general manager of TUSAŞ Engine Industries (TEI), said ASELSAN, ROKETSAN, HAVELSAN and TEI do not allow foreign electric vehicles on their campuses. His reasons: the cars' sensors and cameras can map a site, their software and control are not in Turkish hands, and the risk rises in wartime.

Taken together, the two stories pose one question: what does a car entering a facility sense, where does it store that data, to whom does it send it, and who can change it remotely? This article answers that question from a technical perspective. Documented incidents and general technical inferences are kept apart throughout.

## 2. What is a connected car, and where does your data go?

Today's car is a computer network on wheels, in which dozens of electronic control units (ECUs) talk over an in-vehicle network. Norway's National Security Authority notes in its Risiko 2025 report that a modern car can contain more than 200 electronic sensors.

Data passes through four layers:

1. **Sensing:** cameras, radar, ultrasonic sensors, GNSS, microphones and tire pressure monitoring sensors (TPMS).
2. **In-vehicle network:** the CAN bus and automotive Ethernet. A gateway exists to separate critical driving functions from infotainment.
3. **Connectivity:** the telematics control unit (TCU, a cellular modem with an eSIM), Wi-Fi, Bluetooth and charging communication.
4. **Back end:** the manufacturer's cloud, mobile app APIs, dealer and service portals, OTA servers and third parties that buy data.

![Data flow in a connected vehicle, from sensors to the manufacturer's cloud](/yazilarim/otoparktaki-casus/architecture-en.svg)

The highlighted TCU is the shared door through which data leaves and software enters. Through it, the car connects to the cloud over its own line, independent of the driver's phone. That is why phone controls at the gate do not automatically apply to cars.

### Cameras and modems are no longer optional; regulators require them

Connectivity and in-cabin cameras are being driven into cars not just by manufacturers but by road safety law. That makes "let's just buy cars without cameras or modems" an increasingly unrealistic strategy.

- **eCall:** Since 31 March 2018, the EU has required all new passenger car and light commercial vehicle models to carry a system that automatically calls 112 after a crash. It includes positioning and a cellular connection; the regulation prohibits tracking before an accident ([Ptolemus](https://www.ptolemus.com/insight/ecall-to-be-mandatory-on-new-car-models-from-31-march-2018/)). Every new car has a modem; the question is what else that modem is used for.
- **Driver-facing cameras:** The second phase of the EU General Safety Regulation took effect on 7 July 2026. Newly produced cars and vans must now carry a distraction warning system that tracks the driver's gaze and head position ([The Next Web](https://thenextweb.com/news/eu-vehicle-safety-rules-gsr-phase-two)).

> Bottom line: every new car entering a secure site will soon have a cabin camera and a modem. Policy must move from "does it have this feature?" to "can this feature be verifiably switched off?"

## 3. Who can access your car's data? A threat model

For a sensitive site, the threat is not a single "hacker". Four distinct actors can reach vehicle data through legitimate or illegitimate means, each through a different path and each requiring a different countermeasure.

| Actor | Access path | What it means for a site |
| --- | --- | --- |
| Manufacturers and suppliers | Telemetry, cloud accounts, OTA updates, remote diagnostics | The manufacturer decides where data goes and when software changes. |
| Governments (legal compulsion) | Intelligence and data laws of the manufacturer's home country | Data can be handed to a state through legal requests, even against the manufacturer's will. |
| Commercial third parties | Data sales, brokers, insurance and advertising partners | Location and driving data is copied beyond anyone's control and becomes purchasable. |
| Cyber attackers and nearby actors | Cloud and API flaws, Bluetooth, radio signals, physical access | Targeted tracking, theft of recordings or interference with vehicle functions. |

The assets to protect fall into three groups: **place** (the internal layout of a site, entry points, camera and guard positions), **people** (who arrives when and with whom; staff home addresses and routines) and **operations** (access codes, exercise and shipment patterns). The Norwegian recordings contained all three.

## 4. The 11 critical vulnerabilities of connected cars

Each of the eleven classes is documented by at least one public incident or study. Most have since been fixed by manufacturers, but each points to a recurring weakness of the same architecture.

| # | Class | At risk | Documented example |
| --- | --- | --- | --- |
| V1 | Passive sensor recording | Site imagery, people, codes | Norway's Exercise Hovedstad, 2026 |
| V2 | Location and movement data | Routines, addresses | GM/OnStar, FTC order, 2025–2026 |
| V3 | Phone pairing residue | Contacts, call history | Poland's pairing ban, 2026 |
| V4 | Cellular modem (TCU) | Remote access | Jeep Uconnect, 2015; Pwn2Own 2024 |
| V5 | Cloud, APIs and portals | The entire fleet | Kia 2024, Subaru 2025, Cariad 2024 |
| V6 | OTA and remote control | Vehicle function | Ruter/Yutong bus test, 2025 |
| V7 | Short-range wireless | Infotainment, identity | PerfektBlue 2025, TPMS tracking 2026 |
| V8 | In-vehicle network (CAN) | Locks, immobilizer | CAN injection via headlight, 2023 |
| V9 | Sensor spoofing | Driving decisions | Regulus GNSS, Keen Lab, 2019 |
| V10 | Charging infrastructure | Charging continuity | Brokenwire, 2022 |
| V11 | Legal access and data sovereignty | All data | China's National Intelligence Law, 2017 |

### V1. Passive sensor recording

Driver-assistance systems and parking cameras see their surroundings constantly; some cars' sentry and incident-recording modes write that footage to storage. In Norway, rented Deepal cars recorded who got in and out, where they waited and for how long, and the typing of gate codes; soldiers discovered this by chance ([VG](https://www.vg.no/nyheter/i/311JwL/kinesiskeide-leiebiler-filmet-hemmelig-forsvarsoevelse)). Footage staying "on the car" is no guarantee either: Reuters reported that Tesla employees shared private images recorded by customers' cars among themselves between 2019 and 2022 ([Reuters / Khaleej Times](https://www.khaleejtimes.com/world/we-could-see-their-kids-tesla-workers-shared-sensitive-images-recorded-by-customer-cars)), which shows that some footage did reach the manufacturer.

### V2. Location and movement data

GNSS logs reveal not just a site's address but its entry times, shift patterns and employees' homes. According to the US Federal Trade Commission (FTC), GM and OnStar collected location and driving data from millions of vehicles every three seconds without consent and passed it via consumer reporting agencies to insurers; an order finalized in January 2026 bans GM from selling such data for five years ([BleepingComputer](https://bleepingcomputer.com/news/security/ftc-bans-general-motors-from-selling-drivers-location-data-for-five-years)). Of the 25 brands Mozilla reviewed in 2023, 84% could share personal data with third parties and 76% could sell it ([Carscoops](https://www.carscoops.com/2023/09/the-automotive-industry-is-the-worst-consumer-product-sector-for-data-privacy-study-claims/)).

### V3. Phone pairing residue

A phone paired via Bluetooth, Apple CarPlay or Android Auto transfers contacts, call history and sometimes messages to the infotainment system. In rental and fleet cars this data stays behind for the next driver or service staff (general technical knowledge, not separately tested here). In February 2026, Poland's General Staff banned personnel from connecting service phones to the infotainment systems of Chinese-made cars ([Notes from Poland](https://notesfrompoland.com/2026/02/19/poland-bans-chinese-cars-from-military-bases-and-personnel-from-connecting-phones-to-them/)).

### V4. Cellular modem (TCU)

The TCU is the car's door to the internet, with its own SIM. In 2015, Charlie Miller and Chris Valasek reached a Jeep Cherokee's steering, brakes and transmission from miles away through a port left exposed to the cellular network on its Uconnect system; FCA recalled 1.4 million vehicles ([Dark Reading](https://www.darkreading.com/cyber-risk/jeep-hack-0day-an-exposed-port)). At the first Pwn2Own Automotive in 2024, the Synacktiv team took over Tesla's modem with a three-bug chain ([ZDI](https://www.thezdi.com/blog/2024/1/24/pwn2own-automotive-2024-day-one-results)).

### V5. Cloud, APIs and portals

The most scalable vulnerability is not in the car but on the manufacturer's servers: a single flaw affects the entire fleet.

- **Kia (2024):** Through a web portal flaw, researchers could unlock, start and track Kia vehicles built after 2013 using only a license plate, in about 30 seconds ([Security Affairs](https://securityaffairs.com/168966/hacking/hacking-kia-cars-made-after-2013.html)).
- **Subaru (2025):** A flaw in an employee portal exposed at least a year of a car's location history, precise down to the parking space ([TechRadar](https://www.techradar.com/vehicle-tech/hackers-expose-serious-subaru-security-flaws-that-allow-them-to-remotely-start-cars)).
- **VW / Cariad (2024):** A misconfigured cloud bucket exposed data on 800,000 EVs; for 466,000 of them, location was precise enough to reconstruct daily routines. The list included Hamburg police's EV fleet and people believed to work for intelligence services ([Electrek](https://electrek.co/2024/12/30/massive-data-leak-at-volkswagen-exposes-800000-ev-drivers/)).

None of these three incidents involves a Chinese manufacturer. The risk follows the architecture, not the flag.

### V6. OTA updates and remote control

OTA is the best way to ship security fixes quickly, but the same channel means whoever holds the signing keys can change a car's behavior after it is inside your fence. Oslo's public transport operator Ruter tested buses in a mine to block signals and found that the manufacturer of its Chinese-built Yutong buses could reach battery and power controls over the mobile network, meaning the buses could in theory be stopped. The Dutch VDL buses it compared them with had no OTA capability ([AP / The Week](https://www.theweek.in/wire-updates/international/2025/11/05/fes29-norway-china-electric-buses.html)). Akşit's emphasis on wartime corresponds to this class.

### V7. Short-range wireless interfaces

- **Bluetooth:** Four flaws dubbed PerfektBlue in OpenSynergy's BlueSDK stack allowed code execution on the infotainment systems of Mercedes-Benz, Volkswagen and Škoda vehicles, as well as location tracking and audio recording. The attack requires proximity and pairing; patches shipped in September 2024 ([The Hacker News](https://thehackernews.com/2025/07/perfektblue-bluetooth-vulnerabilities.html)).
- **Tire pressure sensors (TPMS):** IMDEA Networks collected TPMS signals from more than 20,000 vehicles over 10 weeks using receivers costing about $100 each. Sensors broadcast unique IDs unencrypted, reaching beyond 50 meters, which means a car's visits to a site can be counted without any camera ([IMDEA Networks](https://networks.imdea.org/your-cars-tire-sensors-could-be-used-to-track-you/)).

### V8. In-vehicle network (CAN)

Messages on the CAN bus carry no authentication in most cars. Ken Tindell and Ian Tabor showed that a Toyota RAV4 was stolen by thieves who pulled off a headlight, reached the CAN wiring and spoofed smart-key messages. In Tindell's words, receivers "simply trust" these messages ([The Register](https://www.theregister.com/2023/04/06/can_injection_attack_car_theft)). For a secure site, this means physical access in a parking lot is a path into the car and its connected systems.

### V9. Sensor spoofing

Cars make decisions by trusting their sensors. In 2019, Regulus Cyber said it used fake GNSS signals to steer a Tesla Model 3 on Navigate on Autopilot into an early highway exit; Tesla called the claim misleading ([Claims Journal](https://www.claimsjournal.com/news/national/2019/06/19/291550.htm)). The same year, Tencent Keen Lab steered Autopilot into the opposite lane using small stickers on the road ([Schneier on Security](https://www.schneier.com/blog/archives/2019/04/adversarial_mac.html)). The spread of GNSS jamming and spoofing in conflict zones makes this class concrete around defense sites (inference).

### V10. Charging infrastructure

An EV exchanges data with the charger while charging. The Brokenwire attack by researchers from the University of Oxford and armasuisse interrupted CCS fast-charging sessions from up to 47 meters away with under 1 W of power; all eight vehicles and 20 chargers tested were affected ([NDSS](https://www.ndss-symposium.org/ndss-paper/brokenwire-wireless-disruption-of-ccs-electric-vehicle-charging)). Five different home and commercial chargers were also targeted at Pwn2Own 2024 ([ZDI](https://www.thezdi.com/blog/2024/1/24/pwn2own-automotive-2024-day-one-results)). For a military unit moving to an electric fleet, charging is a new logistical weak point.

### V11. Legal access and data sovereignty

Even a technically flawless system is only as secure as the law its manufacturer answers to. Article 7 of China's 2017 National Intelligence Law states that all organizations and citizens "shall support, assist, and cooperate with national intelligence efforts" ([China Law Translate](https://www.chinalawtranslate.com/en/national-intelligence-law-of-the-p-r-c-2017/)). In the Norwegian case, Volvo Cars said no data can be shared with Geely without a legal basis; the issue is precisely which country's law defines that "legal basis". According to Mozilla, more than half of the brands it reviewed would also share data with law enforcement without a court order, so this class is not unique to China.

### Risk matrix: which vulnerabilities come first?

![Risk matrix plotting 11 connected-vehicle vulnerability classes by likelihood and impact](/yazilarim/otoparktaki-casus/risk-matrix-en.svg)

The four classes in the top right (passive recording, location, cloud/APIs and legal access) happen today, in peacetime, and are hardest to detect because they play out outside the site; they deserve priority. The modem and OTA risks in the top left are unlikely in peacetime but can rise quickly in a crisis; they call for a crisis plan. This is the author's qualitative assessment, not a measurement.

## 5. What could happen at a defense site? Six scenarios

These scenarios apply the documented capabilities above to a facility. They are inferences, not reported incidents. Each grows stronger with data accumulated from many vehicles over time, not just one.

1. **Mapping the site (V1, V2):** Surround-view cameras and parking sensors of cars entering a campus record building layout, gates, security cameras and guard posts. This is exactly what Akşit meant by "mapping the area".
2. **Pattern analysis (V2, V7):** Location logs reveal shift hours, test and delivery days and unusual surges. A spike in parking occupancy before an exercise is an intelligence signal in itself.
3. **Personnel profiling (V2, V3, V5):** A car goes both to the site and home. Paired phones add social networks. That is enough to identify key staff and their addresses.
4. **Capturing access credentials (V1):** As seen in Norway, cabin or exterior cameras can record codes typed at keypads and barriers.
5. **Wartime interference (V4, V6, V10):** Vehicles whose software can be updated or whose power systems can be reached remotely could be disabled in a crisis; a fleet stopping at once is a logistics attack. Akşit's remark that AI in war simulations "almost always used cars as missiles" is the extreme version of this scenario.
6. **Rental and shared cars (all classes):** An organization knows the settings of its own cars; it does not know those of a rental. The Norwegian case arose from a rental framework contract, and the unit kept using the recording cars because no alternatives were available.

## 6. How is the world responding? Bans and regulations

Very different regimes reached the same conclusion: near sensitive sites, a connected car is as much a sovereignty issue as a cybersecurity issue. Decisions are listed newest first.

| Date | Country / institution | Decision | Source |
| --- | --- | --- | --- |
| Oct 2026 | Türkiye: ASELSAN, ROKETSAN, HAVELSAN, TEI | Foreign EVs not allowed on campus; domestic vehicles permitted | [TRT Haber](https://www.trthaber.com/haber/savunma/tusas-motor-sanayii-genel-muduru-aksit-yabanci-elektrikli-arabalari-kampusun-icine-sokmuyoruz-959795.html) |
| Sep 2026 | Norwegian Armed Forces | No general ban on vehicles from specific countries; measures follow the threat assessment | [VG](https://www.vg.no/nyheter/i/311JwL/kinesiskeide-leiebiler-filmet-hemmelig-forsvarsoevelse) |
| Feb 2026 | Polish General Staff | Chinese-made cars barred from protected military sites; staff may not connect phones to them; other cars may enter if recording functions are disabled | [Notes from Poland](https://notesfrompoland.com/2026/02/19/poland-bans-chinese-cars-from-military-bases-and-personnel-from-connecting-phones-to-them/) |
| Jan 2026 | US FTC | GM barred from selling location data for 5 years; 20 years of express-consent requirements | [BleepingComputer](https://bleepingcomputer.com/news/security/ftc-bans-general-motors-from-selling-drivers-location-data-for-five-years) |
| Nov 2025 | Israel Defense Forces | About 700 Chery cars issued to officers being withdrawn; Chinese cars were already barred from bases | [Israel Hayom](https://www.israelhayom.com/2025/11/02/idf-orders-removal-of-chinese-cars-over-espionage-fears) |
| Jan 2025 | US Commerce Department (BIS) | Connectivity and automated-driving software tied to China and Russia banned from model year 2027, hardware from 2030 | [BIS](https://www.bis.gov/press-release/commerce-finalizes-rule-secure-connected-vehicle-supply-chains-foreign-adversary-threats) |
| Jul 2024 | EU (UNECE R155 / R156) | Cybersecurity and software update management systems mandatory for all new vehicles | [INCIBE-CERT](https://www.incibe.es/index.php/en/incibe-cert/blog/new-2024-cybersecurity-regulations-vehicles) |
| Oct 2021 | China (CAC) | Vehicle and personnel flow data in military zones classed as "important data"; must stay in China | [FPF](https://fpf.org/blog/update-chinas-car-privacy-and-security-regulation-is-effective-on-october-1-2021/) |
| Mar 2021 | People's Liberation Army | Tesla cars to be parked outside military compounds and housing | [Al Jazeera](https://www.aljazeera.com/amp/economy/2021/3/19/chinas-military-bans-tesla-cars-on-camera-sensor-spy-concerns) |

**The limits of R155/R156.** These regulations check that manufacturers manage cyber risk and ship updates securely. They do not regulate which country stores the data, who holds the signing keys or which state can demand access (inference from their scope). A car can pass type approval and still be unsuitable for a defense site.

**A notable symmetry.** The measure China took for its own military in 2021 and the measures taken today by the US, Israel, Poland and Turkish defense companies rest on the same logic: a connected car controlled by someone else does not enter a sensitive area.

## 7. What does this mean for Türkiye?

Parking lots in Türkiye are filling quickly with connected and electric cars, yet there is no public national standard governing vehicle access to sensitive sites (author's observation). TEI's statement is the first visible step to fill that gap at the organizational level.

**The market is changing fast.** According to ODMD data, 84,956 fully electric cars were sold in Türkiye in the first half of 2025, up 138% year on year. Togg (17,101), Tesla (12,320) and BYD (10,401) led the list ([AA / Politikam](https://www.politikam.com/togg-2025e-damgasini-vurdu-tesla-ve-bydyi-geride-birakti-toggun-en-cok-satilan-modelleri-hangileri-oldu)). Their owners include employees of defense, energy and public institutions, so the risk sits not only in corporate fleets but in staff's private cars.

**The legal framework has two parts.**

- **KVKK (personal data protection law):** Location and cabin data collected from vehicles is personal data. Article 9, amended by Law No. 7499, has since 1 June 2024 tied transfers abroad to an adequacy decision, Board-announced standard contracts or binding corporate rules ([Erdem & Erdem](https://www.erdem-erdem.av.tr/bilgi-bankasi/kisisel-verilerin-korunmasi-kanununda-neler-degisti)). But KVKK protects individual privacy; a site's building layout or guard schedule is not personal data and is not protected by this law (inference).
- **Cybersecurity Law:** Law No. 7545, published in the Official Gazette on 19 March 2025, gives the Cybersecurity Directorate authority over the cybersecurity of critical infrastructure ([Alomaliye](https://www.alomaliye.com/2025/03/19/7545-sayili-siber-guvenlik-kanunu/)). Guidance on vehicle access to sensitive sites would fit naturally under this framework (author's suggestion).

**"Domestic" is the right distinction, but not enough on its own.** TEI allows domestic cars because their software and control stay in the country. That is a sound principle; yet components such as the modem, infotainment software, map services and cloud infrastructure may come from global suppliers. Organizations should ask for a data-flow map and component list for domestic cars too (inference).

> Türkiye's question should not stop at "should foreign cars be allowed in?" It should become a national standard that asks: "which car, with which capabilities, may enter which zone?"

## 8. How to protect yourself: recommendations for organizations and individuals

The most effective measure is to classify vehicles not by brand or origin, but by their capabilities and by who controls them. Poland's rule that other cars "may enter if recording functions are disabled" is a good example of this approach.

The recommendations below offer a basis for discussion compiled from public sources and other countries' practices. They do not replace an organization's own site-specific risk assessment; the decisions already taken by TEI and other defense companies show that many of them are already in practice.

### For defense industry and critical infrastructure sites

1. **Zoning:** Divide the site into at least three zones: outer parking (all vehicles), inner area (approved vehicles only) and sensitive area (no vehicles, or specially configured organizational vehicles). Move staff within the inner area by organizational shuttles.
2. **Capability-based access policy:** Keep an approval inventory listing, for each vehicle model, whether camera recording, sentry mode, the cellular modem, OTA and remote commands can be disabled, and how this is verified.
3. **Verify domestic cars too:** "Domestic" does not automatically mean the software and cloud are in the country; supplier components (modem, infotainment, map service) should be questioned separately.
4. **Gate and code hygiene:** Replace keypad codes with badge, biometric or one-time methods; keep code entry points out of the view of vehicle cameras.
5. **RF visibility:** Use passive sensors around the site that monitor cellular, Bluetooth and TPMS emissions to see which vehicles are "talking" inside.
6. **Incident response plan:** When a recording like Norway's is found, define steps to quarantine the car, image its storage for forensics and only then wipe it. Deleting first leaves the question of whether data left the car unanswered.

### For fleet and rental contracts

- Document at handover that camera recording, sentry mode and telematics sharing are disabled.
- Reset the infotainment system on return and provide proof of wiping.
- Write into the contract in which country and cloud the vehicle data is stored and to which third parties it is transferred.
- Question the supplier's ultimate ownership structure (like the Hertz, Volvo, Geely chain in Norway) at the tender stage.
- Keep an alternative vehicle pool ready for exercises and sensitive missions.

### For staff and individuals

- Never pair a work phone with any car; on a personal phone, do not give rental cars access to contacts and messages.
- Review location history, driving analytics and data-sharing permissions in your car's app; switch off what you don't use.
- Disable sentry and incident-recording modes when visiting a sensitive site.

### For policymakers and manufacturers

- Ask for a software bill of materials (SBOM) and a data-flow map for vehicles in public procurement.
- Discuss a verifiable "secure zone mode" standard that switches off all recording and connectivity with one action.
- Offer an option for OTA updates not to install without the fleet owner's approval; Ruter has moved in this direction by delaying and inspecting incoming signals.
- Bring unencrypted broadcasting components such as TPMS into the scope of cybersecurity regulation.

## 9. Conclusion: the car is now an endpoint

What the Norwegian exercise proved is not an espionage operation but that cars can record without anyone being asked. That is a serious enough finding: a recording you cannot control is a leak risk you cannot control.

A connected car is now an endpoint and should be managed like a laptop or a phone. The question to ask is not "which country is this car from?" but "what does this car sense, where does it send it and who can change it remotely?" As Akşit put it: if the software is yours, you change the password; if it is someone else's, they do what they want.

## Frequently asked questions

### Are electric cars riskier than gasoline cars?

The risk comes from connectivity, not the drivetrain. Modern gasoline cars also have modems, cameras and OTA. EVs, however, are usually more software-centric, carry more sensors and open an extra data path through charging.

### Is this only about Chinese-made cars?

No. None of the Kia, Subaru, Volkswagen or GM incidents involved Chinese manufacturers. What is specific to China is the legal-access risk created by the intelligence law its manufacturers are subject to. China itself removed Teslas from military sites in 2021 for the same reason.

### Did the Norwegian cars send footage to China?

Unknown. What is established is that the cars stored video and that it was deleted. Public sources have not confirmed that any data left the vehicles.

### Can I switch off my car's camera or modem?

In most cars, sentry and recording modes and data-sharing permissions can be switched off in settings. Switching the modem off entirely is usually not possible; in the EU, every new model carries one because of eCall. Verifying that switching off actually works requires testing at the organizational level.

### Is a UNECE R155-certified car secure?

R155 shows that a manufacturer manages cyber risk. It does not govern which country stores data or who can push updates. Certification is necessary but not sufficient for a sensitive site.

### What should an organization do first?

Start with three steps: separate sensitive areas from vehicle traffic, ban pairing corporate phones with cars, and add data clauses to rental and fleet contracts. Details are in section 8.

### Should I worry as an individual?

Even if you don't work at a defense site, your location history, home address and routines live in your car's data. Reviewing the app's data-sharing permissions and deleting your phone pairing when you return a rental car is a good start.

## Glossary

| Term | Meaning |
| --- | --- |
| Connected car | A vehicle that can connect to the internet, the manufacturer's cloud or other devices |
| CAN bus | The network control units use inside a car, often without authentication |
| ECU | Electronic control unit; a computer managing functions such as brakes, engine or battery |
| eCall | EU-mandated system that automatically calls emergency services after a crash |
| eSIM | A SIM card embedded in the car that cannot be removed |
| GNSS | Umbrella term for satellite positioning systems such as GPS and Galileo |
| IVI | In-vehicle infotainment: screen, navigation, phone connection |
| OTA | Over-the-air software update |
| R155 / R156 | UN regulations on vehicle cybersecurity and software update management |
| Sentry mode | Camera mode that monitors and records surroundings while parked |
| TCU | Telematics control unit; the car's cellular modem |
| TPMS | Tire pressure monitoring system; sensors that broadcast wireless signals |

## About the author

**Osman Can Çetlenbik** is a lecturer in the Big Data Analytics Program at Manisa Celal Bayar University's Vocational School of Technical Sciences and deputy director of the university's Computer Application and Research Center. He holds a BSc in Computer Engineering from Süleyman Demirel University and an MSc from Isparta University of Applied Sciences. His research focuses on phishing detection, social engineering and IoT security, including the TurkPhish v2 corpus of Turkish phishing emails and work on detecting false data injection attacks in smart grids, both published in 2026. He is the author of "TIKLA(MA): The Art of Hacking the Human Mind" (in Turkish) and provides penetration testing and cybersecurity training to organizations. ([AVESİS](https://avesis.mcbu.edu.tr/osman.cetlenbik))

## Sources

Accessed 12 October 2026. The content of Dagens Næringsliv's paywalled report was verified through VG and Norway News.

1. TRT Haber / AA, [TUSAŞ Motor Sanayii Genel Müdürü Akşit: Yabancı elektrikli arabaları kampüsün içine sokmuyoruz](https://www.trthaber.com/haber/savunma/tusas-motor-sanayii-genel-muduru-aksit-yabanci-elektrikli-arabalari-kampusun-icine-sokmuyoruz-959795.html), 11 October 2026.
2. TRT Haber / AA, [Norveç'teki askeri tatbikatta kiralık araçların hassas bilgileri kaydettiği ileri sürüldü](https://www.trthaber.com/haber/dunya/norvecteki-askeri-tatbikatta-kiralik-araclarin-hassas-bilgileri-kaydettigi-ileri-suruldu-959933.html), 12 October 2026.
3. VG, [Kinesisk-eide leiebiler filmet hemmelig forsvarsøvelse](https://www.vg.no/nyheter/i/311JwL/kinesiskeide-leiebiler-filmet-hemmelig-forsvarsoevelse), October 2026.
4. Norway News, [Chinese-owned rental cars recorded Norwegian military drill](https://norwaynews.com/chinese-owned-rental-cars-recorded-norwegian-military-drill/), 12 October 2026.
5. Dagens Næringsliv, [Kinesisk-eide leiebiler filmet hemmelig øvelse](https://www.dn.no/forsvar-og-sikkerhet/kinesisk-eide-leiebiler-filmet-hemmelig-ovelse-lagret-video-av-soldater-og-koder/2-1-2050958) (paywalled).
6. Militarnyi, [Chinese cars in Norway stored military exercise footage and access codes](https://militarnyi.com/en/news/chinese-cars-in-norway-stored-military-exercise-footage-and-access-codes/).
7. AP / The Week, [Norway transport firm steps up controls after tests show Chinese-made buses can be halted remotely](https://www.theweek.in/wire-updates/international/2025/11/05/fes29-norway-china-electric-buses.html), 5 November 2025.
8. US Bureau of Industry and Security, [Commerce finalizes rule to secure connected vehicle supply chains](https://www.bis.gov/press-release/commerce-finalizes-rule-secure-connected-vehicle-supply-chains-foreign-adversary-threats), 14 January 2025.
9. Notes from Poland, [Poland bans Chinese cars from military bases and personnel from connecting phones to them](https://notesfrompoland.com/2026/02/19/poland-bans-chinese-cars-from-military-bases-and-personnel-from-connecting-phones-to-them/), 19 February 2026.
10. Israel Hayom, [IDF orders removal of Chinese cars over espionage fears](https://www.israelhayom.com/2025/11/02/idf-orders-removal-of-chinese-cars-over-espionage-fears), 2 November 2025.
11. Al Jazeera / Bloomberg, [China's military bans Tesla cars on camera, sensor spy concerns](https://www.aljazeera.com/amp/economy/2021/3/19/chinas-military-bans-tesla-cars-on-camera-sensor-spy-concerns), 19 March 2021.
12. Future of Privacy Forum, [China's car privacy and security regulation is effective on October 1, 2021](https://fpf.org/blog/update-chinas-car-privacy-and-security-regulation-is-effective-on-october-1-2021/).
13. China Law Translate, [National Intelligence Law of the P.R.C. (2017)](https://www.chinalawtranslate.com/en/national-intelligence-law-of-the-p-r-c-2017/).
14. INCIBE-CERT, [New 2024 cybersecurity regulations for vehicles](https://www.incibe.es/index.php/en/incibe-cert/blog/new-2024-cybersecurity-regulations-vehicles), 13 June 2024.
15. BleepingComputer, [FTC bans General Motors from selling drivers' location data for five years](https://bleepingcomputer.com/news/security/ftc-bans-general-motors-from-selling-drivers-location-data-for-five-years), 15 January 2026.
16. Carscoops, [Mozilla: the automotive industry is the worst consumer product sector for data privacy](https://www.carscoops.com/2023/09/the-automotive-industry-is-the-worst-consumer-product-sector-for-data-privacy-study-claims/), September 2023.
17. Reuters / Khaleej Times, [Tesla workers shared sensitive images recorded by customer cars](https://www.khaleejtimes.com/world/we-could-see-their-kids-tesla-workers-shared-sensitive-images-recorded-by-customer-cars), 7 April 2023.
18. Dark Reading, [Jeep hack 0day: an exposed port](https://www.darkreading.com/cyber-risk/jeep-hack-0day-an-exposed-port), 6 August 2015.
19. Zero Day Initiative, [Pwn2Own Automotive 2024 day one results](https://www.thezdi.com/blog/2024/1/24/pwn2own-automotive-2024-day-one-results), 24 January 2024.
20. Security Affairs, [Hacking Kia cars made after 2013 using just their license plate](https://securityaffairs.com/168966/hacking/hacking-kia-cars-made-after-2013.html), 26 September 2024.
21. TechRadar, [Hackers expose serious Subaru security flaws](https://www.techradar.com/vehicle-tech/hackers-expose-serious-subaru-security-flaws-that-allow-them-to-remotely-start-cars), 27 January 2025.
22. Electrek, [Massive data leak at Volkswagen exposes 800,000 EV drivers](https://electrek.co/2024/12/30/massive-data-leak-at-volkswagen-exposes-800000-ev-drivers/), 30 December 2024.
23. The Hacker News, [PerfektBlue Bluetooth vulnerabilities](https://thehackernews.com/2025/07/perfektblue-bluetooth-vulnerabilities.html), 11 July 2025.
24. IMDEA Networks, [Your car's tire sensors could be used to track you](https://networks.imdea.org/your-cars-tire-sensors-could-be-used-to-track-you/), 25 February 2026.
25. The Register, [CAN injection attack used to steal cars](https://www.theregister.com/2023/04/06/can_injection_attack_car_theft), 6 April 2023.
26. Claims Journal, [Tesla Model 3 GPS spoofing test by Regulus Cyber](https://www.claimsjournal.com/news/national/2019/06/19/291550.htm), 19 June 2019.
27. Schneier on Security, [Adversarial machine learning against Tesla's Autopilot](https://www.schneier.com/blog/archives/2019/04/adversarial_mac.html), April 2019.
28. NDSS Symposium, [Brokenwire: Wireless disruption of CCS electric vehicle charging](https://www.ndss-symposium.org/ndss-paper/brokenwire-wireless-disruption-of-ccs-electric-vehicle-charging), 2023.
29. Ptolemus, [eCall to be mandatory on new car models from 31 March 2018](https://www.ptolemus.com/insight/ecall-to-be-mandatory-on-new-car-models-from-31-march-2018/).
30. The Next Web, [Every new EU car now needs a camera that watches the driver](https://thenextweb.com/news/eu-vehicle-safety-rules-gsr-phase-two), 9 July 2026.
31. AA / Politikam, [TOGG 2025'e damgasını vurdu](https://www.politikam.com/togg-2025e-damgasini-vurdu-tesla-ve-bydyi-geride-birakti-toggun-en-cok-satilan-modelleri-hangileri-oldu), 6 July 2025.
32. Erdem & Erdem, [Kişisel Verilerin Korunması Kanunu'nda neler değişti?](https://www.erdem-erdem.av.tr/bilgi-bankasi/kisisel-verilerin-korunmasi-kanununda-neler-degisti)
33. Alomaliye, [7545 sayılı Siber Güvenlik Kanunu](https://www.alomaliye.com/2025/03/19/7545-sayili-siber-guvenlik-kanunu/), 19 March 2025.
