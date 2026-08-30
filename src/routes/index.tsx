import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Gauge,
  RadioTower,
  Wrench,
  CircuitBoard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/n3/SiteHeader";
import { SiteFooter } from "@/components/n3/SiteFooter";

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

const STATS = [
  { value: "860,000+", label: "Addressable metering points" },
  { value: "5", label: "WASA regions in scope" },
  { value: "$191M", label: "Identified market opportunity" },
  { value: "24/7", label: "Monitored network operations" },
];

const SOLUTIONS = [
  {
    icon: Gauge,
    slug: "smart-water-metering",
    title: "Smart Water Metering",
    body: "End-to-end metering programmes — from procurement and installation to billing-grade consumption data.",
  },
  {
    icon: RadioTower,
    slug: "iot-infrastructure",
    title: "IoT Infrastructure",
    body: "Low-power wide-area networks, gateways and telemetry platforms engineered for utility-grade reliability.",
  },
  {
    icon: Wrench,
    slug: "field-operations",
    title: "Field Operations & Maintenance",
    body: "Deployed regional teams, asset lifecycle management and service levels held to measurable uptime targets.",
  },
  {
    icon: CircuitBoard,
    slug: "emerging-technologies",
    title: "Emerging Technologies",
    body: "Applied research into energy, mobility and environmental sensing as our infrastructure platform extends.",
  },
];

