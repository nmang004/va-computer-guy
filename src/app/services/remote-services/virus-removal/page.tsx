import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Shield, Scan, Trash2, CheckCircle, Phone, AlertTriangle, Lock } from "lucide-react";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFeatures } from "@/components/services/service-features";
import { ProcessTimeline } from "@/components/services/process-timeline";
import { FAQAccordion } from "@/components/services/faq-accordion";
import { ServiceCTA } from "@/components/services/service-cta";
import { RelatedServices } from "@/components/services/related-services";
import { PricingCard } from "@/components/services/pricing-card";
import { RemoteSupportWidget } from "@/components/services/remote-support-widget";

export default function VirusRemovalPage() {
  const features = [
    {
      title: "Complete Malware Scan",
      description: "Comprehensive scanning using multiple detection engines to find all threats",
      icon: Scan
    },
    {
      title: "Safe Virus Removal",
      description: "Professional removal of viruses, malware, spyware, and adware without data loss",
      icon: Trash2
    },
    {
      title: "Security Software Setup",
      description: "Installation and configuration of premium antivirus and anti-malware protection",
      icon: Shield
    },
    {
      title: "System Hardening",
      description: "Security settings optimization to prevent future infections and attacks",
      icon: Lock
    }
  ];

  const processSteps = [
    {
      number: 1,
      title: "Emergency Assessment",
      description: "Quick evaluation of infection severity and immediate threat containment",
      icon: AlertTriangle,
      estimatedTime: "5 minutes"
    },
    {
      number: 2,
      title: "Deep System Scan",
      description: "Comprehensive scan using professional-grade tools to detect all malware types",
      icon: Scan,
      estimatedTime: "20-30 minutes"
    },
    {
      number: 3,
      title: "Safe Malware Removal",
      description: "Careful removal of all detected threats while preserving your important data",
      icon: Trash2,
      estimatedTime: "15-25 minutes"
    },
    {
      number: 4,
      title: "Protection & Prevention",
      description: "Install security software and configure settings to prevent future infections",
      icon: Shield,
      estimatedTime: "10-15 minutes"
    }
  ];

  const pricingTiers = [
    {
      name: "Basic Virus Removal",
      price: 99,
      description: "Complete malware cleaning and basic protection",
      features: [
        "Full system virus scan",
        "Complete malware removal",
        "Basic antivirus installation",
        "System cleanup",
        "30-day reinfection warranty"
      ],
      ctaText: "Clean My Computer",
      ctaHref: "#remote-support"
    },
    {
      name: "Complete Security Package",
      price: 149,
      description: "Comprehensive cleaning with premium protection",
      popular: true,
      features: [
        "Multi-engine malware detection",
        "Complete threat removal",
        "Premium security software",
        "Browser security setup",
        "Password manager setup",
        "Security education session",
        "90-day reinfection warranty"
      ],
      ctaText: "Get Complete Security",
      ctaHref: "#remote-support"
    },
    {
      name: "Business Security Cleanup",
      price: 249,
      description: "Enterprise-grade cleaning and protection",
      features: [
        "Business endpoint protection",
        "Network security assessment",
        "Data breach evaluation",
        "Compliance verification",
        "Employee security training",
        "1-year security monitoring"
      ],
      ctaText: "Secure My Business",
      ctaHref: "#remote-support"
    }
  ];

  const faqs = [
    {
      question: "How can I tell if my computer has a virus?",
      answer: "Common signs include slow performance, unexpected pop-ups, browser redirects, programs crashing, unknown programs running, strange network activity, or files becoming corrupted. If you suspect infection, avoid entering passwords or accessing sensitive data until cleaned."
    },
    {
      question: "Can virus removal be done safely remotely?",
      answer: "Yes, remote virus removal is often safer than in-person service because it reduces the risk of reinfection during transport. Our secure connection and professional tools allow us to clean infections thoroughly while you watch the process."
    },
    {
      question: "Will I lose my files during virus removal?",
      answer: "No, professional virus removal preserves your data. We use safe removal techniques that target only the malicious files. However, if files are already corrupted by malware, we'll attempt recovery but cannot guarantee success."
    },
    {
      question: "How long does complete virus removal take?",
      answer: "Most virus removals take 45-90 minutes depending on infection severity. Light infections may be cleared in 30 minutes, while heavily infected systems or rootkits may require 2+ hours for complete cleaning."
    },
    {
      question: "What if the virus comes back after removal?",
      answer: "All virus removals include a reinfection warranty. If the same malware returns within the warranty period (30-90 days depending on service level), we'll clean it again at no charge and investigate why protection failed."
    },
    {
      question: "Do you install antivirus software?",
      answer: "Yes, we install and configure professional antivirus software as part of our service. We recommend premium solutions and can help you choose the best protection for your needs and budget."
    },
    {
      question: "Can you remove ransomware?",
      answer: "We can remove ransomware infections, but encrypted files usually cannot be recovered without paying the ransom (which we don't recommend). We focus on cleaning the infection and preventing future attacks through improved security."
    },
    {
      question: "What's included in the security education session?",
      answer: "We teach you how to recognize phishing emails, safe browsing practices, software update importance, password security, and how to avoid common infection sources. This helps prevent future problems."
    }
  ];

  const relatedServices = [
    {
      title: "Performance Optimization",
      description: "Speed up your computer after virus removal",
      href: "/services/remote-services/performance-optimization",
      icon: CheckCircle,
      pricing: { startingPrice: 89, priceNote: "full optimization" }
    },
    {
      title: "Data Recovery",
      description: "Recover files damaged by malware",
      href: "/services/home-services/data-recovery",
      icon: Shield,
      pricing: { startingPrice: 149, priceNote: "evaluation included" }
    },
    {
      title: "PC Repair",
      description: "Hardware repair if virus caused damage",
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
          <Link href="/services/remote-services" className="hover:text-va-primary">Remote Services</Link>
          <span>/</span>
          <span className="text-va-text-primary">Virus Removal</span>
        </div>
      </div>

      {/* Hero Section */}
      <ServiceHero
        category="Remote Services"
        title="Remote Virus & Malware Removal"
        description="Professional virus removal and malware cleaning through secure remote connection. Complete system cleaning with ongoing protection setup to prevent future infections."
        keyBenefit="99.8% success rate in complete malware removal"
        pricing={{ startingPrice: 99, priceNote: "complete cleanup" }}
        estimatedTime="45-90 minutes"
        emergencyAvailable={true}
      />

      {/* What's Included */}
      <ServiceFeatures
        title="Complete Virus Removal Service"
        subtitle="Professional malware cleaning and security protection setup"
        features={features}
        columns={4}
      />

      {/* Pricing */}
      <PricingCard
        title="Virus Removal Pricing"
        subtitle="Choose the security level that's right for your needs"
        tiers={pricingTiers}
        showComparison={true}
      />

      {/* Process */}
      <ProcessTimeline
        title="Virus Removal Process"
        subtitle="Safe, thorough malware removal with data protection"
        steps={processSteps}
      />

      {/* Emergency Notice */}
      <section className="py-8 bg-red-50 border-l-4 border-red-400">
        <div className="va-container">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-8 w-8 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-montserrat font-semibold text-red-800 mb-2">
                Suspect a Virus? Act Quickly!
              </h3>
              <p className="text-red-700 font-roboto mb-4">
                If you suspect your computer is infected, avoid entering passwords, accessing bank accounts, 
                or opening important files until the system is cleaned. Immediate action prevents data theft and further damage.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                  <Phone className="mr-2 h-4 w-4" />
                  Emergency: (757) 375-6764
                </Button>
                <Button size="sm" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                  Request Immediate Cleanup
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Remote Support Widget */}
      <RemoteSupportWidget 
        title="Request Virus Removal Service"
      />

      {/* FAQ */}
      <FAQAccordion
        title="Virus Removal FAQ"
        subtitle="Important information about malware cleaning and computer security"
        faqs={faqs}
      />

      {/* Related Services */}
      <RelatedServices
        title="Complete Your Computer Recovery"
        subtitle="Services that complement virus removal for full system restoration"
        services={relatedServices}
      />

      {/* CTA */}
      <ServiceCTA
        title="Computer Infected? We'll Clean It Fast!"
        description="Don't let viruses steal your data or slow you down. Get professional malware removal with ongoing protection setup."
        primaryAction={{
          text: "Remove Viruses Now",
          href: "#remote-support",
          icon: <Shield className="mr-2 h-5 w-5" />
        }}
        secondaryAction={{
          text: "Emergency: (757) 375-6764",
          href: "tel:(757)375-6764",
          icon: <Phone className="mr-2 h-5 w-5" />
        }}
        emergencyNote="Emergency virus removal available 7 days a week"
        variant="gradient"
      />
    </div>
  );
}