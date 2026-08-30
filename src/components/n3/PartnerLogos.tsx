interface PartnerLogoProps {
  name: string;
  className?: string;
  logoUrl?: string;
}

export function PartnerLogo({ name, className = "h-8 w-auto", logoUrl }: PartnerLogoProps) {
  if (logoUrl) {
    return <img src={logoUrl} alt={name} className={`${className} object-contain`} />;
  }
  switch (name) {
    case "Dhaka WASA":
      return (
        <svg
          viewBox="0 0 160 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-label="Dhaka WASA Logo"
        >
          <circle
            cx="22"
            cy="22"
            r="18"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-accent-teal"
          />
          <path
            d="M22 10C22 10 14 19 14 24C14 28.4 17.6 32 22 32C26.4 32 30 28.4 30 24C30 19 22 10 22 10Z"
            fill="currentColor"
            className="text-accent-teal"
          />
          <path
            d="M18 25C18 26.5 19.5 28 21.5 28"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <text
            x="48"
            y="21"
            fill="currentColor"
            className="text-navy"
            fontSize="13"
            fontWeight="700"
            letterSpacing="0.05em"
          >
            DHAKA WASA
          </text>
          <text
            x="48"
            y="32"
            fill="currentColor"
            className="text-muted-foreground"
            fontSize="7.5"
            fontWeight="600"
            letterSpacing="0.12em"
          >
            WATER & SEWERAGE AUTHORITY
          </text>
        </svg>
      );

    case "Chittagong WASA":
      return (
        <svg
          viewBox="0 0 180 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-label="Chittagong WASA Logo"
        >
          <circle
            cx="22"
            cy="22"
            r="18"
            stroke="currentColor"
            strokeWidth="2"
            className="text-navy"
          />
          <path
            d="M12 24C15 20 18 20 22 24C26 28 29 28 32 24"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="text-accent-teal"
          />
          <path
            d="M12 29C15 25 18 25 22 29C26 33 29 33 32 29"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-accent-teal/70"
          />
          <circle cx="22" cy="15" r="3.5" fill="currentColor" className="text-accent-teal" />
          <text
            x="48"
            y="21"
            fill="currentColor"
            className="text-navy"
            fontSize="13"
            fontWeight="700"
            letterSpacing="0.05em"
          >
            CHITTAGONG WASA
          </text>
          <text
            x="48"
            y="32"
            fill="currentColor"
            className="text-muted-foreground"
            fontSize="7.5"
            fontWeight="600"
            letterSpacing="0.12em"
          >
            PORT METROPOLITAN UTILITY
          </text>
        </svg>
      );

    case "Rajshahi WASA":
      return (
        <svg
          viewBox="0 0 170 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-label="Rajshahi WASA Logo"
        >
          <rect
            x="5"
            y="5"
            width="34"
            height="34"
            rx="7"
            stroke="currentColor"
            strokeWidth="2"
            className="text-navy"
          />
          <path
            d="M14 26C18 22 26 22 30 26"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="text-accent-teal"
          />
          <path
            d="M22 12V24"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="text-accent-teal"
          />
          <text
            x="48"
            y="21"
            fill="currentColor"
            className="text-navy"
            fontSize="13"
            fontWeight="700"
            letterSpacing="0.05em"
          >
            RAJSHAHI WASA
          </text>
          <text
            x="48"
            y="32"
            fill="currentColor"
            className="text-muted-foreground"
            fontSize="7.5"
            fontWeight="600"
            letterSpacing="0.12em"
          >
            NORTHERN DIVISION UTILITY
          </text>
        </svg>
      );

    case "Khulna & Sylhet WASA":
      return (
        <svg
          viewBox="0 0 190 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-label="Khulna and Sylhet WASA Logo"
        >
          <circle
            cx="22"
            cy="22"
            r="17"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="3 2"
            className="text-muted-foreground"
          />
          <path
            d="M16 22C16 18.7 18.7 16 22 16C25.3 16 28 18.7 28 22C28 26 22 31 22 31C22 31 16 26 16 22Z"
            fill="currentColor"
            className="text-accent-teal"
          />
          <text
            x="48"
            y="21"
            fill="currentColor"
            className="text-navy"
            fontSize="12.5"
            fontWeight="700"
            letterSpacing="0.04em"
          >
            KHULNA & SYLHET
          </text>
          <text
            x="48"
            y="32"
            fill="currentColor"
            className="text-muted-foreground"
            fontSize="7.5"
            fontWeight="600"
            letterSpacing="0.12em"
          >
            REGIONAL WASA AUTHORITIES
          </text>
        </svg>
      );

    case "Diehl & Ultrasonic Metrology Partners":
    case "Ultrasonic Metrology Partners":
      return (
        <svg
          viewBox="0 0 170 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-label="Ultrasonic Metrology Logo"
        >
          <rect
            x="4"
            y="8"
            width="34"
            height="28"
            rx="4"
            fill="currentColor"
            className="text-navy"
          />
          <path
            d="M12 22H15L18 14L23 30L26 22H30"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent-teal"
          />
          <text
            x="46"
            y="21"
            fill="currentColor"
            className="text-navy"
            fontSize="13"
            fontWeight="700"
            letterSpacing="0.06em"
          >
            METROLOGY OEM
          </text>
          <text
            x="46"
            y="32"
            fill="currentColor"
            className="text-muted-foreground"
            fontSize="7.5"
            fontWeight="600"
            letterSpacing="0.14em"
          >
            MID R400 // ISO 4064
          </text>
        </svg>
      );

    case "Acoustic & Vibration Sensor Manufacturers":
      return (
        <svg
          viewBox="0 0 170 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-label="Acoustic Sensors Logo"
        >
          <circle
            cx="21"
            cy="22"
            r="17"
            stroke="currentColor"
            strokeWidth="2"
            className="text-navy"
          />
          <path
            d="M11 22C11 16.5 15.5 12 21 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-accent-teal"
          />
          <path
            d="M15 22C15 18.7 17.7 16 21 16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-accent-teal"
          />
          <circle cx="21" cy="22" r="3" fill="currentColor" className="text-navy" />
          <text
            x="46"
            y="21"
            fill="currentColor"
            className="text-navy"
            fontSize="12.5"
            fontWeight="700"
            letterSpacing="0.04em"
          >
            ACOUSTIC SENSING
          </text>
          <text
            x="46"
            y="32"
            fill="currentColor"
            className="text-muted-foreground"
            fontSize="7.5"
            fontWeight="600"
            letterSpacing="0.14em"
          >
            LEAK CORRELATION OEM
          </text>
        </svg>
      );

    case "Water Quality Multivariable Sensor OEMs":
      return (
        <svg
          viewBox="0 0 170 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-label="Water Quality Sensors Logo"
        >
          <polygon
            points="21,6 36,15 36,31 21,39 6,31 6,15"
            stroke="currentColor"
            strokeWidth="2"
            className="text-navy"
            fill="none"
          />
          <path
            d="M21 16V28M15 22H27"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-accent-teal"
          />
          <text
            x="45"
            y="21"
            fill="currentColor"
            className="text-navy"
            fontSize="12.5"
            fontWeight="700"
            letterSpacing="0.04em"
          >
            WATER METRICS
          </text>
          <text
            x="45"
            y="32"
            fill="currentColor"
            className="text-muted-foreground"
            fontSize="7.5"
            fontWeight="600"
            letterSpacing="0.14em"
          >
            MULTIVARIABLE PROBES
          </text>
        </svg>
      );

    case "Submersible Pit Antenna Specialists":
      return (
        <svg
          viewBox="0 0 170 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-label="Antenna Specialists Logo"
        >
          <rect
            x="6"
            y="10"
            width="30"
            height="24"
            rx="4"
            stroke="currentColor"
            strokeWidth="2"
            className="text-navy"
          />
          <path
            d="M21 17V27M16 20L21 15L26 20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent-teal"
          />
          <text
            x="44"
            y="21"
            fill="currentColor"
            className="text-navy"
            fontSize="12.5"
            fontWeight="700"
            letterSpacing="0.04em"
          >
            PIT-LID ANTENNA
          </text>
          <text
            x="44"
            y="32"
            fill="currentColor"
            className="text-muted-foreground"
            fontSize="7.5"
            fontWeight="600"
            letterSpacing="0.14em"
          >
            IP68 SUBMERSIBLE RF
          </text>
        </svg>
      );

    case "LoRa Alliance Ecosystem":
      return (
        <svg
          viewBox="0 0 170 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-label="LoRa Alliance Logo"
        >
          <path d="M8 32L18 12H24L14 32H8Z" fill="currentColor" className="text-accent-teal" />
          <path
            d="M24 16C27 16 30 18.5 30 22C30 25.5 27 28 24 28"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="text-navy"
          />
          <path
            d="M27 12C32 12 36 16.5 36 22C36 27.5 32 32 27 32"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="text-accent-teal"
          />
          <text
            x="46"
            y="21"
            fill="currentColor"
            className="text-navy"
            fontSize="13"
            fontWeight="700"
            letterSpacing="0.06em"
          >
            LoRaWAN®
          </text>
          <text
            x="46"
            y="32"
            fill="currentColor"
            className="text-muted-foreground"
            fontSize="7.5"
            fontWeight="600"
            letterSpacing="0.14em"
          >
            ALLIANCE ECOSYSTEM
          </text>
        </svg>
      );

    case "National Cellular Operators":
      return (
        <svg
          viewBox="0 0 170 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-label="Cellular Operators Logo"
        >
          <circle
            cx="21"
            cy="22"
            r="16"
            stroke="currentColor"
            strokeWidth="2"
            className="text-navy"
          />
          <path
            d="M12 28L17 16H21L26 28"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent-teal"
          />
          <path d="M14 24H24" stroke="currentColor" strokeWidth="2" className="text-accent-teal" />
          <text
            x="45"
            y="21"
            fill="currentColor"
            className="text-navy"
            fontSize="12.5"
            fontWeight="700"
            letterSpacing="0.04em"
          >
            NB-IoT / LTE-M
          </text>
          <text
            x="45"
            y="32"
            fill="currentColor"
            className="text-muted-foreground"
            fontSize="7.5"
            fontWeight="600"
            letterSpacing="0.14em"
          >
            NATIONAL TELCO APN
          </text>
        </svg>
      );

    case "Sovereign Cloud & Data Centers":
      return (
        <svg
          viewBox="0 0 170 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-label="Sovereign Cloud Logo"
        >
          <path
            d="M10 26C8.5 26 7 24.5 7 22.5C7 20.8 8.2 19.3 9.8 19.1C10.4 16.2 13 14 16 14C19.2 14 21.8 16.3 22.2 19.4C23.2 18.5 24.5 18 26 18C28.8 18 31 20.2 31 23C31 25.8 28.8 28 26 28H10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent-teal"
            fill="none"
          />
          <text
            x="42"
            y="21"
            fill="currentColor"
            className="text-navy"
            fontSize="12.5"
            fontWeight="700"
            letterSpacing="0.04em"
          >
            DATA RESIDENCY
          </text>
          <text
            x="42"
            y="32"
            fill="currentColor"
            className="text-muted-foreground"
            fontSize="7.5"
            fontWeight="600"
            letterSpacing="0.14em"
          >
            LOCAL TIER-3 CLOUD
          </text>
        </svg>
      );

    case "Enterprise ERP Integrators":
      return (
        <svg
          viewBox="0 0 170 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-label="Enterprise ERP Logo"
        >
          <rect
            x="6"
            y="8"
            width="30"
            height="28"
            rx="4"
            stroke="currentColor"
            strokeWidth="2"
            className="text-navy"
          />
          <path
            d="M12 16H30M12 22H30M12 28H22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-accent-teal"
          />
          <text
            x="44"
            y="21"
            fill="currentColor"
            className="text-navy"
            fontSize="12.5"
            fontWeight="700"
            letterSpacing="0.04em"
          >
            SAP / ORACLE
          </text>
          <text
            x="44"
            y="32"
            fill="currentColor"
            className="text-muted-foreground"
            fontSize="7.5"
            fontWeight="600"
            letterSpacing="0.14em"
          >
            UTILITY BILLING MDMS
          </text>
        </svg>
      );

    case "World Bank / IDA Guidelines":
      return (
        <svg
          viewBox="0 0 180 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-label="World Bank Logo"
        >
          <circle
            cx="21"
            cy="22"
            r="17"
            stroke="currentColor"
            strokeWidth="2"
            className="text-navy"
          />
          <path
            d="M4 22H38M21 5C26 10 28 16 28 22C28 28 26 34 21 39C16 34 14 28 14 22C14 16 16 10 21 5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-accent-teal"
          />
          <text
            x="46"
            y="21"
            fill="currentColor"
            className="text-navy"
            fontSize="13"
            fontWeight="700"
            letterSpacing="0.05em"
          >
            WORLD BANK
          </text>
          <text
            x="46"
            y="32"
            fill="currentColor"
            className="text-muted-foreground"
            fontSize="7.5"
            fontWeight="600"
            letterSpacing="0.12em"
          >
            IDA FRAMEWORK ALIGNED
          </text>
        </svg>
      );

    case "Asian Development Bank (ADB)":
      return (
        <svg
          viewBox="0 0 170 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-label="Asian Development Bank Logo"
        >
          <rect
            x="5"
            y="8"
            width="32"
            height="28"
            rx="3"
            stroke="currentColor"
            strokeWidth="2"
            className="text-navy"
          />
          <text
            x="9"
            y="27"
            fill="currentColor"
            className="text-accent-teal"
            fontSize="14"
            fontWeight="800"
            letterSpacing="0.05em"
          >
            ADB
          </text>
          <text
            x="45"
            y="21"
            fill="currentColor"
            className="text-navy"
            fontSize="13"
            fontWeight="700"
            letterSpacing="0.05em"
          >
            ASIAN DEV BANK
          </text>
          <text
            x="45"
            y="32"
            fill="currentColor"
            className="text-muted-foreground"
            fontSize="7.5"
            fontWeight="600"
            letterSpacing="0.12em"
          >
            CLIMATE RESILIENCE
          </text>
        </svg>
      );

    case "JICA Technical Standards":
      return (
        <svg
          viewBox="0 0 170 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-label="JICA Logo"
        >
          <circle
            cx="21"
            cy="22"
            r="16"
            stroke="currentColor"
            strokeWidth="2"
            className="text-navy"
          />
          <circle cx="21" cy="22" r="7" fill="currentColor" className="text-accent-teal" />
          <text
            x="45"
            y="21"
            fill="currentColor"
            className="text-navy"
            fontSize="13"
            fontWeight="700"
            letterSpacing="0.06em"
          >
            JICA
          </text>
          <text
            x="45"
            y="32"
            fill="currentColor"
            className="text-muted-foreground"
            fontSize="7.5"
            fontWeight="600"
            letterSpacing="0.12em"
          >
            STANDARDS COMPLIANT
          </text>
        </svg>
      );

    case "National Infrastructure Funds":
      return (
        <svg
          viewBox="0 0 180 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-label="PPP Authority Logo"
        >
          <path
            d="M6 16L21 7L36 16V35H6V16Z"
            stroke="currentColor"
            strokeWidth="2"
            className="text-navy"
            fill="none"
          />
          <path
            d="M15 35V23H27V35"
            stroke="currentColor"
            strokeWidth="2"
            className="text-accent-teal"
          />
          <text
            x="44"
            y="21"
            fill="currentColor"
            className="text-navy"
            fontSize="12.5"
            fontWeight="700"
            letterSpacing="0.04em"
          >
            PPP AUTHORITY
          </text>
          <text
            x="44"
            y="32"
            fill="currentColor"
            className="text-muted-foreground"
            fontSize="7.5"
            fontWeight="600"
            letterSpacing="0.12em"
          >
            DBFOM CONCESSIONS
          </text>
        </svg>
      );

    default:
      return (
        <div className={`flex items-center gap-2.5 ${className}`}>
          <div className="flex size-8 shrink-0 items-center justify-center rounded border border-hairline bg-surface-muted text-accent-teal">
            <span className="font-mono text-xs font-bold">
              {name.substring(0, 2).toUpperCase()}
            </span>
          </div>
          <span className="text-xs font-semibold text-navy">{name}</span>
        </div>
      );
  }
}
