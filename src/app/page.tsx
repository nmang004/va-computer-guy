import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QuoteGenerator } from "@/components/home/quote-generator";
import { AnimatedHero } from "@/components/home/animated-hero";
import { StructuredData } from "@/components/seo/structured-data";
import { client } from "@/sanity/lib/client";
import { featuredTestimonialsQuery, featuredPostsQuery } from "@/sanity/lib/queries";
import { createHomepageMetadata } from "@/lib/seo/metadata";
import { generateLocalBusinessSchema, generateHomeServicesSchema, generateBusinessServicesSchema, generateFAQPageSchema } from "@/lib/seo/schemas";
import { 
  Shield, 
  Clock, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Home,
  Building,
  Phone,
  Quote
} from "lucide-react";

// Homepage metadata with local SEO focus
export const metadata = createHomepageMetadata();

interface Testimonial {
  _id: string;
  name: string;
  title?: string;
  content: string;
  rating: number;
  image?: {
    asset: { url: string };
    alt?: string;
  };
}

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  mainImage?: {
    asset: { url: string };
    alt?: string;
  };
  publishedAt: string;
  category?: {
    title: string;
    color?: string;
  };
}

async function getHomepageData() {
  try {
    const [testimonials, featuredPosts] = await Promise.all([
      client.fetch<Testimonial[]>(featuredTestimonialsQuery),
      client.fetch<BlogPost[]>(featuredPostsQuery),
    ]);

    return { testimonials, featuredPosts };
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return { testimonials: [], featuredPosts: [] };
  }
}

