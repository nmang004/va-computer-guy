import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Phone, Calendar } from "lucide-react";

interface ServiceHeroProps {
  category: string;
  title: string;
  description: string;
  keyBenefit?: string;
  pricing?: {
    startingPrice?: number;
    priceNote?: string;
  };
  estimatedTime?: string;
  emergencyAvailable?: boolean;
}

export function ServiceHero({
  category,
  title,
  description,
  keyBenefit,
  pricing,
  estimatedTime,
  emergencyAvailable = false
}: ServiceHeroProps) {
  return (
    <section className="bg-gradient-to-b from-va-neutral-50 to-va-neutral-100 py-16">
      <div className="va-container">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 bg-va-secondary text-va-neutral-50 font-montserrat">
            {category}
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 text-va-text-primary">
            {title}
          </h1>
          
          <p className="text-xl text-va-text-secondary mb-8 max-w-3xl mx-auto font-roboto">
            {description}
          </p>

          {keyBenefit && (
            <div className="bg-va-primary/10 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
              <p className="font-montserrat font-semibold text-va-primary">
                {keyBenefit}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" asChild className="va-btn-primary">
              <Link href="/booking">
                <Calendar className="mr-2 h-5 w-5" />
                Book Service Now
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="va-btn-secondary">
              <Link href="tel:(757)375-6764">
                <Phone className="mr-2 h-5 w-5" />
                Call (757) 375-6764
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-va-text-secondary font-roboto">
            {pricing?.startingPrice && (
              <div className="flex items-center gap-2">
                <span className="text-va-primary font-semibold">
                  Starting at ${pricing.startingPrice}
                </span>
                {pricing.priceNote && (
                  <span className="text-va-text-muted">({pricing.priceNote})</span>
                )}
              </div>
            )}
            
            {estimatedTime && (
              <div>
                <span className="text-va-text-primary font-medium">
                  Estimated Time: {estimatedTime}
                </span>
              </div>
            )}
            
            {emergencyAvailable && (
              <div className="text-va-accent font-medium">
                Same-Day Service Available
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}