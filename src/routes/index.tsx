import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Gauge, RadioTower, Wrench, CircuitBoard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/n3/SiteHeader";
import { SiteFooter } from "@/components/n3/SiteFooter";
import { HeroTelemetryVisual } from "@/components/n3/HeroTelemetryVisual";
import { fetchServices, fetchNews, fetchTeamMembers, fetchFaqs, fetchPage, ApiPageData } from "@/lib/api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "N3 Solutions Limited — Infrastructure & IoT Engineering" },
      {
        name: "description",
        content:
          "N3 Solutions Limited engineers smart water metering, IoT infrastructure and field operations for utilities and public infrastructure at national scale.",
      },
      { property: "og:title", content: "N3 Solutions Limited — Infrastructure & IoT Engineering" },
      {
        property: "og:description",
        content:
          "Smart water metering, IoT infrastructure and field operations engineered for utilities and public infrastructure at national scale.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const DEFAULT_STATS = [
  { value: "860,000+", label: "Addressable metering points" },
  { value: "5", label: "WASA regions in scope" },
  { value: "$191M", label: "Identified market opportunity" },
  { value: "24/7", label: "Monitored network operations" },
];

const DEFAULT_SOLUTIONS = [
  {
    icon: Gauge,
    slug: "smart-water-metering",
    link: "/services/smart-water-metering",
    title: "Smart Water Metering",
    body: "End-to-end metering programmes — from procurement and installation to billing-grade consumption data.",
  },
  {
    icon: RadioTower,
    slug: "iot-infrastructure",
    link: "/services/iot-infrastructure",
    title: "IoT Infrastructure",
    body: "Low-power wide-area networks, gateways and telemetry platforms engineered for utility-grade reliability.",
  },
  {
    icon: Wrench,
    slug: "field-operations",
    link: "/services/field-operations",
    title: "Field Operations & Maintenance",
    body: "Deployed regional teams, asset lifecycle management and service levels held to measurable uptime targets.",
  },
  {
    icon: CircuitBoard,
    slug: "emerging-technologies",
    link: "/services/emerging-technologies",
    title: "Emerging Technologies",
    body: "Applied research into energy, mobility and environmental sensing as our infrastructure platform extends.",
  },
];

const DEFAULT_NEWS = [
  {
    date: "12 August 2026",
    title: "N3 Solutions Limited formally incorporated in Dhaka",
    summary:
      "The company is established to deliver metering and IoT infrastructure programmes for public utilities.",
  },
  {
    date: "27 July 2026",
    title: "Partnership proposal submitted to Chittagong WASA",
    summary:
      "A phased smart metering deployment covering priority distribution zones across the metropolitan network.",
  },
  {
    date: "09 July 2026",
    title: "Insight: reducing non-revenue water in South Asian utilities",
    summary:
      "How district metering and continuous telemetry convert distribution losses into recoverable revenue.",
  },
];

const DEFAULT_TEAM = [
  {
    name: "Nafis Rahman",
    title: "Managing Director",
    credential: "Infrastructure delivery, 18 years",
  },
  {
    name: "Naveed Hasan",
    title: "Director, Technology",
    credential: "IoT systems & network engineering",
  },
  {
    name: "Nusrat Karim",
    title: "Director, Operations",
    credential: "Utility programme management",
  },
];

