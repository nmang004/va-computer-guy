import Link from "next/link";
import { Zap, CheckCircle, Phone, Monitor, Wifi, Settings } from "lucide-react";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFeatures } from "@/components/services/service-features";
import { ProcessTimeline } from "@/components/services/process-timeline";
import { FAQAccordion } from "@/components/services/faq-accordion";
import { ServiceCTA } from "@/components/services/service-cta";
import { RelatedServices } from "@/components/services/related-services";
import { PricingCard } from "@/components/services/pricing-card";
import { RemoteSupportWidget } from "@/components/services/remote-support-widget";

export default function QuickFixesPage() {
  const features = [
    {
      title: "Instant Troubleshooting",
      description: "Quick diagnosis and resolution of common computer problems in minutes",
      icon: Zap
    },
    {
      title: "Performance Boost",
      description: "Immediate improvements to slow computers through optimization tweaks",
      icon: Monitor
    },
    {
      title: "Settings Configuration",
      description: "Proper setup and configuration of computer settings and preferences",
      icon: Settings
    },
    {
      title: "Network Issues",
      description: "Fast resolution of WiFi, internet, and connectivity problems",
      icon: Wifi
    }
  ];

  const processSteps = [
    {
      number: 1,
      title: "Describe the Problem",
      description: "Tell us what's happening with your computer through our quick request form",
      icon: Monitor,
      estimatedTime: "2 minutes"
    },
    {
      number: 2,
      title: "Remote Connection",
      description: "Download our secure software and grant permission for remote access",
      icon: Wifi,
      estimatedTime: "3 minutes"
    },
    {
      number: 3,
      title: "Rapid Diagnosis",
      description: "Our technician quickly identifies the root cause of your issue",
      icon: Settings,
      estimatedTime: "5 minutes"
    },
    {
      number: 4,
      title: "Quick Resolution",
      description: "Watch as we implement the fix and verify everything is working properly",
      icon: CheckCircle,
      estimatedTime: "10-15 minutes"
    }
  ];

  const pricingTiers = [
    {
      name: "Single Issue",
      price: 49,
      description: "Perfect for one specific problem",
      features: [
        "One computer issue resolved",
        "Up to 30 minutes of support", 
        "Basic performance optimization",
        "Email follow-up with tips",
        "7-day callback warranty"
      ],
      ctaText: "Fix My Computer",
      ctaHref: "#remote-support"
    },
    {
      name: "Multi-Issue Session",
      price: 89,
      description: "Address multiple problems in one session",
      popular: true,
      features: [
        "Multiple issues resolved",
        "Up to 60 minutes of support",
        "Complete system optimization",
        "Software updates included",
        "Basic security scan",
        "30-day callback warranty"
      ],
      ctaText: "Start Comprehensive Fix",
      ctaHref: "#remote-support"
    },
    {
      name: "Business Quick Fix",
      price: 149,
      description: "Priority support for business computers",
      features: [
        "Priority queue access",
        "Business hours guarantee",
        "Multiple users supported",
        "Documentation provided",
        "90-day callback warranty",
        "Follow-up consultation"
      ],
      ctaText: "Get Business Support",
      ctaHref: "#remote-support"
    }
  ];

  const faqs = [
    {
      question: "What types of quick fixes can you provide remotely?",
      answer: "We can quickly resolve software crashes, slow performance, network connectivity issues, email problems, browser issues, Windows errors, software installation problems, and basic configuration issues. Most problems can be fixed in 15-30 minutes."
    },
    {
      question: "How quickly can you help me?",
      answer: "For standard quick fixes, we typically connect within 15-30 minutes during business hours. Emergency quick fixes are available with 1-hour response time for an additional fee."
    },
    {
      question: "What if my problem takes longer than expected?",
      answer: "If your issue is more complex than initially assessed, we'll explain the situation and provide options. You can either continue with additional time at our standard rate or schedule a comprehensive support session."
    },
    {
      question: "Do you provide any warranty on quick fixes?",
      answer: "Yes, all quick fixes come with a 7-day callback warranty. If the same issue returns within 7 days, we'll fix it again at no charge. Multi-issue sessions include a 30-day warranty."
    },
    {
      question: "Can you help with both Windows and Mac computers?",
      answer: "Absolutely. Our technicians are trained on both Windows (10, 11) and macOS systems. We can provide quick fixes for most common issues on either platform."
    },
    {
      question: "What if you can't fix my problem remotely?",
      answer: "If we determine your issue requires physical repair or hardware replacement, we'll explain why and can schedule an in-person service. You'll only pay for the diagnostic time used, typically 15 minutes or less."
    }
  ];

  const relatedServices = [
    {
      title: "Virus Removal",
      description: "Complete malware cleaning and security protection",
      href: "/services/remote-services/virus-removal",
      icon: CheckCircle,
      pricing: { startingPrice: 99, priceNote: "complete cleanup" }
    },
    {
      title: "Performance Optimization", 
      description: "Comprehensive system tuning and speed improvements",
      href: "/services/remote-services/performance-optimization",
      icon: Zap,
      pricing: { startingPrice: 89, priceNote: "full optimization" }
    },
    {
      title: "Software Support",
      description: "Installation and configuration assistance",
      href: "/services/remote-services/software-support",
      icon: Monitor,
      pricing: { startingPrice: 75, priceNote: "per session" }
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
          <span className="text-va-text-primary">Quick Fixes</span>
        </div>
      </div>

      {/* Hero Section */}
      <ServiceHero
        category="Remote Services"
        title="Quick Computer Fixes"
        description="Get immediate solutions for common computer problems through our secure remote connection. Most issues resolved in 15-30 minutes."
        keyBenefit="90% of quick fixes completed in under 20 minutes"
        pricing={{ startingPrice: 49, priceNote: "per session" }}
        estimatedTime="15-30 minutes"
        emergencyAvailable={true}
      />

      {/* What's Included */}
      <ServiceFeatures
        title="What Quick Fixes Include"
        subtitle="Fast, effective solutions for the most common computer problems"
        features={features}
        columns={4}
      />

      {/* Pricing */}
      <PricingCard
        title="Quick Fix Pricing"
        subtitle="Transparent pricing for fast computer problem resolution"
        tiers={pricingTiers}
        showComparison={true}
      />

      {/* Process */}
      <ProcessTimeline
        title="Quick Fix Process"
        subtitle="From problem to solution in four simple steps"
        steps={processSteps}
      />

      {/* Remote Support Widget */}
      <RemoteSupportWidget 
        title="Request Quick Fix Now"
      />

      {/* FAQ */}
      <FAQAccordion
        title="Quick Fixes FAQ"
        subtitle="Common questions about our remote quick fix services"
        faqs={faqs}
      />

      {/* Related Services */}
      <RelatedServices
        title="Need More Comprehensive Help?"
        subtitle="For complex issues, consider these other remote services"
        services={relatedServices}
      />

      {/* CTA */}
      <ServiceCTA
        title="Computer Acting Up? Let's Fix It Fast!"
        description="Don't let computer problems slow you down. Get expert help in minutes with our quick fix service."
        primaryAction={{
          text: "Start Quick Fix",
          href: "#remote-support",
          icon: <Zap className="mr-2 h-5 w-5" />
        }}
        secondaryAction={{
          text: "Call (757) 375-6764",
          href: "tel:(757)375-6764",
          icon: <Phone className="mr-2 h-5 w-5" />
        }}
        emergencyNote="Same-day service available • 7-day warranty included"
      />
    </div>
  );
}