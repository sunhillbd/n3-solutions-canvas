import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Compass, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/n3/SiteHeader";
import { SiteFooter } from "@/components/n3/SiteFooter";
import { fetchPage, ApiPageData, getIconComponent } from "@/lib/api";

export const Route = createFileRoute("/about/")({
  head: () => ({
    meta: [
      { title: "About Us — N3 Solutions Limited" },
      {
        name: "description",
        content:
          "N3 Solutions Limited is a technology and infrastructure company engineering metering, IoT and field operations for public utilities at national scale.",
      },
      { property: "og:title", content: "About Us — N3 Solutions Limited" },
      {
        property: "og:description",
        content:
          "A technology and infrastructure company engineering metering, IoT and field operations for public utilities at national scale.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const DEFAULT_STATS = [
  { value: "2019", label: "Founded in Dhaka" },
  { value: "5", label: "WASA regions in scope" },
  { value: "860,000+", label: "Target metering endpoints" },
  { value: "24/7", label: "Monitored network operations" },
];

const DEFAULT_PRINCIPLES = [
  {
    icon: Compass,
    title: "Engineered, not improvised",
    body: "Every programme begins with precise measurement, rigorous metrology specification, and a deployment plan that survives contact with challenging field conditions.",
  },
  {
    icon: ShieldCheck,
    title: "Accountable delivery",
    body: "Service levels, packet delivery rates, and field response obligations are contractual and SLA-backed — never aspirational.",
  },
  {
    icon: Building2,
    title: "Built for public infrastructure",
    body: "We design and deploy for utilities, municipalities, and government stakeholders where reliability is a critical public obligation.",
  },
];

const DEFAULT_MILESTONES = [
  { year: "2019", event: "N3 Solutions Limited founded in Dhaka with a focus on utility IoT." },
  { year: "2021", event: "First private carrier-grade LPWAN telemetry deployment commissioned." },
  { year: "2023", event: "Regional field operations expanded to cover five major WASA regions." },
  { year: "2025", event: "Smart metering programme scoped across 860,000+ municipal endpoints." },
];

function AboutPage() {
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [milestones, setMilestones] = useState(DEFAULT_MILESTONES);
  const [principles, setPrinciples] = useState(DEFAULT_PRINCIPLES);
  const [pageData, setPageData] = useState<ApiPageData | null>(null);

  useEffect(() => {
    fetchPage("about").then((page) => {
      if (page) {
        setPageData(page);
        if (page.content) {
          if (Array.isArray(page.content.stats) && page.content.stats.length > 0) {
            setStats(page.content.stats);
          }
          if (Array.isArray(page.content.milestones) && page.content.milestones.length > 0) {
            setMilestones(page.content.milestones);
          }
          if (Array.isArray(page.content.principles) && page.content.principles.length > 0) {
            setPrinciples(
              page.content.principles.map((p: any) => ({
                icon: getIconComponent(p.icon) || Compass,
                title: p.title,
                body: p.body,
              }))
            );
          }
        }
      }
    });
  }, []);

  const content = pageData?.content || {};
  const toggles = pageData?.section_toggles || {
    show_hero: true,
    show_stats_bar: true,
    show_who_we_are: true,
    show_timeline: true,
    show_cta: true,
  };

  return (
    <div id="top" className="min-h-screen bg-background font-sans text-foreground antialiased">
      <SiteHeader />

      <main>
        {/* 1. Hero */}
        {toggles.show_hero !== false && (
          <section className="relative overflow-hidden bg-surface pt-44 pb-24 lg:pt-52 lg:pb-32">
            <div className="rule-grid pointer-events-none absolute inset-0" aria-hidden="true" />
            <div
              className="pointer-events-none absolute top-0 right-0 h-full w-1/3 bg-gradient-to-b from-transparent via-transparent to-[color-mix(in_oklab,var(--color-accent-teal)_6%,transparent)]"
              aria-hidden="true"
            />

            <div className="relative mx-auto max-w-[1240px] px-6 lg:px-10">
              <div className="max-w-3xl">
                <p className="eyebrow">{content.hero_eyebrow || "Company Overview"}</p>
                <h1 className="mt-6 text-[2.6rem] leading-[1.06] font-semibold tracking-[-0.025em] text-navy sm:text-5xl lg:text-[3.5rem]">
                  {content.hero_title || "Engineering the infrastructure behind smarter utilities"}
                </h1>
                <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
                  {content.hero_subtitle ||
                    "N3 Solutions Limited is an infrastructure and technology engineering firm based in Dhaka, Bangladesh. We design, deploy, and maintain the metering, connectivity, and field operations that public utilities depend on — at national scale, to measurable standards."}
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-5">
                  <Button variant="accent" size="xl" asChild>
                    <Link to={content.hero_cta_link || "/contact"}>
                      {content.hero_cta_text || "Start a conversation"} <ArrowRight />
                    </Link>
                  </Button>
                  <Link
                    to="/about/mission-vision"
                    className="text-sm font-medium tracking-[0.04em] text-navy underline-offset-8 transition-colors duration-200 hover:text-accent-teal hover:underline"
                  >
                    Our Mission & Vision
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 2. Scale Bar */}
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

        {/* 3. Who We Are */}
        {toggles.show_who_we_are !== false && (
          <section className="bg-background py-28 lg:py-36">
            <div className="mx-auto grid max-w-[1240px] gap-16 px-6 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:px-10">
              <div>
                <p className="eyebrow">{content.who_we_are_eyebrow || "Identity & Focus"}</p>
                <h2 className="mt-6 text-[2rem] leading-[1.12] font-semibold tracking-[-0.02em] text-navy lg:text-[2.75rem]">
                  {content.who_we_are_title || "Built for the long term, measured by reliability"}
                </h2>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                  {content.who_we_are_text_1 ||
                    "We work where precision engineering meets public responsibility. Our teams deploy smart water metering, low-power IoT networks, and managed field operations for utilities and government stakeholders — programmes measured in hundreds of thousands of endpoints and decades of service life."}
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {content.who_we_are_text_2 ||
                    "We are deliberately structured for long-term operational resilience: in-house metrology engineering, full-time regional field teams, and supply-chain partnerships with tier-one global manufacturers. Reliability is not a feature of our work; it is the work."}
                </p>
              </div>

              <div className="space-y-6">
                {principles.map((p) => (
                  <div
                    key={p.title}
                    className="rounded border border-hairline bg-surface p-8 transition-shadow hover:shadow-xs"
                  >
                    <p.icon className="h-6 w-6 text-accent-teal" strokeWidth={1.5} />
                    <h3 className="mt-5 text-lg font-semibold text-navy">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 4. Timeline */}
        {toggles.show_timeline !== false && (
          <section className="bg-navy-deep py-28 text-navy-foreground">
            <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
              <p className="text-[0.6875rem] font-semibold tracking-[0.18em] text-accent-teal uppercase">
                {content.timeline_eyebrow || "Company Trajectory"}
              </p>
              <h2 className="mt-4 text-[2rem] leading-[1.12] font-semibold tracking-[-0.02em] lg:text-[2.75rem]">
                {content.timeline_title || "A measured, disciplined expansion"}
              </h2>
              <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                {milestones.map((m) => (
                  <div
                    key={m.year}
                    className="border-t border-[color-mix(in_oklab,var(--color-surface)_20%,transparent)] pt-6"
                  >
                    <p className="text-2xl font-semibold text-accent-teal">{m.year}</p>
                    <p className="mt-3 text-sm leading-relaxed text-navy-foreground/75">{m.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 5. CTA */}
        {toggles.show_cta !== false && (
          <section className="bg-surface py-28">
            <div className="mx-auto flex max-w-[1240px] flex-col items-start gap-8 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-navy">
                  {content.cta_title || "Scope a programme with our engineers."}
                </h2>
                <p className="mt-3 max-w-xl text-muted-foreground">
                  {content.cta_subtitle ||
                    "Tell us about your infrastructure objectives and we will respond with a considered technical assessment."}
                </p>
              </div>
              <Button variant="accent" size="lg" asChild>
                <Link to={content.cta_button_link || "/contact"}>
                  {content.cta_button_text || "Get in touch"} <ArrowRight className="ml-1 h-4 w-4" />
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
