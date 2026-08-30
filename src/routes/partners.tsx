import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Radio, Layers, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/n3/SiteHeader";
import { SiteFooter } from "@/components/n3/SiteFooter";
import { PartnerLogo } from "@/components/n3/PartnerLogos";
import { PageFaqSection } from "@/components/n3/PageFaqSection";
import { DynamicBlockRenderer } from "@/components/n3/DynamicBlockRenderer";
import { fetchPartners, fetchPage, ApiPartner, ApiPageData } from "@/lib/api";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partners & Ecosystem — N3 Solutions Limited" },
      {
        name: "description",
        content:
          "Collaborating with global metrology manufacturers, regional utilities, and telecom partners to deploy resilient public infrastructure across South Asia.",
      },
      { property: "og:title", content: "Partners & Ecosystem — N3 Solutions Limited" },
      {
        property: "og:description",
        content:
          "Our collaborative ecosystem of utility authorities, tier-1 metrology OEMs, telecom operators, and development institutions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PartnersPage,
});

const DEFAULT_FEATURED_LOGOS = [
  { name: "Dhaka WASA", logo_url: undefined },
  { name: "Chittagong WASA", logo_url: undefined },
  { name: "Rajshahi WASA", logo_url: undefined },
  { name: "Ultrasonic Metrology Partners", logo_url: undefined },
  { name: "LoRa Alliance Ecosystem", logo_url: undefined },
  { name: "World Bank / IDA Guidelines", logo_url: undefined },
];

const DEFAULT_PARTNER_CATEGORIES = [
  {
    icon: Building2,
    categoryKey: "utility_authority",
    category: "Public Utility Authorities",
    description:
      "Municipal water and sanitation authorities partnering with N3 Solutions for large-scale AMI rollouts, DMA hydraulic balancing, and managed operations.",
    partners: [
      {
        name: "Dhaka WASA",
        detail: "Priority distribution zones and commercial consumer telemetry",
        logo_url: undefined,
      },
      {
        name: "Chittagong WASA",
        detail: "Metropolitan network metering & non-revenue water recovery",
        logo_url: undefined,
      },
      {
        name: "Rajshahi WASA",
        detail: "District Metered Area (DMA) pilot instrumentation",
        logo_url: undefined,
      },
      {
        name: "Khulna & Sylhet WASA",
        detail: "Feasibility studies and hydraulic zone demarcation",
        logo_url: undefined,
      },
    ],
  },
  {
    icon: Layers,
    categoryKey: "metrology_oem",
    category: "Global Metrology & Hardware OEMs",
    description:
      "Tier-1 international instrumentation partners providing MID R400 / ISO 4064 certified static ultrasonic meters, pressure transducers, and acoustic leak loggers.",
    partners: [
      {
        name: "Ultrasonic Metrology Partners",
        detail: "MID R400 class static flow measurement with 15-year battery autonomy",
        logo_url: undefined,
      },
      {
        name: "Acoustic & Vibration Sensor Manufacturers",
        detail: "Underground pipe fissure and leak correlation acoustic nodes",
        logo_url: undefined,
      },
      {
        name: "Water Quality Multivariable Sensor OEMs",
        detail: "In-line pH, turbidity, dissolved oxygen, and chlorine monitoring",
        logo_url: undefined,
      },
      {
        name: "Submersible Pit Antenna Specialists",
        detail: "IP68 composite pit-lid antennas engineered for high attenuation environments",
        logo_url: undefined,
      },
    ],
  },
  {
    icon: Radio,
    categoryKey: "telecom_iot",
    category: "Telecommunications & IoT Infrastructure",
    description:
      "Carrier-grade telecommunication operators, gateway manufacturers, and cloud infrastructure partners providing reliable sub-GHz wireless coverage.",
    partners: [
      {
        name: "LoRa Alliance Ecosystem",
        detail: "SX1303 multi-channel carrier gateways and open-standard protocols",
        logo_url: undefined,
      },
      {
        name: "National Cellular Operators",
        detail: "Licensed spectrum NB-IoT and LTE-M dedicated APN interconnects",
        logo_url: undefined,
      },
      {
        name: "Sovereign Cloud & Data Centers",
        detail: "Local tier-3 data centers ensuring in-country utility data residency",
        logo_url: undefined,
      },
      {
        name: "Enterprise ERP Integrators",
        detail: "Standard connectors for SAP IS-U, Oracle CC&B, and utility billing systems",
        logo_url: undefined,
      },
    ],
  },
  {
    icon: Landmark,
    categoryKey: "multilateral_institution",
    category: "Multilateral & Development Institutions",
    description:
      "Aligning with global financing frameworks and sustainability guidelines for smart water management and climate resilience.",
    partners: [
      {
        name: "World Bank / IDA Guidelines",
        detail: "Conformance to NRW reduction and public procurement benchmarks",
        logo_url: undefined,
      },
      {
        name: "Asian Development Bank (ADB)",
        detail: "Urban infrastructure modernization and climate adaptation frameworks",
        logo_url: undefined,
      },
      {
        name: "JICA Technical Standards",
        detail: "Hydraulic modeling and sustainable water utility management practices",
        logo_url: undefined,
      },
      {
        name: "National Infrastructure Funds",
        detail: "Public-private partnership (PPP) and DBFOM delivery mechanisms",
        logo_url: undefined,
      },
    ],
  },
];

