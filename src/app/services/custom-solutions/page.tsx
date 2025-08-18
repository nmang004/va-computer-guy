import Link from "next/link";
import { Cpu, Home, Gamepad2, Briefcase, Phone, CheckCircle, Wrench, Zap } from "lucide-react";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFeatures } from "@/components/services/service-features";
import { ProcessTimeline } from "@/components/services/process-timeline";
import { FAQAccordion } from "@/components/services/faq-accordion";
import { ServiceCTA } from "@/components/services/service-cta";
import { RelatedServices } from "@/components/services/related-services";
import { PricingCard } from "@/components/services/pricing-card";

export default function CustomSolutionsPage() {
  const features = [
    {
      title: "Custom PC Builds",
      description: "High-performance computers built to your exact specifications and budget",
      icon: Cpu
    },
    {
      title: "Smart Home Integration",
      description: "Complete smart home setup with seamless device integration and automation",
      icon: Home
    },
    {
      title: "Gaming Systems",
      description: "Professional gaming PC builds optimized for performance and reliability",
      icon: Gamepad2
    },
    {
      title: "Specialized Workstations",
      description: "Custom workstations for video editing, CAD, engineering, and professional applications",
      icon: Briefcase
    }
  ];

  const processSteps = [
    {
      number: 1,
      title: "Consultation & Planning",
      description: "Detailed discussion of your needs, budget, and performance requirements",
      icon: Briefcase,
      estimatedTime: "1-2 hours"
    },
    {
      number: 2,
      title: "Design & Quote",
      description: "Custom system design with detailed specifications and transparent pricing",
      icon: Cpu,
      estimatedTime: "1-3 business days"
    },
    {
      number: 3,
      title: "Building & Testing",
      description: "Professional assembly, configuration, and comprehensive testing of your system",
      icon: Wrench,
      estimatedTime: "3-7 business days"
    },
    {
      number: 4,
      title: "Setup & Training",
      description: "Complete setup at your location with training on your new system",
      icon: CheckCircle,
      estimatedTime: "2-4 hours"
    }
  ];

  const pricingTiers = [
    {
      name: "Custom Consultation",
      price: 99,
      description: "Design consultation and quote",
      features: [
        "Needs assessment",
        "Performance requirements analysis",
        "Budget planning assistance",
        "Detailed system specifications",
        "Component recommendations",
        "Transparent pricing quote"
      ],
      ctaText: "Get Quote",
      ctaHref: "/booking"
    },
    {
      name: "Home/Office Build",
      price: 799,
      description: "Custom PC for productivity and general use",
      popular: true,
      features: [
        "Custom component selection",
        "Professional assembly",
        "Performance optimization",
        "Software installation",
        "On-site setup and training",
        "1-year build warranty"
      ],
      ctaText: "Build My PC",
      ctaHref: "/booking"
    },
    {
      name: "High-Performance Build",
      price: 1299,
      description: "Gaming, workstation, or specialized systems",
      features: [
        "Premium component selection",
        "Advanced cooling solutions",
        "Performance benchmarking",
        "Specialized software setup",
        "Extended testing and optimization",
        "2-year build warranty"
      ],
      ctaText: "Build Performance System",
      ctaHref: "/booking"
    }
  ];

  const faqs = [
    {
      question: "Why should I get a custom-built PC instead of buying pre-built?",
      answer: "Custom builds offer better value, higher quality components, exact specifications for your needs, no bloatware, better warranties, and future upgrade options. You get exactly what you need without paying for features you don't want."
    },
    {
      question: "How much does a custom PC build cost?",
      answer: "Custom PCs range from $600 for basic systems to $3000+ for high-end gaming or workstation builds. We work within your budget to maximize performance and value, providing transparent pricing with no hidden fees."
    },
    {
      question: "How long does it take to build a custom PC?",
      answer: "Most builds take 3-7 business days depending on component availability and complexity. Gaming systems and specialized workstations may take longer due to additional testing and optimization requirements."
    },
    {
      question: "Do you provide warranty on custom builds?",
      answer: "Yes, we provide 1-2 year build warranties covering assembly and configuration. Individual components carry manufacturer warranties. We handle all warranty claims and provide ongoing support for your custom system."
    },
    {
      question: "Can you help with smart home integration?",
      answer: "Absolutely! We design and install complete smart home systems including lighting, security, entertainment, climate control, and voice assistants. We ensure all devices work together seamlessly."
    },
    {
      question: "Do you build gaming PCs for competitive gaming?",
      answer: "Yes, we specialize in high-performance gaming builds optimized for specific games and competitive play. We stay current with the latest hardware trends and can build systems for any gaming requirement or budget."
    },
    {
      question: "Can you upgrade my existing computer instead of building new?",
      answer: "Often yes! We evaluate your current system and recommend cost-effective upgrades versus new builds. Sometimes strategic upgrades (RAM, storage, graphics card) can provide significant performance improvements."
    },
    {
      question: "Do you provide training on the new system?",
      answer: "Yes, all custom builds include setup and training at your location. We ensure you understand your new system's features, maintenance requirements, and optimal settings for your specific use cases."
    }
  ];

  const relatedServices = [
    {
      title: "Computer Setup",
      description: "Professional setup and configuration services",
      href: "/services/home-services/computer-setup",
      icon: Wrench,
      pricing: { startingPrice: 75, priceNote: "per device" }
    },
    {
      title: "In-Home Support",
      description: "On-site installation and training services",
      href: "/services/home-services/in-home-support",
      icon: Home,
      pricing: { startingPrice: 119, priceNote: "per visit" }
    },
    {
      title: "Business Consulting",
      description: "Technology planning for custom solutions",
      href: "/services/business-services/consulting",
      icon: Briefcase,
      pricing: { startingPrice: 199, priceNote: "consultation" }
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <div className="va-container py-4">
        <div className="flex items-center gap-2 text-sm text-va-text-secondary font-roboto">
          <Link href="/" className="hover:text-va-primary">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-va-primary">Services</Link>
          <span>/</span>
          <span className="text-va-text-primary">Custom Solutions</span>
        </div>
      </div>

      {/* Hero Section */}
      <ServiceHero
        category="Specialized Services"
        title="Custom PC Builds & Smart Solutions"
        description="Custom-built computers and smart technology solutions tailored to your exact needs. From high-performance gaming rigs to complete smart home integration, we build what you envision."
        keyBenefit="Get exactly what you need with professional design, build, and support"
        pricing={{ startingPrice: 99, priceNote: "consultation" }}
        estimatedTime="3-7 business days"
        emergencyAvailable={false}
      />

      {/* What's Included */}
      <ServiceFeatures
        title="Custom Solution Services"
        subtitle="Professional custom builds and smart technology integration"
        features={features}
        columns={4}
      />

      {/* Pricing */}
      <PricingCard
        title="Custom Solution Pricing"
        subtitle="Flexible pricing for custom builds and smart technology projects"
        tiers={pricingTiers}
        showComparison={true}
      />

      {/* Process */}
      <ProcessTimeline
        title="Custom Build Process"
        subtitle="Professional approach to creating your perfect custom solution"
        steps={processSteps}
      />

      {/* Custom Solutions We Provide */}
      <section className="py-16 bg-va-neutral-100">
        <div className="va-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4 text-va-text-primary">
              Custom Solutions We Provide
            </h2>
            <p className="text-lg text-va-text-secondary max-w-2xl mx-auto font-roboto">
              Specialized technology solutions designed and built for your unique requirements
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Gaming PCs",
                description: "High-performance gaming systems optimized for your favorite games and budget",
                icon: Gamepad2
              },
              {
                title: "Video Editing Workstations",
                description: "Professional workstations for 4K video editing, rendering, and content creation",
                icon: Cpu
              },
              {
                title: "Smart Home Systems",
                description: "Complete home automation with lighting, security, and entertainment integration",
                icon: Home
              },
              {
                title: "Business Workstations",
                description: "Custom computers for CAD, engineering, accounting, and professional applications",
                icon: Briefcase
              },
              {
                title: "Media Centers",
                description: "Home theater PCs and entertainment systems for streaming and media management",
                icon: Zap
              },
              {
                title: "Compact Systems",
                description: "Small form factor PCs for space-limited environments with full functionality",
                icon: Wrench
              }
            ].map((solution, index) => {
              const IconComponent = solution.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-lg va-card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-va-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="h-6 w-6 text-va-secondary" />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-semibold text-va-text-primary mb-2">
                        {solution.title}
                      </h3>
                      <p className="text-sm text-va-text-secondary font-roboto">
                        {solution.description}
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
        title="Custom Solutions FAQ"
        subtitle="Common questions about custom PC builds and smart technology solutions"
        faqs={faqs}
      />

      {/* Related Services */}
      <RelatedServices
        title="Complete Custom Experience"
        subtitle="Services that complement your custom solution"
        services={relatedServices}
      />

      {/* CTA */}
      <ServiceCTA
        title="Ready to Build Your Perfect System?"
        description="Stop settling for pre-built computers that don't meet your needs. Get a custom solution designed specifically for your requirements and budget."
        primaryAction={{
          text: "Get Custom Quote",
          href: "/booking",
          icon: <Cpu className="mr-2 h-5 w-5" />
        }}
        secondaryAction={{
          text: "Call (757) 375-6764",
          href: "tel:(757)375-6764",
          icon: <Phone className="mr-2 h-5 w-5" />
        }}
        emergencyNote="Free consultation • Custom design • Professional build warranty"
      />
    </div>
  );
}