import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  Gauge,
  RadioTower,
  Wrench,
  CircuitBoard,
  Building2,
  Target,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Logo } from "./Logo";

const SERVICE_ITEMS = [
  {
    icon: Gauge,
    title: "Smart Water Metering",
    desc: "AMI programmes, ultrasonic metrology & NRW analytics",
    to: "/services/smart-water-metering" as const,
  },
  {
    icon: RadioTower,
    title: "IoT Infrastructure",
    desc: "LPWAN networks, gateways & telemetry platforms",
    to: "/services/iot-infrastructure" as const,
  },
  {
    icon: Wrench,
    title: "Field Operations & Maintenance",
    desc: "Regional engineering teams & SLA-backed asset support",
    to: "/services/field-operations" as const,
  },
  {
    icon: CircuitBoard,
    title: "Emerging Technologies",
    desc: "Applied R&D, sensor telemetry & predictive AI",
    to: "/services/emerging-technologies" as const,
  },
];

const ABOUT_ITEMS = [
  {
    icon: Building2,
    title: "About Us",
    desc: "Company overview, operating footprint & credibility",
    to: "/about" as const,
  },
  {
    icon: Target,
    title: "Our Mission & Vision",
    desc: "Strategic intent & core infrastructure principles",
    to: "/about/mission-vision" as const,
  },
  {
    icon: Users,
    title: "Our Team",
    desc: "Leadership, technical directors & engineering leads",
    to: "/about/team" as const,
  },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isServicesActive = currentPath.startsWith("/services");
  const isAboutActive = currentPath.startsWith("/about");
  const isPartnersActive = currentPath.startsWith("/partners");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out ${
        scrolled || mobileOpen
          ? "border-b border-hairline bg-surface/95 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1240px] items-center justify-between px-6 lg:px-10">
        <Link to="/" aria-label="N3 Solutions Limited home" onClick={() => setMobileOpen(false)}>
          <Logo />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          <Link
            to="/"
            activeProps={{ className: "text-accent-teal" }}
            inactiveProps={{ className: "text-navy/75" }}
            activeOptions={{ exact: true }}
            className="text-[0.82rem] font-medium tracking-[0.04em] transition-colors duration-200 hover:text-accent-teal"
          >
            Home
          </Link>

          {/* Services Dropdown */}
          <DropdownMenu open={servicesOpen} onOpenChange={setServicesOpen}>
            <DropdownMenuTrigger
              className={`group inline-flex items-center gap-1.5 text-[0.82rem] font-medium tracking-[0.04em] outline-none transition-colors duration-200 hover:text-accent-teal cursor-pointer ${
                isServicesActive ? "text-accent-teal" : "text-navy/75"
              }`}
            >
              <span>Services</span>
              <ChevronDown
                className={`size-3.5 transition-transform duration-200 group-hover:text-accent-teal ${
                  servicesOpen ? "rotate-180 text-accent-teal" : "text-muted-foreground"
                }`}
              />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="start"
              sideOffset={12}
              className="w-[340px] rounded-lg border border-hairline bg-surface/98 p-2 shadow-xl backdrop-blur-md"
            >
              <div className="px-3 py-2 text-[0.65rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                Capability Areas
              </div>

              {SERVICE_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <DropdownMenuItem key={item.title} asChild className="p-0 cursor-pointer">
                    <Link
                      to={item.to}
                      onClick={() => setServicesOpen(false)}
                      className="flex items-start gap-3.5 rounded-md px-3 py-2.5 transition-colors hover:bg-surface-muted focus:bg-surface-muted"
                    >
                      <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded border border-hairline bg-surface-muted/60 text-accent-teal">
                        <Icon className="size-3.5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.82rem] font-medium text-navy">{item.title}</span>
                        <span className="text-[0.72rem] leading-tight text-muted-foreground">
                          {item.desc}
                        </span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                );
              })}

              <DropdownMenuSeparator className="my-1.5 bg-hairline" />

              <DropdownMenuItem asChild className="p-0 cursor-pointer">
                <Link
                  to="/services"
                  onClick={() => setServicesOpen(false)}
                  className="flex items-center justify-between rounded-md px-3 py-2 text-[0.78rem] font-medium text-accent-teal hover:bg-surface-muted"
                >
                  <span>All Services Overview</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* About Dropdown */}
          <DropdownMenu open={aboutOpen} onOpenChange={setAboutOpen}>
            <DropdownMenuTrigger
              className={`group inline-flex items-center gap-1.5 text-[0.82rem] font-medium tracking-[0.04em] outline-none transition-colors duration-200 hover:text-accent-teal cursor-pointer ${
                isAboutActive ? "text-accent-teal" : "text-navy/75"
              }`}
            >
              <span>About</span>
              <ChevronDown
                className={`size-3.5 transition-transform duration-200 group-hover:text-accent-teal ${
                  aboutOpen ? "rotate-180 text-accent-teal" : "text-muted-foreground"
                }`}
              />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="start"
              sideOffset={12}
              className="w-[320px] rounded-lg border border-hairline bg-surface/98 p-2 shadow-xl backdrop-blur-md"
            >
              <div className="px-3 py-2 text-[0.65rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                Organisation
              </div>

              {ABOUT_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <DropdownMenuItem key={item.title} asChild className="p-0 cursor-pointer">
                    <Link
                      to={item.to}
                      onClick={() => setAboutOpen(false)}
                      className="flex items-start gap-3.5 rounded-md px-3 py-2.5 transition-colors hover:bg-surface-muted focus:bg-surface-muted"
                    >
                      <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded border border-hairline bg-surface-muted/60 text-accent-teal">
                        <Icon className="size-3.5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.82rem] font-medium text-navy">{item.title}</span>
                        <span className="text-[0.72rem] leading-tight text-muted-foreground">
                          {item.desc}
                        </span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Partners Link */}
          <Link
            to="/partners"
            activeProps={{ className: "text-accent-teal" }}
            inactiveProps={{ className: "text-navy/75" }}
            className={`text-[0.82rem] font-medium tracking-[0.04em] transition-colors duration-200 hover:text-accent-teal ${
              isPartnersActive ? "text-accent-teal" : "text-navy/75"
            }`}
          >
            Partners
          </Link>

          <Link
            to="/contact"
            activeProps={{ className: "text-accent-teal" }}
            inactiveProps={{ className: "text-navy/75" }}
            className="text-[0.82rem] font-medium tracking-[0.04em] transition-colors duration-200 hover:text-accent-teal"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="accent" size="lg" asChild className="hidden sm:inline-flex">
            <Link to="/contact">Talk to us</Link>
          </Button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex size-10 items-center justify-center rounded border border-hairline text-navy lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="border-b border-hairline bg-surface px-6 py-6 lg:hidden">
          <nav className="flex flex-col space-y-4">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="text-base font-medium text-navy hover:text-accent-teal"
            >
              Home
            </Link>

            {/* Services Section */}
            <div className="space-y-2 border-t border-hairline pt-3">
              <span className="text-[0.68rem] font-semibold tracking-wider text-muted-foreground uppercase">
                Services
              </span>
              <div className="space-y-2 pl-2">
                {SERVICE_ITEMS.map((item) => (
                  <Link
                    key={item.title}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm font-medium text-navy/80 hover:text-accent-teal"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* About Section */}
            <div className="space-y-2 border-t border-hairline pt-3">
              <span className="text-[0.68rem] font-semibold tracking-wider text-muted-foreground uppercase">
                About
              </span>
              <div className="space-y-2 pl-2">
                {ABOUT_ITEMS.map((item) => (
                  <Link
                    key={item.title}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm font-medium text-navy/80 hover:text-accent-teal"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Partners Link */}
            <div className="border-y border-hairline py-3">
              <Link
                to="/partners"
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-navy hover:text-accent-teal"
              >
                Partners
              </Link>
            </div>

            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="text-base font-medium text-navy hover:text-accent-teal"
            >
              Contact
            </Link>

            <div className="pt-2">
              <Button variant="accent" size="lg" asChild className="w-full">
                <Link to="/contact" onClick={() => setMobileOpen(false)}>
                  Talk to us
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