const NEWS = [
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

const TEAM = [
  { name: "Nafis Rahman", title: "Managing Director", credential: "Infrastructure delivery, 18 years" },
  { name: "Naveed Hasan", title: "Director, Technology", credential: "IoT systems & network engineering" },
  { name: "Nusrat Karim", title: "Director, Operations", credential: "Utility programme management" },
];

function SectionLabel({ children }: { children: string }) {
  return <p className="eyebrow">{children}</p>;
}

function Home() {
  return (
    <div id="top" className="min-h-screen bg-background font-sans text-foreground antialiased">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-surface pt-44 pb-28 lg:pt-52 lg:pb-36">
          <div className="rule-grid pointer-events-none absolute inset-0" aria-hidden="true" />
          <div
            className="pointer-events-none absolute top-0 right-0 h-full w-1/3 bg-gradient-to-b from-transparent via-transparent to-[color-mix(in_oklab,var(--color-accent-teal)_6%,transparent)]"
            aria-hidden="true"
          />
          <div className="relative mx-auto grid max-w-[1240px] gap-16 px-6 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:px-10">
            <div>
              <SectionLabel>N3 Solutions Limited</SectionLabel>
              <h1 className="mt-7 max-w-4xl text-[2.6rem] leading-[1.05] font-semibold tracking-[-0.025em] text-navy sm:text-5xl lg:text-[3.75rem]">
                Engineering the infrastructure behind smarter cities
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                We design, deploy and maintain metering and IoT infrastructure for utilities and
                public institutions — measured, connected and built to run at national scale.
              </p>
              <div className="mt-11 flex flex-wrap items-center gap-5">
                <Button variant="accent" size="xl" asChild>
                  <a href="#contact">
                    Start a conversation <ArrowRight />
                  </a>
                </Button>
                <a
                  href="#solutions"
                  className="text-sm font-medium tracking-[0.04em] text-navy underline-offset-8 transition-colors duration-200 hover:text-accent-teal hover:underline"
                >
                  Explore our capabilities
                </a>
              </div>
            </div>

            {/* Animated network visual */}
            <div className="relative hidden lg:block" aria-hidden="true">
              <div className="rule-grid animate-float-slow relative aspect-[5/6] max-h-[540px] w-full overflow-hidden border border-hairline bg-surface-muted/40">
                <svg
                  viewBox="0 0 400 480"
                  fill="none"
                  className="absolute inset-0 h-full w-full"
                  preserveAspectRatio="xMidYMid slice"
                >
                  {/* connection lines — slow dash drift */}
                  <g
                    stroke="var(--color-accent-teal)"
                    strokeOpacity="0.35"
                    strokeWidth="1"
                    strokeDasharray="4 8"
                    className="animate-line-dash"
                  >
                    <path d="M60 120 L200 200 L340 90" />
                    <path d="M200 200 L120 360" />
                    <path d="M200 200 L300 330 L340 90" />
                    <path d="M120 360 L300 330" />
                    <path d="M60 120 L200 40 L340 90" />
                  </g>
                  {/* pulsing nodes */}
                  <g fill="var(--color-accent-teal)">
                    <circle cx="60" cy="120" r="4" className="animate-node-pulse" />
                    <circle
                      cx="200"
                      cy="200"
                      r="5"
                      className="animate-node-pulse"
                      style={{ animationDelay: "0.6s" }}
                    />
                    <circle
                      cx="340"
                      cy="90"
                      r="4"
                      className="animate-node-pulse"
                      style={{ animationDelay: "1.2s" }}
                    />
                    <circle
                      cx="120"
                      cy="360"
                      r="4"
                      className="animate-node-pulse"
                      style={{ animationDelay: "1.8s" }}
                    />
                    <circle
                      cx="300"
                      cy="330"
                      r="4"
                      className="animate-node-pulse"
                      style={{ animationDelay: "2.4s" }}
                    />
                    <circle
                      cx="200"
                      cy="40"
                      r="3"
                      className="animate-node-pulse"
                      style={{ animationDelay: "3s" }}
                    />
                  </g>
                  {/* node rings */}
                  <g stroke="var(--color-navy)" strokeOpacity="0.18" strokeWidth="1">
                    <circle cx="200" cy="200" r="14" />
                    <circle cx="200" cy="200" r="26" />
                  </g>
                </svg>

                {/* telemetry readouts */}
                <div className="absolute bottom-6 left-6 flex items-center gap-2.5">
                  <span className="size-1.5 rounded-full bg-accent-teal animate-node-pulse" />
                  <span className="text-[0.65rem] font-medium tracking-[0.16em] text-muted-foreground uppercase">
                    Node 412 — online
                  </span>
                </div>
                <div className="absolute top-6 right-6 flex items-center gap-2.5">
                  <span
                    className="size-1.5 rounded-full bg-accent-teal animate-node-pulse"
                    style={{ animationDelay: "1.4s" }}
                  />
                  <span className="text-[0.65rem] font-medium tracking-[0.16em] text-muted-foreground uppercase">
                    Telemetry live
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust / scale bar */}
        <section className="border-y border-hairline bg-surface-muted">
          <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-px px-6 lg:grid-cols-4 lg:px-10">
            {STATS.map((stat) => (
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

        {/* Solutions */}
        <section id="solutions" className="bg-background py-28 lg:py-36">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
            <div className="max-w-3xl">
              <SectionLabel>Capabilities</SectionLabel>
              <h2 className="mt-6 text-[2rem] leading-[1.12] font-semibold tracking-[-0.02em] text-navy lg:text-[2.75rem]">
                Four disciplines, one delivery model
              </h2>
            </div>

            <div className="mt-16 grid gap-px border border-hairline bg-hairline md:grid-cols-2 lg:grid-cols-4">
              {SOLUTIONS.map(({ icon: Icon, title, body }) => (
                <article
                  key={title}
                  className="group bg-surface p-9 transition-shadow duration-300 ease-out hover:shadow-[0_18px_40px_-28px_color-mix(in_oklab,var(--navy)_60%,transparent)]"
                >
                  <Icon
                    strokeWidth={1.25}
                    className="size-7 text-accent-teal transition-colors duration-300"
                  />
                  <h3 className="mt-8 text-lg font-semibold tracking-[-0.01em] text-navy">
                    {title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Case study / credibility band */}
        <section id="industries" className="relative overflow-hidden bg-navy text-navy-foreground">
          <div className="mx-auto grid max-w-[1240px] gap-16 px-6 py-28 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:px-10 lg:py-36">
            <div>
              <p className="text-[0.6875rem] font-semibold tracking-[0.18em] text-accent-teal uppercase">
                Programme focus
              </p>
              <h2 className="mt-6 text-[2rem] leading-[1.12] font-semibold tracking-[-0.02em] lg:text-[2.75rem]">
                A national metering upgrade, delivered zone by zone
              </h2>
              <p className="mt-7 max-w-xl leading-relaxed text-navy-foreground/70">
                Water utilities across Bangladesh lose a material share of supply before it is ever
                billed. Our phased programme instruments distribution networks with connected
                meters, district-level telemetry and a maintained field organisation — converting
                unmeasured supply into accountable, recoverable revenue.
              </p>
              <Button variant="onNavy" size="xl" asChild className="mt-10">
                <a href="#contact">
                  Review the programme <ArrowRight />
                </a>
              </Button>
            </div>

            <div className="grid gap-px bg-[color-mix(in_oklab,var(--color-surface)_14%,transparent)] sm:grid-cols-2 lg:grid-cols-1">
              {[
                { v: "32%", l: "Average non-revenue water in scope regions" },
                { v: "5", l: "WASA authorities engaged" },
                { v: "860k", l: "Metering points addressable" },
              ].map((item) => (
                <div key={item.l} className="bg-navy px-8 py-9">
                  <p className="text-[2.4rem] leading-none font-semibold tracking-[-0.03em] text-accent-teal">
                    {item.v}
                  </p>
                  <p className="mt-3 text-sm text-navy-foreground/65">{item.l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* News */}
        <section id="news" className="bg-background py-28 lg:py-36">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <SectionLabel>Newsroom</SectionLabel>
                <h2 className="mt-6 text-[2rem] leading-[1.12] font-semibold tracking-[-0.02em] text-navy lg:text-[2.75rem]">
                  Latest updates
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
              {NEWS.map((item) => (
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

        {/* Team */}
        <section id="team" className="border-y border-hairline bg-surface py-28 lg:py-36">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
            <SectionLabel>Leadership</SectionLabel>
            <h2 className="mt-6 max-w-2xl text-[2rem] leading-[1.12] font-semibold tracking-[-0.02em] text-navy lg:text-[2.75rem]">
              Founding partners
            </h2>

            <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {TEAM.map((person) => (
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

        {/* Partners */}
        <section id="about" className="bg-background py-20">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
            <p className="text-center text-[0.6875rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              Backed by leading investors and institutional partners
            </p>
            <div className="mt-10 grid grid-cols-2 gap-px border border-hairline bg-hairline sm:grid-cols-4">
              {["Partner one", "Partner two", "Partner three", "Partner four"].map((p) => (
                <div
                  key={p}
                  className="flex h-24 items-center justify-center bg-background text-sm tracking-[0.14em] text-muted-foreground/50 uppercase"
                >
                  {p}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="bg-navy-deep text-navy-foreground">
          <div className="mx-auto flex max-w-[1240px] flex-col items-start gap-10 px-6 py-24 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-28">
            <div>
              <h2 className="max-w-2xl text-[1.9rem] leading-[1.12] font-semibold tracking-[-0.02em] lg:text-[2.5rem]">
                Let's build the infrastructure Bangladesh needs
              </h2>
              <p className="mt-5 max-w-xl leading-relaxed text-navy-foreground/65">
                Speak with our team about metering programmes, network deployment and long-term
                operations.
              </p>
            </div>
            <Button variant="accent" size="xl" asChild>
              <a href="mailto:contact@n3solutions.com">
                Get in touch <ArrowRight />
              </a>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
