import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Clock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/n3/SiteHeader";
import { SiteFooter } from "@/components/n3/SiteFooter";
import { PageFaqSection } from "@/components/n3/PageFaqSection";
import { DynamicBlockRenderer } from "@/components/n3/DynamicBlockRenderer";
import { fetchPage, fetchSiteSettings, submitContactForm, ApiPageData, getIconComponent } from "@/lib/api";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — N3 Solutions Limited" },
      {
        name: "description",
        content:
          "Contact N3 Solutions Limited to scope a metering, IoT or field operations programme. Offices in Dhaka, Bangladesh.",
      },
      { property: "og:title", content: "Contact Us — N3 Solutions Limited" },
      {
        property: "og:description",
        content:
          "Speak with our engineers about metering, IoT and field operations programmes at national scale.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const DEFAULT_DETAILS = [
  { icon: MapPin, label: "Office", value: "Gulshan Avenue, Dhaka 1212, Bangladesh" },
  { icon: Mail, label: "Email", value: "contact@n3solutions.com" },
  { icon: Phone, label: "Telephone", value: "+880 2 000 0000" },
  { icon: Clock, label: "Hours", value: "Sunday – Thursday: 09:00 – 18:00 (BST)" },
];

function Contact() {
  const [details, setDetails] = useState(DEFAULT_DETAILS);
  const [pageData, setPageData] = useState<ApiPageData | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    organisation: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchPage("contact").then((page) => {
      if (page) {
        setPageData(page);
        const c = page.content || {};

        if (c.details_list && Array.isArray(c.details_list) && c.details_list.length > 0) {
          setDetails(
            c.details_list.map((d: any) => ({
              icon: getIconComponent(d.icon) || MapPin,
              label: d.label,
              value: d.value,
            }))
          );
        } else if (c.office_address || c.contact_email || c.contact_phone) {
          const list = [];
          if (c.office_address) list.push({ icon: MapPin, label: "Office", value: c.office_address });
          if (c.contact_email) list.push({ icon: Mail, label: "Email", value: c.contact_email });
          if (c.contact_phone) list.push({ icon: Phone, label: "Telephone", value: c.contact_phone });
          if (c.office_hours) list.push({ icon: Clock, label: "Hours", value: c.office_hours });
          setDetails(list);
        }
      }
    });

    fetchSiteSettings("footer").then((footer) => {
      if (footer && !pageData?.content?.office_address) {
        setDetails([
          {
            icon: MapPin,
            label: "Office",
            value: footer.office_address || "Gulshan Avenue, Dhaka 1212, Bangladesh",
          },
          {
            icon: Mail,
            label: "Email",
            value: footer.contact_email || "contact@n3solutions.com",
          },
          {
            icon: Phone,
            label: "Telephone",
            value: footer.contact_phone || "+880 2 000 0000",
          },
          {
            icon: Clock,
            label: "Hours",
            value: "Sunday – Thursday: 09:00 – 18:00 (BST)",
          },
        ]);
      }
    });
  }, []);

  const content = pageData?.content || {};
  const toggles = pageData?.section_toggles || {
    show_hero: true,
    show_contact_details: true,
    show_contact_form: true,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const result = await submitContactForm(formData);
    setIsSubmitting(false);

    if (result.success) {
      setSuccessMessage(
        result.message ||
          content.form_success_message ||
          "Thank you. Your inquiry has been received. Our engineering team will review and respond shortly."
      );
      setFormData({
        name: "",
        organisation: "",
        email: "",
        phone: "",
        message: "",
      });
    } else {
      setErrorMessage(result.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        {(() => {
          const defaultOrder = [
            "hero",
            "contact_details_and_form",
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
                  <section key="hero" className="border-b border-hairline bg-surface pt-40 pb-24">
                    <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
                      <p className="text-[0.72rem] font-semibold tracking-[0.22em] text-accent-teal uppercase">
                        {content.hero_eyebrow || "Contact"}
                      </p>
                      <h1 className="mt-5 max-w-3xl text-5xl leading-[1.05] font-semibold tracking-tight text-navy lg:text-6xl">
                        {content.hero_title || "Start a conversation with our engineers."}
                      </h1>
                      <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                        {content.hero_subtitle ||
                          "Tell us about your infrastructure objectives. We respond with a considered assessment, not a sales pitch."}
                      </p>
                    </div>
                  </section>
                ) : null;

              case "contact_details_and_form":
              case "contact_form":
                return (
                  <section key="contact_details_and_form" className="py-28">
                    <div className="mx-auto grid max-w-[1240px] gap-16 px-6 lg:grid-cols-[1fr_1.1fr] lg:px-10">
                      {toggles.show_contact_details !== false && (
                        <div className="space-y-8">
                          {details.map((d) => (
                            <div key={d.label} className="flex gap-4">
                              <d.icon className="mt-1 h-5 w-5 shrink-0 text-accent-teal" strokeWidth={1.75} />
                              <div>
                                <p className="text-[0.6875rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                                  {d.label}
                                </p>
                                <p className="mt-1.5 text-foreground/85">{d.value}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {toggles.show_contact_form !== false && (
                        <form
                          className="rounded-xl border border-hairline bg-surface p-9 shadow-[var(--shadow-card)]"
                          onSubmit={handleSubmit}
                        >
                          {successMessage && (
                            <div className="mb-6 flex items-start gap-3 rounded-lg border border-accent-teal/30 bg-accent-teal/10 p-4 text-accent-teal-strong">
                              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent-teal" />
                              <p className="text-sm font-medium">{successMessage}</p>
                            </div>
                          )}

                          {errorMessage && (
                            <div className="mb-6 flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-destructive">
                              <AlertCircle className="mt-0.5 size-5 shrink-0" />
                              <p className="text-sm font-medium">{errorMessage}</p>
                            </div>
                          )}

                          <div className="grid gap-5 sm:grid-cols-2">
                            <Field
                              label="Full name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                            />
                            <Field
                              label="Organisation"
                              name="organisation"
                              value={formData.organisation}
                              onChange={handleChange}
                            />
                            <Field
                              label="Email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                            <Field
                              label="Telephone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="mt-5">
                            <label
                              htmlFor="message"
                              className="text-[0.6875rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase"
                            >
                              Message <span className="text-destructive">*</span>
                            </label>
                            <textarea
                              id="message"
                              name="message"
                              rows={5}
                              value={formData.message}
                              onChange={handleChange}
                              required
                              placeholder="Scope, requirements or questions..."
                              className="mt-2 w-full rounded-md border border-hairline bg-background px-3.5 py-2.5 text-sm outline-none transition-colors duration-200 focus:border-accent-teal"
                            />
                          </div>
                          <Button
                            variant="accent"
                            size="lg"
                            type="submit"
                            className="mt-7"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="mr-2 size-4 animate-spin" /> Submitting...
                              </>
                            ) : (
                              content.form_button_text || "Send enquiry"
                            )}
                          </Button>
                        </form>
                      )}
                    </div>
                  </section>
                );

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

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-[0.6875rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase"
      >
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-2 w-full rounded-md border border-hairline bg-background px-3.5 py-2.5 text-sm outline-none transition-colors duration-200 focus:border-accent-teal"
      />
    </div>
  );
}
