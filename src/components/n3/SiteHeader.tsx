import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

const NAV = [
  { label: "Solutions", href: "#solutions" },
  { label: "Industries", href: "#industries" },
  { label: "About", href: "#about" },
  { label: "News", href: "#news" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out ${
        scrolled
          ? "border-b border-hairline bg-surface/95 backdrop-blur-sm"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1240px] items-center justify-between px-6 lg:px-10">
        <a href="#top" aria-label="N3 Solutions Limited home">
          <Logo />
        </a>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[0.82rem] font-medium tracking-[0.04em] text-navy/75 transition-colors duration-200 hover:text-accent-teal"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Button variant="accent" size="lg" asChild className="hidden sm:inline-flex">
          <a href="#contact">Talk to us</a>
        </Button>
      </div>
    </header>
  );
}
