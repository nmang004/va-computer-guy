import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";

interface RelatedService {
  title: string;
  description: string;
  href: string;
  icon?: LucideIcon;
  pricing?: {
    startingPrice?: number;
    priceNote?: string;
  };
  featured?: boolean;
}

interface RelatedServicesProps {
  title?: string;
  subtitle?: string;
  services: RelatedService[];
  maxItems?: number;
}

export function RelatedServices({
  title = "Related Services",
  subtitle = "Other services that might interest you",
  services,
  maxItems = 3
}: RelatedServicesProps) {
  const displayServices = services.slice(0, maxItems);

  return (
    <section className="py-16 bg-va-neutral-100">
      <div className="va-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-montserrat font-bold mb-4 text-va-text-primary">
            {title}
          </h2>
          <p className="text-lg text-va-text-secondary max-w-2xl mx-auto font-roboto">
            {subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {displayServices.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="va-card hover:shadow-lg transition-shadow h-full flex flex-col">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    {IconComponent && (
                      <div className="w-10 h-10 bg-va-primary/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-va-primary" />
                      </div>
                    )}
                    <div className="flex-1">
                      <CardTitle className="text-lg font-montserrat text-va-text-primary">
                        {service.title}
                      </CardTitle>
                      {service.featured && (
                        <span className="text-xs bg-va-accent text-white px-2 py-1 rounded-full font-medium">
                          Popular
                        </span>
                      )}
                    </div>
                  </div>
                  <CardDescription className="text-va-text-secondary font-roboto">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col justify-between">
                  <div className="mb-4">
                    {service.pricing?.startingPrice && (
                      <div className="text-sm text-va-text-muted">
                        <span className="font-semibold text-va-primary">
                          Starting at ${service.pricing.startingPrice}
                        </span>
                        {service.pricing.priceNote && (
                          <span className="ml-1">({service.pricing.priceNote})</span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <Button variant="outline" asChild className="w-full va-btn-secondary">
                    <Link href={service.href}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}