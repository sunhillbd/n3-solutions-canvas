import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowLeft,
  Target,
  Eye,
  ShieldCheck,
  Cpu,
  Droplets,
  Landmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/n3/SiteHeader";
import { SiteFooter } from "@/components/n3/SiteFooter";
import { PageFaqSection } from "@/components/n3/PageFaqSection";
import { DynamicBlockRenderer } from "@/components/n3/DynamicBlockRenderer";
import { fetchPage, ApiPageData, getIconComponent } from "@/lib/api";

export const Route = createFileRoute("/about/mission-vision")({
  head: () => ({
    meta: [
      { title: "Our Mission & Vision — N3 Solutions Limited" },
      {
        name: "description",
        content:
          "The strategic mission, long-term vision, and core operating values driving N3 Solutions Limited.",
      },
      { property: "og:title", content: "Our Mission & Vision — N3 Solutions Limited" },
      {
        property: "og:description",
        content:
          "Transforming public utility infrastructure across Bangladesh through high-precision metrology, IoT connectivity, and operational excellence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MissionVisionPage,
});

const DEFAULT_VALUES = [
  {
    icon: Droplets,
    title: "Uncompromising Metrology & Data Integrity",
    description:
      "We treat consumption data as a public trust. Every meter, transponder, and calculation must meet billing-grade legal standards.",
  },
  {
    icon: ShieldCheck,
    title: "Contractual Accountability & SLA Discipline",
    description:
      "We hold ourselves to measurable, contract-backed performance metrics. If a network packet fails to deliver or a meter faults, we respond within hours.",
  },
  {
    icon: Cpu,
    title: "Engineering for Multi-Decade Longevity",
    description:
      "Public infrastructure cannot be replaced on consumer technology upgrade cycles. We engineer for 15+ years of continuous service under harsh conditions.",
  },
  {
    icon: Landmark,
    title: "Sovereign Local Capability",
    description:
      "We build resilient domestic engineering capacity, creating permanent in-country calibration, testing, and operations teams rather than relying on fly-in consultants.",
  },
];

function MissionVisionPage() {
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [pageData, setPageData] = useState<ApiPageData | null>(null);

  useEffect(() => {
    fetchPage("about/mission-vision").then((page) => {
      if (page) {
        setPageData(page);
        if (page.content?.values && Array.isArray(page.content.values) && page.content.values.length > 0) {
          setValues(
            page.content.values.map((v: any, idx: number) => ({
              icon: getIconComponent(v.icon) || DEFAULT_VALUES[idx]?.icon || ShieldCheck,
              title: v.title,
              description: v.description,
            }))
          );
        }
      }
    });
  }, []);

  const content = pageData?.content || {};
  const toggles = pageData?.section_toggles || {
    show_hero: true,
    show_mission_vision_boxes: true,
    show_values_grid: true,
    show_cta: true,
  };

  return (
    <div id="top" className="min-h-screen bg-background font-sans text-foreground antialiased">
      <SiteHeader />

      <main>
        {(() => {
          const defaultOrder = [
            "hero",
            "mission_vision_boxes",
            "values_grid",
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
                      <Link
                        to="/about"
                        className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.04em] text-muted-foreground transition-colors hover:text-navy mb-8"
                      >
                        <ArrowLeft className="size-3.5" /> About N3 Solutions
                      </Link>

                      <div className="max-w-3xl">
                        <p className="eyebrow">{content.hero_eyebrow || "Purpose & Strategic Intent"}</p>
                        <h1 className="mt-6 text-[2.6rem] leading-[1.06] font-semibold tracking-[-0.025em] text-navy sm:text-5xl lg:text-[3.5rem]">
                          {content.hero_title || "Our Mission & Vision"}
                        </h1>
                        <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
                          {content.hero_subtitle ||
                            "We exist to build the foundational metrology and connectivity infrastructure that allows public utilities to eliminate losses, achieve financial sustainability, and serve citizens reliably."}
                        </p>
                      </div>
                    </div>
                  </section>
                ) : null;

              case "mission_vision_boxes":
                return toggles.show_mission_vision_boxes !== false ? (
                  <section key="mission_vision_boxes" className="border-y border-hairline bg-background py-28 lg:py-36">
                    <div className="mx-auto grid max-w-[1240px] gap-12 px-6 md:grid-cols-2 lg:px-10">
                      <div className="rounded border border-hairline bg-surface p-10 lg:p-14 shadow-2xs">
                        <div className="flex size-14 items-center justify-center rounded border border-hairline bg-surface-muted text-accent-teal">
                          <Target className="size-7" strokeWidth={1.5} />
                        </div>
                        <p className="mt-8 font-mono text-xs font-semibold tracking-wider text-accent-teal uppercase">
                          Core Purpose
                        </p>
                        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-navy lg:text-3xl">
                          {content.mission_title || "Our Mission"}
                        </h2>
                        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                          {content.mission_text ||
                            "To modernize Bangladesh's public utility networks by deploying turnkey smart water metering and carrier-grade IoT infrastructure — backed by rigorous metrology, contractual SLA guarantees, and deployed regional field engineering teams."}
                        </p>
                      </div>

                      <div className="rounded border border-hairline bg-surface p-10 lg:p-14 shadow-2xs">
                        <div className="flex size-14 items-center justify-center rounded border border-hairline bg-surface-muted text-accent-teal">
                          <Eye className="size-7" strokeWidth={1.5} />
                        </div>
                        <p className="mt-8 font-mono text-xs font-semibold tracking-wider text-accent-teal uppercase">
                          Long-Term Horizon
                        </p>
                        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-navy lg:text-3xl">
                          {content.vision_title || "Our Vision"}
                        </h2>
                        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                          {content.vision_text ||
                            "To establish Bangladesh as a regional benchmark for utility efficiency across South Asia, where zero non-revenue water is lost to unmeasured leaks, every drop is accounted for, and municipal systems operate autonomously with 99.9%+ digital assurance."}
                        </p>
                      </div>
                    </div>
                  </section>
                ) : null;

              case "values_grid":
                return toggles.show_values_grid !== false ? (
                  <section key="values_grid" className="bg-surface py-28 lg:py-36">
                    <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
                      <div className="max-w-3xl">
                        <p className="eyebrow">{content.values_eyebrow || "Operating Principles"}</p>
                        <h2 className="mt-6 text-[2rem] leading-[1.12] font-semibold tracking-[-0.02em] text-navy lg:text-[2.75rem]">
                          {content.values_title || "The values that govern our delivery"}
                        </h2>
                        <p className="mt-4 text-base text-muted-foreground">
                          These principles guide every RF study, meter calibration, and field deployment we
                          undertake.
                        </p>
                      </div>

                      <div className="mt-16 grid gap-8 md:grid-cols-2">
                        {values.map((val) => {
                          const Icon = val.icon;
                          return (
                            <div
                              key={val.title}
                              className="flex flex-col justify-between rounded border border-hairline bg-background p-8 transition-shadow hover:shadow-xs"
                            >
                              <div>
                                <Icon className="size-6 text-accent-teal" strokeWidth={1.5} />
                                <h3 className="mt-6 text-lg font-semibold text-navy">{val.title}</h3>
                                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                  {val.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
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
                  <section key="cta" className="bg-navy-deep py-28 text-navy-foreground">
                    <div className="mx-auto flex max-w-[1240px] flex-col items-start gap-8 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
                      <div>
                        <h2 className="text-3xl font-semibold tracking-tight">
                          {content.cta_title || "Align your utility objectives with our team."}
                        </h2>
                        <p className="mt-3 max-w-xl text-navy-foreground/75">
                          {content.cta_subtitle ||
                            "We provide feasibility analyses, DMA demarcation plans, and turnkey pilot proposals."}
                        </p>
                      </div>
                      <Button variant="accent" size="lg" asChild>
                        <Link to={content.cta_button_link || "/contact"}>
                          {content.cta_button_text || "Contact our engineers"} <ArrowRight className="ml-1 h-4 w-4" />
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
