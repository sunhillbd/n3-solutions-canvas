import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface PageFaqItem {
  question: string;
  answer: string;
}

interface PageFaqSectionProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  faqs?: PageFaqItem[];
  id?: string;
  className?: string;
}

export function PageFaqSection({
  eyebrow = "Frequently Asked Questions",
  title = "Frequently Asked Questions",
  subtitle,
  faqs,
  id = "faq",
  className = "border-t border-hairline bg-surface py-28 lg:py-36",
}: PageFaqSectionProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section id={id} className={className}>
      <div className="mx-auto max-w-[960px] px-6 lg:px-10">
        <div className="text-center">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-6 text-[2rem] leading-[1.12] font-semibold tracking-[-0.02em] text-navy lg:text-[2.75rem]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-base text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="mt-16 rounded border border-hairline bg-background p-6 sm:p-9 shadow-xs">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`page-faq-${idx}`} className="border-hairline">
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