const ENGAGEMENT_MODELS = [
  {
    title: "Technology OEM Integration",
    body: "We integrate proven global metrology hardware into localized, carrier-grade telemetry platforms with in-country calibration and support.",
  },
  {
    title: "Utility DBFOM / Managed Service",
    body: "We partner with municipal authorities under turnkey concessions, assuming full responsibility for financing, installation, and SLA maintenance.",
  },
  {
    title: "Joint Venture & EPC Delivery",
    body: "We collaborate with civil EPC contractors and international consulting firms to deliver comprehensive smart water packages on major donor tenders.",
  },
];

function PartnersPage() {
  const [featuredLogos, setFeaturedLogos] = useState(DEFAULT_FEATURED_LOGOS);
  const [categories, setCategories] = useState(DEFAULT_PARTNER_CATEGORIES);
  const [pageData, setPageData] = useState<ApiPageData | null>(null);

  useEffect(() => {
    fetchPage("partners").then((page) => {
      if (page) setPageData(page);
    });

    fetchPartners().then((apiPartners: ApiPartner[]) => {
      if (apiPartners && apiPartners.length > 0) {
        // Featured
        const featured = apiPartners.filter((p) => p.is_featured);
        if (featured.length > 0) {
          setFeaturedLogos(featured.map((p) => ({ name: p.name, logo_url: p.logo_url })));
        }

        // Group by category
        const updatedCategories = DEFAULT_PARTNER_CATEGORIES.map((cat) => {
          const matching = apiPartners.filter((p) => p.category === cat.categoryKey);
          if (matching.length > 0) {
            return {
              ...cat,
              partners: matching.map((p) => ({
                name: p.name,
                detail: p.collaboration_detail,
                logo_url: p.logo_url,
              })),
            };
          }
          return cat;
        });
        setCategories(updatedCategories);
      }
    });
  }, []);

  const content = pageData?.content || {};
  const toggles = pageData?.section_toggles || {
    show_hero: true,
    show_featured_logo_strip: true,
    show_ecosystem: true,
    show_engagement_models: true,
    show_cta: true,
  };

  return (
    <div id="top" className="min-h-screen bg-background font-sans text-foreground antialiased">
      <SiteHeader />

      <main>
        {(() => {
          const defaultOrder = [
            "hero",
            "featured_logo_strip",
            "ecosystem_grid",
            "engagement_models",
            "modular_blocks",
            "faqs",
            "cta",
          ];

          const activeSectionsOrder: string[] = (() => {
            if (Array.isArray(content.sections_order) && content.sections_order.length > 0) {
              return content.sections_order
                .filter((item: any) => item.is_enabled !== false)
                .map((item: any) => (typeof item === "string" ? item : item.key));
            }
            return defaultOrder;
          })();

          const renderSection = (key: string) => {
            switch (key) {
              case "hero":
                return toggles.show_hero !== false ? (
                  <section key="hero" className="relative overflow-hidden bg-surface pt-44 pb-24 lg:pt-52 lg:pb-32">
                    <div className="rule-grid pointer-events-none absolute inset-0" aria-hidden="true" />
                    <div
                      className="pointer-events-none absolute top-0 right-0 h-full w-1/3 bg-gradient-to-b from-transparent via-transparent to-[color-mix(in_oklab,var(--color-accent-teal)_6%,transparent)]"
                      aria-hidden="true"
                    />

                    <div className="relative mx-auto max-w-[1240px] px-6 lg:px-10">
                      <div className="max-w-3xl">
                        <p className="eyebrow">{content.hero_eyebrow || "Institutional & Technology Ecosystem"}</p>
                        <h1 className="mt-6 text-[2.6rem] leading-[1.06] font-semibold tracking-[-0.025em] text-navy sm:text-5xl lg:text-[3.5rem]">
                          {content.hero_title || "Collaborating with global metrology leaders and regional utilities"}
                        </h1>
                        <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
                          {content.hero_subtitle ||
                            "N3 Solutions bridges world-class instrumentation manufacturers, municipal utility authorities, and multilateral development frameworks to deliver resilient, verifiable public infrastructure."}
                        </p>
                        <div className="mt-10 flex flex-wrap items-center gap-5">
                          <Button variant="accent" size="xl" asChild>
                            <Link to={content.hero_cta_link || "/contact"}>
                              {content.hero_cta_text || "Explore a partnership"} <ArrowRight />
                            </Link>
                          </Button>
                          <a
                            href="#ecosystem"
                            className="text-sm font-medium tracking-[0.04em] text-navy underline-offset-8 transition-colors duration-200 hover:text-accent-teal hover:underline"
                          >
                            View partner ecosystem
                          </a>
                        </div>
                      </div>
                    </div>
                  </section>
                ) : null;

              case "featured_logo_strip":
                return toggles.show_featured_logo_strip !== false ? (
                  <section key="featured_logo_strip" className="border-y border-hairline bg-surface-muted py-10">
                    <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
                      <p className="text-center text-[0.6875rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase mb-8">
                        Trusted by public utilities & global infrastructure leaders
                      </p>
                      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6 items-center justify-items-center opacity-85 hover:opacity-100 transition-opacity">
                        {featuredLogos.map((item) => (
                          <div
                            key={item.name}
                            className="flex h-16 w-full items-center justify-center rounded border border-hairline bg-surface p-3 shadow-2xs"
                          >
                            <PartnerLogo name={item.name} logoUrl={item.logo_url} className="h-7 w-auto max-w-full" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                ) : null;

              case "ecosystem_grid":
              case "ecosystem":
                return toggles.show_ecosystem !== false ? (
                  <section key="ecosystem_grid" id="ecosystem" className="bg-background py-28 lg:py-36">
                    <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
                      <div className="max-w-3xl">
                        <p className="eyebrow">{content.partners_eyebrow || "Ecosystem Architecture"}</p>
                        <h2 className="mt-6 text-[2rem] leading-[1.12] font-semibold tracking-[-0.02em] text-navy lg:text-[2.75rem]">
                          {content.partners_title || "Our collaboration network"}
                        </h2>
                        <p className="mt-4 text-base text-muted-foreground">
                          {content.partners_subtitle || "Structured across four key tiers of the municipal utility value chain."}
                        </p>
                      </div>

                      <div className="mt-16 space-y-12">
                        {categories.map((cat) => {
                          const Icon = cat.icon;
                          return (
                            <div
                              key={cat.category}
                              className="rounded border border-hairline bg-surface p-8 sm:p-10 transition-shadow hover:shadow-xs"
                            >
                              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between border-b border-hairline pb-8">
                                <div className="max-w-2xl">
                                  <div className="flex items-center gap-3">
                                    <Icon className="size-6 text-accent-teal" strokeWidth={1.5} />
                                    <h3 className="text-xl font-semibold text-navy">{cat.category}</h3>
                                  </div>
                                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                    {cat.description}
                                  </p>
                                </div>
                                <span className="self-start rounded bg-surface-muted px-3 py-1 font-mono text-[0.7rem] font-semibold text-navy border border-hairline uppercase">
                                  ACTIVE COLLABORATION
                                </span>
                              </div>

                              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {cat.partners.map((partner) => (
                                  <div
                                    key={partner.name}
                                    className="flex flex-col justify-between rounded border border-hairline bg-background p-6 transition-all hover:border-accent-teal/50 hover:shadow-2xs"
                                  >
                                    <div>
                                      <div className="flex h-12 items-center border-b border-hairline pb-3 mb-4">
                                        <PartnerLogo name={partner.name} logoUrl={partner.logo_url} className="h-7 w-auto max-w-full" />
                                      </div>
                                      <h4 className="text-sm font-semibold text-navy">{partner.name}</h4>
                                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                                        {partner.detail}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </section>
                ) : null;

              case "engagement_models":
                return toggles.show_engagement_models !== false ? (
                  <section key="engagement_models" className="border-t border-hairline bg-surface-muted py-28 lg:py-36">
                    <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
                      <div className="max-w-3xl">
                        <p className="eyebrow">Partnership Models</p>
                        <h2 className="mt-6 text-[2rem] leading-[1.12] font-semibold tracking-[-0.02em] text-navy lg:text-[2.75rem]">
                          How we work together
                        </h2>
                      </div>

                      <div className="mt-16 grid gap-8 md:grid-cols-3">
                        {ENGAGEMENT_MODELS.map((model, idx) => (
                          <div key={model.title} className="rounded border border-hairline bg-surface p-8">
                            <p className="font-mono text-xs font-semibold text-accent-teal tracking-wider">
                              MODEL 0{idx + 1}
                            </p>
                            <h3 className="mt-4 text-lg font-semibold text-navy">{model.title}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{model.body}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                ) : null;

              case "modular_blocks":
                return <DynamicBlockRenderer key="modular_blocks" blocks={content.dynamic_blocks} />;

              case "faqs":
                return toggles.show_faqs !== false ? (
                  <PageFaqSection
                    key="faqs"
                    eyebrow={content.faq_eyebrow}
                    title={content.faq_title}
                    subtitle={content.faq_subtitle}
                    faqs={content.page_faqs || content.faqs}
                  />
                ) : null;

              case "cta":
                return toggles.show_cta !== false ? (
                  <section key="cta" className="bg-navy-deep text-navy-foreground py-24 lg:py-28">
                    <div className="mx-auto flex max-w-[1240px] flex-col items-start gap-10 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
                      <div>
                        <h2 className="max-w-2xl text-[1.9rem] leading-[1.12] font-semibold tracking-[-0.02em] lg:text-[2.5rem]">
                          {content.cta_title || "Discuss an institutional or technology partnership"}
                        </h2>
                        <p className="mt-5 max-w-xl leading-relaxed text-navy-foreground/65">
                          {content.cta_subtitle ||
                            "Whether you are a global hardware manufacturer, utility authority, or engineering consultancy, our team is ready to collaborate."}
                        </p>
                      </div>
                      <Button variant="accent" size="xl" asChild>
                        <Link to={content.cta_button_link || "/contact"}>
                          {content.cta_button_text || "Initiate a dialogue"} <ArrowRight />
                        </Link>
                      </Button>
                    </div>
                  </section>
                ) : null;

              default:
                return null;
            }
          };

          return activeSectionsOrder.map((key) => renderSection(key));
        })()}
      </main>

      <SiteFooter />
    </div>
  );
}
