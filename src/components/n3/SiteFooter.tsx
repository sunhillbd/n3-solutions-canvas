import { Logo } from "./Logo";

const COLUMNS = [
  {
    title: "Company",
    links: ["About N3", "Leadership", "Careers", "Newsroom"],
  },
  {
    title: "Solutions",
    links: ["Smart Water Metering", "IoT Infrastructure", "Field Operations", "Emerging Technologies"],
  },
  {
    title: "Resources",
    links: ["Insights", "Technical papers", "Compliance", "Procurement"],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-navy-foreground">
      <div className="mx-auto max-w-[1240px] px-6 py-20 lg:px-10">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo reversed />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-navy-foreground/60">
              Engineering measured, connected and maintainable infrastructure at national scale.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-[0.6875rem] font-semibold tracking-[0.18em] text-navy-foreground/45 uppercase">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#contact"
                      className="text-sm text-navy-foreground/75 transition-colors duration-200 hover:text-accent-teal"
                    >
                      {link}
                    </a>
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
              <li>Gulshan Avenue, Dhaka 1212</li>
              <li>Bangladesh</li>
              <li>
                <a
                  href="mailto:contact@n3solutions.com"
                  className="transition-colors duration-200 hover:text-accent-teal"
                >
                  contact@n3solutions.com
                </a>
              </li>
              <li>+880 2 000 0000</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-[color-mix(in_oklab,var(--color-surface)_14%,transparent)] pt-8 text-xs text-navy-foreground/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} N3 Solutions Limited. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#contact" className="transition-colors duration-200 hover:text-accent-teal">
              Privacy
            </a>
            <a href="#contact" className="transition-colors duration-200 hover:text-accent-teal">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
