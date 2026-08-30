import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CircuitBoard, Gauge, RadioTower, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/n3/SiteHeader";
import { SiteFooter } from "@/components/n3/SiteFooter";
import { fetchServices, getIconComponent } from "@/lib/api";
import { ServiceItem } from "@/lib/servicesData";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — N3 Solutions Limited" },
      {
        name: "description",
        content:
          "Smart water metering, IoT infrastructure, field operations and emerging technology programmes — engineered and maintained by N3 Solutions Limited.",
      },
      { property: "og:title", content: "Services — N3 Solutions Limited" },
      {
        property: "og:description",
        content:
          "Smart water metering, IoT infrastructure, field operations and emerging technology programmes engineered for national-scale reliability.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});

const DEFAULT_SERVICES = [
  {
    icon: Gauge,
    slug: "smart-water-metering",
    title: "Smart Water Metering",
    body: "End-to-end metering programmes — procurement, installation, commissioning and billing-grade consumption data delivered as a managed service.",
    points: [
      "AMI/AMR metering deployment at city scale",
      "Consumption analytics and loss detection",
      "Billing-system integration and data assurance",
    ],
  },
  {
    icon: RadioTower,
    slug: "iot-infrastructure",
    title: "IoT Infrastructure",
    body: "Low-power wide-area networks, gateways and telemetry platforms engineered for utility-grade reliability and multi-decade service life.",
    points: [
      "LPWAN network design and rollout",
      "Gateway and sensor estate management",
      "Telemetry platforms with 24/7 monitoring",
    ],
  },
  {
    icon: Wrench,
    slug: "field-operations",
    title: "Field Operations & Maintenance",
    body: "Deployed regional teams, asset lifecycle management and service levels held to measurable, contractual uptime targets.",
    points: [
      "Regional field engineering teams",
      "Preventive and corrective maintenance",
      "SLA-backed response and reporting",
    ],
  },
  {
    icon: CircuitBoard,
    slug: "emerging-technologies",
    title: "Emerging Technologies",
    body: "Structured evaluation and piloting of new sensing, connectivity and data technologies — adopted only when they are proven in the field.",
    points: [
      "Technology assessment and piloting",
      "Standards and interoperability review",
      "Path-to-scale planning for proven systems",
    ],
  },
];

function Services() {
  const [services, setServices] = useState<
    {
      icon: any;
      slug: string;
      title: string;
      body: string;
      points: string[];
    }[]
  >(DEFAULT_SERVICES);

  useEffect(() => {
    fetchServices().then((apiServices) => {
      if (apiServices && apiServices.length > 0) {
        const mapped = apiServices.map((s: ServiceItem, idx: number) => {
          const fallback = DEFAULT_SERVICES.find((d) => d.slug === s.slug) || DEFAULT_SERVICES[idx] || DEFAULT_SERVICES[0];
          return {
            icon: s.icon || fallback.icon,
            slug: s.slug,
            title: s.title,
            body: s.tagline || s.description || fallback.body,
            points: fallback.points,
          };
        });
        setServices(mapped);
      }
    });
  }, []);

  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="border-b border-hairline bg-surface pt-40 pb-24">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
            <p className="text-[0.72rem] font-semibold tracking-[0.22em] text-accent-teal uppercase">
              Services
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl leading-[1.05] font-semibold tracking-tight text-navy lg:text-6xl">
              Capability across the full infrastructure lifecycle.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              From network design to decades of field maintenance, N3 Solutions delivers the systems
              public utilities rely on — and stands behind their performance.
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="py-28">
          <div className="mx-auto grid max-w-[1240px] gap-8 px-6 md:grid-cols-2 lg:px-10">
            {services.map((s) => (
              <article
                key={s.title}
                id={s.slug}
                className="scroll-mt-28 flex flex-col justify-between rounded-xl border border-hairline bg-surface p-9 shadow-[var(--shadow-card)] transition-shadow hover:shadow-md"
              >
                <div>
                  <s.icon className="h-7 w-7 text-accent-teal" strokeWidth={1.75} />
                  <h2 className="mt-5 text-2xl font-semibold tracking-tight text-navy">
                    {s.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{s.body}</p>
                  <ul className="mt-6 space-y-2.5 border-t border-hairline pt-6">
                    {s.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-3 text-sm text-foreground/80">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-teal" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 border-t border-hairline pt-6">
                  <Link
                    to={`/services/${s.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent-teal transition-colors hover:text-accent-teal-strong"
                  >
                    View detailed specification <ArrowRight className="size-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Engagement band */}
        <section className="bg-navy-deep py-28 text-navy-foreground">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight lg:text-4xl">
              How we engage
            </h2>
            <div className="mt-14 grid gap-10 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Assess",
                  body: "Site surveys, network studies and a specification grounded in field conditions.",
                },
                {
                  step: "02",
                  title: "Deploy",
                  body: "Phased installation and commissioning, with progress and quality reported throughout.",
                },
                {
                  step: "03",
                  title: "Operate",
                  body: "Managed operations and maintenance under measurable, contractual service levels.",
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="border-t border-[color-mix(in_oklab,var(--color-surface)_20%,transparent)] pt-6"
                >
                  <p className="text-sm font-semibold tracking-[0.2em] text-accent-teal">
                    {s.step}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-foreground/70">{s.body}</p>
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
                Scope a programme with our engineers.
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Tell us about your infrastructure objectives and we will respond with a considered
                assessment.
              </p>
            </div>
            <Button variant="accent" size="lg" asChild>
              <Link to="/contact">
                Get in touch <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
