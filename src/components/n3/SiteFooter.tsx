import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { fetchSiteSettings } from "@/lib/api";

const COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" as const },
      { label: "Mission & Vision", to: "/about/mission-vision" as const },
      { label: "Our Team", to: "/about/team" as const },
      { label: "Partners", to: "/partners" as const },
      { label: "Contact", to: "/contact" as const },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Smart Water Metering", to: "/services/smart-water-metering" as const },
      { label: "IoT Infrastructure", to: "/services/iot-infrastructure" as const },
      { label: "Field Operations", to: "/services/field-operations" as const },
      { label: "Emerging Technologies", to: "/services/emerging-technologies" as const },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Capabilities", to: "/services" as const },
      { label: "Partners Ecosystem", to: "/partners" as const },
      { label: "Engineering Scope", to: "/contact" as const },
      { label: "Direct Inquiries", to: "/contact" as const },
    ],
  },
];

export function SiteFooter() {
  const [footerData, setFooterData] = useState<{
    tagline?: string;
    office_address?: string;
    contact_email?: string;
    contact_phone?: string;
    copyright_text?: string;
    columns?: { title: string; links: { label: string; url: string }[] }[];
  }>({
    tagline: "Engineering measured, connected and maintainable infrastructure at national scale.",
    office_address: "Gulshan Avenue, Dhaka 1212, Bangladesh",
    contact_email: "contact@n3solutions.com",
    contact_phone: "+880 2 000 0000",
    copyright_text: "© 2026 N3 Solutions Limited. All rights reserved.",
  });

  useEffect(() => {
    fetchSiteSettings("footer").then((data) => {
      if (data) {
        setFooterData((prev) => ({
          ...prev,
          ...data,
        }));
      }
    });
  }, []);

  return (
    <footer className="bg-navy-deep text-navy-foreground">
      <div className="mx-auto max-w-[1240px] px-6 py-20 lg:px-10">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Link to="/" aria-label="N3 Solutions Limited home">
              <Logo reversed />
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-navy-foreground/60">
              {footerData.tagline || "Engineering measured, connected and maintainable infrastructure at national scale."}
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-[0.6875rem] font-semibold tracking-[0.18em] text-navy-foreground/45 uppercase">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-navy-foreground/75 transition-colors duration-200 hover:text-accent-teal"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-[0.6875rem] font-semibold tracking-[0.18em] text-navy-foreground/45 uppercase">
              Contact
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-navy-foreground/75">
              <li>{footerData.office_address?.split(",")[0] || "Gulshan Avenue, Dhaka 1212"}</li>
              <li>{footerData.office_address?.split(",")[1] || "Bangladesh"}</li>
              <li>
                <a
                  href={`mailto:${footerData.contact_email || "contact@n3solutions.com"}`}
                  className="transition-colors duration-200 hover:text-accent-teal"
                >
                  {footerData.contact_email || "contact@n3solutions.com"}
                </a>
              </li>
              <li className="font-mono text-xs">{footerData.contact_phone || "+880 2 000 0000"}</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 border-t border-[color-mix(in_oklab,var(--color-surface)_10%,transparent)] pt-8 text-xs text-navy-foreground/40">
          <p>{footerData.copyright_text || "© 2026 N3 Solutions Limited. All rights reserved."}</p>
        </div>
      </div>
    </footer>
  );
}
