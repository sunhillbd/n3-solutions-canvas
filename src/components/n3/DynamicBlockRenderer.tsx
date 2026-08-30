import React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getIconComponent } from "@/lib/api";

export interface DynamicBlock {
  type: string;
  data: Record<string, any>;
}

interface DynamicBlockRendererProps {
  blocks?: DynamicBlock[];
}

export function DynamicBlockRenderer({ blocks }: DynamicBlockRendererProps) {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col">
      {blocks.map((block, index) => {
        if (!block || !block.type) return null;
        if (block.data?.is_visible === false) return null;

        switch (block.type) {
          case "zigzag_split":
            return <ZigzagBlock key={`zigzag-${index}`} data={block.data} index={index} />;
          case "card_grid":
            return <CardGridBlock key={`cards-${index}`} data={block.data} />;
          case "stats_bar":
            return <StatsBarBlock key={`stats-${index}`} data={block.data} />;
          case "rich_text":
            return <RichTextBlock key={`prose-${index}`} data={block.data} />;
          case "quote_highlight":
            return <QuoteBlock key={`quote-${index}`} data={block.data} />;
          case "logo_strip":
            return <LogoStripBlock key={`logos-${index}`} data={block.data} />;
          case "cta_banner":
            return <CtaBannerBlock key={`cta-${index}`} data={block.data} />;
          case "faq_accordion":
            return <FaqAccordionBlock key={`faq-${index}`} data={block.data} index={index} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

/* 1. Zigzag / Feature Split Block */
function ZigzagBlock({ data, index }: { data: Record<string, any>; index: number }) {
  const isImageLeft = data.image_position === "left";
  const bgClass =
    data.background_style === "navy"
      ? "bg-navy-deep text-navy-foreground"
      : data.background_style === "surface"
      ? "bg-surface text-foreground"
      : "bg-background text-foreground";

  const isDark = data.background_style === "navy";

  return (
    <section className={`border-t border-hairline py-24 lg:py-32 ${bgClass}`}>
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <div
          className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
            isImageLeft ? "lg:grid-flow-dense" : ""
          }`}
        >
          {/* Text Content Column */}
          <div className={isImageLeft ? "lg:col-start-2" : ""}>
            {data.eyebrow && (
              <p
                className={
                  isDark
                    ? "text-[0.6875rem] font-semibold tracking-[0.18em] text-accent-teal uppercase"
                    : "eyebrow"
                }
              >
                {data.eyebrow}
              </p>
            )}
            <h2
              className={`mt-4 text-[2rem] leading-[1.12] font-semibold tracking-[-0.02em] lg:text-[2.6rem] ${
                isDark ? "text-white" : "text-navy"
              }`}
            >
              {data.heading}
            </h2>
            {data.body && (
              <p
                className={`mt-6 text-base leading-relaxed whitespace-pre-line ${
                  isDark ? "text-navy-foreground/80" : "text-muted-foreground"
                }`}
              >
                {data.body}
              </p>
            )}

            {/* Bullet Points */}
            {data.bullet_points && Array.isArray(data.bullet_points) && data.bullet_points.length > 0 && (
              <ul className="mt-8 space-y-3">
                {data.bullet_points.map((pt: string, pIdx: number) => (
                  <li key={pIdx} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="size-4.5 shrink-0 text-accent-teal mt-0.5" />
                    <span className={isDark ? "text-navy-foreground/90" : "text-foreground"}>
                      {pt}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {/* Stat Badge */}
            {data.stat_badge_value && (
              <div
                className={`mt-8 inline-flex items-center gap-4 rounded border p-4 ${
                  isDark
                    ? "border-white/10 bg-white/5"
                    : "border-hairline bg-surface-muted shadow-2xs"
                }`}
              >
                <p className="text-2xl font-bold tracking-tight text-accent-teal">
                  {data.stat_badge_value}
                </p>
                {data.stat_badge_label && (
                  <p
                    className={`text-xs font-medium tracking-wide uppercase ${
                      isDark ? "text-white/70" : "text-muted-foreground"
                    }`}
                  >
                    {data.stat_badge_label}
                  </p>
                )}
              </div>
            )}

            {/* CTA Button */}
            {data.button_text && (
              <div className="mt-10">
                <Button variant={isDark ? "accent" : "default"} size="lg" asChild>
                  <Link to={data.button_link || "/contact"}>
                    {data.button_text} <ArrowRight className="ml-1 size-4" />
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Media / Image Column */}
          <div className={isImageLeft ? "lg:col-start-1" : ""}>
            {data.image ? (
              <div className="relative overflow-hidden rounded-lg border border-hairline shadow-md aspect-4/3 bg-surface-muted">
                <img
                  src={data.image.startsWith("http") ? data.image : `/storage/${data.image}`}
                  alt={data.heading || "Feature illustration"}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="flex aspect-4/3 flex-col items-center justify-center rounded-lg border border-dashed border-hairline bg-surface-muted/60 p-10 text-center">
                <div className="flex size-14 items-center justify-center rounded-full bg-accent-teal/10 text-accent-teal mb-4">
                  <ChevronRight className="size-7" />
                </div>
                <p className="text-sm font-semibold text-navy">
                  {data.heading || "Engineering Highlight"}
                </p>
                <p className="mt-2 text-xs text-muted-foreground max-w-xs">
                  {data.body ? data.body.substring(0, 90) + "..." : "Field deployment and infrastructure systems."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* 2. Card Grid Block */
function CardGridBlock({ data }: { data: Record<string, any> }) {
  const cols = data.columns === "2" ? "md:grid-cols-2" : data.columns === "4" ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3";
  const bgClass =
    data.background_style === "navy"
      ? "bg-navy-deep text-navy-foreground"
      : data.background_style === "surface"
      ? "bg-surface text-foreground"
      : "bg-background text-foreground";
  const isDark = data.background_style === "navy";

  const cards = data.cards || [];

  return (
    <section className={`border-t border-hairline py-24 lg:py-32 ${bgClass}`}>
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <div className="max-w-3xl">
          {data.eyebrow && (
            <p className={isDark ? "text-[0.6875rem] font-semibold tracking-[0.18em] text-accent-teal uppercase" : "eyebrow"}>
              {data.eyebrow}
            </p>
          )}
          <h2 className={`mt-4 text-[2rem] leading-[1.12] font-semibold tracking-[-0.02em] lg:text-[2.6rem] ${isDark ? "text-white" : "text-navy"}`}>
            {data.heading}
          </h2>
          {data.subtitle && (
            <p className={`mt-4 text-base leading-relaxed ${isDark ? "text-navy-foreground/75" : "text-muted-foreground"}`}>
              {data.subtitle}
            </p>
          )}
        </div>

        {cards.length > 0 && (
          <div className={`mt-16 grid gap-6 ${cols}`}>
            {cards.map((card: any, idx: number) => {
              const Icon = getIconComponent(card.icon);
              return (
                <div
                  key={idx}
                  className={`flex flex-col justify-between rounded border p-8 transition-all hover:shadow-xs ${
                    isDark
                      ? "border-white/10 bg-white/5 hover:border-white/20"
                      : "border-hairline bg-surface hover:border-border"
                  }`}
                >
                  <div>
                    {Icon && <Icon className="size-6 text-accent-teal mb-5" strokeWidth={1.75} />}
                    {card.tag && (
                      <p className="font-mono text-xs font-semibold text-accent-teal tracking-wider mb-2">
                        {card.tag}
                      </p>
                    )}
                    <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-navy"}`}>
                      {card.title}
                    </h3>
                    <p className={`mt-3 text-sm leading-relaxed ${isDark ? "text-navy-foreground/75" : "text-muted-foreground"}`}>
                      {card.description}
                    </p>

                    {card.features && Array.isArray(card.features) && card.features.length > 0 && (
                      <ul className="mt-5 space-y-2 border-t border-hairline/50 pt-4 text-xs">
                        {card.features.map((f: string, fIdx: number) => (
                          <li key={fIdx} className="flex items-center gap-2">
                            <span className="size-1.5 rounded-full bg-accent-teal" />
                            <span className={isDark ? "text-white/80" : "text-foreground/80"}>{f}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {card.link_text && (
                    <div className="mt-8 pt-4">
                      <Link
                        to={card.link_url || "/contact"}
                        className="inline-flex items-center text-xs font-semibold tracking-wider text-accent-teal hover:underline uppercase"
                      >
                        {card.link_text} <ChevronRight className="ml-1 size-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

/* 3. Stats Bar Block */
function StatsBarBlock({ data }: { data: Record<string, any> }) {
  const stats = data.stats || [];
  const isNavy = data.background_style === "navy";
  const bgClass = isNavy ? "bg-navy-deep text-navy-foreground" : "bg-surface-muted text-foreground";

  return (
    <section className={`border-y border-hairline ${bgClass}`}>
      <div className="mx-auto max-w-[1240px] px-6 py-14 lg:px-10">
        {(data.heading || data.subtitle) && (
          <div className="mb-10 text-center">
            {data.heading && (
              <h3 className={`text-xl font-semibold ${isNavy ? "text-white" : "text-navy"}`}>
                {data.heading}
              </h3>
            )}
            {data.subtitle && (
              <p className={`mt-2 text-sm ${isNavy ? "text-white/70" : "text-muted-foreground"}`}>
                {data.subtitle}
              </p>
            )}
          </div>
        )}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s: any, idx: number) => (
            <div key={idx} className="flex flex-col">
              <p className={`text-3xl font-semibold tracking-tight lg:text-4xl ${isNavy ? "text-accent-teal" : "text-navy"}`}>
                {s.value}
              </p>
              <p className={`mt-2 text-xs font-semibold tracking-wider uppercase ${isNavy ? "text-white/80" : "text-muted-foreground"}`}>
                {s.label}
              </p>
              {s.subtext && (
                <p className={`mt-1 text-xs ${isNavy ? "text-white/50" : "text-muted-foreground/75"}`}>
                  {s.subtext}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 4. Rich Text / Editorial Article Block */
function RichTextBlock({ data }: { data: Record<string, any> }) {
  const layout = data.layout || "centered";
  const maxWidth = layout === "wide" ? "max-w-[1240px]" : layout === "two_column" ? "max-w-[1240px]" : "max-w-[840px]";

  return (
    <section className="border-t border-hairline bg-surface py-24 lg:py-32">
      <div className={`mx-auto px-6 lg:px-10 ${maxWidth}`}>
        {data.eyebrow && <p className="eyebrow text-center">{data.eyebrow}</p>}
        {data.heading && (
          <h2 className="mt-4 text-center text-[2rem] leading-[1.14] font-semibold tracking-[-0.02em] text-navy lg:text-[2.6rem]">
            {data.heading}
          </h2>
        )}
        {data.lead_paragraph && (
          <p className="mt-6 text-center text-lg leading-relaxed text-navy font-medium max-w-2xl mx-auto">
            {data.lead_paragraph}
          </p>
        )}

        {data.content && (
          <div className={`mt-12 prose prose-slate max-w-none text-muted-foreground ${layout === "two_column" ? "columns-1 md:columns-2 gap-12" : ""}`}>
            <div className="whitespace-pre-line leading-relaxed">{data.content}</div>
          </div>
        )}
      </div>
    </section>
  );
}

/* 5. Quote / Testimonial Block */
function QuoteBlock({ data }: { data: Record<string, any> }) {
  const isDark = data.background_style === "navy";
  const bgClass = isDark ? "bg-navy-deep text-white" : "bg-surface text-foreground";

  return (
    <section className={`border-t border-hairline py-24 lg:py-32 ${bgClass}`}>
      <div className="mx-auto max-w-[960px] px-6 text-center lg:px-10">
        <Quote className="mx-auto size-10 text-accent-teal opacity-50 mb-8" />
        <blockquote className="text-xl font-medium leading-relaxed sm:text-2xl lg:text-3xl tracking-[-0.01em]">
          "{data.quote_text}"
        </blockquote>
        {(data.author_name || data.author_organization) && (
          <div className="mt-8 flex flex-col items-center justify-center">
            {data.author_name && (
              <p className="font-semibold text-base text-accent-teal">{data.author_name}</p>
            )}
            <p className={`text-xs mt-1 ${isDark ? "text-white/70" : "text-muted-foreground"}`}>
              {[data.author_role, data.author_organization].filter(Boolean).join(" — ")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/* 6. Logo Strip Block */
function LogoStripBlock({ data }: { data: Record<string, any> }) {
  const logos = data.logos || [];

  return (
    <section className="border-t border-hairline bg-surface-muted py-16">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        {data.title && (
          <p className="text-center text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase mb-10">
            {data.title}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {logos.map((logo: any, idx: number) => (
            <div key={idx} className="flex flex-col items-center">
              {logo.logo_image ? (
                <img
                  src={logo.logo_image.startsWith("http") ? logo.logo_image : `/storage/${logo.logo_image}`}
                  alt={logo.name || "Partner"}
                  className="h-10 max-w-[140px] object-contain opacity-70 transition-opacity hover:opacity-100"
                />
              ) : (
                <div className="rounded border border-hairline bg-surface px-4 py-2 text-xs font-semibold text-navy">
                  {logo.name}
                </div>
              )}
              {logo.subtitle && (
                <p className="text-[10px] text-muted-foreground mt-1">{logo.subtitle}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 7. Call To Action Banner Block */
function CtaBannerBlock({ data }: { data: Record<string, any> }) {
  const isNavy = data.background_style !== "surface";
  const bgClass = isNavy ? "bg-navy-deep text-navy-foreground" : "bg-surface text-foreground";

  return (
    <section className={`border-t border-hairline py-24 lg:py-28 ${bgClass}`}>
      <div className="mx-auto flex max-w-[1240px] flex-col items-start gap-10 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="max-w-2xl">
          {data.eyebrow && (
            <p className={isNavy ? "text-[0.6875rem] font-semibold tracking-[0.18em] text-accent-teal uppercase mb-3" : "eyebrow mb-3"}>
              {data.eyebrow}
            </p>
          )}
          <h2 className="text-[1.9rem] leading-[1.12] font-semibold tracking-[-0.02em] lg:text-[2.5rem]">
            {data.heading}
          </h2>
          {data.subtitle && (
            <p className={`mt-4 text-base leading-relaxed ${isNavy ? "text-navy-foreground/75" : "text-muted-foreground"}`}>
              {data.subtitle}
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="accent" size="xl" asChild>
            <Link to={data.primary_btn_link || "/contact"}>
              {data.primary_btn_text || "Get in touch"} <ArrowRight />
            </Link>
          </Button>
          {data.secondary_btn_text && (
            <Button variant={isNavy ? "outline" : "secondary"} size="xl" asChild>
              <Link to={data.secondary_btn_link || "/services"}>
                {data.secondary_btn_text}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

/* 8. FAQ Accordion Block */
function FaqAccordionBlock({ data, index }: { data: Record<string, any>; index: number }) {
  const faqs = data.faqs || [];
  if (faqs.length === 0) return null;

  return (
    <section className="border-t border-hairline bg-surface py-28 lg:py-36">
      <div className="mx-auto max-w-[960px] px-6 lg:px-10">
        <div className="text-center">
          {data.eyebrow && <p className="eyebrow">{data.eyebrow}</p>}
          <h2 className="mt-6 text-[2rem] leading-[1.12] font-semibold tracking-[-0.02em] text-navy lg:text-[2.75rem]">
            {data.heading || "Frequently Asked Questions"}
          </h2>
          {data.subtitle && (
            <p className="mt-4 text-base text-muted-foreground max-w-2xl mx-auto">
              {data.subtitle}
            </p>
          )}
        </div>

        <div className="mt-16 rounded border border-hairline bg-background p-6 sm:p-9 shadow-xs">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq: any, idx: number) => (
              <AccordionItem key={idx} value={`dynamic-faq-${index}-${idx}`} className="border-hairline">
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
  );
}