const DEFAULT_HOMEPAGE_FAQS = [
  {
    question: "What specific infrastructure programmes does N3 Solutions engineer?",
    answer:
      "N3 Solutions designs, deploys, and maintains four integrated capability disciplines for public utilities and smart cities: (1) Smart Water Metering (AMI) with static ultrasonic meters, (2) IoT Infrastructure with private carrier-grade LPWAN (LoRaWAN & NB-IoT) networks, (3) Regional Field Operations & Maintenance with SLA-backed guarantees, and (4) Applied Emerging Technologies for acoustic AI leak detection and water quality telemetry.",
  },
  {
    question: "How does N3 Solutions help utilities reduce Non-Revenue Water (NRW)?",
    answer:
      "We implement District Metering Area (DMA) zoning that reconciles real-time bulk transmission inflow against aggregated consumer smart meter readings. By analyzing continuous Minimum Night Flow (MNF) between 02:00 and 04:00 alongside acoustic vibration loggers, our software pinpoints underground pipeline fissures and unmetered commercial consumption, converting distribution losses into recoverable billing revenue.",
  },
  {
    question: "What delivery model do you use for large-scale municipal rollouts?",
    answer:
      "We provide turnkey, end-to-end delivery models including DBFOM (Design, Build, Finance, Operate, Maintain) and Managed Services. N3 assumes direct responsibility for hardware procurement, RF network design, physical pipe installation, digital work order QA, MDMS billing integration, and multi-year 24/7 SLA maintenance.",
  },
  {
    question: "How are smart meters read when installed in deep or flood-prone subterranean pits?",
    answer:
      "Our static ultrasonic meters are hermetically sealed to IP68 standards (tested for continuous 3-meter underwater submersion). We utilize sub-GHz radio frequencies (868/923 MHz) and ruggedized pit-lid composite antennas that maintain link budgets exceeding 154 dB, ensuring 99.9%+ packet delivery even during severe monsoon inundation.",
  },
  {
    question: "How does N3 ensure compatibility with existing utility billing and ERP systems?",
    answer:
      "Our Meter Data Management System (MDMS) features enterprise connectors for SAP IS-U, Oracle CC&B, and custom WASA SQL billing databases. Data is ingested via high-throughput Apache Kafka pipelines, validated through automated VEE (Validation, Estimation, Editing) rules, and delivered via secure REST APIs or automated SFTP batch export.",
  },
  {
    question: "What regional coverage and field capacity does N3 maintain across Bangladesh?",
    answer:
      "N3 maintains active operating hubs and certified full-time field engineering teams across Dhaka, Chittagong, Rajshahi, Khulna, and Sylhet WASA jurisdictions. Each hub maintains a dedicated vehicle fleet, calibration rigs, and a minimum 5% active local spare parts buffer for rapid SLA response.",
  },
];

const DEFAULT_ABOUT_STATS = [
  { v: "32%", l: "Average non-revenue water in scope regions" },
  { v: "5", l: "WASA authorities engaged" },
  { v: "860k", l: "Metering points addressable" },
];

function SectionLabel({ children }: { children: string }) {
  return <p className="eyebrow">{children}</p>;
}

