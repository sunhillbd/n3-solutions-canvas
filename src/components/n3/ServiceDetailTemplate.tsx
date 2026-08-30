import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/n3/SiteHeader";
import { SiteFooter } from "@/components/n3/SiteFooter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ServiceItem } from "@/lib/servicesData";

interface ServiceDetailTemplateProps {
  service: ServiceItem;
}

export function ServiceDetailTemplate({ service }: ServiceDetailTemplateProps) {
  return (
    <div id="top" className="min-h-screen bg-background font-sans text-foreground antialiased">
      <SiteHeader />

      <main>
        {/* 1. Hero */}
        <section className="relative overflow-hidden bg-surface pt-44 pb-24 lg:pt-52 lg:pb-32">
          <div className="rule-grid pointer-events-none absolute inset-0" aria-hidden="true" />
          <div
            className="pointer-events-none absolute top-0 right-0 h-full w-1/3 bg-gradient-to-b from-transparent via-transparent to-[color-mix(in_oklab,var(--color-accent-teal)_6%,transparent)]"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-[1240px] px-6 lg:px-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.04em] text-muted-foreground transition-colors hover:text-navy mb-8"
            >
              <ArrowLeft className="size-3.5" /> All Services
            </Link>

            <div className="max-w-3xl">
              <p className="eyebrow">{service.eyebrow}</p>
              <h1 className="mt-6 text-[2.6rem] leading-[1.06] font-semibold tracking-[-0.025em] text-navy sm:text-5xl lg:text-[3.5rem]">
                {service.title}
              </h1>
              <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Button variant="accent" size="xl" asChild>
                  <Link to="/contact">
                    Start a conversation <ArrowRight />
                  </Link>
                </Button>
                <a
                  href="#capabilities"
                  className="text-sm font-medium tracking-[0.04em] text-navy underline-offset-8 transition-colors duration-200 hover:text-accent-teal hover:underline"
                >
                  Explore system architecture
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Key Metrics Bar */}
        <section className="border-y border-hairline bg-surface-muted">
          <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-px px-6 lg:grid-cols-4 lg:px-10">
            {service.metrics.map((m) => (
              <div key={m.label} className="px-2 py-12 lg:px-8">
                <p className="text-[2.1rem] leading-none font-semibold tracking-[-0.03em] text-navy lg:text-[2.6rem]">
                  {m.value}
                </p>
                <p className="mt-4 text-[0.78rem] leading-snug tracking-[0.06em] text-muted-foreground uppercase">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Core Subsystems / Capabilities */}
        <section id="capabilities" className="bg-background py-28 lg:py-36">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
            <div className="max-w-3xl">
              <p className="eyebrow">Architecture</p>
              <h2 className="mt-6 text-[2rem] leading-[1.12] font-semibold tracking-[-0.02em] text-navy lg:text-[2.75rem]">
                Core system pillars
              </h2>
            </div>

            <div className="mt-16 grid gap-px border border-hairline bg-hairline md:grid-cols-2">
              {service.pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <article
                    key={pillar.title}
                    className="flex flex-col justify-between bg-surface p-10 transition-shadow duration-300 ease-out hover:shadow-[0_18px_40px_-28px_color-mix(in_oklab,var(--navy)_60%,transparent)]"
                  >
                    <div>
                      <Icon
                        strokeWidth={1.25}
                        className="size-7 text-accent-teal transition-colors duration-300"
                      />
                      <h3 className="mt-8 text-xl font-semibold tracking-[-0.01em] text-navy">
                        {pillar.title}
                      </h3>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        {pillar.description}
                      </p>
                    </div>

                    <ul className="mt-8 space-y-3 border-t border-hairline pt-6">
                      {pillar.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm text-foreground/80">
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-teal" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. Phased Delivery Roadmap */}
        <section id="roadmap" className="border-t border-hairline bg-surface py-28 lg:py-36">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
            <div className="max-w-3xl">
              <p className="eyebrow">Programme Execution</p>
              <h2 className="mt-6 text-[2rem] leading-[1.12] font-semibold tracking-[-0.02em] text-navy lg:text-[2.75rem]">
                How we deliver
              </h2>
            </div>

            <div className="mt-16 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
              {service.lifecycle.map((phase) => (
                <div key={phase.step} className="bg-surface p-9">
                  <p className="text-sm font-semibold tracking-[0.2em] text-accent-teal">
                    {phase.step}
                  </p>
                  <h3 className="mt-5 text-lg font-semibold text-navy">{phase.phase}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {phase.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Technical FAQ Accordion */}
        <section id="faqs" className="border-t border-hairline bg-surface-muted py-28 lg:py-36">
          <div className="mx-auto max-w-[960px] px-6 lg:px-10">
            <div className="text-center">
              <p className="eyebrow">Frequently Asked Questions</p>
              <h2 className="mt-6 text-[2rem] leading-[1.12] font-semibold tracking-[-0.02em] text-navy lg:text-[2.75rem]">
                Technical considerations
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                Common questions on deployment, metrology, and data integration.
              </p>
            </div>

            <div className="mt-16 border border-hairline bg-surface p-6 sm:p-9 shadow-xs">
              <Accordion type="single" collapsible className="w-full">
                {service.faqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`faq-${idx}`} className="border-hairline">
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

        {/* 6. CTA */}
        <section id="contact" className="bg-navy-deep text-navy-foreground">
          <div className="mx-auto flex max-w-[1240px] flex-col items-start gap-10 px-6 py-24 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-28">
            <div>
              <h2 className="max-w-2xl text-[1.9rem] leading-[1.12] font-semibold tracking-[-0.02em] lg:text-[2.5rem]">
                Scope a programme with our engineers
              </h2>
              <p className="mt-5 max-w-xl leading-relaxed text-navy-foreground/65">
                Tell us about your infrastructure objectives and we will respond with a considered
                technical assessment.
              </p>
            </div>
            <Button variant="accent" size="xl" asChild>
              <Link to="/contact">
                Get in touch <ArrowRight />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