export default async function HomePage() {
  const { testimonials, featuredPosts } = await getHomepageData();
  
  // Generate structured data for homepage
  const localBusinessSchema = generateLocalBusinessSchema();
  const homeServicesSchema = generateHomeServicesSchema();
  const businessServicesSchema = generateBusinessServicesSchema();
  const faqSchema = generateFAQPageSchema();

  return (
    <>
      {/* Structured Data for Local SEO */}
      <StructuredData data={localBusinessSchema} id="local-business-schema" />
      <StructuredData data={homeServicesSchema} id="home-services-schema" />
      <StructuredData data={businessServicesSchema} id="business-services-schema" />
      <StructuredData data={faqSchema} id="faq-schema" />
      
      <div className="flex flex-col">
        {/* Animated Hero Section */}
      <AnimatedHero className="py-20">
        <div className="va-container">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4 bg-va-secondary text-va-neutral-50 font-montserrat">
              Serving Virginia Beach & Hampton Roads Since 2010
            </Badge>
            <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6 text-va-neutral-50">
              Fast, Reliable Computer Repair & IT Support
            </h1>
            <p className="text-xl text-va-neutral-50/90 mb-8 max-w-2xl mx-auto font-roboto">
              From virus removal to complete system overhauls, we fix it right the first time. 
              Professional service for homes and businesses with transparent pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="va-btn-accent hover:scale-105 transition-transform">
                <Link href="/booking">
                  <Phone className="mr-2 h-4 w-4" />
                  Book Repair Now
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-va-neutral-50 text-va-neutral-50 bg-transparent hover:bg-va-neutral-50 hover:text-va-primary transition-colors">
                <Link href="#quote">Get Instant Quote</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-va-neutral-50/80 font-roboto">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-va-accent" />
                <span>Same-Day Service</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-va-accent" />
                <span>30-Day Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-va-accent" />
                <span>No Fix, No Fee</span>
              </div>
            </div>
          </div>
        </div>
      </AnimatedHero>

      {/* Instant Quote Generator */}
      <section id="quote" className="py-16 bg-va-neutral-50">
        <div className="va-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4 text-va-text-primary">Get Your Instant Quote</h2>
            <p className="text-lg text-va-text-secondary font-roboto">
              Answer a few quick questions to get an estimated repair cost
            </p>
          </div>
          <QuoteGenerator />
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 bg-va-neutral-100">
        <div className="va-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4 text-va-text-primary">Choose Your Service Type</h2>
            <p className="text-lg text-va-text-secondary font-roboto">
              We provide specialized solutions for both home and business needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Home Services */}
            <Card className="va-card hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-va-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Home className="h-8 w-8 text-va-primary" />
                </div>
                <CardTitle className="text-2xl font-montserrat text-va-text-primary">Home Services</CardTitle>
                <CardDescription className="font-roboto text-va-text-secondary">
                  Personal computer and device repair for families and individuals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2 font-roboto text-va-text-secondary">
                    <CheckCircle className="h-4 w-4 text-va-success" />
                    <span>PC & Mac Repair</span>
                  </li>
                  <li className="flex items-center gap-2 font-roboto text-va-text-secondary">
                    <CheckCircle className="h-4 w-4 text-va-success" />
                    <span>Virus & Malware Removal</span>
                  </li>
                  <li className="flex items-center gap-2 font-roboto text-va-text-secondary">
                    <CheckCircle className="h-4 w-4 text-va-success" />
                    <span>Data Recovery</span>
                  </li>
                  <li className="flex items-center gap-2 font-roboto text-va-text-secondary">
                    <CheckCircle className="h-4 w-4 text-va-success" />
                    <span>In-Home Setup & Support</span>
                  </li>
                </ul>
                <Button className="w-full va-btn-primary" asChild>
                  <Link href="/services/home-services">
                    View Home Services
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Business Services */}
            <Card className="va-card hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-va-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Building className="h-8 w-8 text-va-primary" />
                </div>
                <CardTitle className="text-2xl font-montserrat text-va-text-primary">Business Services</CardTitle>
                <CardDescription className="font-roboto text-va-text-secondary">
                  Enterprise-grade IT solutions and managed services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2 font-roboto text-va-text-secondary">
                    <CheckCircle className="h-4 w-4 text-va-success" />
                    <span>Managed IT Support</span>
                  </li>
                  <li className="flex items-center gap-2 font-roboto text-va-text-secondary">
                    <CheckCircle className="h-4 w-4 text-va-success" />
                    <span>Network & Server Solutions</span>
                  </li>
                  <li className="flex items-center gap-2 font-roboto text-va-text-secondary">
                    <CheckCircle className="h-4 w-4 text-va-success" />
                    <span>Data Backup & Security</span>
                  </li>
                  <li className="flex items-center gap-2 font-roboto text-va-text-secondary">
                    <CheckCircle className="h-4 w-4 text-va-success" />
                    <span>Business Consulting</span>
                  </li>
                </ul>
                <Button className="w-full va-btn-primary" asChild>
                  <Link href="/services/business-services">
                    View Business Services
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-va-neutral-50">
        <div className="va-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4 text-va-text-primary">Why Choose Computer Guy?</h2>
            <p className="text-lg text-va-text-secondary max-w-2xl mx-auto font-roboto">
              With over a decade of experience, we&apos;ve built our reputation on trust, 
              expertise, and exceptional customer service.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-va-primary/10 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-va-primary" />
              </div>
              <h3 className="text-xl font-montserrat font-semibold mb-2 text-va-text-primary">Fast Turnaround</h3>
              <p className="text-va-text-secondary font-roboto">
                Most repairs completed same-day or next business day. We respect your time.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-va-primary/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-va-primary" />
              </div>
              <h3 className="text-xl font-montserrat font-semibold mb-2 text-va-text-primary">Transparent Pricing</h3>
              <p className="text-va-text-secondary font-roboto">
                No hidden fees or surprise charges. You&apos;ll know the cost upfront before we begin.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-va-primary/10 rounded-full flex items-center justify-center mb-4">
                <Star className="h-8 w-8 text-va-primary" />
              </div>
              <h3 className="text-xl font-montserrat font-semibold mb-2 text-va-text-primary">Expert Technicians</h3>
              <p className="text-va-text-secondary font-roboto">
                Certified professionals with years of experience across all major brands and systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-16 bg-va-neutral-100">
          <div className="va-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-montserrat font-bold mb-4 text-va-text-primary">
                What Our Customers Say
              </h2>
              <p className="text-lg text-va-text-secondary max-w-2xl mx-auto font-roboto">
                Don&apos;t just take our word for it. Here&apos;s what real customers have to say about our service.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {testimonials.slice(0, 6).map((testimonial) => (
                <Card key={testimonial._id} className="va-card">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      {testimonial.image ? (
                        <Image
                          src={testimonial.image?.asset?.url || ''}
                          alt={testimonial.image.alt || testimonial.name}
                          width={48}
                          height={48}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-va-primary/10 rounded-full flex items-center justify-center">
                          <Quote className="h-6 w-6 text-va-primary" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < testimonial.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <h3 className="font-montserrat font-semibold text-va-text-primary">
                          {testimonial.name}
                        </h3>
                        {testimonial.title && (
                          <p className="text-sm text-va-text-muted font-roboto">
                            {testimonial.title}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="text-va-text-secondary font-roboto italic">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button variant="outline" asChild className="va-btn-secondary">
                <Link href="/about">Read More Reviews</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Featured Blog Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-va-neutral-50">
          <div className="va-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-montserrat font-bold mb-4 text-va-text-primary">
                Latest Tech Tips & Insights
              </h2>
              <p className="text-lg text-va-text-secondary max-w-2xl mx-auto font-roboto">
                Stay informed with our latest articles on computer maintenance, security tips, and technology trends.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {featuredPosts.map((post) => (
                <Card key={post._id} className="va-card hover:shadow-lg transition-shadow">
                  {post.mainImage && (
                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                      <Image
                        src={post.mainImage?.asset?.url || ''}
                        alt={post.mainImage.alt || post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  
                  <CardHeader>
                    {post.category && (
                      <Badge variant="secondary" className="w-fit mb-2">
                        {post.category.title}
                      </Badge>
                    )}
                    <CardTitle className="font-montserrat text-va-text-primary hover:text-va-primary transition-colors">
                      <Link href={`/blog/${post.slug.current}`}>
                        {post.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    {post.excerpt && (
                      <p className="text-va-text-secondary font-roboto mb-4">
                        {post.excerpt}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-va-text-muted">
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </span>
                      
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/blog/${post.slug.current}`}>
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button variant="outline" asChild className="va-btn-secondary">
                <Link href="/blog">
                  View All Articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Protection Plans CTA */}
      <section className="py-16 bg-va-primary text-va-neutral-50">
        <div className="va-container text-center">
          <h2 className="text-3xl font-montserrat font-bold mb-4" style={{ color: 'var(--va-neutral-50)' }}>Stay Protected Year-Round</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-va-neutral-50 font-roboto">
            Don&apos;t wait for problems to strike. Our Protection Plans provide proactive monitoring, 
            regular maintenance, and priority support to keep your technology running smoothly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="va-btn-accent">
              <Link href="/protection-plans">View Protection Plans</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-va-neutral-50 border-va-primary text-va-primary hover:bg-va-primary hover:text-va-neutral-50 shadow-md">
              <Link href="/repair-status">Check Repair Status</Link>
            </Button>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}