function Home() {
  const [solutions, setSolutions] = useState(DEFAULT_SOLUTIONS);
  const [news, setNews] = useState(DEFAULT_NEWS);
  const [team, setTeam] = useState(DEFAULT_TEAM);
  const [faqs, setFaqs] = useState(DEFAULT_HOMEPAGE_FAQS);
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [pageData, setPageData] = useState<ApiPageData | null>(null);

  useEffect(() => {
    fetchPage("/").then((page) => {
      if (page) {
        setPageData(page);
        if (page.content?.stats && Array.isArray(page.content.stats) && page.content.stats.length > 0) {
          setStats(page.content.stats);
        }
      }
    });

    fetchServices().then((apiServices) => {
      if (apiServices && apiServices.length > 0) {
        setSolutions(
          apiServices.map((s) => ({
            icon: s.icon,
            slug: s.slug,
            link: `/services/${s.slug}`,
            title: s.title,
            body: s.description || s.tagline || "",
          }))
        );
      }
    });

    fetchNews(3).then((apiNews) => {
      if (apiNews && apiNews.length > 0) {
        setNews(
          apiNews.map((n) => ({
            date: n.published_date_text || "",
            title: n.title,
            summary: n.summary,
          }))
        );
      }
    });

    fetchTeamMembers("executive").then((apiTeam) => {
      if (apiTeam && apiTeam.length > 0) {
        setTeam(
          apiTeam.map((t) => ({
            name: t.name,
            title: t.role,
            credential: t.credential || "",
          }))
        );
      }
    });

    fetchFaqs("homepage").then((apiFaqs) => {
      if (apiFaqs && apiFaqs.length > 0) {
        setFaqs(
          apiFaqs.map((f) => ({
            question: f.question,
            answer: f.answer,
          }))
        );
      }
    });
  }, []);

  const content = pageData?.content || {};
  const toggles = pageData?.section_toggles || {
    show_hero: true,
    show_stats_bar: true,
    show_capabilities: true,
    show_about_teaser: true,
    show_team_teaser: true,
    show_newsroom: true,
    show_faqs: true,
    show_cta: true,
  };

  return (
    <div id="top" className="min-h-screen bg-background font-sans text-foreground antialiased">
      <SiteHeader />

      <main>
        {/* 1. Hero */}
        {toggles.show_hero !== false && (
          <section className="relative overflow-hidden bg-surface pt-44 pb-28 lg:pt-52 lg:pb-36">
            <div className="rule-grid pointer-events-none absolute inset-0" aria-hidden="true" />
            <div
              className="pointer-events-none absolute top-0 right-0 h-full w-1/3 bg-gradient-to-b from-transparent via-transparent to-[color-mix(in_oklab,var(--color-accent-teal)_6%,transparent)]"
              aria-hidden="true"
            />
            <div className="relative mx-auto grid max-w-[1240px] gap-16 px-6 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:px-10">
              <div>
                <SectionLabel>{content.hero_eyebrow || "N3 Solutions Limited"}</SectionLabel>
                <h1 className="mt-7 max-w-4xl text-[2.6rem] leading-[1.05] font-semibold tracking-[-0.025em] text-navy sm:text-5xl lg:text-[3.75rem]">
                  {content.hero_title || "Engineering the infrastructure behind smarter cities"}
                </h1>
                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  {content.hero_subtitle ||
                    "We design, deploy and maintain metering and IoT infrastructure for utilities and public institutions — measured, connected and built to run at national scale."}
                </p>
                <div className="mt-11 flex flex-wrap items-center gap-5">
                  <Button variant="accent" size="xl" asChild>
                    <Link to={content.hero_cta_link || "/contact"}>
                      {content.hero_cta_text || "Start a conversation"} <ArrowRight />
                    </Link>
                  </Button>
                  <a
                    href="#capabilities"
                    className="text-sm font-medium tracking-[0.04em] text-navy underline-offset-8 transition-colors duration-200 hover:text-accent-teal hover:underline"
                  >
                    Explore our capabilities
                  </a>
                </div>
              </div>

              {/* Subtle engineering telemetry visual */}
              <HeroTelemetryVisual />
            </div>
          </section>
        )}

        {/* Trust / scale bar */}
        {toggles.show_stats_bar !== false && (
          <section className="border-y border-hairline bg-surface-muted">
            <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-px px-6 lg:grid-cols-4 lg:px-10">
              {stats.map((stat) => (
                <div key={stat.label} className="px-2 py-12 lg:px-8">
                  <p className="text-[2.1rem] leading-none font-semibold tracking-[-0.03em] text-navy lg:text-[2.6rem]">
                    {stat.value}
                  </p>
                  <p className="mt-4 text-[0.78rem] leading-snug tracking-[0.06em] text-muted-foreground uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 2. Capabilities */}
        {toggles.show_capabilities !== false && (
          <section id="capabilities" className="bg-background py-28 lg:py-36">
            <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
              <div className="max-w-3xl">
                <SectionLabel>{content.capabilities_eyebrow || "Capabilities"}</SectionLabel>
                <h2 className="mt-6 text-[2rem] leading-[1.12] font-semibold tracking-[-0.02em] text-navy lg:text-[2.75rem]">
                  {content.capabilities_title || "Four disciplines, one delivery model"}
                </h2>
              </div>

              <div className="mt-16 grid gap-px border border-hairline bg-hairline md:grid-cols-2 lg:grid-cols-4">
                {solutions.map(({ icon: Icon, title, body, link }) => (
                  <article
                    key={title}
                    className="group flex flex-col bg-surface p-9 transition-shadow duration-300 ease-out hover:shadow-[0_18px_40px_-28px_color-mix(in_oklab,var(--navy)_60%,transparent)]"
                  >
                    <Icon
                      strokeWidth={1.25}
                      className="size-7 text-accent-teal transition-colors duration-300"
                    />
                    <h3 className="mt-8 text-lg font-semibold tracking-[-0.01em] text-navy">
                      {title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{body}</p>
                    <Link
                      to={link}
                      className="mt-8 inline-flex items-center gap-2 pt-2 text-sm font-medium text-accent-teal transition-colors duration-200 group-hover:gap-3 hover:text-accent-teal-strong"
                    >
                      Learn more <ArrowRight className="size-4" strokeWidth={1.5} />
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 3. About Us */}
        {toggles.show_about_teaser !== false && (
          <section id="about" className="relative overflow-hidden bg-navy text-navy-foreground">
            <div className="mx-auto grid max-w-[1240px] gap-16 px-6 py-28 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:px-10 lg:py-36">
              <div>
                <p className="text-[0.6875rem] font-semibold tracking-[0.18em] text-accent-teal uppercase">
                  {content.about_eyebrow || "About N3 Solutions"}
                </p>
                <h2 className="mt-6 text-[2rem] leading-[1.12] font-semibold tracking-[-0.02em] lg:text-[2.75rem]">
                  {content.about_title || "A national metering upgrade, delivered zone by zone"}
                </h2>
                <p className="mt-7 max-w-xl leading-relaxed text-navy-foreground/70">
                  {content.about_text ||
                    "Water utilities across Bangladesh lose a material share of supply before it is ever billed. Our phased programme instruments distribution networks with connected meters, district-level telemetry and a maintained field organisation — converting unmeasured supply into accountable, recoverable revenue."}
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-5">
                  <Button variant="onNavy" size="xl" asChild>
                    <Link to={content.about_cta_link || "/about"}>
                      {content.about_cta_text || "About our organisation"} <ArrowRight />
                    </Link>
                  </Button>
                  <Link
                    to="/services/smart-water-metering"
                    className="text-sm font-medium tracking-[0.04em] text-accent-teal underline-offset-8 transition-colors duration-200 hover:text-surface hover:underline"
                  >
                    Explore metering programme
                  </Link>
                </div>
              </div>

              <div className="grid gap-px bg-[color-mix(in_oklab,var(--color-surface)_14%,transparent)] sm:grid-cols-2 lg:grid-cols-1">
                {(content.about_stats || DEFAULT_ABOUT_STATS).map((item: any) => (
                  <div key={item.l} className="bg-navy px-8 py-9">
                    <p className="text-[2.4rem] leading-none font-semibold tracking-[-0.03em] text-accent-teal">
                      {item.v}
                    </p>
                    <p className="mt-3 text-sm text-navy-foreground/65">{item.l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Institutional Partners Strip inside About */}
            <div className="border-t border-navy-deep/60 bg-navy-deep/80 py-16">
              <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
                <p className="text-center text-[0.6875rem] font-semibold tracking-[0.18em] text-navy-foreground/50 uppercase">
                  Backed by leading institutional partners and regional utilities
                </p>
                <div className="mt-8 grid grid-cols-2 gap-px border border-white/10 bg-white/5 sm:grid-cols-4">
                  {[
                    "Dhaka WASA Zones",
                    "Chittagong WASA",
                    "Institutional Backers",
                    "Global Metrology Partners",
                  ].map((p) => (
                    <div
                      key={p}
                      className="flex h-20 items-center justify-center bg-navy/60 px-4 text-center text-xs tracking-[0.12em] font-medium text-navy-foreground/75 uppercase"
                    >
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 4. Team */}
        {toggles.show_team_teaser !== false && (
          <section id="team" className="border-b border-hairline bg-surface py-28 lg:py-36">
            <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
              <SectionLabel>{content.team_eyebrow || "Leadership"}</SectionLabel>
              <h2 className="mt-6 max-w-2xl text-[2rem] leading-[1.12] font-semibold tracking-[-0.02em] text-navy lg:text-[2.75rem]">
                {content.team_title || "Founding partners"}
              </h2>

              <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                {team.map((person) => (
                  <div key={person.name}>
                    <div className="rule-grid flex aspect-4/5 items-center justify-center border border-hairline bg-surface-muted">
                      <span className="text-4xl font-light tracking-[0.1em] text-navy/25">
                        {person.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <h3 className="mt-6 text-base font-semibold tracking-[-0.01em] text-navy">
                      {person.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{person.title}</p>
                    <p className="mt-3 text-[0.78rem] tracking-[0.05em] text-muted-foreground/80 uppercase">
                      {person.credential}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 5. Latest News */}
        {toggles.show_newsroom !== false && (
          <section id="news" className="bg-background py-28 lg:py-36">
            <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <SectionLabel>{content.news_eyebrow || "Newsroom"}</SectionLabel>
                  <h2 className="mt-6 text-[2rem] leading-[1.12] font-semibold tracking-[-0.02em] text-navy lg:text-[2.75rem]">
                    {content.news_title || "Latest updates"}
                  </h2>
                </div>
                <a
                  href="#news"
                  className="text-sm font-medium tracking-[0.04em] text-navy transition-colors duration-200 hover:text-accent-teal"
                >
                  View all
                </a>
              </div>

              <div className="mt-16 grid gap-px border-t border-hairline bg-hairline md:grid-cols-3">
                {news.map((item) => (
                  <article
                    key={item.title}
                    className="group flex flex-col bg-background p-9 transition-colors duration-300 ease-out hover:bg-surface"
                  >
                    <p className="text-[0.7rem] font-medium tracking-[0.14em] text-muted-foreground uppercase">
                      {item.date}
                    </p>
                    <h3 className="mt-6 text-lg leading-snug font-semibold tracking-[-0.01em] text-navy">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {item.summary}
                    </p>
                    <a
                      href="#news"
                      className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent-teal transition-colors duration-200 hover:text-accent-teal-strong"
                    >
                      Read more <ArrowRight className="size-4" strokeWidth={1.5} />
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 6. Homepage FAQ Section */}
        {toggles.show_faqs !== false && (
          <section id="faq" className="border-t border-hairline bg-surface py-28 lg:py-36">
            <div className="mx-auto max-w-[960px] px-6 lg:px-10">
              <div className="text-center">
                <SectionLabel>{content.faq_eyebrow || "Frequently Asked Questions"}</SectionLabel>
                <h2 className="mt-6 text-[2rem] leading-[1.12] font-semibold tracking-[-0.02em] text-navy lg:text-[2.75rem]">
                  {content.faq_title || "Utility infrastructure & delivery"}
                </h2>
                <p className="mt-4 text-base text-muted-foreground">
                  {content.faq_subtitle ||
                    "Key questions on our deployment models, technology specifications, and regional operational capacity."}
                </p>
              </div>

              <div className="mt-16 rounded border border-hairline bg-background p-6 sm:p-9 shadow-xs">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, idx) => (
                    <AccordionItem key={idx} value={`home-faq-${idx}`} className="border-hairline">
                      <AccordionTrigger className="text-left font-semibold text-navy text-base py-5 hover:text-accent-teal">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm leading-relaxed text-muted-foreground pb-6">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>
        )}

        {/* 7. CTA */}
        {toggles.show_cta !== false && (
          <section id="contact" className="bg-navy-deep text-navy-foreground">
            <div className="mx-auto flex max-w-[1240px] flex-col items-start gap-10 px-6 py-24 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-28">
              <div>
                <h2 className="max-w-2xl text-[1.9rem] leading-[1.12] font-semibold tracking-[-0.02em] lg:text-[2.5rem]">
                  {content.cta_title || "Let's build the infrastructure Bangladesh needs"}
                </h2>
                <p className="mt-5 max-w-xl leading-relaxed text-navy-foreground/65">
                  {content.cta_subtitle ||
                    "Speak with our team about metering programmes, network deployment and long-term operations."}
                </p>
              </div>
              <Button variant="accent" size="xl" asChild>
                <Link to={content.cta_button_link || "/contact"}>
                  {content.cta_button_text || "Get in touch"} <ArrowRight />
                </Link>
              </Button>
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
