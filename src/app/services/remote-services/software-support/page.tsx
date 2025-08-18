import Link from "next/link";
import { Monitor, Download, Settings, Shield, Phone, CheckCircle } from "lucide-react";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFeatures } from "@/components/services/service-features";
import { ProcessTimeline } from "@/components/services/process-timeline";
import { FAQAccordion } from "@/components/services/faq-accordion";
import { ServiceCTA } from "@/components/services/service-cta";
import { RelatedServices } from "@/components/services/related-services";
import { PricingCard } from "@/components/services/pricing-card";
import { RemoteSupportWidget } from "@/components/services/remote-support-widget";

export default function SoftwareSupportPage() {
  const features = [
    {
      title: "Software Installation",
      description: "Remote installation of programs, applications, and updates with proper configuration",
      icon: Download
    },
    {
      title: "Program Configuration",
      description: "Setup and optimization of software settings for optimal performance",
      icon: Settings
    },
    {
      title: "Compatibility Fixes",
      description: "Resolve software conflicts and compatibility issues between programs",
      icon: Monitor
    },
    {
      title: "License Management",
      description: "Help with software licensing, activation, and legitimate software sourcing",
      icon: Shield
    }
  ];

  const processSteps = [
    {
      number: 1,
      title: "Software Assessment",
      description: "We review what software you need installed or configured and check system compatibility",
      icon: Monitor,
      estimatedTime: "5 minutes"
    },
    {
      number: 2,
      title: "Secure Download",
      description: "We download software from official sources to ensure security and authenticity",
      icon: Download,
      estimatedTime: "10-15 minutes"
    },
    {
      number: 3,
      title: "Installation & Setup",
      description: "Complete installation with proper configuration and security settings",
      icon: Settings,
      estimatedTime: "15-30 minutes"
    },
    {
      number: 4,
      title: "Testing & Training",
      description: "Verify installation works correctly and provide basic usage guidance",
      icon: CheckCircle,
      estimatedTime: "5-10 minutes"
    }
  ];

  const pricingTiers = [
    {
      name: "Single Software",
      price: 75,
      description: "Installation and setup of one program",
      features: [
        "One software installation",
        "Basic configuration setup",
        "Compatibility verification",
        "Quick usage overview",
        "14-day installation warranty"
      ],
      ctaText: "Install Software",
      ctaHref: "#remote-support"
    },
    {
      name: "Software Package",
      price: 139,
      description: "Multiple programs installed and configured",
      popular: true,
      features: [
        "Up to 5 software installations",
        "Complete configuration setup",
        "Integration optimization",
        "Security software included",
        "Detailed usage training",
        "30-day installation warranty"
      ],
      ctaText: "Get Software Package",
      ctaHref: "#remote-support"
    },
    {
      name: "Business Software Setup",
      price: 199,
      description: "Enterprise software installation and configuration",
      features: [
        "Business-grade software",
        "Multi-user setup",
        "Network configuration",
        "Security compliance",
        "Staff training included",
        "90-day support warranty"
      ],
      ctaText: "Setup Business Software",
      ctaHref: "#remote-support"
    }
  ];

  const faqs = [
    {
      question: "What types of software can you install remotely?",
      answer: "We can install most standard software including Microsoft Office, antivirus programs, web browsers, media players, business applications, creative software, and productivity tools. We only install legitimate, licensed software from official sources."
    },
    {
      question: "Do I need to purchase software licenses myself?",
      answer: "Yes, you'll need to provide valid software licenses or purchase them yourself. We can guide you to official sources and help you choose the right version for your needs, but we don't provide software licenses."
    },
    {
      question: "Can you help with software that's not working properly?",
      answer: "Absolutely. We can troubleshoot software problems, reinstall corrupted programs, update outdated software, and resolve conflicts between different applications."
    },
    {
      question: "How long does software installation typically take?",
      answer: "Simple programs usually take 15-30 minutes including configuration. Complex business software or multiple installations may take 45-90 minutes depending on the software and your system speed."
    },
    {
      question: "What if the software doesn't work on my computer?",
      answer: "We check system requirements before installation. If software is incompatible with your system, we'll explain why and suggest alternatives. If installation fails due to our error, we'll fix it at no charge."
    },
    {
      question: "Do you provide training on how to use the software?",
      answer: "Yes, we include basic usage training with all installations. For complex software, we can schedule additional training sessions or recommend online resources for advanced features."
    },
    {
      question: "Can you help with software updates?",
      answer: "Yes, we can update existing software, configure automatic updates, and resolve update-related problems. We also ensure all security updates are properly applied."
    }
  ];

  const relatedServices = [
    {
      title: "Quick Fixes",
      description: "Fast solutions for immediate software problems",
      href: "/services/remote-services/quick-fixes",
      icon: CheckCircle,
      pricing: { startingPrice: 49, priceNote: "per session" }
    },
    {
      title: "Performance Optimization", 
      description: "Speed up your computer after new software installation",
      href: "/services/remote-services/performance-optimization",
      icon: Settings,
      pricing: { startingPrice: 89, priceNote: "full optimization" }
    },
    {
      title: "Virus Removal",
      description: "Clean infections before installing new software",
      href: "/services/remote-services/virus-removal",
      icon: Shield,
      pricing: { startingPrice: 99, priceNote: "complete cleanup" }
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <div className="va-container py-4">
        <div className="flex items-center gap-2 text-sm text-va-text-secondary font-roboto">
          <Link href="/" className="hover:text-va-primary">Home</Link>
          <span>/</span>
          <Link href="/services/remote-services" className="hover:text-va-primary">Remote Services</Link>
          <span>/</span>
          <span className="text-va-text-primary">Software Support</span>
        </div>
      </div>

      {/* Hero Section */}
      <ServiceHero
        category="Remote Services"
        title="Remote Software Installation & Support"
        description="Professional software installation, configuration, and troubleshooting through secure remote connection. Get the programs you need properly set up and working perfectly."
        keyBenefit="100% legitimate software from official sources only"
        pricing={{ startingPrice: 75, priceNote: "per software" }}
        estimatedTime="30-60 minutes"
        emergencyAvailable={false}
      />

      {/* What's Included */}
      <ServiceFeatures
        title="Software Support Services"
        subtitle="Complete software installation and configuration with expert guidance"
        features={features}
        columns={4}
      />

      {/* Pricing */}
      <PricingCard
        title="Software Support Pricing"
        subtitle="Transparent pricing for professional software installation and setup"
        tiers={pricingTiers}
        showComparison={true}
      />

      {/* Process */}
      <ProcessTimeline
        title="Software Installation Process"
        subtitle="Professional software setup from start to finish"
        steps={processSteps}
      />

      {/* Remote Support Widget */}
      <RemoteSupportWidget 
        title="Request Software Installation"
      />

      {/* FAQ */}
      <FAQAccordion
        title="Software Support FAQ"
        subtitle="Common questions about remote software installation and support"
        faqs={faqs}
      />

      {/* Related Services */}
      <RelatedServices
        title="Complete Your Computer Setup"
        subtitle="Other services that work great with software installation"
        services={relatedServices}
      />

      {/* CTA */}
      <ServiceCTA
        title="Need Software Installed or Fixed?"
        description="Get professional software installation and configuration from certified technicians. Only legitimate software from official sources."
        primaryAction={{
          text: "Install Software Now",
          href: "#remote-support",
          icon: <Download className="mr-2 h-5 w-5" />
        }}
        secondaryAction={{
          text: "Call (757) 375-6764",
          href: "tel:(757)375-6764",
          icon: <Phone className="mr-2 h-5 w-5" />
        }}
        emergencyNote="All installations include configuration and basic training"
      />
    </div>
  );
}