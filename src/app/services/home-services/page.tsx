import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Phone, CheckCircle, Star } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { servicesByCategoryQuery, serviceCategoriesQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";

interface Service {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  features?: string[];
  pricing?: {
    startingPrice?: number;
    priceNote?: string;
    hourlyRate?: number;
  };
  estimatedTime?: string;
  serviceAreas?: string[];
  icon?: string;
  image?: {
    asset: { url: string };
    alt?: string;
  };
  featured: boolean;
}

interface ServiceCategory {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  icon?: string;
  color?: string;
}

async function getHomeServices() {
  const [services, categories] = await Promise.all([
    client.fetch<Service[]>(servicesByCategoryQuery, { category: 'home-services' }),
    client.fetch<ServiceCategory[]>(serviceCategoriesQuery),
  ]);

  const homeCategory = categories.find(cat => cat.slug.current === 'home-services');
  
  return { services, homeCategory };
}

export default async function HomeServicesPage() {
  const { services, homeCategory } = await getHomeServices();
  return (
    <div className="va-container py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="text-va-text-secondary hover:text-va-primary">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-va-secondary text-va-neutral-50 font-montserrat">
            {homeCategory?.title || 'Home Services'}
          </Badge>
          <h1 className="text-4xl font-montserrat font-bold mb-4 text-va-text-primary">
            {homeCategory?.title || 'Computer Repair for Home & Family'}
          </h1>
          <p className="text-lg text-va-text-secondary font-roboto">
            {homeCategory?.description || 'Professional computer repair and tech support services designed for families and individuals'}
          </p>
        </div>

{services.length === 0 ? (
          // Fallback content when no services exist in CMS
          <div className="text-center py-16">
            <Star className="h-16 w-16 mx-auto text-va-text-muted mb-6" />
            <h2 className="text-2xl font-semibold mb-4 text-va-text-primary font-montserrat">
              Services Coming Soon!
            </h2>
            <p className="text-va-text-secondary mb-8 max-w-2xl mx-auto font-roboto">
              We&apos;re updating our service offerings. Please contact us directly for information about our home computer repair services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="va-btn-primary">
                <Link href="tel:(757)375-6764">
                  <Phone className="mr-2 h-4 w-4" />
                  Call (757) 375-6764
                </Link>
              </Button>
              <Button variant="outline" asChild className="va-btn-secondary">
                <Link href="/booking">Schedule Service</Link>
              </Button>
            </div>
          </div>
        ) : (
          // Display CMS services
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service) => (
                <Card key={service._id} className="va-card hover:shadow-lg transition-shadow">
                  {service.image && (
                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                      <Image
                        src={urlForImage(service.image)?.url() || ''}
                        alt={service.image.alt || service.title}
                        fill
                        className="object-cover"
                      />
                      {service.featured && (
                        <Badge className="absolute top-2 left-2 bg-va-accent text-white">
                          Featured
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  <CardHeader>
                    <CardTitle className="font-montserrat text-va-text-primary">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-va-text-secondary font-roboto">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    {service.features && service.features.length > 0 && (
                      <div className="space-y-2 mb-4">
                        {service.features.slice(0, 4).map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-va-accent" />
                            <span className="text-sm text-va-text-secondary font-roboto">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-4 border-t border-va-neutral-200">
                      <div className="text-sm text-va-text-muted">
                        {service.pricing?.startingPrice && (
                          <div className="font-semibold text-va-text-primary">
                            Starting at ${service.pricing.startingPrice}
                          </div>
                        )}
                        {service.estimatedTime && (
                          <div className="text-xs">
                            Est. time: {service.estimatedTime}
                          </div>
                        )}
                      </div>
                      
                      <Button size="sm" asChild className="va-btn-primary">
                        <Link href="/booking">
                          Book Now
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-16 p-8 bg-gradient-to-r from-va-primary to-va-secondary rounded-lg text-white">
          <h2 className="text-2xl font-montserrat font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="font-roboto mb-6">
            Contact us today for fast, reliable computer repair services for your home
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild variant="secondary">
              <Link href="tel:(757)375-6764">
                <Phone className="mr-2 h-4 w-4" />
                Call (757) 375-6764
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-transparent border-white text-white hover:bg-white hover:text-va-primary">
              <Link href="/booking">Schedule Service</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}