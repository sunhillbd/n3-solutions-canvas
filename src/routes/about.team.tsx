import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/n3/SiteHeader";
import { SiteFooter } from "@/components/n3/SiteFooter";
import { fetchTeamMembers, fetchPage, ApiTeamMember, ApiPageData } from "@/lib/api";

export const Route = createFileRoute("/about/team")({
  head: () => ({
    meta: [
      { title: "Our Team — N3 Solutions Limited" },
      {
        name: "description",
        content:
          "Meet the executive leadership, engineering directors, and field operations heads leading N3 Solutions Limited.",
      },
      { property: "og:title", content: "Our Team — N3 Solutions Limited" },
      {
        property: "og:description",
        content:
          "Decades of combined expertise across national utility programmes, IoT wireless systems, and regional field engineering.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TeamPage,
});

const DEFAULT_LEADERSHIP = [
  {
    name: "Nafis Rahman",
    role: "Managing Director",
    credential: "Infrastructure Delivery, 18+ Years",
    bio: "Over 18 years spearheading national-scale infrastructure delivery, public-private utility partnerships, and public sector engineering programmes in South Asia.",
    initials: "NR",
    photo_url: undefined,
  },
  {
    name: "Naveed Hasan",
    role: "Director, Technology",
    credential: "IoT Systems & Network Engineering",
    bio: "Specialist in embedded RF systems, sub-GHz wireless propagation, MDMS data pipelines, and carrier-grade LPWAN telecommunication infrastructure.",
    initials: "NH",
    photo_url: undefined,
  },
  {
    name: "Nusrat Karim",
    role: "Director, Operations",
    credential: "Utility Programme Management",
    bio: "Expert in large-scale workforce deployment, regional WASA field logistics, quality assurance compliance, and contractual SLA governance.",
    initials: "NK",
    photo_url: undefined,
  },
];

const DEFAULT_FUNCTIONAL_LEADS = [
  {
    role: "Head of Metrology & Quality Assurance",
    focus: "ISO 4064 testing, ultrasonic flow calibration rigs, and factory conformance audits.",
  },
  {
    role: "Lead RF & Network Systems Architect",
    focus:
      "Base station link-budget design, antenna mast rigging, and spectrum regulatory compliance.",
  },
  {
    role: "Regional Field Operations Manager",
    focus:
      "Coordination of regional field engineering units across Dhaka and Chittagong WASA zones.",
  },
  {
    role: "Principal MDMS & Software Engineer",
    focus:
      "Validation, estimation & editing (VEE) pipelines and direct utility billing ERP integration.",
  },
];

function TeamPage() {
  const [leadership, setLeadership] = useState(DEFAULT_LEADERSHIP);
  const [functionalLeads, setFunctionalLeads] = useState(DEFAULT_FUNCTIONAL_LEADS);
  const [pageData, setPageData] = useState<ApiPageData | null>(null);

  useEffect(() => {
    fetchPage("about/team").then((page) => {
      if (page) setPageData(page);
    });

    fetchTeamMembers().then((members: ApiTeamMember[]) => {
      if (members && members.length > 0) {
        const execs = members.filter((m) => m.category === "executive");
        if (execs.length > 0) {
          setLeadership(
            execs.map((m) => ({
              name: m.name,
              role: m.role,
              credential: m.credential || "",
              bio: m.bio || "",
              initials: m.initials,
              photo_url: m.photo_url,
            }))
          );
        }

        const leads = members.filter((m) => m.category === "functional_lead");
        if (leads.length > 0) {
          setFunctionalLeads(
            leads.map((m) => ({
              role: m.role || m.name,
              focus: m.bio || m.credential || "",
            }))
          );
        }
      }
    });
  }, []);

  const content = pageData?.content || {};
  const toggles = pageData?.section_toggles || {
    show_hero: true,
    show_executives: true,
    show_functional_leads: true,
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
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.04em] text-muted-foreground transition-colors hover:text-navy mb-8"
              >
                <ArrowLeft className="size-3.5" /> About N3 Solutions
              </Link>

              <div className="max-w-3xl">
                <p className="eyebrow">{content.hero_eyebrow || "Leadership & Engineering"}</p>
                <h1 className="mt-6 text-[2.6rem] leading-[1.06] font-semibold tracking-[-0.025em] text-navy sm:text-5xl lg:text-[3.5rem]">
                  {content.hero_title || "Practitioners, engineers, and operations leaders"}
                </h1>
                <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
                  {content.hero_subtitle ||
                    "Our team combines deep domain expertise across national utility programme management, sub-GHz wireless systems, and regional field workforce execution."}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* 2. Executive Leadership Grid */}
        {toggles.show_executives !== false && (
          <section className="border-y border-hairline bg-background py-28 lg:py-36">
            <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
              <div className="max-w-3xl">
                <p className="eyebrow">{content.team_eyebrow || "Executive Directors"}</p>
                <h2 className="mt-6 text-[2rem] leading-[1.12] font-semibold tracking-[-0.02em] text-navy lg:text-[2.75rem]">
                  {content.executives_title || content.team_title || "Founding partners"}
                </h2>
              </div>

              <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {leadership.map((person) => (
                  <div
                    key={person.name}
                    className="flex flex-col justify-between rounded border border-hairline bg-surface p-8 transition-shadow hover:shadow-sm"
                  >
                    <div>
                      <div className="rule-grid flex aspect-4/3 items-center justify-center border border-hairline bg-surface-muted rounded-xs overflow-hidden">
                        {person.photo_url ? (
                          <img src={person.photo_url} alt={person.name} className="h-full w-full object-cover" />
                        ) : (
                          <span className="text-4xl font-light tracking-[0.1em] text-navy/30">
                            {person.initials}
                          </span>
                        )}
                      </div>

                      <h3 className="mt-8 text-xl font-semibold text-navy">{person.name}</h3>
                      <p className="mt-1 text-sm font-medium text-accent-teal">{person.role}</p>
                      <p className="mt-2 font-mono text-[0.72rem] tracking-wider uppercase text-muted-foreground">
                        {person.credential}
                      </p>

                      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                        {person.bio}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 3. Functional Engineering Leads */}
        {toggles.show_functional_leads !== false && (
          <section className="bg-surface py-28 lg:py-36">
            <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
              <div className="max-w-3xl">
                <p className="eyebrow">Discipline Heads</p>
                <h2 className="mt-6 text-[2rem] leading-[1.12] font-semibold tracking-[-0.02em] text-navy lg:text-[2.75rem]">
                  {content.functional_leads_title || "Functional engineering leads"}
                </h2>
              </div>

              <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {functionalLeads.map((lead, idx) => (
                  <div
                    key={idx}
                    className="rounded border border-hairline bg-background p-7 transition-shadow hover:shadow-xs"
                  >
                    <p className="text-xs font-mono font-semibold text-accent-teal">0{idx + 1} // LEAD</p>
                    <h3 className="mt-4 text-base font-semibold text-navy">{lead.role}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{lead.focus}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 4. CTA */}
        {toggles.show_cta !== false && (
          <section className="bg-navy-deep py-28 text-navy-foreground">
            <div className="mx-auto flex max-w-[1240px] flex-col items-start gap-8 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight">
                  {content.cta_title || "Work with our engineering organisation."}
                </h2>
                <p className="mt-3 max-w-xl text-navy-foreground/75">
                  {content.cta_subtitle ||
                    "We engage directly with utility directors, municipal authorities, and development stakeholders."}
                </p>
              </div>
              <Button variant="accent" size="lg" asChild>
                <Link to={content.cta_button_link || "/contact"}>
                  {content.cta_button_text || "Contact the leadership team"} <ArrowRight className="ml-1 h-4 w-4" />
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
