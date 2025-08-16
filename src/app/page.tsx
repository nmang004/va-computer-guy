import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Wrench, 
  Clock, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Home,
  Building,
  Phone
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-va-neutral-50 to-va-neutral-100 py-20">
        <div className="va-container">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4 bg-va-secondary text-va-neutral-50 font-montserrat">
              Serving Virginia Beach & Hampton Roads Since 2010
            </Badge>
            <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6 text-va-text-primary">
              Fast, Reliable Computer Repair & IT Support
            </h1>
            <p className="text-xl text-va-text-secondary mb-8 max-w-2xl mx-auto font-roboto">
              From virus removal to complete system overhauls, we fix it right the first time. 
              Professional service for homes and businesses with transparent pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="va-btn-primary">
                <Link href="/booking">
                  <Phone className="mr-2 h-4 w-4" />
                  Book Repair Now
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="va-btn-secondary">
                <Link href="#quote">Get Instant Quote</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-va-text-secondary font-roboto">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-va-success" />
                <span>Same-Day Service</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-va-success" />
                <span>30-Day Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-va-success" />
                <span>No Fix, No Fee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instant Quote Generator Placeholder */}
      <section id="quote" className="py-16 bg-va-neutral-50">
        <div className="va-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4 text-va-text-primary">Get Your Instant Quote</h2>
            <p className="text-lg text-va-text-secondary font-roboto">
              Answer a few quick questions to get an estimated repair cost
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <Card className="va-card">
              <CardHeader>
                <CardTitle className="font-montserrat text-va-text-primary">Instant Quote Generator</CardTitle>
                <CardDescription className="font-roboto text-va-text-secondary">
                  Get an estimated price for your repair in under 60 seconds
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <Wrench className="h-12 w-12 mx-auto text-va-text-muted mb-4" />
                <p className="text-va-text-secondary mb-6 font-roboto">
                  Interactive quote generator coming soon! For now, call us for immediate pricing.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="va-btn-primary">
                    <Link href="tel:(757)375-6764">
                      <Phone className="mr-2 h-4 w-4" />
                      Call (757) 375-6764
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="va-btn-secondary">
                    <Link href="/booking">Schedule Consultation</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
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
            <h2 className="text-3xl font-montserrat font-bold mb-4 text-va-text-primary">Why Choose VA Computer Guy?</h2>
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

      {/* Protection Plans CTA */}
      <section className="py-16 bg-va-primary text-va-neutral-50">
        <div className="va-container text-center">
          <h2 className="text-3xl font-montserrat font-bold mb-4">Stay Protected Year-Round</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90 font-roboto">
            Don&apos;t wait for problems to strike. Our Protection Plans provide proactive monitoring, 
            regular maintenance, and priority support to keep your technology running smoothly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="va-btn-accent">
              <Link href="/protection-plans">View Protection Plans</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-va-neutral-50 text-va-neutral-50 hover:bg-va-neutral-50 hover:text-va-primary">
              <Link href="/repair-status">Check Repair Status</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}