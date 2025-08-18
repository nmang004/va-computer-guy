import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Shield, Scan, Trash2, Lock, Phone, CheckCircle, AlertTriangle, FileSearch } from "lucide-react";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFeatures } from "@/components/services/service-features";
import { ProcessTimeline } from "@/components/services/process-timeline";
import { FAQAccordion } from "@/components/services/faq-accordion";
import { ServiceCTA } from "@/components/services/service-cta";
import { RelatedServices } from "@/components/services/related-services";
import { PricingCard } from "@/components/services/pricing-card";

export default function VirusRemovalPage() {
  const features = [
    {
      title: "Complete Malware Scan",
      description: "Deep system scan using multiple detection engines to find all types of malicious software",
      icon: Scan
    },
    {
      title: "Safe Virus Removal",
      description: "Professional removal of viruses, malware, spyware, and adware while preserving your data",
      icon: Trash2
    },
    {
      title: "Security Software Setup",
      description: "Installation and configuration of premium antivirus and anti-malware protection",
      icon: Shield
    },
    {
      title: "System Hardening",
      description: "Security settings optimization and education to prevent future infections",
      icon: Lock
    }
  ];

  const processSteps = [
    {
      number: 1,
      title: "Initial Assessment",
      description: "Evaluate infection severity and isolate threats to prevent further damage or data theft",
      icon: AlertTriangle,
      estimatedTime: "15 minutes"
    },
    {
      number: 2,
      title: "Deep System Scan",
      description: "Comprehensive scan using professional-grade tools to detect all malware types and variants",
      icon: Scan,
      estimatedTime: "30-60 minutes"
    },
    {
      number: 3,
      title: "Safe Malware Removal",
      description: "Careful removal of all detected threats while preserving important files and system stability",
      icon: Trash2,
      estimatedTime: "30-45 minutes"
    },
    {
      number: 4,
      title: "Protection & Prevention",
      description: "Install security software, update system, and provide education to prevent reinfection",
      icon: Shield,
      estimatedTime: "20-30 minutes"
    }
  ];

  const pricingTiers = [
    {
      name: "Basic Virus Removal",
      price: 99,
      description: "Complete malware cleaning service",
      features: [
        "Full system virus scan",
        "Complete malware removal",
        "Basic antivirus installation",
        "System cleanup and optimization",
        "Browser cleanup and reset",
        "30-day reinfection warranty"
      ],
      ctaText: "Clean My Computer",
      ctaHref: "/booking"
    },
    {
      name: "Complete Security Package",
      price: 149,
      description: "Comprehensive cleaning with premium protection",
      popular: true,
      features: [
        "Multi-engine malware detection",
        "Complete threat removal",
        "Premium security software suite",
        "Browser security configuration",
        "Email security setup",
        "Security education session",
        "90-day reinfection warranty"
      ],
      ctaText: "Get Complete Protection",
      ctaHref: "/booking"
    },
    {
      name: "Emergency Cleanup",
      price: 199,
      description: "Same-day service for critical infections",
      features: [
        "Priority same-day service",
        "Advanced threat detection",
        "Rootkit and advanced malware removal",
        "Data security assessment",
        "Identity theft protection guidance",
        "One-year security monitoring"
      ],
      ctaText: "Emergency Service",
      ctaHref: "/booking"
    }
  ];

  const faqs = [
    {
      question: "How do I know if my computer has a virus?",
      answer: "Common signs include slow performance, frequent pop-ups, browser redirects, programs crashing, unknown programs running, excessive network activity, or files becoming corrupted. If you notice any of these symptoms, avoid entering passwords or accessing sensitive information until cleaned."
    },
    {
      question: "Will virus removal delete my files?",
      answer: "No, professional virus removal preserves your personal files, photos, and documents. We use safe removal techniques that target only malicious files. However, if files are already corrupted by malware, we&apos;ll attempt recovery but cannot guarantee success."
    },
    {
      question: "How long does virus removal take?",
      answer: "Most virus removals take 2-4 hours depending on infection severity. Light infections may be cleared in 1-2 hours, while heavily infected systems or rootkits may require 4-6 hours for complete cleaning and security setup."
    },
    {
      question: "Can you remove ransomware?",
      answer: "We can remove ransomware infections and prevent further encryption, but encrypted files usually cannot be recovered without paying the ransom (which we strongly advise against). We focus on cleaning the infection and implementing strong security to prevent future attacks."
    },
    {
      question: "What if the virus comes back?",
      answer: "All virus removals include a reinfection warranty. If the same malware returns within the warranty period (30-90 days depending on service level), we&apos;ll clean it again at no charge and investigate why protection failed."
    },
    {
      question: "Do you provide antivirus software?",
      answer: "Yes, we install and configure professional antivirus software as part of our service. We recommend premium solutions and can help you choose the best protection for your needs and budget. Basic antivirus is included in all packages."
    },
    {
      question: "Can you clean my computer remotely?",
      answer: "For many virus infections, yes. We offer remote virus removal service that&apos;s often faster and more convenient. However, severe infections or rootkits may require in-person service for complete cleaning."
    },
    {
      question: "How can I prevent future virus infections?",
      answer: "We provide security education covering safe browsing, email security, software updates, and recognizing threats. We also set up automatic security updates and configure your system with optimal security settings."
    }
  ];

  const relatedServices = [
    {
      title: "PC & Mac Repair",
      description: "Fix any hardware damage caused by malware",
      href: "/services/home-services/pc-mac-repair",
      icon: CheckCircle,
      pricing: { startingPrice: 89, priceNote: "diagnostic" }
    },
    {
      title: "Data Recovery",
      description: "Recover files damaged or encrypted by malware",
      href: "/services/home-services/data-recovery",
      icon: FileSearch,
      pricing: { startingPrice: 149, priceNote: "evaluation" }
    },
    {
      title: "Remote Support",
      description: "Ongoing remote support for security questions",
      href: "/services/home-services/remote-support",
      icon: Shield,
      pricing: { startingPrice: 49, priceNote: "per session" }
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
          <span className="text-va-text-primary">Virus & Malware Removal</span>
        </div>
      </div>

      {/* Hero Section */}
      <ServiceHero
        category="Home Services"
        title="Virus & Malware Removal"
        description="Professional virus removal and malware cleaning service. Complete system cleaning with security protection setup to keep your computer safe and running smoothly."
        keyBenefit="99.8% success rate in complete malware removal"
        pricing={{ startingPrice: 99, priceNote: "complete cleanup" }}
        estimatedTime="2-4 hours"
        emergencyAvailable={true}
      />

      {/* What's Included */}
      <ServiceFeatures
        title="Virus Removal Services"
        subtitle="Comprehensive malware cleaning and security protection"
        features={features}
        columns={4}
      />

      {/* Emergency Warning */}
      <section className="py-8 bg-red-50 border-l-4 border-red-400">
        <div className="va-container">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-8 w-8 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-montserrat font-semibold text-red-800 mb-2">
                Computer Infected? Act Quickly!
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
                  <Link href="/booking">Schedule Immediate Cleanup</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <PricingCard
        title="Virus Removal Pricing"
        subtitle="Choose the protection level that&apos;s right for you"
        tiers={pricingTiers}
        showComparison={true}
      />

      {/* Process */}
      <ProcessTimeline
        title="Virus Removal Process"
        subtitle="Safe, thorough malware removal with data protection"
        steps={processSteps}
      />

      {/* Types of Threats We Remove */}
      <section className="py-16 bg-va-neutral-100">
        <div className="va-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4 text-va-text-primary">
              Types of Malware We Remove
            </h2>
            <p className="text-lg text-va-text-secondary max-w-2xl mx-auto font-roboto">
              We detect and remove all types of malicious software and security threats
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Viruses & Worms",
                description: "Self-replicating programs that spread and damage system files",
                severity: "High"
              },
              {
                title: "Spyware & Keyloggers",
                description: "Software that secretly monitors and steals personal information",
                severity: "Critical"
              },
              {
                title: "Adware & Browser Hijackers",
                description: "Programs that display unwanted ads and redirect web browsing",
                severity: "Medium"
              },
              {
                title: "Ransomware",
                description: "Malware that encrypts files and demands payment for decryption",
                severity: "Critical"
              },
              {
                title: "Trojans & Rootkits",
                description: "Hidden programs that provide unauthorized system access",
                severity: "High"
              },
              {
                title: "Scareware & Fake Antivirus",
                description: "Fake security software that tricks users into purchasing useless programs",
                severity: "Medium"
              }
            ].map((threat, index) => {
              const severityColors = {
                "Critical": "bg-red-100 text-red-800 border-red-200",
                "High": "bg-orange-100 text-orange-800 border-orange-200",
                "Medium": "bg-yellow-100 text-yellow-800 border-yellow-200"
              };
              
              return (
                <div key={index} className="bg-white p-6 rounded-lg va-card">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-montserrat font-semibold text-va-text-primary">
                      {threat.title}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full border ${severityColors[threat.severity as keyof typeof severityColors]}`}>
                      {threat.severity}
                    </span>
                  </div>
                  <p className="text-sm text-va-text-secondary font-roboto">
                    {threat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion
        title="Virus Removal FAQ"
        subtitle="Important information about malware cleaning and computer security"
        faqs={faqs}
      />

      {/* Related Services */}
      <RelatedServices
        title="Complete Your Computer Security"
        subtitle="Services that complement virus removal for total protection"
        services={relatedServices}
      />

      {/* CTA */}
      <ServiceCTA
        title="Computer Infected? We&apos;ll Clean It Fast!"
        description="Don&apos;t let viruses steal your data or slow you down. Get professional malware removal with comprehensive security protection."
        primaryAction={{
          text: "Remove Viruses Now",
          href: "/booking",
          icon: <Shield className="mr-2 h-5 w-5" />
        }}
        secondaryAction={{
          text: "Emergency: (757) 375-6764",
          href: "tel:(757)375-6764",
          icon: <Phone className="mr-2 h-5 w-5" />
        }}
        emergencyNote="Same-day service available • 30-90 day reinfection warranty"
        variant="gradient"
      />
    </div>
  );
}