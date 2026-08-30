import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

const NAV = [
  { label: "Home", to: "/" as const },
  { label: "About", to: "/about" as const },
  { label: "Services", to: "/services" as const },
  { label: "Contact", to: "/contact" as const },
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
        <Link to="/" aria-label="N3 Solutions Limited home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              activeProps={{ className: "text-accent-teal" }}
              inactiveProps={{ className: "text-navy/75" }}
              activeOptions={{ exact: item.to === "/" }}
              className="text-[0.82rem] font-medium tracking-[0.04em] transition-colors duration-200 hover:text-accent-teal"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Button variant="accent" size="lg" asChild className="hidden sm:inline-flex">
          <Link to="/contact">Talk to us</Link>
        </Button>
      </div>
    </header>
  );
}
