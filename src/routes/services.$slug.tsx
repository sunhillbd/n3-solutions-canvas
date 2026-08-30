import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/n3/SiteHeader";
import { SiteFooter } from "@/components/n3/SiteFooter";
import { ServiceDetailTemplate } from "@/components/n3/ServiceDetailTemplate";
import { SERVICES_DATA, ServiceItem } from "@/lib/servicesData";
import { fetchServiceBySlug } from "@/lib/api";

export const Route = createFileRoute("/services/$slug")({
  head: ({ params }) => {
    const service = SERVICES_DATA[params.slug];
    const title = service
      ? `${service.title} — N3 Solutions Limited`
      : "Service Not Found — N3 Solutions Limited";
    const description =
      service?.description || "Utility infrastructure engineering by N3 Solutions Limited.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ServiceRoutePage,
});

function ServiceRoutePage() {
  const { slug } = Route.useParams();
  const [service, setService] = useState<ServiceItem | null>(() => SERVICES_DATA[slug] || null);

  useEffect(() => {
    fetchServiceBySlug(slug).then((apiService) => {
      if (apiService) {
        setService(apiService);
      }
    });
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <main className="mx-auto flex max-w-[1240px] flex-col items-center justify-center px-6 py-48 text-center">
          <p className="eyebrow">404 — Not Found</p>
          <h1 className="mt-4 text-3xl font-semibold text-navy sm:text-4xl">Service Not Found</h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            The requested service discipline could not be found or may have been relocated.
          </p>
          <div className="mt-8">
            <Button variant="accent" asChild>
              <Link to="/services">
                <ArrowLeft className="mr-2 size-4" /> View All Services
              </Link>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return <ServiceDetailTemplate service={service} />;
}
