import {
  Gauge,
  Radio,
  RadioTower,
  Layers,
  Database,
  Wrench,
  CircuitBoard,
  Cpu,
  Activity,
  ShieldCheck,
  Zap,
  Server,
  Workflow,
  Sparkles,
  Lock,
  Network,
  CheckCircle2,
  FileSpreadsheet,
  AlertTriangle,
  LucideIcon,
} from "lucide-react";

export interface ServiceMetric {
  value: string;
  label: string;
  subtext?: string;
}

export interface ServicePillar {
  icon: LucideIcon;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  engineeringDetails: string;
  features: string[];
  specsSummary: { label: string; value: string }[];
}

export interface SpecCategory {
  category: string;
  items: { parameter: string; value: string; standard?: string }[];
}

export interface ServiceLifecyclePhase {
  step: string;
  phase: string;
  timeframe: string;
  deliverables: string[];
  detail: string;
}

export interface ServiceCaseStudy {
  client: string;
  scope: string;
  challenge: string;
  solution: string;
  outcomes: { metric: string; label: string }[];
  summary: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceItem {
  slug: string;
  icon: LucideIcon;
  title: string;
  eyebrow: string;
  badge: string;
  tagline: string;
  description: string;
  overviewNarrative: string[];
  metrics: ServiceMetric[];
  pillars: ServicePillar[];
  specCategories: SpecCategory[];
  lifecycle: ServiceLifecyclePhase[];
  caseStudy: ServiceCaseStudy;
  faqs: ServiceFAQ[];
  securityHighlights: { title: string; desc: string; icon: LucideIcon }[];
}

export const SERVICES_DATA: Record<string, ServiceItem> = {
  "smart-water-metering": {
    slug: "smart-water-metering",
    icon: Gauge,
    title: "Smart Water Metering (AMI / AMR)",
    eyebrow: "Discipline 01 — Utility Infrastructure",
    badge: "Billing-Grade Metrology // MID R400",
    tagline: "End-to-end Advanced Metering Infrastructure engineered for public water utilities.",
    description:
      "We design, procure, deploy, and maintain static ultrasonic smart water metering networks. Combining billing-grade metrology, deep-indoor LPWAN connectivity, and continuous District Metering Area (DMA) analytics, we convert distribution losses into accountable utility revenue.",
    overviewNarrative: [
      "Water utilities across South Asia lose between 30% and 45% of total treated volume before it reaches revenue collection. Traditional mechanical water meters suffer from rapid impeller degradation, silt abrasion, and high starting flow thresholds that fail to capture low-flow domestic consumption.",
      "N3 Solutions deploys static ultrasonic and electromagnetic metering systems with no moving parts. Each device features integrated acoustic transducers, bidirectional flow profiling, and sub-GHz LPWAN radio modules that transmit billing-grade telemetry even when submerged in flooded subterranean pits.",
      "Our programme covers the full utility lifecycle: hydraulic network zoning, turnkey meter installations, carrier-grade network gateways, and automated Meter Data Management System (MDMS) integration directly into utility billing systems.",
    ],
    metrics: [
      { value: "860,000+", label: "Addressable Endpoints", subtext: "Across 5 WASA regions" },
      { value: "MID R400", label: "Dynamic Metrology Ratio", subtext: "Starting flow < 1.0 L/h" },
      { value: "15+ Years", label: "Battery Autonomy", subtext: "Standard hourly transmission" },
      { value: "99.94%", label: "Telemetry SLA", subtext: "AES-128 encrypted uplink" },
    ],
    pillars: [
      {
        icon: Gauge,
        number: "01",
        title: "Billing-Grade Ultrasonic Metrology",
        subtitle: "Zero Mechanical Wear & Low-Flow Sensitivity",
        description:
          "Static transit-time ultrasonic metrology with no moving mechanical components. Immune to sand, silt, and magnetic tampering, ensuring stable accuracy over 15+ years of continuous service.",
        engineeringDetails:
          "Utilizes dual paired piezoelectric ceramic transducers operating at 2.4 MHz with nanosecond time-of-flight resolution. Accurately measures laminar, turbulent, and reverse fluid streams with starting thresholds down to 0.8 L/h.",
        features: [
          "Dynamic range MID 2014/32/EU R400 / OIML R49 Class 2 compliant",
          "Automated empty pipe, reverse flow, burst, and freeze alarms",
          "Hermetically sealed IP68 enclosure with high-grade composite/bronze casing",
          "Continuous water temperature and diagnostic telemetry monitoring",
        ],
        specsSummary: [
          { label: "Nominal Diameters", value: "DN15 to DN300" },
          { label: "Dynamic Ratio", value: "Q3/Q1 = R400" },
          { label: "Operating Pressure", value: "PN16 (1.6 MPa)" },
        ],
      },
      {
        icon: Radio,
        number: "02",
        title: "Sub-GHz LPWAN & Cellular Telemetry",
        subtitle: "High Penetration Subterranean RF Architecture",
        description:
          "Integrated and external radio interface units utilizing LoRaWAN (AS923 / EU868) and NB-IoT with adaptive data rate (ADR) algorithms for maximum battery efficiency in deep pits.",
        engineeringDetails:
          "Configured with dedicated helical internal antennas and optional IP68 pit-lid extension antennas. Power amplifiers deliver up to +14 dBm transmit power with receiver sensitivity down to -138 dBm for reliable link margins.",
        features: [
          "LoRaWAN 1.0.4 Class A / NB-IoT 3GPP Release 14 dual-stack options",
          "AES-128 cryptographic key management with hardware secure element",
          "Configurable transmission intervals (15-min indexing / daily burst)",
          "Over-The-Air (OTA) firmware parametrization and diagnostic polling",
        ],
        specsSummary: [
          { label: "RF Frequency", value: "AS923-1 / EU868 / NB-IoT" },
          { label: "Tx Power", value: "Up to +14 dBm EIRP" },
          { label: "Link Budget", value: "> 154 dB" },
        ],
      },
      {
        icon: Layers,
        number: "03",
        title: "DMA & Real-Time NRW Mass Balance",
        subtitle: "District Boundary Reconciliations & Leak Localization",
        description:
          "Continuous mass-balance telemetry reconciling bulk distribution intake against consumer consumption across discrete zones to identify and localize non-revenue water (NRW) in real time.",
        engineeringDetails:
          "Synchronizes hourly meter index readings with district boundary flow and pressure loggers. The analytics engine calculates Minimum Night Flow (MNF) between 02:00 and 04:00 to isolate physical leakage from commercial losses.",
        features: [
          "Automated District Metering Area (DMA) intake vs consumption balancing",
          "Continuous Minimum Night Flow (MNF) calculation and burst alerting",
          "Acoustic noise loggers and hydrophone correlation data overlay",
          "GIS-integrated pipe network heatmaps of unbilled loss sectors",
        ],
        specsSummary: [
          { label: "Zonal Resolution", value: "500 - 3,000 meters/DMA" },
          { label: "Balance Frequency", value: "Hourly / Daily automated" },
          { label: "Burst Alert Time", value: "< 15 minutes" },
        ],
      },
      {
        icon: Database,
        number: "04",
        title: "Meter Data Management (MDMS) Integration",
        subtitle: "Validation, Estimation & ERP/Billing Synchronization",
        description:
          "Carrier-grade data ingestion platform that processes millions of telemetry packets, performs automated VEE (Validation, Estimation, Editing), and exports billing-ready files to utility ERPs.",
        engineeringDetails:
          "Microservices architecture deployed on high-availability clusters. Employs Apache Kafka streaming pipelines, distributed time-series databases, and standard REST/SOAP adapters for legacy billing systems.",
        features: [
          "Automated Validation, Estimation, and Editing (VEE) rule engine",
          "Seamless REST / SFTP synchronization with SAP, Oracle, and WASA billing engines",
          "Customer consumption portal with consumption alarms and bill estimation",
          "Role-based access control with comprehensive compliance audit logging",
        ],
        specsSummary: [
          { label: "Throughput", value: "50,000 events/sec" },
          { label: "Integration", value: "REST / SFTP / MQTT / SOAP" },
          { label: "Data Retention", value: "10+ years time-series" },
        ],
      },
    ],
    specCategories: [
      {
        category: "Metrology & Fluid Dynamics",
        items: [
          {
            parameter: "Metrological Certification",
            value: "MID 2014/32/EU, OIML R49, ISO 4064 Class 2",
            standard: "European Standard",
          },
          {
            parameter: "Dynamic Accuracy Ratio",
            value: "Q3/Q1 = R400 (Optional R500)",
            standard: "ISO 4064",
          },
          {
            parameter: "Starting Flow Rate",
            value: "< 1.0 L/h (DN15) / < 1.5 L/h (DN20)",
            standard: "Factory Calibrated",
          },
          {
            parameter: "Temperature Rating",
            value: "T30 / T50 (0.1°C to 50°C)",
            standard: "Drinking Water",
          },
          {
            parameter: "Maximum Working Pressure",
            value: "1.6 MPa (16 bar / PN16)",
            standard: "EN 14154",
          },
          {
            parameter: "Pressure Loss",
            value: "Δp < 0.16 bar at Q3 (Δp16 rating)",
            standard: "ISO 4064",
          },
        ],
      },
      {
        category: "RF Telemetry & Connectivity",
        items: [
          {
            parameter: "LPWAN Protocol",
            value: "LoRaWAN 1.0.4 Class A / NB-IoT 3GPP Rel 14",
            standard: "LoRa Alliance",
          },
          {
            parameter: "Operating Frequencies",
            value: "AS923-1 / AS923-2 / EU868 / 4G NB-IoT Bands 3, 8, 20",
            standard: "BTRC Approved",
          },
          {
            parameter: "Transmission Power",
            value: "+14 dBm (25 mW) / +20 dBm (Cellular)",
            standard: "Compliant",
          },
          {
            parameter: "Receiver Sensitivity",
            value: "Down to -138 dBm (SF12)",
            standard: "Carrier Grade",
          },
          {
            parameter: "Antenna Options",
            value: "Internal high-gain / External IP68 pit-lid antenna",
            standard: "Corrosion Proof",
          },
        ],
      },
      {
        category: "Electrical & Enclosure",
        items: [
          {
            parameter: "Ingress Protection",
            value: "IP68 Submersible (continuous 3m underwater test)",
            standard: "IEC 60529",
          },
          {
            parameter: "Battery Chemistry",
            value: "Lithium Thionyl Chloride (Li-SOCl2) D-cell / ER26500",
            standard: "Industrial Grade",
          },
          {
            parameter: "Operational Battery Life",
            value: "15+ Years (Hourly index transmission at 25°C)",
            standard: "Calculated & Tested",
          },
          {
            parameter: "Housing Metallurgy",
            value: "Lead-free brass CW724R / High-grade engineered PPS composite",
            standard: "NSF/ANSI 61",
          },
          {
            parameter: "Operating Temperature",
            value: "-10°C to +65°C ambient",
            standard: "Tropicalized",
          },
        ],
      },
      {
        category: "Data Security & Compliance",
        items: [
          {
            parameter: "Payload Encryption",
            value: "AES-128 CTR / CBC with unique per-device network & app keys",
            standard: "NIST FIPS 197",
          },
          {
            parameter: "Key Storage",
            value: "Hardware Secure Element / Crypto-Auth IC",
            standard: "Anti-Tamper",
          },
          {
            parameter: "Data Assurance",
            value: "Validation, Estimation & Editing (VEE) compliance",
            standard: "ANSI C12.19",
          },
        ],
      },
    ],
    lifecycle: [
      {
        step: "01",
        phase: "Hydraulic Survey & DMA Demarcation",
        timeframe: "Weeks 1 – 4",
        detail:
          "Zonal demarcation, boundary valve isolation audits, topological line-of-sight RF propagation modelling, and baseline hydraulic pressure mapping.",
        deliverables: [
          "GIS-referenced DMA boundary topology map",
          "RF Gateway placement & link-budget propagation report",
          "Customer plumbing & pit infrastructure audit log",
        ],
      },
      {
        step: "02",
        phase: "Sandbox Pilot & Metrology Benchmarking",
        timeframe: "Weeks 5 – 8",
        detail:
          "Deployment of 500 – 1,000 smart meters in targeted high-density zones alongside calibrated reference ultrasonic flow sensors to verify billing telemetry accuracy.",
        deliverables: [
          "Empirical meter accuracy & SNR distribution report",
          "Initial Non-Revenue Water baseline mass-balance calculation",
          "MDMS to WASA billing engine API handshake verification",
        ],
      },
      {
        step: "03",
        phase: "Turnkey City-Scale Mass Deployment",
        timeframe: "Weeks 9 – 24",
        detail:
          "Full field rollout managed by certified N3 regional installation crews utilizing GPS-stamped digital work orders, pipe fitting, and instant RF packet verification.",
        deliverables: [
          "Digitally geo-tagged installation certificates with photo proof",
          "Complete asset serialized registry synchronized with utility billing",
          "Automated daily consumption indexing enabled across all zones",
        ],
      },
      {
        step: "04",
        phase: "24/7 Managed NOC & SLA Operations",
        timeframe: "Multi-Year Contract",
        detail:
          "Continuous network operations center (NOC) monitoring, proactive dispatch for meter swap guarantees, battery surveillance, and SLA-backed uptime reporting.",
        deliverables: [
          "Contractual 99.9% data availability SLA compliance reports",
          "Real-time burst and acoustic leak alert notification feeds",
          "Guaranteed 4-hour field emergency response for critical assets",
        ],
      },
    ],
    caseStudy: {
      client: "Chittagong WASA Metropolitan Distribution Zone",
      scope: "50,000 Addressable Ultrasonic Metering Endpoints across 6 Urban DMAs",
      challenge:
        "Severe distribution losses (34.2% NRW) caused by aging mechanical meters, unmetered multi-dwelling connections, and subterranean water pit inundation during monsoon flooding.",
      solution:
        "N3 Solutions engineered a turnkey AMI programme deploying IP68 ultrasonic meters with deep-indoor LoRaWAN gateways, automated DMA mass balancing, and direct billing integration.",
      outcomes: [
        { metric: "-21.8%", label: "NRW Loss Reduction in Year 1" },
        { metric: "99.94%", label: "Billing-Grade Packet Reception" },
        { metric: "+$4.2M", label: "Recovered Annual Utility Revenue" },
      ],
      summary:
        "Within 9 months of full commissioning, the utility converted previously unbilled distribution volume into accountable revenue while isolating 42 underground mainline bursts using automated acoustic anomaly telemetry.",
    },
    faqs: [
      {
        question:
          "How does ultrasonic metrology perform in water containing high silt or particulates?",
        answer:
          "Ultrasonic transit-time metrology measures sound velocity across the fluid stream and contains zero moving parts (impellers, gears, or pistons). Unlike mechanical meters where sand causes physical abrasion and blockage, ultrasonic sensors remain completely unaffected by silt and maintain factory calibration (MID Class 2 / R400) throughout their 15-year lifecycle.",
      },
      {
        question:
          "Will LoRaWAN / NB-IoT signals transmit reliably from submerged subterranean meter pits?",
        answer:
          "Yes. Sub-GHz radio frequencies (868 MHz / 923 MHz) exhibit superior diffraction and concrete penetration characteristics compared to high-frequency cellular. In deep or metal-lidded pits, N3 installs low-profile, ruggedized IP68 pit-lid composite antennas that maintain link budgets exceeding 154 dB, ensuring 99.9%+ packet delivery even during full seasonal flooding.",
      },
      {
        question: "How does the system integrate with legacy utility ERP and billing databases?",
        answer:
          "N3's Meter Data Management System (MDMS) features standard integration adapters for SAP IS-U, Oracle CC&B, and proprietary WASA SQL billing databases. Data is delivered via secure REST APIs, automated SFTP batch export, or event-driven MQTT webhooks with full VEE (Validation, Estimation, Editing) audit logs.",
      },
      {
        question: "What happens when a meter detects a burst, continuous leak, or reverse flow?",
        answer:
          "When instantaneous flow rate exceeds pre-set thresholds or runs uninterrupted for more than 4 hours (indicative of a consumer-side pipe burst), the meter triggers an immediate high-priority alarm packet to the NOC and utility dispatch, enabling proactive intervention before catastrophic damage occurs.",
      },
    ],
    securityHighlights: [
      {
        title: "Hardware Cryptographic Root of Trust",
        desc: "Each meter is provisioned with factory-injected AES-128 root keys stored in tamper-proof silicon, preventing key extraction or spoofing.",
        icon: Lock,
      },
      {
        title: "End-to-End Payload Encryption",
        desc: "Telemetry data remains cryptographically sealed from the sensor transducer until it reaches the secure utility application tier.",
        icon: ShieldCheck,
      },
      {
        title: "Zero-Trust Carrier-Grade Architecture",
        desc: "Mutual TLS 1.3 authentication, role-based access control, and continuous intrusion monitoring across all gateway endpoints.",
        icon: Network,
      },
    ],
  },

  "iot-infrastructure": {
    slug: "iot-infrastructure",
    icon: RadioTower,
    title: "IoT Infrastructure & Telemetry Networks",
    eyebrow: "Discipline 02 — Network & Telemetry",
    badge: "Carrier-Grade LPWAN // Sub-GHz & Cellular",
    tagline: "Carrier-grade low-power wide-area networks, gateway estates, and telemetry backhaul.",
    description:
      "We engineer, roll out, and maintain industrial-grade LPWAN networks (LoRaWAN, NB-IoT, and hybrid satellite backhaul). Built for multi-decade utility operations, our infrastructure guarantees reliable packet delivery across high-density urban centres and remote industrial zones.",
    overviewNarrative: [
      "Public utilities and smart city operators require dedicated, carrier-grade wireless connectivity that is completely independent of consumer cellular traffic and capable of penetrating deep subterranean infrastructure.",
      "N3 Solutions designs, deploys, and operates private sub-GHz LoRaWAN base stations, high-gain mast antennas, and redundant telemetry backhaul networks across metropolitan Bangladesh. Our network architecture is optimized for low power consumption, enabling sensors to operate for over 15 years on internal batteries.",
      "Backed by 24/7 Network Operations Center (NOC) surveillance, adaptive data rate (ADR) management, and multi-tenant cloud broker clusters, our networks deliver mission-critical telemetry for water, power, gas, and environmental sensor estates.",
    ],
    metrics: [
      { value: "99.98%", label: "Gateway Estate Uptime", subtext: "Redundant backhaul failover" },
      { value: "< 1.2s", label: "Packet Ingestion Latency", subtext: "Distributed Kafka pipeline" },
      { value: "100k+", label: "Concurrent Nodes per Hub", subtext: "Carrier-grade 64-channel" },
      { value: "24/7/365", label: "Active NOC Surveillance", subtext: "Automated alert dispatch" },
    ],
    pillars: [
      {
        icon: RadioTower,
        number: "01",
        title: "Carrier-Grade LPWAN Gateway Estates",
        subtitle: "High-Density Multi-Channel Base Stations",
        description:
          "Outdoor IP67 base stations equipped with 8/16/64-channel digital signal processors, cavity cavity-filter lightning protection, and redundant 4G/fiber backhaul.",
        engineeringDetails:
          "Features SX1302/SX1303 baseband processors delivering high packet processing concurrency without spectral collisions. Built-in surface acoustic wave (SAW) filters isolate cellular intermodulation in dense RF environments.",
        features: [
          "8/16/64-channel carrier-grade base station deployments",
          "Dual-SIM cellular (4G LTE-M / NB-IoT) + Gigabit Ethernet failover",
          "Solar-hybrid battery backup units delivering 72 hours grid-loss runtime",
          "GPS-synchronized time-stamping for TDoA geolocation without GPS chips",
        ],
        specsSummary: [
          { label: "Receiver Channels", value: "Up to 64 concurrent" },
          { label: "Sensitivity", value: "-142 dBm @ SF12" },
          { label: "Lightning Surge", value: "10 kA / 8/20 μs" },
        ],
      },
      {
        icon: Server,
        number: "02",
        title: "Distributed Network Server (LNS) Cluster",
        subtitle: "Adaptive Data Rate & High-Throughput Routing",
        description:
          "High-availability distributed network server cluster managing ADR (Adaptive Data Rate), gateway spatial diversity, and secure packet deduplication in real time.",
        engineeringDetails:
          "Clustered microservices deployed across geographically redundant data centres. Employs real-time RF link-budget analysis to throttle sensor transmit power and data rates, maximizing device battery lifespans.",
        features: [
          "Sub-second packet deduplication across overlapping gateway zones",
          "Dynamic Adaptive Data Rate (ADR) algorithms to optimize sensor battery life",
          "Multi-tenant utility isolation with strict role-based access control",
          "Live RF spectrum health maps and carrier signal-to-noise monitoring",
        ],
        specsSummary: [
          { label: "Routing Latency", value: "< 50 ms" },
          { label: "Redundancy", value: "Active-Active Multi-Region" },
          { label: "Uptime SLA", value: "99.98% Contractual" },
        ],
      },
      {
        icon: ShieldCheck,
        number: "03",
        title: "End-to-End Cryptographic Security",
        subtitle: "Hardware Key Isolation & Payload Integrity",
        description:
          "Comprehensive cryptographic architecture ensuring zero plaintext exposure from field sensor nodes to utility back-end databases.",
        engineeringDetails:
          "Implements independent 128-bit Network Session Keys (NwkSKey) and Application Session Keys (AppSKey). Message Integrity Codes (MIC) prevent replay attacks and man-in-the-middle eavesdropping.",
        features: [
          "Hardware-rooted unique cryptographic key generation per device",
          "AES-128 network session and application layer cryptographic isolation",
          "Mutual TLS 1.3 authentication on all northbound integration APIs",
          "Granular cryptographic audit trails for utility compliance verification",
        ],
        specsSummary: [
          { label: "Cipher", value: "AES-128 CTR/CMAC" },
          { label: "Replay Protection", value: "32-bit Frame Counter" },
          { label: "API Security", value: "mTLS / OAuth 2.0" },
        ],
      },
      {
        icon: Workflow,
        number: "04",
        title: "High-Throughput Telemetry Broker Cluster",
        subtitle: "Streaming Ingestion & SCADA Interoperability",
        description:
          "Distributed message brokers converting binary sensor payloads into structured JSON streams delivered over Apache Kafka, MQTT, and OPC-UA for SCADA integration.",
        engineeringDetails:
          "Custom payload decoding engine supporting multi-vendor sensor hardware. Capable of handling massive burst events during storm surges or rapid pressure spikes without buffer drops.",
        features: [
          "Apache Kafka & RabbitMQ high-throughput streaming message brokers",
          "Plug-and-play decoding decoders for multi-vendor sensor hardware",
          "Native OPC-UA and Modbus TCP gateways for industrial SCADA integration",
          "Configurable webhook and streaming REST push endpoints",
        ],
        specsSummary: [
          { label: "Burst Ingestion", value: "100k msgs/sec" },
          { label: "Protocols", value: "Kafka / MQTT / OPC-UA / REST" },
          { label: "Data Quality", value: "Schema-validated JSON" },
        ],
      },
    ],
    specCategories: [
      {
        category: "RF Architecture & Performance",
        items: [
          {
            parameter: "Supported Protocols",
            value: "LoRaWAN 1.0.3/1.0.4/1.1 Class A, B & C, 3GPP NB-IoT",
            standard: "LoRa Alliance",
          },
          {
            parameter: "Frequency Bands",
            value: "AS923 (920-925 MHz), EU868, IN865",
            standard: "BTRC Authorized",
          },
          {
            parameter: "Demodulation Capacity",
            value: "8 to 64 concurrent channels per base station",
            standard: "Carrier Grade",
          },
          {
            parameter: "Gateway Sensitivity",
            value: "-142 dBm at SF12 (125 kHz BW)",
            standard: "Semtech SX1303",
          },
          {
            parameter: "Maximum RF Link Budget",
            value: "> 156 dB across metropolitan terrain",
            standard: "Tested Line-of-Sight",
          },
        ],
      },
      {
        category: "Gateway Hardware & Power",
        items: [
          {
            parameter: "Enclosure Ingress",
            value: "IP67 Weatherproof Die-Cast Aluminum with thermal cooling",
            standard: "IEC 60529",
          },
          {
            parameter: "Power Supply Options",
            value: "PoE (802.3at) / 100-240V AC / 12-24V DC Solar Hybrid",
            standard: "IEEE Compliant",
          },
          {
            parameter: "Battery Backup",
            value: "72-hour lithium iron phosphate (LiFePO4) reserve battery",
            standard: "Integrated",
          },
          {
            parameter: "Surge & Lightning Protection",
            value: "Integrated gas tube arrestors on RF & Ethernet lines",
            standard: "IEC 61643-21",
          },
          {
            parameter: "Operating Temperature",
            value: "-20°C to +70°C with 100% condensing humidity",
            standard: "Industrial Grade",
          },
        ],
      },
      {
        category: "Software & Integration",
        items: [
          {
            parameter: "Server Architecture",
            value: "Kubernetes distributed microservices cluster",
            standard: "Cloud / On-Prem",
          },
          {
            parameter: "Northbound Interfaces",
            value: "gRPC, REST API, MQTT v3.1.1/v5.0, Apache Kafka 3.0",
            standard: "Open Standard",
          },
          {
            parameter: "Data Formats",
            value: "Decoded JSON, Protobuf, Hex binary stream",
            standard: "Interoperable",
          },
          {
            parameter: "Availability SLA",
            value: "99.98% uptime backed by financial service credits",
            standard: "Contractual",
          },
        ],
      },
    ],
    lifecycle: [
      {
        step: "01",
        phase: "RF Coverage Simulation & Spectrum Scan",
        timeframe: "Weeks 1 – 3",
        detail:
          "High-resolution 3D digital terrain modelling, Fresnel zone analysis, site surveys of municipal water towers/rooftops, and RF noise spectrum scanning.",
        deliverables: [
          "3D Heatmap Coverage & Link Margin Simulation",
          "Gateway Candidate Site Acquired & Structural Audit",
          "BTRC Frequency Compliance & Licensing Documentation",
        ],
      },
      {
        step: "02",
        phase: "Base Station Rigging & Backhaul Setup",
        timeframe: "Weeks 4 – 8",
        detail:
          "Installation of galvanized antenna masts, low-loss coaxial cabling, lightning arrestors, and redundant dual-carrier cellular/fiber backhaul routers.",
        deliverables: [
          "Commissioning test certificates with VSWR measurements",
          "Dual-backhaul failover test logs (Cellular/Fiber)",
          "Battery backup runtime verification under simulated grid failure",
        ],
      },
      {
        step: "03",
        phase: "Drive Testing & subterranean Signal Mapping",
        timeframe: "Weeks 9 – 12",
        detail:
          "Physical drive testing and sensor node signal mapping in basements, flooded meter pits, and heavy industrial compounds to certify link margins.",
        deliverables: [
          "Field RSSI and SNR spatial distribution report",
          "Optimal sensor Spreading Factor (SF) parametrization table",
          "Packet reception rate (PRR) audit exceeding 99.9%",
        ],
      },
      {
        step: "04",
        phase: "24/7 Managed NOC & SLA Support",
        timeframe: "Continuous Operations",
        detail:
          "24/7 automated monitoring of packet latency, signal drift, and backhaul health with guaranteed field technician dispatch for tower maintenance.",
        deliverables: [
          "Monthly uptime and packet throughput SLA reports",
          "Proactive notification of sensor node RF degradation",
          "Continuous firmware updates and cryptographic key rotations",
        ],
      },
    ],
    caseStudy: {
      client: "National Utility Telemetry Network Deployment",
      scope: "48 Base Stations covering 420 km² Metropolitan Area",
      challenge:
        "Severe urban RF congestion, frequent grid outages, and deep subterranean sensor locations requiring high packet reliability without monthly SIM card subscription costs per sensor.",
      solution:
        "N3 Solutions deployed a private carrier-grade LoRaWAN network utilizing 48 high-elevation base stations with solar battery backup and dual-SIM backhaul, ingesting over 2.4 million packets daily.",
      outcomes: [
        { metric: "99.98%", label: "Gateway Network Availability" },
        { metric: "-78%", label: "Connectivity Cost vs Cellular" },
        { metric: "< 850ms", label: "Average Packet Delivery Latency" },
      ],
      summary:
        "The dedicated utility network enabled complete independence from commercial telecom outages while reducing recurrent operational communications expenditure by over 78% across 65,000 smart sensor endpoints.",
    },
    faqs: [
      {
        question:
          "Why deploy private LPWAN infrastructure instead of individual SIM cards in every meter?",
        answer:
          "Cellular SIM cards incur recurring monthly data fees, high power consumption (draining batteries in 3-5 years), and vulnerability to commercial cellular congestion during public events. A private LoRaWAN network has zero per-sensor carrier subscription costs, extends battery life to 15+ years, and gives the utility complete sovereign ownership of their data backhaul.",
      },
      {
        question: "How do base stations maintain connectivity during extended grid power outages?",
        answer:
          "Every N3 outdoor gateway is equipped with an integrated high-capacity lithium iron phosphate (LiFePO4) battery backup and optional solar charge controllers that maintain continuous transmission for over 72 hours in the event of total municipal grid failure.",
      },
      {
        question:
          "How does the network handle thousands of devices transmitting simultaneously without packet collisions?",
        answer:
          "Our network uses SX1302/SX1303 multi-channel base station processors capable of simultaneous demodulation across 8 to 64 channels on multiple spreading factors (SF7 to SF12). Combined with Adaptive Data Rate (ADR) algorithms, devices transmit at the fastest possible data rate, keeping channel occupancy to mere milliseconds.",
      },
      {
        question: "Is the network locked into N3 Solutions hardware?",
        answer:
          "No. Our network infrastructure strictly complies with open international LoRaWAN and 3GPP specifications. Utilities can onboard third-party water meters, electricity meters, street lighting controllers, and environmental sensors from any certified global manufacturer without proprietary lock-in.",
      },
    ],
    securityHighlights: [
      {
        title: "Sovereign Network Architecture",
        desc: "All telemetry routes directly to local utility-controlled infrastructure, preventing extraterritorial data transit.",
        icon: Lock,
      },
      {
        title: "Dual Cryptographic Keys",
        desc: "Network routing layer cannot read application sensor data; payloads remain sealed until decrypted by the utility backend.",
        icon: ShieldCheck,
      },
      {
        title: "Resilient Distributed Broker",
        desc: "Zero single point of failure with automated multi-zone failover and encrypted persistence buffers.",
        icon: Network,
      },
    ],
  },

  "field-operations": {
    slug: "field-operations",
    icon: Wrench,
    title: "Field Operations & Asset Maintenance",
    eyebrow: "Discipline 03 — Operations & Lifecycle",
    badge: "SLA-Backed // 24/7 Field Engineering",
    tagline:
      "Deployed regional engineering units, asset lifecycle management, and contractually guaranteed uptime.",
    description:
      "Physical infrastructure requires disciplined, accountable field execution. We deploy full-time regional engineering teams equipped with digital workforce tools, local spare inventory buffers, and rigorous preventive maintenance schedules to guarantee multi-decade asset performance.",
    overviewNarrative: [
      "The failure of smart utility programmes rarely occurs in the software; it occurs in the field when meters are improperly installed, pipe fittings leak, or faulty sensors sit unaddressed for months without accountability.",
      "N3 Solutions provides full-lifecycle field engineering and operational maintenance. Our certified pipefitters, instrumentation technicians, and telecom riggers operate from regional hubs across Bangladesh with direct contractual accountability for operational uptime.",
      "Every work order is tracked in real-time through our digital Field Service Management (FSM) platform, providing utilities with cryptographic GPS timestamps, pipe pre/post photo archives, and automated customer signoffs.",
    ],
    metrics: [
      { value: "< 4 Hours", label: "Critical SLA Response", subtext: "Priority 1 field dispatch" },
      {
        value: "5 WASA",
        label: "Regional Operating Hubs",
        subtext: "Dhaka, Ctg, Rajshahi, Khulna, Sylhet",
      },
      { value: "99.8%", label: "First-Time Fix Rate", subtext: "Certified tooling & spares" },
      { value: "100%", label: "Digital Job Traceability", subtext: "GPS & photo verification" },
    ],
    pillars: [
      {
        icon: Wrench,
        number: "01",
        title: "Certified Field Engineering Teams",
        subtitle: "Full-Time Specialized Utility Technicians",
        description:
          "Dedicated, full-time pipefitting and instrumentation technicians equipped with precision hydraulic tools, calibration rigs, and confined-space safety gear.",
        engineeringDetails:
          "All technicians undergo rigorous training in ultrasonic meter installation, pipe alignment, leak sealing, and subterranean safety. We eliminate reliance on ad-hoc subcontractors.",
        features: [
          "Certified pipefitting, plumbing, and electrical instrumentation crews",
          "Dedicated emergency response vehicles with rapid tool deployment",
          "Standardized digital SOPs for meter retrofits, valve servicing, and pit rehabilitation",
          "OSHA-compliant safety standards for confined-space and street excavation works",
        ],
        specsSummary: [
          { label: "Deployment", value: "Full-time crews" },
          { label: "Safety Rating", value: "Zero-Incident Target" },
          { label: "Tooling", value: "Hydraulic & Ultrasonic" },
        ],
      },
      {
        icon: Activity,
        number: "02",
        title: "Predictive & Condition-Based Maintenance",
        subtitle: "Automated Dispatch on Telemetry Triggers",
        description:
          "Algorithmic dispatch of maintenance crews triggered automatically by telemetry anomalies, acoustic leak signatures, or battery voltage degradation.",
        engineeringDetails:
          "Our NOC software runs continuous statistical screening on all connected endpoints. When a device exhibits abnormal consumption drops, tilt tampering, or RF degradation, a work order is autonomously generated.",
        features: [
          "Automated dispatch on telemetry silence, burst, or battery degradation alerts",
          "Periodic ultrasonic transducer cleaning and accuracy calibration audits",
          "District isolation valve exercise and pressure regulating valve (PRV) servicing",
          "Monsoon pre-inspection protocols for flood-prone subterranean pits",
        ],
        specsSummary: [
          { label: "Trigger Response", value: "Automated Algorithm" },
          { label: "Audit Cycle", value: "Bi-annual & On-demand" },
          { label: "PRV Servicing", value: "Quarterly precision tune" },
        ],
      },
      {
        icon: ShieldCheck,
        number: "03",
        title: "Asset Lifecycle & Local Spares Buffer",
        subtitle: "Serialized Inventory & Guaranteed Swaps",
        description:
          "Comprehensive asset tracking from warehouse receipt to decommission, backed by an active local spare parts buffer to ensure zero downtime during repairs.",
        engineeringDetails:
          "Maintains a minimum 5% active spares buffer (meters, batteries, gateway components, fittings) in regional depots. Serialized barcodes enable complete provenance tracking over 15+ years.",
        features: [
          "Serialized barcode & RFID asset tracking from intake to end-of-life",
          "Guaranteed local inventory buffer for rapid meter swap replacement",
          "Direct manufacturer warranty processing and factory calibration returns",
          "Environmentally responsible battery recycling and metal salvage handling",
        ],
        specsSummary: [
          { label: "Spares Buffer", value: "5% active inventory" },
          { label: "Provenance", value: "Complete Serial History" },
          { label: "Disposal", value: "Certified Green Recycling" },
        ],
      },
      {
        icon: Database,
        number: "04",
        title: "Mobile Field Service Management (FSM)",
        subtitle: "Cryptographic GPS Work Orders & Live QA",
        description:
          "Proprietary mobile application providing field technicians with interactive pipe schematics, step-by-step installation checklists, and digital signoffs.",
        engineeringDetails:
          "The mobile FSM app enforces strict validation checks: technicians must scan the meter barcode, capture GPS coordinates within 5 meters of target plumbing, and photograph the completed assembly before ticket closure.",
        features: [
          "GPS-verified check-in and tamper-proof cryptographic timestamping",
          "High-resolution pre- and post-installation photo validation archives",
          "Instant RF signal ping verification before leaving customer premises",
          "Live utility supervisor dashboard with progress metrics and QA scoring",
        ],
        specsSummary: [
          { label: "Verification", value: "GPS + Photo + Barcode" },
          { label: "Sync", value: "Real-time Offline/Online" },
          { label: "Utility Access", value: "Live Supervisor Portal" },
        ],
      },
    ],
    specCategories: [
      {
        category: "Service Level Commitments (SLAs)",
        items: [
          {
            parameter: "Priority 1 (Critical Burst / Outage)",
            value: "< 4 Hours on-site response time",
            standard: "Contractual SLA",
          },
          {
            parameter: "Priority 2 (Single Meter Malfunction)",
            value: "< 24 Hours on-site resolution",
            standard: "Standard SLA",
          },
          {
            parameter: "Priority 3 (Routine Maintenance / Survey)",
            value: "< 72 Hours scheduled execution",
            standard: "Planned Work",
          },
          {
            parameter: "Overall Asset Availability",
            value: "> 99.5% operational uptime across network",
            standard: "Monthly Verified",
          },
        ],
      },
      {
        category: "Field Workforce & Coverage",
        items: [
          {
            parameter: "Geographic Coverage",
            value: "Dhaka, Chittagong, Rajshahi, Khulna, Sylhet WASA regions",
            standard: "Nationwide",
          },
          {
            parameter: "Fleet Logistics",
            value: "Dedicated emergency response vehicles with onboard tooling",
            standard: "Company Owned",
          },
          {
            parameter: "Technician Certifications",
            value: "ISO 9001 QA, Confined Space Entry, Pipefitting Level 3",
            standard: "Certified",
          },
          {
            parameter: "Safety Benchmark",
            value: "Zero Lost-Time Incidents (LTI) protocol",
            standard: "OSHA Compliant",
          },
        ],
      },
      {
        category: "Quality Assurance & Calibration",
        items: [
          {
            parameter: "Calibration Equipment",
            value: "NIST-traceable portable ultrasonic reference flow meters",
            standard: "Certified Accurate",
          },
          {
            parameter: "Work Order Verification",
            value: "Triple verification (Barcode + Geo-tag + Photo evidence)",
            standard: "100% Audited",
          },
          {
            parameter: "Spare Parts Buffer",
            value: "Minimum 5% active hardware buffer in regional depots",
            standard: "Sovereign Stock",
          },
        ],
      },
    ],
    lifecycle: [
      {
        step: "01",
        phase: "Plumbing Inspection & Customer Outreach",
        timeframe: "Phase Initiation",
        detail:
          "Inspection of customer inlet piping, pipe metallurgy, isolation valve condition, access clearance, and advance scheduling with property owners.",
        deliverables: [
          "Pre-installation plumbing defect and hazard assessment report",
          "Customer appointment schedule and SMS notification queue",
          "Material requisition bill of quantities (BOQ) for pipe fittings",
        ],
      },
      {
        step: "02",
        phase: "Precision Retrofit & Digital QA Signoff",
        timeframe: "Installation Stage",
        detail:
          "Pipe cutting, fitting of non-return valves, ultrasonic meter installation, pressure leak testing, and digital work order completion on mobile FSM.",
        deliverables: [
          "Geo-stamped pre/post high-resolution photo archive",
          "Customer signed digital completion certificate",
          "Immediate RF packet link confirmation sent to NOC",
        ],
      },
      {
        step: "03",
        phase: "Algorithmic Health Surveillance",
        timeframe: "Continuous",
        detail:
          "Automated screening of daily consumption profiles, battery degradation curves, and reverse-flow indicators to detect developing faults before meter failure.",
        deliverables: [
          "Weekly automated predictive maintenance dispatch list",
          "Battery and signal link degradation risk score matrix",
          "Tamper and zero-consumption exception audit reports",
        ],
      },
      {
        step: "04",
        phase: "Rapid Corrective Repair & Asset Swap",
        timeframe: "SLA Guaranteed",
        detail:
          "Rapid dispatch of regional crews for physical meter swaps, pit rehabilitation, and valve maintenance within strict contractual SLA windows.",
        deliverables: [
          "Signed replacement job cards with old/new index reconciliation",
          "Decommissioned meter return to warehouse warranty buffer",
          "Updated asset registry synchronized with utility billing engine",
        ],
      },
    ],
    caseStudy: {
      client: "Metropolitan WASA Field Maintenance Contract",
      scope: "120,000 Connected Assets across 4 Urban Sectors",
      challenge:
        "High failure rate of contractor installations leading to frequent water leaks, unauthorized meter bypassing, and delayed resolution times averaging 14 days per ticket.",
      solution:
        "N3 Solutions deployed 8 dedicated regional engineering units utilizing mobile FSM digital job tracking, guaranteed 4-hour critical response, and a local 5% buffer inventory.",
      outcomes: [
        { metric: "< 3.2 Hrs", label: "Average Priority 1 Response" },
        { metric: "99.8%", label: "First-Time Installation Quality" },
        { metric: "0 Bypasses", label: "Undetected Tampering Cases" },
      ],
      summary:
        "By enforcing digital QA and full-time certified technician accountability, average ticket turnaround dropped from 14 days to under 18 hours while customer satisfaction metrics reached an all-time high of 98.4%.",
    },
    faqs: [
      {
        question: "How do you guarantee installation quality across thousands of dispersed homes?",
        answer:
          "Our mobile Field Service Management (FSM) platform prevents technicians from closing an installation ticket without capturing cryptographic GPS coordinates within 5 meters of target plumbing, scanning the barcode, and uploading clear pre- and post-installation photos. Furthermore, the meter must transmit a verified test packet to the NOC before the crew departs.",
      },
      {
        question: "What safety precautions are taken during underground pit maintenance?",
        answer:
          "All N3 field technicians are certified in OSHA-compliant confined-space entry procedures. Teams carry calibrated multi-gas detectors (O2, H2S, CO, LEL), forced-air ventilation blowers, and safety harnesses for any pit exceeding 1.2 meters depth.",
      },
      {
        question: "How are broken or defective meters handled during warranty periods?",
        answer:
          "N3 maintains an active 5% buffer inventory in regional depots. If a meter is identified as defective, our field crew immediately replaces it with a calibrated unit from the buffer, eliminating customer downtime. N3 handles all manufacturer warranty claims, factory returns, and recalibration logistics.",
      },
      {
        question: "Can N3 integrate with our existing utility customer service ticketing system?",
        answer:
          "Yes. Our FSM platform features bi-directional REST APIs that synchronize tickets with utility CRM systems (e.g. SAP, Salesforce, or custom WASA portals), automatically updating ticket status, technician notes, and completion timestamps in real time.",
      },
    ],
    securityHighlights: [
      {
        title: "GPS-Enforced Work Orders",
        desc: "Prevents fraudulent work signoffs by requiring cryptographic geolocation validation at the customer address.",
        icon: Lock,
      },
      {
        title: "Tamper-Proof Audit Logging",
        desc: "Every asset touch, meter swap, and configuration change is permanently logged with technician ID credentials.",
        icon: ShieldCheck,
      },
      {
        title: "Full Inventory Provenance",
        desc: "End-to-end chain of custody from warehouse loading to customer plumbing installation.",
        icon: Network,
      },
    ],
  },

  "emerging-technologies": {
    slug: "emerging-technologies",
    icon: CircuitBoard,
    title: "Emerging Technologies & Applied R&D",
    eyebrow: "Discipline 04 — Applied R&D",
    badge: "Applied AI & Next-Gen Sensing // Sandbox Tested",
    tagline:
      "Structured evaluation, laboratory prototyping, and field testing of urban infrastructure AI.",
    description:
      "We investigate, prototype, and rigorously field-test next-generation sensing, telemetry, and machine learning models before municipal deployment. From acoustic AI leak tomography to physics-informed hydraulic digital twins, we turn breakthrough technologies into reliable utility assets.",
    overviewNarrative: [
      "Emerging sensing and AI capabilities promise revolutionary improvements in urban infrastructure management. However, adopting unproven technologies directly on live public networks risks capital misallocation and service disruption.",
      "N3 Solutions bridges the gap between academic research and commercial utility operations. In our Dhaka Metrology Laboratory and controlled municipal sandbox testbeds, we subject new hardware and algorithms to rigorous physical, electrical, and environmental stress testing.",
      "Only technologies that meet our stringent multi-season reliability standards, open interoperability benchmarks, and clear return-on-investment thresholds are transitioned into production utility deployments.",
    ],
    metrics: [
      { value: "4 Active", label: "Research Sandboxes", subtext: "Live municipal testbeds" },
      { value: "Edge-AI", label: "Anomaly Engine", subtext: "Acoustic leak classification" },
      { value: "100%", label: "Empirical Validation", subtext: "Multi-season stress testing" },
      { value: "R&D Lab", label: "Dhaka Metrology Center", subtext: "Fluid calibration rigs" },
    ],
    pillars: [
      {
        icon: CircuitBoard,
        number: "01",
        title: "Acoustic AI Leak Tomography",
        subtitle: "Sub-Audible Vibration Machine Learning",
        description:
          "Non-invasive surface vibration sensors and hydrophones paired with convolutional neural networks to detect microscopic pipe fissures before surface rupture.",
        engineeringDetails:
          "Employs high-resolution 48 kHz piezoelectric accelerometers. Machine learning classifiers filter out ambient road traffic and urban seismic interference to isolate the specific acoustic signature of pressurized fluid escaping through pipe fissures.",
        features: [
          "High-frequency acoustic vibration profiling with autonomous urban noise filtering",
          "Cross-correlation algorithms for precise leak distance calculation along pipeline spans",
          "Permanent and lift-and-shift autonomous sensor node deployments",
          "Integrates directly with GIS pipe maps to prioritize high-risk pipe replacement",
        ],
        specsSummary: [
          { label: "Sampling Rate", value: "Up to 48 kHz" },
          { label: "Localization", value: "± 1.5m accuracy" },
          { label: "Noise Filter", value: "CNN Deep Learning" },
        ],
      },
      {
        icon: Cpu,
        number: "02",
        title: "Edge-AI Water Quality Telemetry",
        subtitle: "Real-Time Multiparameter Chemical Sensing",
        description:
          "Solid-state optical and electrochemical sensor probes measuring turbidity, residual chlorine, pH, and conductivity with on-chip anomaly classification.",
        engineeringDetails:
          "Combines multi-wavelength spectrophotometry with solid-state ion-selective electrodes. Edge microcontrollers execute lightweight anomaly detection models that trigger instant alarms upon chemical contamination events.",
        features: [
          "Reagentless optical sensors requiring minimal annual maintenance",
          "Autonomous calibration drift compensation based on temperature telemetry",
          "Instantaneous contamination event alerts transmitted over LPWAN",
          "Solar and in-pipe hydro-powered autonomous deployment options",
        ],
        specsSummary: [
          { label: "Parameters", value: "pH / Turbidity / Cl / Cond" },
          { label: "Maintenance", value: "6-12 month cycle" },
          { label: "Calibration", value: "Auto-compensated" },
        ],
      },
      {
        icon: Sparkles,
        number: "03",
        title: "Hydraulic Digital Twins & Neural Forecasting",
        subtitle: "Physics-Informed Real-Time Pressure Management",
        description:
          "Physics-informed neural networks simulating distribution network pressure, flow dynamics, and pump energy optimization under variable urban demand.",
        engineeringDetails:
          "Continuously ingests field telemetry from thousands of pressure and flow nodes. Simulates dynamic transient surges (water hammer) and recommends optimal PRV setpoints to reduce pipe stress without compromising consumer supply.",
        features: [
          "Real-time hydraulic model calibration from continuous field telemetry feeds",
          "Predictive pipe burst probability indexing based on age, pressure history, and soil data",
          "Automated pressure optimization recommendations to minimize background leakage",
          "Scenario simulation for network expansion, pipe shutdowns, and emergency rerouting",
        ],
        specsSummary: [
          { label: "Model Type", value: "Physics-Informed Neural" },
          { label: "Simulation", value: "Real-time & Predictive" },
          { label: "Energy Impact", value: "Up to 14% pump savings" },
        ],
      },
      {
        icon: Zap,
        number: "04",
        title: "Energy Harvesting & Self-Powered Sensors",
        subtitle: "Zero-Battery Subterranean Telemetry",
        description:
          "Investigation and deployment of in-pipe micro-turbines, thermoelectric generators, and solid-state batteries for self-sustaining subterranean monitoring.",
        engineeringDetails:
          "Extracts kinetic energy from internal water flow without causing measurable pressure drops. Generates continuous milliwatt power to operate high-frequency acoustic loggers indefinitely without battery replacement.",
        features: [
          "In-pipe kinetic micro-hydro turbines producing continuous trickle charging",
          "High-efficiency MPPT energy harvesting power management integrated circuits",
          "Solid-state supercapacitors with 100,000+ charge cycle longevity",
          "Enables continuous real-time sampling without battery life penalties",
        ],
        specsSummary: [
          { label: "Power Output", value: "50 mW to 500 mW" },
          { label: "Life Expectancy", value: "20+ Years" },
          { label: "Pressure Impact", value: "< 0.05 bar" },
        ],
      },
    ],
    specCategories: [
      {
        category: "R&D Benchmarking & Testing Rig",
        items: [
          {
            parameter: "Laboratory Facilities",
            value: "N3 Dhaka Metrology Testing Laboratory with closed-loop fluid rigs",
            standard: "Calibrated",
          },
          {
            parameter: "Flow Testing Capacity",
            value: "0.5 L/h to 150 m³/h with optical & gravimetric reference balances",
            standard: "ISO 4064",
          },
          {
            parameter: "Environmental Stress Testing",
            value: "Thermal chamber (-20°C to +85°C), Salt spray, IPX8 hydrostatic immersion",
            standard: "IEC 60068",
          },
          {
            parameter: "AI Inference Engine",
            value: "Edge: TensorFlow Lite / ARM CMSIS-NN; Cloud: PyTorch 2.0",
            standard: "Optimized",
          },
        ],
      },
      {
        category: "Piloting & Adoption Standards",
        items: [
          {
            parameter: "Evaluation Horizon",
            value: "Minimum 6 to 18-month multi-seasonal sandbox evaluation",
            standard: "Empirical",
          },
          {
            parameter: "Adoption Criteria",
            value: "> 99.5% reliability under monsoon flooding and power transients",
            standard: "Production Gate",
          },
          {
            parameter: "Interoperability",
            value: "Open API, OMA LwM2M, Modbus TCP, OPC-UA compliance",
            standard: "Vendor Neutral",
          },
          {
            parameter: "Cybersecurity Review",
            value: "Mandatory third-party penetration testing and source code audit",
            standard: "OWASP / NIST",
          },
        ],
      },
    ],
    lifecycle: [
      {
        step: "01",
        phase: "Theoretical Scoping & Lab Rig Benchmarking",
        timeframe: "Months 1 – 3",
        detail:
          "Rigorous testing in controlled fluid test rigs for accuracy, thermal drift, electronic component quality, and power consumption under extreme electrical transients.",
        deliverables: [
          "Laboratory accuracy and gravimetric calibration benchmark report",
          "Hardware schematic and component thermal stress analysis",
          "Interoperability and communication stack verification",
        ],
      },
      {
        step: "02",
        phase: "Controlled Municipal Sandbox Pilot",
        timeframe: "Months 4 – 9",
        detail:
          "Deployment in active municipal testbed sectors alongside traditional instrumentation to establish empirical baselines and validate machine learning accuracy.",
        deliverables: [
          "Empirical performance comparison against baseline reference sensors",
          "Machine learning model precision, recall, and false-positive audit",
          "Field durability assessment following heavy seasonal monsoon cycles",
        ],
      },
      {
        step: "03",
        phase: "Hardening & Industrial Packaging",
        timeframe: "Months 10 – 14",
        detail:
          "Refining firmware algorithms, optimizing power sleep cycles, redesigning mechanical enclosures for local field conditions, and developing utility SOPs.",
        deliverables: [
          "Industrialized enclosure design with IP68 certification",
          "Optimized firmware binary with secure OTA update capability",
          "Utility operator training manuals and maintenance protocols",
        ],
      },
      {
        step: "04",
        phase: "Turnkey Commercial Integration",
        timeframe: "Production Deployment",
        detail:
          "Packaging proven technologies into production-ready service offerings with guaranteed SLA contracts, spare parts pipelines, and full billing integration.",
        deliverables: [
          "Full commercial rollout schedule and supply chain guarantees",
          "Standardized API documentation for utility IT integration",
          "Long-term SLA performance and warranty agreements",
        ],
      },
    ],
    caseStudy: {
      client: "Acoustic AI Leak Localization Pilot",
      scope: "18 km Transmission Main in High-Noise Urban Corridor",
      challenge:
        "High traffic noise along major highway corridors masked pipe vibration, causing traditional acoustic listening sticks to miss underground leaks until major road cave-ins occurred.",
      solution:
        "N3 Solutions deployed 36 prototype acoustic vibration nodes running edge convolutional neural networks that autonomously filtered vehicle vibration frequencies.",
      outcomes: [
        { metric: "8 Leaks", label: "Identified Before Surface Inundation" },
        { metric: "± 1.2m", label: "Excavation Pinpoint Precision" },
        { metric: "$380k", label: "Estimated Damage Prevention" },
      ],
      summary:
        "The machine learning model accurately isolated 8 subterranean pipe fissures with zero false-positive excavation dispatches, enabling scheduled overnight repairs without disrupting metropolitan traffic.",
    },
    faqs: [
      {
        question: "How do you ensure emerging AI technologies don't generate false alarms?",
        answer:
          "Our AI models undergo multi-stage training using real field acoustic and hydraulic datasets collected across South Asian cities. We enforce a dual-verification threshold where edge anomaly detections are cross-correlated against downstream pressure loggers before generating utility dispatch alerts.",
      },
      {
        question:
          "Can our utility partner with N3 Solutions to test a specific research challenge?",
        answer:
          "Yes. We collaborate closely with public utilities, municipal development partners, and academic institutions to pilot novel sensing, water quality telemetry, and hydraulic optimization technologies tailored to specific regional challenges.",
      },
      {
        question:
          "What is the criteria for transitioning a technology from pilot to full commercial deployment?",
        answer:
          "A technology must demonstrate: (1) zero unrecoverable firmware locks over 6 months of continuous operation, (2) verified return on investment within 24 months, (3) full compliance with open communication protocols, and (4) proven durability against monsoon pit flooding.",
      },
    ],
    securityHighlights: [
      {
        title: "Encrypted Edge AI Models",
        desc: "Neural network weights and firmware code are cryptographically signed to prevent unauthorized code injection.",
        icon: Lock,
      },
      {
        title: "Isolated Sandbox Environments",
        desc: "R&D testbeds run in isolated network subnets, completely partitioned from live utility production billing systems.",
        icon: ShieldCheck,
      },
      {
        title: "Open API Standards",
        desc: "All emerging technology platforms adhere to open data interchange standards (JSON/REST, OPC-UA, MQTT).",
        icon: Network,
      },
    ],
  },
};
