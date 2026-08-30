import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/n3/SiteHeader";
import { SiteFooter } from "@/components/n3/SiteFooter";

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

const DETAILS = [
  { icon: MapPin, label: "Office", value: "Gulshan Avenue, Dhaka 1212, Bangladesh" },
  { icon: Mail, label: "Email", value: "contact@n3solutions.com" },
  { icon: Phone, label: "Telephone", value: "+880 2 000 0000" },
];

function Contact() {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <section className="border-b border-hairline bg-surface pt-40 pb-24">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
            <p className="text-[0.72rem] font-semibold tracking-[0.22em] text-accent-teal uppercase">
              Contact
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl leading-[1.05] font-semibold tracking-tight text-navy lg:text-6xl">
              Start a conversation with our engineers.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Tell us about your infrastructure objectives. We respond with a considered
              assessment, not a sales pitch.
            </p>
          </div>
        </section>

        <section className="py-28">
          <div className="mx-auto grid max-w-[1240px] gap-16 px-6 lg:grid-cols-[1fr_1.1fr] lg:px-10">
            <div className="space-y-8">
              {DETAILS.map((d) => (
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

            <form
              className="rounded-xl border border-hairline bg-surface p-9 shadow-[var(--shadow-card)]"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" name="name" />
                <Field label="Organisation" name="organisation" />
                <Field label="Email" name="email" type="email" />
                <Field label="Telephone" name="phone" />
              </div>
              <div className="mt-5">
                <label
                  htmlFor="message"
                  className="text-[0.6875rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="mt-2 w-full rounded-md border border-hairline bg-background px-3.5 py-2.5 text-sm outline-none transition-colors duration-200 focus:border-accent-teal"
                />
              </div>
              <Button variant="accent" size="lg" type="submit" className="mt-7">
                Send enquiry
              </Button>
            </form>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-[0.6875rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="mt-2 w-full rounded-md border border-hairline bg-background px-3.5 py-2.5 text-sm outline-none transition-colors duration-200 focus:border-accent-teal"
      />
    </div>
  );
}
