import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { CheckCircle, Star } from "lucide-react";

interface PricingTier {
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
  priceNote?: string;
  ctaText?: string;
  ctaHref?: string;
}

interface PricingCardProps {
  title?: string;
  subtitle?: string;
  tiers: PricingTier[];
  showComparison?: boolean;
}

export function PricingCard({
  title = "Transparent Pricing",
  subtitle = "Choose the service level that's right for you",
  tiers,
  showComparison = false
}: PricingCardProps) {
  return (
    <section className="py-16 bg-va-neutral-50">
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
          {tiers.map((tier, index) => (
            <Card 
              key={index} 
              className={`va-card h-full flex flex-col relative ${
                tier.popular ? 'ring-2 ring-va-primary shadow-lg' : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-va-primary text-white font-montserrat">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-montserrat text-va-text-primary">
                  {tier.name}
                </CardTitle>
                <div className="my-4">
                  <span className="text-4xl font-bold text-va-primary">${tier.price}</span>
                  {tier.priceNote && (
                    <span className="text-sm text-va-text-muted ml-1">
                      {tier.priceNote}
                    </span>
                  )}
                </div>
                <CardDescription className="text-va-text-secondary font-roboto">
                  {tier.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                <div className="space-y-3 mb-6 flex-1">
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-va-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-va-text-secondary font-roboto">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  size="lg" 
                  asChild 
                  className={tier.popular ? "va-btn-primary" : "va-btn-secondary w-full"}
                >
                  <Link href={tier.ctaHref || "/booking"}>
                    {tier.ctaText || "Get Started"}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {showComparison && (
          <div className="mt-12 text-center">
            <p className="text-sm text-va-text-muted font-roboto mb-4">
              All services include free diagnostics, 30-day warranty, and no hidden fees
            </p>
            <Button variant="outline" asChild className="va-btn-secondary">
              <Link href="/about#pricing">
                View Detailed Pricing Comparison
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}