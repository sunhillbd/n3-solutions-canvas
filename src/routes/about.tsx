import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Building2, Compass, ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/n3/SiteHeader";
import { SiteFooter } from "@/components/n3/SiteFooter";

export const Route = createFileRoute("/about")({
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
  component: About,
});

const PRINCIPLES = [
  {
    icon: Compass,
    title: "Engineered, not improvised",
    body: "Every programme begins with measurement, specification and a deployment plan that survives contact with the field.",
  },
  {
    icon: ShieldCheck,
    title: "Accountable delivery",
    body: "Service levels, uptime targets and reporting obligations are contractual — not aspirational.",
  },
  {
    icon: Building2,
    title: "Built for public infrastructure",
    body: "We design for utilities, municipalities and government stakeholders where reliability is a public obligation.",
  },
];

const MILESTONES = [
  { year: "2019", event: "N3 Solutions Limited founded in Dhaka" },
  { year: "2021", event: "First utility telemetry deployment commissioned" },
  { year: "2023", event: "Regional field operations expanded to five WASA regions" },
  { year: "2025", event: "Smart metering programme scoped to 860,000+ metering points" },
];

function About() {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="border-b border-hairline bg-surface pt-40 pb-24">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
            <p className="text-[0.72rem] font-semibold tracking-[0.22em] text-accent-teal uppercase">
              About N3 Solutions
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl leading-[1.05] font-semibold tracking-tight text-navy lg:text-6xl">
              Infrastructure, engineered with intent.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              N3 Solutions Limited is a technology and infrastructure company. We design,
              deploy and maintain the metering, connectivity and field operations that
              public utilities depend on — at national scale, to measurable standards.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-28">
          <div className="mx-auto grid max-w-[1240px] gap-16 px-6 lg:grid-cols-[1.1fr_1fr] lg:px-10">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-navy lg:text-4xl">
                Who we are
              </h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                We work where engineering meets public responsibility. Our teams deploy
                smart water metering, low-power IoT networks and managed field operations
                for utilities and government stakeholders — programmes measured in
                hundreds of thousands of endpoints and decades of service life.
              </p>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                We are deliberately structured for the long term: in-house engineering,
                regional field teams, and supply-chain partnerships with established
                manufacturers. Reliability is not a feature of our work; it is the work.
              </p>
            </div>
            <div className="space-y-6">
              {PRINCIPLES.map((p) => (
                <div
                  key={p.title}
                  className="rounded-xl border border-hairline bg-surface p-7 shadow-[var(--shadow-card)]"
                >
                  <p.icon className="h-6 w-6 text-accent-teal" strokeWidth={1.75} />
                  <h3 className="mt-4 text-lg font-semibold text-navy">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline band */}
        <section className="bg-navy-deep py-28 text-navy-foreground">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
            <h2 className="text-3xl font-semibold tracking-tight lg:text-4xl">
              A measured trajectory
            </h2>
            <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {MILESTONES.map((m) => (
                <div key={m.year} className="border-t border-[color-mix(in_oklab,var(--color-surface)_20%,transparent)] pt-6">
                  <p className="text-2xl font-semibold text-accent-teal">{m.year}</p>
                  <p className="mt-3 text-sm leading-relaxed text-navy-foreground/70">{m.event}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-28">
          <div className="mx-auto flex max-w-[1240px] flex-col items-start gap-8 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-navy">
                Discuss a programme with our team.
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                We work with utilities, municipalities and enterprise clients on
                infrastructure that has to perform.
              </p>
            </div>
            <Button variant="accent" size="lg" asChild>
              <Link to="/contact">
                Contact us <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
