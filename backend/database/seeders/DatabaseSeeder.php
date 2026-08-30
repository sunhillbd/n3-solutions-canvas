<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Page;
use App\Models\Service;
use App\Models\TeamMember;
use App\Models\Partner;
use App\Models\NewsPost;
use App\Models\Faq;
use App\Models\SiteSetting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Default Admin User for Filament
        User::firstOrCreate(
            ['email' => 'admin@n3solutions.com'],
            [
                'name' => 'N3 Solutions Admin',
                'password' => Hash::make('password123'),
            ]
        );

        // 2. Seed Services
        $services = [
            [
                'title' => 'Smart Water Metering',
                'slug' => 'smart-water-metering',
                'eyebrow' => 'Discipline 01 — Utility Infrastructure',
                'badge' => 'Billing-Grade Metrology // MID R400',
                'tagline' => 'Full-lifecycle metering programmes: procurement, static ultrasonic installation, hydraulic balancing, and verified consumption data for public utilities.',
                'short_description' => 'End-to-end metering programmes — from procurement and installation to billing-grade consumption data.',
                'description' => 'We engineer end-to-end advanced metering infrastructure (AMI) for municipal water authorities across South Asia. Our systems integrate static transit-time ultrasonic flow sensors, sub-GHz LPWAN communications, and District Metering Area (DMA) balance analytics to eliminate non-revenue water loss.',
                'icon' => 'Gauge',
                'metrics' => [
                    ['value' => '860,000+', 'label' => 'Addressable Endpoints', 'subtext' => 'Across 5 WASA utility zones'],
                    ['value' => 'MID R400', 'label' => 'Dynamic Range', 'subtext' => 'Low-flow capture < 1.0 L/h'],
                    ['value' => '15+ Yrs', 'label' => 'Battery Autonomy', 'subtext' => 'High-capacity Li-SOCl2 cell'],
                    ['value' => '99.94%', 'label' => 'Telemetry SLA', 'subtext' => 'Daily billing-grade reads'],
                ],
                'pillars' => [
                    [
                        'number' => '01',
                        'title' => 'Static Ultrasonic Metrology',
                        'subtitle' => 'No Moving Parts // Zero Mechanical Degradation',
                        'description' => 'Transit-time acoustic sensors maintain class-leading R400 dynamic measurement without accuracy loss from particulate matter, sediment, or air pockets.',
                        'features' => [
                            'Transit-time ultrasonic differential flow measurement',
                            'Starting flow threshold as low as 0.8 L/h for leak detection',
                            'Lead-free forged brass or composite PPS body options',
                            'Integrated reverse flow, burst, and empty pipe alarms',
                        ],
                    ],
                    [
                        'number' => '02',
                        'title' => 'Subterranean Long-Range Telemetry',
                        'subtitle' => 'Deep Indoor & Submerged Pit Penetration',
                        'description' => 'Sub-GHz LoRaWAN and NB-IoT transponders engineered with high link budgets (>154 dB) and IP68 continuous submersion ratings for flooded pits.',
                        'features' => [
                            'Dual-band LPWAN radios (AS923, EU868 & NB-IoT B8/B20)',
                            'IP68 vacuum-sealed casing tested at 3m continuous submersion',
                            'Pit-lid specialized composite antenna options',
                            'Encrypted over-the-air firmware (FOTA) update support',
                        ],
                    ],
                    [
                        'number' => '03',
                        'title' => 'DMA Hydraulic Balancing',
                        'subtitle' => 'Continuous Loss Demarcation & Minimum Night Flow',
                        'description' => 'Automated reconciliation between bulk transmission meters and consumer endpoints, isolating physical leaks from commercial losses.',
                        'features' => [
                            'Automated Minimum Night Flow (MNF) analysis (02:00-04:00)',
                            'District Metering Area (DMA) inflow vs consumption reconciliation',
                            'Acoustic vibration logger correlation for underground leaks',
                            'GIS heatmaps of localized pipe rupture risk scores',
                        ],
                    ],
                    [
                        'number' => '04',
                        'title' => 'MDMS & Billing Integration',
                        'subtitle' => 'Sovereign VEE Pipeline & Enterprise ERP Sync',
                        'description' => 'Meter Data Management System running automated Validation, Estimation, and Editing (VEE) connecting to SAP, Oracle, and legacy WASA billing systems.',
                        'features' => [
                            'High-throughput streaming ingestion pipeline',
                            'Automated 12-rule VEE data quality assurance engine',
                            'Turnkey connectors for SAP IS-U, Oracle CC&B, and SQL ERPs',
                            'Customer self-service portal and tamper notification API',
                        ],
                    ],
                ],
                'lifecycle_phases' => [
                    [
                        'step' => '01',
                        'phase' => 'Hydraulic Survey & DMA Demarcation',
                        'timeframe' => 'Weeks 1–4',
                        'detail' => 'Comprehensive topological pipe mapping, pressure zone modeling, GIS logging, and gateway line-of-sight propagation surveys.',
                    ],
                    [
                        'step' => '02',
                        'phase' => 'Pilot & Metrology Benchmarking',
                        'timeframe' => 'Weeks 5–8',
                        'detail' => 'Deployment of 1,000 pilot endpoints and localized gateways. Rigorous accuracy benchmarking and validation of ERP data pipelines.',
                    ],
                    [
                        'step' => '03',
                        'phase' => 'City-Scale Mass Deployment',
                        'timeframe' => 'Weeks 9–24',
                        'detail' => 'Zone-by-zone installation by certified field technicians using mobile digital work orders, barcode pairing, and GPS verification.',
                    ],
                    [
                        'step' => '04',
                        'phase' => 'Managed NOC & Field Operations',
                        'timeframe' => 'Multi-Year Concession',
                        'detail' => '24/7 telemetry monitoring, preventative maintenance dispatch, battery health forecasting, and contractual SLA reporting.',
                    ],
                ],
                'faqs' => [
                    [
                        'question' => 'How do static ultrasonic meters handle sediment and dirty water?',
                        'answer' => 'Unlike mechanical multi-jet or piston meters with impellers that clog or wear down from suspended solids, static ultrasonic meters contain no moving parts. They calculate flow using high-frequency acoustic transit-time differential signals, maintaining MID R400 accuracy class over 15+ years regardless of sediment.',
                    ],
                    [
                        'question' => 'Can the telemetry transmit from flooded, subterranean meter pits?',
                        'answer' => 'Yes. All meter bodies and radio transponders are hermetically sealed to IP68 standards (tested at 3-meter continuous submersion). We pair them with sub-GHz LPWAN radios (LoRaWAN/NB-IoT) with link budgets exceeding 154 dB and optional pit-lid composite antennas that transmit reliably through concrete and monsoon floodwaters.',
                    ],
                    [
                        'question' => 'How is data integrated into existing utility billing and ERP systems?',
                        'answer' => 'Our Meter Data Management System (MDMS) features standard connectors for SAP IS-U, Oracle CC&B, and custom WASA SQL databases. Data passes through automated Validation, Estimation & Editing (VEE) pipelines before syncing via secure REST APIs or scheduled SFTP batch exports.',
                    ],
                ],
                'section_toggles' => [
                    'show_hero' => true,
                    'show_metrics' => true,
                    'show_pillars' => true,
                    'show_roadmap' => true,
                    'show_faqs' => true,
                    'show_cta' => true,
                ],
                'seo' => [
                    'meta_title' => 'Smart Water Metering (AMI) — N3 Solutions Limited',
                    'meta_description' => 'Turnkey static ultrasonic smart water metering programmes, DMA hydraulic balancing, and managed utility operations.',
                ],
                'aeo' => [
                    'direct_answer' => 'N3 Solutions engineers utility-grade smart water metering (AMI) with static ultrasonic sensors, sub-GHz LPWAN connectivity, and 15-year battery autonomy to eliminate non-revenue water losses in municipal utilities.',
                    'key_entities' => ['Smart Water Metering', 'AMI', 'MID R400', 'LoRaWAN', 'Non-Revenue Water', 'Dhaka WASA'],
                ],
                'is_published' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'IoT Infrastructure',
                'slug' => 'iot-infrastructure',
                'eyebrow' => 'Discipline 02 — Network & Telemetry',
                'badge' => 'Carrier-Grade LPWAN // Sub-GHz',
                'tagline' => 'Private wireless networks, multi-channel gateways and resilient telemetry platforms engineered for utility-grade reliability and multi-decade service life.',
                'short_description' => 'Low-power wide-area networks, gateways and telemetry platforms engineered for utility-grade reliability.',
                'description' => 'We design, build, and operate private, carrier-grade Low-Power Wide-Area Networks (LPWAN) purpose-built for public utilities and smart city infrastructure. Our networks ensure high packet delivery ratios even in dense urban topographies and flooded subterranean chambers.',
                'icon' => 'RadioTower',
                'metrics' => [
                    ['value' => '99.95%', 'label' => 'Network Uptime SLA', 'subtext' => 'Carrier-grade gateway redundancy'],
                    ['value' => '>154 dB', 'label' => 'Radio Link Budget', 'subtext' => 'Deep indoor & pit coverage'],
                    ['value' => '< 50ms', 'label' => 'Message Ingestion', 'subtext' => 'Real-time telemetry broker'],
                    ['value' => 'AES-128', 'label' => 'Cryptographic Standard', 'subtext' => 'End-to-end payload security'],
                ],
                'pillars' => [
                    [
                        'number' => '01',
                        'title' => 'Private LPWAN Network Architecture',
                        'subtitle' => 'High-Density Base Stations & Solar Backup',
                        'description' => 'High-gain 8-channel and 16-channel SX1303/SX1302 outdoor gateways deployed with 72-hour battery/solar backup.',
                        'features' => [
                            '8/16-channel concurrent LoRaWAN demodulation',
                            'Integrated 4G/5G and Ethernet backhaul failover',
                            '72-hour lithium battery & solar charge backup',
                            'Lightning surge protection and IP67 rugged aluminum chassis',
                        ],
                    ],
                    [
                        'number' => '02',
                        'title' => 'Telemetry Processing Engine',
                        'subtitle' => 'High-Throughput Message Broker',
                        'description' => 'Cloud and on-premise telemetry platform capable of ingesting millions of packet payloads daily with sub-second message queuing.',
                        'features' => [
                            'Distributed Apache Kafka message broker',
                            'Real-time packet deduplication and CRC error rejection',
                            'Adaptive Data Rate (ADR) radio parameter optimization',
                            'Direct webhook and REST API event streaming',
                        ],
                    ],
                ],
                'lifecycle_phases' => [
                    [
                        'step' => '01',
                        'phase' => 'RF Propagation Study & Tower Audit',
                        'timeframe' => 'Weeks 1–3',
                        'detail' => 'Detailed 3D ray-tracing radio propagation modeling and structural tower site accessibility surveys.',
                    ],
                    [
                        'step' => '02',
                        'phase' => 'Gateway Deployment & Tuning',
                        'timeframe' => 'Weeks 4–8',
                        'detail' => 'Physical installation of outdoor gateways, high-gain antennas, and dual backhaul cellular connections.',
                    ],
                    [
                        'step' => '03',
                        'phase' => 'End-Device Provisioning & Join QA',
                        'timeframe' => 'Weeks 9–16',
                        'detail' => 'Cryptographic device onboarding using secure AppEUI and AppKey provisioning with 100% packet verification.',
                    ],
                    [
                        'step' => '04',
                        'phase' => '24/7 Managed NOC Operations',
                        'timeframe' => 'Continuous SLA',
                        'detail' => 'Continuous radio link health monitoring, automated interference mitigation, and hardware swap warranties.',
                    ],
                ],
                'faqs' => [
                    [
                        'question' => 'Why choose private LPWAN over cellular NB-IoT SIM cards?',
                        'answer' => 'Private LPWAN eliminates recurring monthly telco SIM data fees across hundreds of thousands of municipal endpoints. It provides complete sovereignty over network coverage, deep subterranean penetration, and extended 15+ year battery lifespan without operator dependency.',
                    ],
                ],
                'section_toggles' => [
                    'show_hero' => true,
                    'show_metrics' => true,
                    'show_pillars' => true,
                    'show_roadmap' => true,
                    'show_faqs' => true,
                    'show_cta' => true,
                ],
                'seo' => [
                    'meta_title' => 'IoT Infrastructure & LPWAN Networks — N3 Solutions Limited',
                    'meta_description' => 'Carrier-grade LPWAN networks, SX1303 gateways, and sovereign telemetry platforms engineered for utilities.',
                ],
                'is_published' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'Field Operations & Maintenance',
                'slug' => 'field-operations',
                'eyebrow' => 'Discipline 03 — Operational Assurance',
                'badge' => 'SLA-Backed Execution // Regional Hubs',
                'tagline' => 'Deployed regional engineering teams, digital work-order lifecycle management, and service levels held to measurable, contractual uptime targets.',
                'short_description' => 'Deployed regional teams, asset lifecycle management and service levels held to measurable uptime targets.',
                'description' => 'Infrastructure reliability requires disciplined human execution. N3 Solutions maintains full-time regional field hubs across Bangladesh with dedicated tooling, calibration rigs, and certified technicians.',
                'icon' => 'Wrench',
                'metrics' => [
                    ['value' => '5 Hubs', 'label' => 'Regional Operating Bases', 'subtext' => 'Dhaka, Ctg, Rajshahi, Khulna, Sylhet'],
                    ['value' => '< 4 Hrs', 'label' => 'Critical Fault Response', 'subtext' => 'Contractual field ticket SLA'],
                    ['value' => '100%', 'label' => 'GPS Logged Audits', 'subtext' => 'Cryptographic photo verification'],
                    ['value' => '5% Buffer', 'label' => 'Spares Stocked Locally', 'subtext' => 'Zero supply-chain delay'],
                ],
                'pillars' => [
                    [
                        'number' => '01',
                        'title' => 'Mobile Field Service Management',
                        'subtitle' => 'GPS-Verified Digital Work Orders',
                        'description' => 'Technicians execute installations and maintenance via digital workflows with mandatory barcode scans, GPS coordinates, and photographic QA.',
                        'features' => [
                            'Offline-first mobile application for field engineers',
                            'Barcode and QR optical meter serial binding',
                            'Pre- and post-installation pressure and flow verification',
                            'Automated customer acknowledgment signature capture',
                        ],
                    ],
                ],
                'lifecycle_phases' => [
                    [
                        'step' => '01',
                        'phase' => 'Field Hub Mobilization & Spares Staging',
                        'timeframe' => 'Weeks 1–4',
                        'detail' => 'Establishment of localized regional depots, tooling calibration, and technician OSHA safety certification.',
                    ],
                    [
                        'step' => '02',
                        'phase' => 'Rollout Dispatch & Quality Audits',
                        'timeframe' => 'Phase Deployment',
                        'detail' => 'Daily automated dispatch routing and 10% random supervisor quality re-inspections.',
                    ],
                    [
                        'step' => '03',
                        'phase' => 'Preventative Maintenance & Health Checks',
                        'timeframe' => 'Quarterly Cycles',
                        'detail' => 'Battery discharge profiling, physical pit inspections, and acoustic leak check rounds.',
                    ],
                    [
                        'step' => '04',
                        'phase' => 'Corrective SLA Response & Spares Buffer',
                        'timeframe' => '24/7 Standby',
                        'detail' => 'Immediate dispatch for tampers, zero-flow anomalies, and physical pipe fractures within contractual SLAs.',
                    ],
                ],
                'faqs' => [
                    [
                        'question' => 'How do you prevent fraudulent or improper meter installations?',
                        'answer' => 'Every single installation requires our mobile FSM software: technicians must scan the meter 2D barcode, capture cryptographic GPS timestamps, photograph the meter dials and seal joints, and log hydraulic pressure before closing the work order.',
                    ],
                ],
                'section_toggles' => [
                    'show_hero' => true,
                    'show_metrics' => true,
                    'show_pillars' => true,
                    'show_roadmap' => true,
                    'show_faqs' => true,
                    'show_cta' => true,
                ],
                'seo' => [
                    'meta_title' => 'Field Operations & SLA Maintenance — N3 Solutions Limited',
                    'meta_description' => 'Contractual field engineering, digital FSM dispatch, and regional asset maintenance across Bangladesh.',
                ],
                'is_published' => true,
                'sort_order' => 3,
            ],
            [
                'title' => 'Emerging Technologies',
                'slug' => 'emerging-technologies',
                'eyebrow' => 'Discipline 04 — Applied R&D',
                'badge' => 'Acoustic AI // Edge Computing',
                'tagline' => 'Structured evaluation, piloting and deployment of acoustic AI leak detection, water quality probes, and energy telemetry for smart city grids.',
                'short_description' => 'Applied research into energy, mobility and environmental sensing as our infrastructure platform extends.',
                'description' => 'We rigorously evaluate emerging sensing technologies, testing hardware under real-world municipal conditions before qualifying them for mass utility deployment.',
                'icon' => 'CircuitBoard',
                'metrics' => [
                    ['value' => '4 Stages', 'label' => 'Validation Gate Criteria', 'subtext' => 'Lab, sandbox, pilot, production'],
                    ['value' => '±0.5m', 'label' => 'Acoustic AI Precision', 'subtext' => 'Pipe fissure localization'],
                    ['value' => '6 In-Line', 'label' => 'Water Quality Metrics', 'subtext' => 'pH, turbidity, chlorine, DO, etc.'],
                    ['value' => 'Edge ML', 'label' => 'On-Device Processing', 'subtext' => 'Anomaly detection without latency'],
                ],
                'pillars' => [
                    [
                        'number' => '01',
                        'title' => 'Acoustic Leak Correlation AI',
                        'subtitle' => 'Micro-Vibration Spectral Analysis',
                        'description' => 'High-frequency vibration sensors attached to pipe fittings identify spectral leak signatures before surface eruption occurs.',
                        'features' => [
                            'Edge machine learning filtering environmental traffic noise',
                            'Differential arrival time correlation for pinpointing leak distance',
                            'Automated classification of crack types and orifice size estimates',
                        ],
                    ],
                ],
                'lifecycle_phases' => [
                    [
                        'step' => '01',
                        'phase' => 'Laboratory & Environmental Chamber Testing',
                        'timeframe' => 'Weeks 1–4',
                        'detail' => 'Thermal cycling, pressure burst testing, and radio harmonic analysis.',
                    ],
                    [
                        'step' => '02',
                        'phase' => 'Municipal Sandbox Live Pilot',
                        'timeframe' => 'Weeks 5–12',
                        'detail' => 'Deployment in a controlled utility distribution sector alongside existing baseline equipment.',
                    ],
                    [
                        'step' => '03',
                        'phase' => 'Performance & ROI Quantification',
                        'timeframe' => 'Weeks 13–16',
                        'detail' => 'Data veracity audit, battery longevity modeling, and lifecycle cost analysis.',
                    ],
                    [
                        'step' => '04',
                        'phase' => 'Turnkey Scaling & Operational Handover',
                        'timeframe' => 'Scale Phase',
                        'detail' => 'Full integration into standard utility work order and MDMS billing software.',
                    ],
                ],
                'faqs' => [
                    [
                        'question' => 'How does N3 decide when a new technology is ready for production?',
                        'answer' => 'We enforce a strict 4-stage stage-gate process: (1) Laboratory chamber validation, (2) Municipal sandbox pilot, (3) Empirical metrology benchmarking, and (4) Turnkey integration sign-off with utility stakeholders.',
                    ],
                ],
                'section_toggles' => [
                    'show_hero' => true,
                    'show_metrics' => true,
                    'show_pillars' => true,
                    'show_roadmap' => true,
                    'show_faqs' => true,
                    'show_cta' => true,
                ],
                'seo' => [
                    'meta_title' => 'Emerging Technologies & Acoustic AI — N3 Solutions Limited',
                    'meta_description' => 'Acoustic AI leak detection, multi-parameter water quality probes, and smart city telemetry.',
                ],
                'is_published' => true,
                'sort_order' => 4,
            ],
        ];

        foreach ($services as $svc) {
            Service::updateOrCreate(['slug' => $svc['slug']], $svc);
        }

        // 3. Seed Team Members
        $team = [
            [
                'name' => 'Nafis Rahman',
                'role' => 'Managing Director',
                'category' => 'executive',
                'credential' => 'Infrastructure Delivery, 18+ Years',
                'bio' => 'Over 18 years spearheading national-scale infrastructure delivery, public-private utility partnerships, and public sector engineering programmes in South Asia.',
                'initials' => 'NR',
                'show_on_home' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Naveed Hasan',
                'role' => 'Director, Technology',
                'category' => 'executive',
                'credential' => 'IoT Systems & Network Engineering',
                'bio' => 'Specialist in embedded RF systems, sub-GHz wireless propagation, MDMS data pipelines, and carrier-grade LPWAN telecommunication infrastructure.',
                'initials' => 'NH',
                'show_on_home' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Nusrat Karim',
                'role' => 'Director, Operations',
                'category' => 'executive',
                'credential' => 'Utility Programme Management',
                'bio' => 'Expert in large-scale workforce deployment, regional WASA field logistics, quality assurance compliance, and contractual SLA governance.',
                'initials' => 'NK',
                'show_on_home' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Head of Metrology & Quality Assurance',
                'role' => 'Functional Engineering Lead',
                'category' => 'functional_lead',
                'credential' => 'ISO 4064 Calibration Specialist',
                'bio' => 'ISO 4064 testing, ultrasonic flow calibration rigs, and factory conformance audits.',
                'initials' => 'QA',
                'show_on_home' => false,
                'sort_order' => 4,
            ],
            [
                'name' => 'Lead RF & Network Systems Architect',
                'role' => 'Functional Engineering Lead',
                'category' => 'functional_lead',
                'credential' => 'Sub-GHz Propagation Specialist',
                'bio' => 'Base station link-budget design, antenna mast rigging, and spectrum regulatory compliance.',
                'initials' => 'RF',
                'show_on_home' => false,
                'sort_order' => 5,
            ],
            [
                'name' => 'Regional Field Operations Manager',
                'role' => 'Functional Engineering Lead',
                'category' => 'functional_lead',
                'credential' => 'WASA Field Logistics Lead',
                'bio' => 'Coordination of regional field engineering units across Dhaka and Chittagong WASA zones.',
                'initials' => 'FO',
                'show_on_home' => false,
                'sort_order' => 6,
            ],
            [
                'name' => 'Principal MDMS & Software Engineer',
                'role' => 'Functional Engineering Lead',
                'category' => 'functional_lead',
                'credential' => 'Utility ERP Data Architect',
                'bio' => 'Validation, estimation & editing (VEE) pipelines and direct utility billing ERP integration.',
                'initials' => 'SE',
                'show_on_home' => false,
                'sort_order' => 7,
            ],
        ];

        foreach ($team as $t) {
            TeamMember::updateOrCreate(['name' => $t['name']], $t);
        }

        // 4. Seed Partners
        $partners = [
            ['name' => 'Dhaka WASA', 'category' => 'utility_authority', 'collaboration_detail' => 'Priority distribution zones and commercial consumer telemetry', 'is_featured' => true, 'sort_order' => 1],
            ['name' => 'Chittagong WASA', 'category' => 'utility_authority', 'collaboration_detail' => 'Metropolitan network metering & non-revenue water recovery', 'is_featured' => true, 'sort_order' => 2],
            ['name' => 'Rajshahi WASA', 'category' => 'utility_authority', 'collaboration_detail' => 'District Metered Area (DMA) pilot instrumentation', 'is_featured' => true, 'sort_order' => 3],
            ['name' => 'Khulna & Sylhet WASA', 'category' => 'utility_authority', 'collaboration_detail' => 'Feasibility studies and hydraulic zone demarcation', 'is_featured' => false, 'sort_order' => 4],
            ['name' => 'Ultrasonic Metrology Partners', 'category' => 'metrology_oem', 'collaboration_detail' => 'MID R400 class static flow measurement with 15-year battery autonomy', 'is_featured' => true, 'sort_order' => 5],
            ['name' => 'Acoustic & Vibration Sensor Manufacturers', 'category' => 'metrology_oem', 'collaboration_detail' => 'Underground pipe fissure and leak correlation acoustic nodes', 'is_featured' => false, 'sort_order' => 6],
            ['name' => 'Water Quality Multivariable Sensor OEMs', 'category' => 'metrology_oem', 'collaboration_detail' => 'In-line pH, turbidity, dissolved oxygen, and chlorine monitoring', 'is_featured' => false, 'sort_order' => 7],
            ['name' => 'Submersible Pit Antenna Specialists', 'category' => 'metrology_oem', 'collaboration_detail' => 'IP68 composite pit-lid antennas engineered for high attenuation environments', 'is_featured' => false, 'sort_order' => 8],
            ['name' => 'LoRa Alliance Ecosystem', 'category' => 'telecom_iot', 'collaboration_detail' => 'SX1303 multi-channel carrier gateways and open-standard protocols', 'is_featured' => true, 'sort_order' => 9],
            ['name' => 'National Cellular Operators', 'category' => 'telecom_iot', 'collaboration_detail' => 'Licensed spectrum NB-IoT and LTE-M dedicated APN interconnects', 'is_featured' => false, 'sort_order' => 10],
            ['name' => 'Sovereign Cloud & Data Centers', 'category' => 'telecom_iot', 'collaboration_detail' => 'Local tier-3 data centers ensuring in-country utility data residency', 'is_featured' => false, 'sort_order' => 11],
            ['name' => 'Enterprise ERP Integrators', 'category' => 'telecom_iot', 'collaboration_detail' => 'Standard connectors for SAP IS-U, Oracle CC&B, and utility billing systems', 'is_featured' => false, 'sort_order' => 12],
            ['name' => 'World Bank / IDA Guidelines', 'category' => 'multilateral_institution', 'collaboration_detail' => 'Conformance to NRW reduction and public procurement benchmarks', 'is_featured' => true, 'sort_order' => 13],
            ['name' => 'Asian Development Bank (ADB)', 'category' => 'multilateral_institution', 'collaboration_detail' => 'Urban infrastructure modernization and climate adaptation frameworks', 'is_featured' => false, 'sort_order' => 14],
            ['name' => 'JICA Technical Standards', 'category' => 'multilateral_institution', 'collaboration_detail' => 'Hydraulic modeling and sustainable water utility management practices', 'is_featured' => false, 'sort_order' => 15],
            ['name' => 'National Infrastructure Funds', 'category' => 'multilateral_institution', 'collaboration_detail' => 'Public-private partnership (PPP) and DBFOM delivery mechanisms', 'is_featured' => false, 'sort_order' => 16],
        ];

        foreach ($partners as $p) {
            Partner::updateOrCreate(['name' => $p['name']], $p);
        }

        // 5. Seed News Posts
        $news = [
            [
                'title' => 'N3 Solutions Limited formally incorporated in Dhaka',
                'slug' => 'n3-solutions-incorporated-dhaka',
                'published_date_text' => '12 August 2026',
                'summary' => 'The company is established to deliver metering and IoT infrastructure programmes for public utilities.',
                'content' => 'N3 Solutions Limited has formally established its headquarters in Gulshan, Dhaka, bringing together utility infrastructure specialists, IoT radio frequency engineers, and metrology experts to modernize municipal infrastructure across Bangladesh.',
                'published_at' => now()->subDays(18),
            ],
            [
                'title' => 'Partnership proposal submitted to Chittagong WASA',
                'slug' => 'partnership-proposal-chittagong-wasa',
                'published_date_text' => '27 July 2026',
                'summary' => 'A phased smart metering deployment covering priority distribution zones across the metropolitan network.',
                'content' => 'N3 Solutions has presented a turnkey District Metering Area (DMA) and AMI proposal to Chittagong WASA aimed at recovering non-revenue water and providing automated consumer billing.',
                'published_at' => now()->subDays(34),
            ],
            [
                'title' => 'Insight: reducing non-revenue water in South Asian utilities',
                'slug' => 'insight-reducing-non-revenue-water',
                'published_date_text' => '09 July 2026',
                'summary' => 'How district metering and continuous telemetry convert distribution losses into recoverable revenue.',
                'content' => 'A comprehensive technical overview explaining how ultrasonic flow metrology, minimum night flow analytics, and carrier-grade LPWAN networks pinpoint physical pipeline fissures.',
                'published_at' => now()->subDays(52),
            ],
        ];

        foreach ($news as $n) {
            NewsPost::updateOrCreate(['slug' => $n['slug']], $n);
        }

        // 6. Seed Homepage FAQs
        $faqs = [
            [
                'question' => 'What specific infrastructure programmes does N3 Solutions engineer?',
                'answer' => 'N3 Solutions designs, deploys, and maintains four integrated capability disciplines for public utilities and smart cities: (1) Smart Water Metering (AMI) with static ultrasonic meters, (2) IoT Infrastructure with private carrier-grade LPWAN networks, (3) Regional Field Operations & Maintenance with SLA-backed guarantees, and (4) Applied Emerging Technologies for acoustic AI leak detection and water quality telemetry.',
                'placement' => 'homepage',
                'sort_order' => 1,
            ],
            [
                'question' => 'How does N3 Solutions help utilities reduce Non-Revenue Water (NRW)?',
                'answer' => 'We implement District Metering Area (DMA) zoning that reconciles real-time bulk transmission inflow against aggregated consumer smart meter readings. By analyzing continuous Minimum Night Flow (MNF) between 02:00 and 04:00 alongside acoustic vibration loggers, our software pinpoints underground pipeline fissures and unmetered commercial consumption, converting distribution losses into recoverable billing revenue.',
                'placement' => 'homepage',
                'sort_order' => 2,
            ],
            [
                'question' => 'What delivery model do you use for large-scale municipal rollouts?',
                'answer' => 'We provide turnkey, end-to-end delivery models including DBFOM (Design, Build, Finance, Operate, Maintain) and Managed Services. N3 assumes direct responsibility for hardware procurement, RF network design, physical pipe installation, digital work order QA, MDMS billing integration, and multi-year 24/7 SLA maintenance.',
                'placement' => 'homepage',
                'sort_order' => 3,
            ],
            [
                'question' => 'How are smart meters read when installed in deep or flood-prone subterranean pits?',
                'answer' => 'Our static ultrasonic meters are hermetically sealed to IP68 standards (tested for continuous 3-meter underwater submersion). We utilize sub-GHz radio frequencies (868/923 MHz) and ruggedized pit-lid composite antennas that maintain link budgets exceeding 154 dB, ensuring 99.9%+ packet delivery even during severe monsoon inundation.',
                'placement' => 'homepage',
                'sort_order' => 4,
            ],
            [
                'question' => 'How does N3 ensure compatibility with existing utility billing and ERP systems?',
                'answer' => 'Our Meter Data Management System (MDMS) features enterprise connectors for SAP IS-U, Oracle CC&B, and custom WASA SQL billing databases. Data is ingested via high-throughput Apache Kafka pipelines, validated through automated VEE rules, and delivered via secure REST APIs or automated SFTP batch export.',
                'placement' => 'homepage',
                'sort_order' => 5,
            ],
            [
                'question' => 'What regional coverage and field capacity does N3 maintain across Bangladesh?',
                'answer' => 'N3 maintains active operating hubs and certified full-time field engineering teams across Dhaka, Chittagong, Rajshahi, Khulna, and Sylhet WASA jurisdictions. Each hub maintains a dedicated vehicle fleet, calibration rigs, and a minimum 5% active local spare parts buffer for rapid SLA response.',
                'placement' => 'homepage',
                'sort_order' => 6,
            ],
        ];

        foreach ($faqs as $f) {
            Faq::updateOrCreate(['question' => $f['question']], $f);
        }

        // 7. Seed Pages (Home, About, Mission/Vision, Team, Partners, Contact)
        $pages = [
            [
                'title' => 'Home',
                'slug' => '/',
                'template' => 'home',
                'is_published' => true,
                'section_toggles' => [
                    'show_hero' => true,
                    'show_stats_bar' => true,
                    'show_capabilities' => true,
                    'show_about_teaser' => true,
                    'show_team_teaser' => true,
                    'show_newsroom' => true,
                    'show_faqs' => true,
                    'show_cta' => true,
                ],
                'content' => [
                    'hero_eyebrow' => 'N3 Solutions Limited',
                    'hero_title' => 'Engineering the infrastructure behind smarter cities',
                    'hero_subtitle' => 'We design, deploy and maintain metering and IoT infrastructure for utilities and public institutions — measured, connected and built to run at national scale.',
                    'hero_cta_text' => 'Start a conversation',
                    'hero_cta_link' => '/contact',
                    'hero_secondary_cta_text' => 'Explore our capabilities',
                    'hero_secondary_cta_link' => '#capabilities',
                    'stats' => [
                        ['value' => '860,000+', 'label' => 'Addressable metering points', 'subtext' => 'Across 5 WASA utility zones'],
                        ['value' => '5', 'label' => 'WASA regions in scope', 'subtext' => 'Dhaka, Ctg, Rajshahi, Khulna, Sylhet'],
                        ['value' => '$191M', 'label' => 'Identified market opportunity', 'subtext' => 'National metering upgrade'],
                        ['value' => '24/7', 'label' => 'Monitored network operations', 'subtext' => 'Continuous telemetry uptime'],
                    ],
                    'capabilities_eyebrow' => 'Capabilities',
                    'capabilities_title' => 'Four disciplines, one delivery model',
                    'about_eyebrow' => 'About N3 Solutions',
                    'about_title' => 'A national metering upgrade, delivered zone by zone',
                    'about_text' => 'Water utilities across Bangladesh lose a material share of supply before it is ever billed. Our phased programme instruments distribution networks with connected meters, district-level telemetry and a maintained field organisation — converting unmeasured supply into accountable, recoverable revenue.',
                    'about_stats' => [
                        ['v' => '32%', 'l' => 'Average non-revenue water in scope regions'],
                        ['v' => '5', 'l' => 'WASA authorities engaged'],
                        ['v' => '860k', 'l' => 'Metering points addressable'],
                    ],
                    'about_cta_text' => 'About our organisation',
                    'about_cta_link' => '/about',
                    'team_eyebrow' => 'Leadership',
                    'team_title' => 'Founding partners',
                    'news_eyebrow' => 'Newsroom',
                    'news_title' => 'Latest updates',
                    'faq_eyebrow' => 'Frequently Asked Questions',
                    'faq_title' => 'Utility infrastructure & delivery',
                    'faq_subtitle' => 'Key questions on our deployment models, technology specifications, and regional operational capacity.',
                    'cta_title' => "Let's build the infrastructure Bangladesh needs",
                    'cta_subtitle' => 'Speak with our team about metering programmes, network deployment and long-term operations.',
                    'cta_button_text' => 'Get in touch',
                    'cta_button_link' => '/contact',
                ],
                'seo' => [
                    'meta_title' => 'N3 Solutions Limited — Infrastructure & IoT Engineering',
                    'meta_description' => 'N3 Solutions Limited engineers smart water metering, IoT infrastructure and field operations for utilities and public infrastructure at national scale.',
                ],
                'aeo' => [
                    'direct_answer' => 'N3 Solutions Limited is a specialized infrastructure and technology firm in Bangladesh engineering turnkey smart water metering, private LPWAN IoT networks, and SLA-backed utility field operations.',
                    'key_entities' => ['N3 Solutions Limited', 'Smart Water Metering', 'IoT Infrastructure', 'WASA Bangladesh', 'Non-Revenue Water'],
                ],
            ],
            [
                'title' => 'About Us',
                'slug' => 'about',
                'template' => 'about',
                'is_published' => true,
                'section_toggles' => [
                    'show_hero' => true,
                    'show_stats_bar' => true,
                    'show_who_we_are' => true,
                    'show_timeline' => true,
                    'show_cta' => true,
                ],
                'content' => [
                    'hero_eyebrow' => 'Company Overview',
                    'hero_title' => 'Engineering the infrastructure behind smarter utilities',
                    'hero_subtitle' => 'N3 Solutions Limited is an infrastructure and technology engineering firm based in Dhaka, Bangladesh. We design, deploy, and maintain the metering, connectivity, and field operations that public utilities depend on — at national scale, to measurable standards.',
                    'hero_cta_text' => 'Start a conversation',
                    'hero_cta_link' => '/contact',
                    'stats' => [
                        ['value' => '2019', 'label' => 'Founded in Dhaka', 'subtext' => 'Utility IoT focus'],
                        ['value' => '5', 'label' => 'WASA regions in scope', 'subtext' => 'Nationwide presence'],
                        ['value' => '860,000+', 'label' => 'Target metering endpoints', 'subtext' => 'Municipal networks'],
                        ['value' => '24/7', 'label' => 'Monitored network operations', 'subtext' => 'Managed NOC'],
                    ],
                    'who_we_are_eyebrow' => 'Identity & Focus',
                    'who_we_are_title' => 'Built for the long term, measured by reliability',
                    'who_we_are_text_1' => 'We work where precision engineering meets public responsibility. Our teams deploy smart water metering, low-power IoT networks, and managed field operations for utilities and government stakeholders — programmes measured in hundreds of thousands of endpoints and decades of service life.',
                    'who_we_are_text_2' => 'We are deliberately structured for long-term operational resilience: in-house metrology engineering, full-time regional field teams, and supply-chain partnerships with tier-one global manufacturers. Reliability is not a feature of our work; it is the work.',
                    'principles' => [
                        [
                            'icon' => 'Compass',
                            'title' => 'Engineered, not improvised',
                            'body' => 'Every programme begins with precise measurement, rigorous metrology specification, and a deployment plan that survives contact with challenging field conditions.',
                        ],
                        [
                            'icon' => 'ShieldCheck',
                            'title' => 'Accountable delivery',
                            'body' => 'Service levels, packet delivery rates, and field response obligations are contractual and SLA-backed — never aspirational.',
                        ],
                        [
                            'icon' => 'Building2',
                            'title' => 'Built for public infrastructure',
                            'body' => 'We design and deploy for utilities, municipalities, and government stakeholders where reliability is a critical public obligation.',
                        ],
                    ],
                    'timeline_eyebrow' => 'Company Trajectory',
                    'timeline_title' => 'A measured, disciplined expansion',
                    'milestones' => [
                        ['year' => '2019', 'event' => 'N3 Solutions Limited founded in Dhaka with a focus on utility IoT.'],
                        ['year' => '2021', 'event' => 'First private carrier-grade LPWAN telemetry deployment commissioned.'],
                        ['year' => '2023', 'event' => 'Regional field operations expanded to cover five major WASA regions.'],
                        ['year' => '2025', 'event' => 'Smart metering programme scoped across 860,000+ municipal endpoints.'],
                    ],
                    'cta_title' => 'Scope a programme with our engineers.',
                    'cta_subtitle' => 'Tell us about your infrastructure objectives and we will respond with a considered technical assessment.',
                    'cta_button_text' => 'Get in touch',
                    'cta_button_link' => '/contact',
                ],
                'seo' => [
                    'meta_title' => 'About Us — N3 Solutions Limited',
                    'meta_description' => 'A technology and infrastructure company engineering metering, IoT and field operations for public utilities at national scale.',
                ],
                'aeo' => [
                    'direct_answer' => 'Founded in 2019 in Dhaka, N3 Solutions Limited is an infrastructure technology firm delivering utility-scale smart metering and field telemetry across 5 WASA regions in Bangladesh.',
                    'key_entities' => ['N3 Solutions Limited', 'Dhaka WASA', 'Public Infrastructure', 'Metrology'],
                ],
            ],
            [
                'title' => 'Our Mission & Vision',
                'slug' => 'about/mission-vision',
                'template' => 'mission_vision',
                'is_published' => true,
                'section_toggles' => [
                    'show_hero' => true,
                    'show_mission_vision_boxes' => true,
                    'show_values_grid' => true,
                    'show_cta' => true,
                ],
                'content' => [
                    'hero_eyebrow' => 'Purpose & Strategic Intent',
                    'hero_title' => 'Our Mission & Vision',
                    'hero_subtitle' => 'We exist to build the foundational metrology and connectivity infrastructure that allows public utilities to eliminate losses, achieve financial sustainability, and serve citizens reliably.',
                    'mission_title' => 'Our Mission',
                    'mission_text' => "To modernize Bangladesh's public utility networks by deploying turnkey smart water metering and carrier-grade IoT infrastructure — backed by rigorous metrology, contractual SLA guarantees, and deployed regional field engineering teams.",
                    'vision_title' => 'Our Vision',
                    'vision_text' => 'To establish Bangladesh as a regional benchmark for utility efficiency across South Asia, where zero non-revenue water is lost to unmeasured leaks, every drop is accounted for, and municipal systems operate autonomously with 99.9%+ digital assurance.',
                    'values_eyebrow' => 'Operating Principles',
                    'values_title' => 'The values that govern our delivery',
                    'values' => [
                        [
                            'icon' => 'Droplets',
                            'title' => 'Uncompromising Metrology & Data Integrity',
                            'description' => 'We treat consumption data as a public trust. Every meter, transponder, and calculation must meet billing-grade legal standards.',
                        ],
                        [
                            'icon' => 'ShieldCheck',
                            'title' => 'Contractual Accountability & SLA Discipline',
                            'description' => 'We hold ourselves to measurable, contract-backed performance metrics. If a network packet fails to deliver or a meter faults, we respond within hours.',
                        ],
                        [
                            'icon' => 'Cpu',
                            'title' => 'Engineering for Multi-Decade Longevity',
                            'description' => 'Public infrastructure cannot be replaced on consumer technology upgrade cycles. We engineer for 15+ years of continuous service under harsh conditions.',
                        ],
                        [
                            'icon' => 'Landmark',
                            'title' => 'Sovereign Local Capability',
                            'description' => 'We build resilient domestic engineering capacity, creating permanent in-country calibration, testing, and operations teams rather than relying on fly-in consultants.',
                        ],
                    ],
                    'cta_title' => 'Align your utility objectives with our team.',
                    'cta_subtitle' => 'We provide feasibility analyses, DMA demarcation plans, and turnkey pilot proposals.',
                    'cta_button_text' => 'Start a technical conversation',
                    'cta_button_link' => '/contact',
                ],
                'seo' => [
                    'meta_title' => 'Our Mission & Vision — N3 Solutions Limited',
                    'meta_description' => 'The strategic mission, long-term vision, and core operating values driving N3 Solutions Limited.',
                ],
                'aeo' => [
                    'direct_answer' => 'N3 Solutions aims to eliminate non-revenue water losses and build resilient utility infrastructure across South Asia through precision static metrology, IoT connectivity, and local field operations.',
                    'key_entities' => ['Mission & Vision', 'Non-Revenue Water', 'Sustainable Cities', 'Smart Utilities'],
                ],
            ],
            [
                'title' => 'Our Team',
                'slug' => 'about/team',
                'template' => 'team',
                'is_published' => true,
                'section_toggles' => [
                    'show_hero' => true,
                    'show_executives' => true,
                    'show_functional_leads' => true,
                    'show_cta' => true,
                ],
                'content' => [
                    'hero_eyebrow' => 'Organisation & People',
                    'hero_title' => 'Our Leadership & Engineering Team',
                    'hero_subtitle' => 'A multidisciplinary group of utility operators, radio frequency engineers, and metrology specialists dedicated to executing national infrastructure projects.',
                    'team_eyebrow' => 'Executive Leadership',
                    'team_title' => 'Directors & Founding Partners',
                    'executives_title' => 'Executive Directors',
                    'functional_leads_title' => 'Functional Engineering Leads',
                    'cta_title' => 'Join our engineering organisation.',
                    'cta_subtitle' => 'We are always looking for RF engineers, metrology specialists, and field supervisors across Bangladesh.',
                    'cta_button_text' => 'Get in touch',
                    'cta_button_link' => '/contact',
                ],
                'seo' => [
                    'meta_title' => 'Our Team — N3 Solutions Limited',
                    'meta_description' => 'Meet the executive leadership and technical directors leading N3 Solutions Limited.',
                ],
                'aeo' => [
                    'direct_answer' => 'N3 Solutions is led by Managing Director Nafis Rahman, Director of Technology Naveed Hasan, and Director of Operations Nusrat Karim, combining over 30 years of utility infrastructure and IoT engineering experience.',
                    'key_entities' => ['Nafis Rahman', 'Naveed Hasan', 'Nusrat Karim', 'N3 Solutions Leadership'],
                ],
            ],
            [
                'title' => 'Partners',
                'slug' => 'partners',
                'template' => 'partners',
                'is_published' => true,
                'section_toggles' => [
                    'show_hero' => true,
                    'show_featured_logo_strip' => true,
                    'show_ecosystem' => true,
                    'show_engagement_models' => true,
                    'show_cta' => true,
                ],
                'content' => [
                    'hero_eyebrow' => 'Collaborative Ecosystem',
                    'hero_title' => 'Partners & Technology Ecosystem',
                    'hero_subtitle' => 'We collaborate with global tier-one metrology OEMs, telecommunications operators, multilateral development banks, and regional water authorities across South Asia.',
                    'hero_cta_text' => 'Explore partnerships',
                    'hero_cta_link' => '/contact',
                    'partners_eyebrow' => 'Ecosystem Overview',
                    'partners_title' => 'Structured collaboration across four pillars',
                    'cta_title' => 'Partner with N3 Solutions on utility infrastructure.',
                    'cta_subtitle' => 'We work with hardware OEMs, system integrators, and financing institutions to deliver national-scale programmes.',
                    'cta_button_text' => 'Initiate a partnership inquiry',
                    'cta_button_link' => '/contact',
                ],
                'seo' => [
                    'meta_title' => 'Partners & Ecosystem — N3 Solutions Limited',
                    'meta_description' => 'Collaborating with global metrology manufacturers, regional utilities, and telecom partners across South Asia.',
                ],
                'aeo' => [
                    'direct_answer' => 'N3 Solutions collaborates with public water authorities (Dhaka, Chittagong, Rajshahi WASA), global metrology OEMs, the LoRa Alliance, and development institutions like the World Bank and ADB.',
                    'key_entities' => ['Dhaka WASA', 'Chittagong WASA', 'LoRa Alliance', 'World Bank', 'Asian Development Bank'],
                ],
            ],
            [
                'title' => 'Contact Us',
                'slug' => 'contact',
                'template' => 'contact',
                'is_published' => true,
                'section_toggles' => [
                    'show_hero' => true,
                    'show_contact_details' => true,
                    'show_contact_form' => true,
                    'show_cta' => false,
                ],
                'content' => [
                    'hero_eyebrow' => 'Contact',
                    'hero_title' => 'Start a conversation with our engineers.',
                    'hero_subtitle' => 'Tell us about your infrastructure objectives. We respond with a considered assessment, not a sales pitch.',
                    'office_address' => 'Gulshan Avenue, Dhaka 1212, Bangladesh',
                    'contact_email' => 'contact@n3solutions.com',
                    'contact_phone' => '+880 2 000 0000',
                    'office_hours' => 'Sunday – Thursday: 09:00 – 18:00 (BST)',
                    'form_title' => 'Start a conversation with our engineers.',
                    'form_subtitle' => 'Tell us about your infrastructure objectives. We respond with a considered assessment, not a sales pitch.',
                    'form_button_text' => 'Send enquiry',
                    'form_success_message' => 'Thank you. Your inquiry has been received. Our engineering team will review and respond shortly.',
                ],
                'seo' => [
                    'meta_title' => 'Contact Us — N3 Solutions Limited',
                    'meta_description' => 'Contact N3 Solutions Limited to scope a metering, IoT or field operations programme. Offices in Dhaka, Bangladesh.',
                ],
                'aeo' => [
                    'direct_answer' => 'N3 Solutions Limited is located on Gulshan Avenue, Dhaka 1212, Bangladesh. You can contact their engineering team at contact@n3solutions.com or +880 2 000 0000.',
                    'key_entities' => ['N3 Solutions Limited', 'Dhaka Office', 'Contact Information'],
                ],
            ],
        ];

        foreach ($pages as $p) {
            Page::updateOrCreate(['slug' => $p['slug']], $p);
        }

        // 8. Seed Website Settings (General, Header, Footer)
        SiteSetting::set('general', [
            'site_name' => 'N3 Solutions Limited',
            'tagline' => 'Engineering measured, connected and maintainable infrastructure at national scale.',
            'contact_email' => 'contact@n3solutions.com',
            'contact_phone' => '+880 2 000 0000',
            'office_address' => 'Gulshan Avenue, Dhaka 1212, Bangladesh',
            'copyright_text' => '© ' . date('Y') . ' N3 Solutions Limited. All rights reserved.',
            'social_links' => [
                'linkedin' => 'https://linkedin.com/company/n3-solutions',
                'twitter' => 'https://x.com/n3solutions',
                'facebook' => 'https://facebook.com/n3solutions',
                'github' => 'https://github.com/n3solutions',
            ],
            'default_seo' => [
                'meta_title' => 'N3 Solutions Limited — Infrastructure & IoT Engineering',
                'meta_description' => 'N3 Solutions Limited engineers smart water metering, IoT infrastructure and field operations for utilities and public infrastructure at national scale.',
            ],
        ], 'general');

        SiteSetting::set('header', [
            'logo_text' => 'N3 Solutions Limited',
            'cta_button_text' => 'Talk to us',
            'cta_button_link' => '/contact',
            'show_cta_button' => true,
            'menu_items' => [
                ['label' => 'Home', 'url' => '/', 'type' => 'link'],
                ['label' => 'Services', 'url' => '/services', 'type' => 'dropdown', 'children' => [
                    ['label' => 'Smart Water Metering', 'url' => '/services/smart-water-metering', 'desc' => 'AMI programmes, ultrasonic metrology & NRW analytics'],
                    ['label' => 'IoT Infrastructure', 'url' => '/services/iot-infrastructure', 'desc' => 'LPWAN networks, gateways & telemetry platforms'],
                    ['label' => 'Field Operations & Maintenance', 'url' => '/services/field-operations', 'desc' => 'Regional engineering teams & SLA-backed asset support'],
                    ['label' => 'Emerging Technologies', 'url' => '/services/emerging-technologies', 'desc' => 'Applied R&D, sensor telemetry & predictive AI'],
                ]],
                ['label' => 'About', 'url' => '/about', 'type' => 'dropdown', 'children' => [
                    ['label' => 'About Us', 'url' => '/about', 'desc' => 'Company overview, operating footprint & credibility'],
                    ['label' => 'Our Mission & Vision', 'url' => '/about/mission-vision', 'desc' => 'Strategic intent & core infrastructure principles'],
                    ['label' => 'Our Team', 'url' => '/about/team', 'desc' => 'Leadership, technical directors & engineering leads'],
                ]],
                ['label' => 'Partners', 'url' => '/partners', 'type' => 'link'],
                ['label' => 'Contact', 'url' => '/contact', 'type' => 'link'],
            ],
        ], 'header');

        SiteSetting::set('footer', [
            'tagline' => 'Engineering measured, connected and maintainable infrastructure at national scale.',
            'office_address' => 'Gulshan Avenue, Dhaka 1212, Bangladesh',
            'contact_email' => 'contact@n3solutions.com',
            'contact_phone' => '+880 2 000 0000',
            'copyright_text' => '© ' . date('Y') . ' N3 Solutions Limited. All rights reserved.',
            'columns' => [
                [
                    'title' => 'Company',
                    'links' => [
                        ['label' => 'About Us', 'url' => '/about'],
                        ['label' => 'Mission & Vision', 'url' => '/about/mission-vision'],
                        ['label' => 'Our Team', 'url' => '/about/team'],
                        ['label' => 'Partners', 'url' => '/partners'],
                        ['label' => 'Contact', 'url' => '/contact'],
                    ],
                ],
                [
                    'title' => 'Solutions',
                    'links' => [
                        ['label' => 'Smart Water Metering', 'url' => '/services/smart-water-metering'],
                        ['label' => 'IoT Infrastructure', 'url' => '/services/iot-infrastructure'],
                        ['label' => 'Field Operations', 'url' => '/services/field-operations'],
                        ['label' => 'Emerging Technologies', 'url' => '/services/emerging-technologies'],
                    ],
                ],
                [
                    'title' => 'Resources',
                    'links' => [
                        ['label' => 'Capabilities', 'url' => '/services'],
                        ['label' => 'Partners Ecosystem', 'url' => '/partners'],
                        ['label' => 'Engineering Scope', 'url' => '/contact'],
                        ['label' => 'Direct Inquiries', 'url' => '/contact'],
                    ],
                ],
            ],
        ], 'footer');
    }
}
