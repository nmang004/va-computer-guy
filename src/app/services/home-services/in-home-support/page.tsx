import Link from "next/link";
import { Home, Wifi, Printer, Users, Phone, CheckCircle, Monitor, Settings } from "lucide-react";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFeatures } from "@/components/services/service-features";
import { ProcessTimeline } from "@/components/services/process-timeline";
import { FAQAccordion } from "@/components/services/faq-accordion";
import { ServiceCTA } from "@/components/services/service-cta";
import { RelatedServices } from "@/components/services/related-services";
import { PricingCard } from "@/components/services/pricing-card";

export default function InHomeSupportPage() {
  const features = [
    {
      title: "Network Setup",
      description: "Complete WiFi and network configuration for optimal performance and security",
      icon: Wifi
    },
    {
      title: "Device Configuration",
      description: "Setup and configuration of computers, printers, smart devices, and home electronics",
      icon: Settings
    },
    {
      title: "Technical Training",
      description: "Personalized training to help you and your family use technology confidently",
      icon: Users
    },
    {
      title: "Home Office Setup",
      description: "Complete home office technology setup for remote work and productivity",
      icon: Home
    }
  ];

  const processSteps = [
    {
      number: 1,
      title: "Consultation Call",
      description: "Discuss your needs, schedule appointment, and prepare for the in-home visit",
      icon: Phone,
      estimatedTime: "15 minutes"
    },
    {
      number: 2,
      title: "On-Site Assessment",
      description: "Evaluate your home technology setup and identify optimization opportunities",
      icon: Home,
      estimatedTime: "30 minutes"
    },
    {
      number: 3,
      title: "Professional Setup",
      description: "Configure all devices, networks, and software according to your specific needs",
      icon: Settings,
      estimatedTime: "1-3 hours"
    },
    {
      number: 4,
      title: "Training & Support",
      description: "Provide hands-on training and leave detailed instructions for ongoing use",
      icon: Users,
      estimatedTime: "30-60 minutes"
    }
  ];

  const pricingTiers = [
    {
      name: "Basic Home Visit",
      price: 119,
      description: "Single device setup or simple configuration",
      features: [
        "1-hour on-site service",
        "Single device configuration",
        "Basic network setup",
        "User training included",
        "Travel within 15 miles",
        "30-day callback warranty"
      ],
      ctaText: "Book Basic Service",
      ctaHref: "/booking"
    },
    {
      name: "Complete Home Setup",
      price: 199,
      description: "Comprehensive home technology configuration",
      popular: true,
      features: [
        "2-3 hours on-site service",
        "Multiple device setup",
        "Network optimization",
        "Printer and peripheral setup",
        "Security configuration",
        "Comprehensive training",
        "90-day callback warranty"
      ],
      ctaText: "Get Complete Setup",
      ctaHref: "/booking"
    },
    {
      name: "Smart Home Package",
      price: 299,
      description: "Advanced smart home and office setup",
      features: [
        "4+ hours on-site service",
        "Smart home device integration",
        "Advanced network configuration",
        "Home security system setup",
        "Backup and cloud services",
        "Family technology training",
        "1-year priority support"
      ],
      ctaText: "Smart Home Setup",
      ctaHref: "/booking"
    }
  ];

  const faqs = [
    {
      question: "What areas do you provide in-home service?",
      answer: "We provide in-home service throughout Virginia Beach and the Hampton Roads area. Travel is included within 15 miles of Virginia Beach. Additional travel fees may apply for locations beyond our standard service area."
    },
    {
      question: "How long does in-home setup typically take?",
      answer: "Simple setups like single computer configuration take 1-2 hours. Complete home setups with multiple devices, network configuration, and training typically take 2-4 hours. We&apos;ll provide a time estimate during scheduling."
    },
    {
      question: "Can you help set up my home WiFi network?",
      answer: "Yes, network setup is one of our specialties. We can configure new routers, optimize WiFi coverage, set up guest networks, configure parental controls, and ensure your network is secure and performing optimally."
    },
    {
      question: "Do you provide training on how to use my devices?",
      answer: "Absolutely! Training is included with all in-home services. We provide hands-on instruction tailored to your skill level and leave detailed written instructions. We can train multiple family members during the visit."
    },
    {
      question: "Can you help with smart home devices?",
      answer: "Yes, we specialize in smart home setup including smart speakers, thermostats, security cameras, lighting systems, and home automation. We can integrate devices and teach you how to control them effectively."
    },
    {
      question: "What if I need help after you leave?",
      answer: "All in-home services include callback warranty (30-90 days depending on service level). If you have questions or issues related to our setup work, we&apos;ll return at no charge to resolve them."
    },
    {
      question: "Can you help with my home office setup?",
      answer: "Yes, we excel at home office setup including computer configuration, printer setup, video conferencing preparation, cloud storage setup, and productivity software installation. Perfect for remote workers."
    },
    {
      question: "Do I need to purchase equipment before you arrive?",
      answer: "We&apos;ll discuss equipment needs during consultation. While we can recommend products, you typically purchase equipment yourself. We can bring common cables and adapters, and can pick up specific items if arranged in advance."
    }
  ];

  const relatedServices = [
    {
      title: "Computer Setup",
      description: "New computer configuration and software installation",
      href: "/services/home-services/computer-setup",
      icon: Monitor,
      pricing: { startingPrice: 75, priceNote: "per device" }
    },
    {
      title: "Remote Support",
      description: "Ongoing remote support for technical questions",
      href: "/services/home-services/remote-support",
      icon: Settings,
      pricing: { startingPrice: 49, priceNote: "per session" }
    },
    {
      title: "PC & Mac Repair",
      description: "Fix any issues discovered during setup",
      href: "/services/home-services/pc-mac-repair",
      icon: CheckCircle,
      pricing: { startingPrice: 89, priceNote: "diagnostic" }
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <div className="va-container py-4">
        <div className="flex items-center gap-2 text-sm text-va-text-secondary font-roboto">
          <Link href="/" className="hover:text-va-primary">Home</Link>
          <span>/</span>
          <Link href="/services/home-services" className="hover:text-va-primary">Home Services</Link>
          <span>/</span>
          <span className="text-va-text-primary">In-Home Setup & Support</span>
        </div>
      </div>

      {/* Hero Section */}
      <ServiceHero
        category="Home Services"
        title="In-Home Setup & Support"
        description="Professional technology setup and support in the comfort of your home. We configure your devices, optimize your network, and provide personalized training so you can use technology confidently."
        keyBenefit="Serving Virginia Beach & Hampton Roads - Travel included"
        pricing={{ startingPrice: 119, priceNote: "per visit" }}
        estimatedTime="1-4 hours"
        emergencyAvailable={false}
      />

      {/* What's Included */}
      <ServiceFeatures
        title="In-Home Support Services"
        subtitle="Comprehensive technology setup and support at your location"
        features={features}
        columns={4}
      />

      {/* Service Areas */}
      <section className="py-16 bg-va-neutral-50">
        <div className="va-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4 text-va-text-primary">
              We Come to You
            </h2>
            <p className="text-lg text-va-text-secondary max-w-2xl mx-auto font-roboto">
              In-home service throughout Virginia Beach and Hampton Roads area
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg va-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-va-accent/10 rounded-lg flex items-center justify-center">
                    <Home className="h-6 w-6 text-va-accent" />
                  </div>
                  <h3 className="text-xl font-montserrat font-semibold text-va-text-primary">
                    Service Areas
                  </h3>
                </div>
                <ul className="space-y-2 text-va-text-secondary font-roboto">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-va-accent" />
                    Virginia Beach (all areas)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-va-accent" />
                    Norfolk
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-va-accent" />
                    Chesapeake
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-va-accent" />
                    Portsmouth
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-va-accent" />
                    Suffolk (select areas)
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg va-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-va-primary/10 rounded-lg flex items-center justify-center">
                    <Settings className="h-6 w-6 text-va-primary" />
                  </div>
                  <h3 className="text-xl font-montserrat font-semibold text-va-text-primary">
                    What We Bring
                  </h3>
                </div>
                <ul className="space-y-2 text-va-text-secondary font-roboto">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-va-accent" />
                    Professional diagnostic tools
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-va-accent" />
                    Common cables and adapters
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-va-accent" />
                    Network testing equipment
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-va-accent" />
                    Software installation media
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-va-accent" />
                    Written setup instructions
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <PricingCard
        title="In-Home Service Pricing"
        subtitle="Professional on-site service with transparent pricing"
        tiers={pricingTiers}
        showComparison={true}
      />

      {/* Process */}
      <ProcessTimeline
        title="In-Home Service Process"
        subtitle="Professional on-site service from consultation to completion"
        steps={processSteps}
      />

      {/* Common Setup Services */}
      <section className="py-16 bg-va-neutral-100">
        <div className="va-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4 text-va-text-primary">
              Common In-Home Services
            </h2>
            <p className="text-lg text-va-text-secondary max-w-2xl mx-auto font-roboto">
              Popular technology setup and support services we provide at your home
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "WiFi Network Setup",
                description: "Router configuration, WiFi optimization, security setup, guest networks",
                icon: Wifi
              },
              {
                title: "Smart TV Setup",
                description: "TV configuration, streaming services, app installation, remote programming",
                icon: Monitor
              },
              {
                title: "Printer Configuration",
                description: "Wireless printer setup, driver installation, mobile printing, scanning setup",
                icon: Printer
              },
              {
                title: "Home Office Setup",
                description: "Computer setup, video conferencing, productivity software, cloud storage",
                icon: Home
              },
              {
                title: "Senior Tech Support",
                description: "Patient training, simplified setups, accessibility features, ongoing support",
                icon: Users
              },
              {
                title: "Smart Home Integration",
                description: "Smart speakers, thermostats, security cameras, lighting, automation",
                icon: Settings
              }
            ].map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-lg va-card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-va-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="h-6 w-6 text-va-primary" />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-semibold text-va-text-primary mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm text-va-text-secondary font-roboto">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion
        title="In-Home Support FAQ"
        subtitle="Common questions about our in-home technology services"
        faqs={faqs}
      />

      {/* Related Services */}
      <RelatedServices
        title="Additional Home Services"
        subtitle="Other services that complement in-home support"
        services={relatedServices}
      />

      {/* CTA */}
      <ServiceCTA
        title="Need Technology Help at Home?"
        description="Let us come to you! Professional technology setup and support in the comfort of your home with personalized training and ongoing support."
        primaryAction={{
          text: "Schedule Home Visit",
          href: "/booking",
          icon: <Home className="mr-2 h-5 w-5" />
        }}
        secondaryAction={{
          text: "Call (757) 375-6764",
          href: "tel:(757)375-6764",
          icon: <Phone className="mr-2 h-5 w-5" />
        }}
        emergencyNote="Serving Virginia Beach & Hampton Roads • Travel included within 15 miles"
      />
    </div>
  );
}