import Link from "next/link";
import { Monitor, Wifi, Settings, Users, Phone, Clock, Shield } from "lucide-react";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFeatures } from "@/components/services/service-features";
import { ProcessTimeline } from "@/components/services/process-timeline";
import { FAQAccordion } from "@/components/services/faq-accordion";
import { ServiceCTA } from "@/components/services/service-cta";
import { RelatedServices } from "@/components/services/related-services";
import { PricingCard } from "@/components/services/pricing-card";
import { RemoteSupportWidget } from "@/components/services/remote-support-widget";

export default function RemoteSupportPage() {
  const features = [
    {
      title: "Quick Problem Solving",
      description: "Fast resolution of software issues, settings problems, and basic troubleshooting",
      icon: Clock
    },
    {
      title: "Secure Connection",
      description: "Safe, encrypted remote access with your permission and full visibility",
      icon: Shield
    },
    {
      title: "Immediate Help",
      description: "Get help right away without waiting for an appointment or travel time",
      icon: Wifi
    },
    {
      title: "Guided Assistance",
      description: "Step-by-step guidance and training while we help solve your problems",
      icon: Users
    }
  ];

  const processSteps = [
    {
      number: 1,
      title: "Contact & Schedule",
      description: "Call or request remote support session for your computer issue",
      icon: Phone,
      estimatedTime: "Immediate"
    },
    {
      number: 2,
      title: "Secure Connection",
      description: "Download our secure remote software and grant permission for assistance",
      icon: Shield,
      estimatedTime: "3-5 minutes"
    },
    {
      number: 3,
      title: "Problem Resolution",
      description: "Watch as we diagnose and fix your computer issue in real-time",
      icon: Monitor,
      estimatedTime: "15-45 minutes"
    },
    {
      number: 4,
      title: "Training & Follow-up",
      description: "Learn how to prevent the issue and get follow-up support if needed",
      icon: Users,
      estimatedTime: "5-10 minutes"
    }
  ];

  const pricingTiers = [
    {
      name: "Single Session",
      price: 49,
      description: "One-time remote support session",
      features: [
        "Up to 30 minutes of support",
        "Single issue resolution",
        "Basic troubleshooting",
        "Software guidance",
        "7-day callback warranty"
      ],
      ctaText: "Get Remote Help",
      ctaHref: "#remote-support"
    },
    {
      name: "Extended Session",
      price: 89,
      description: "Comprehensive remote support",
      popular: true,
      features: [
        "Up to 60 minutes of support",
        "Multiple issue resolution",
        "System optimization",
        "Software installation help",
        "Security checkup",
        "30-day callback warranty"
      ],
      ctaText: "Extended Support",
      ctaHref: "#remote-support"
    },
    {
      name: "Monthly Support",
      price: 29,
      priceNote: "per month",
      description: "Ongoing remote support subscription",
      features: [
        "Unlimited 15-minute sessions",
        "Priority response time",
        "Monthly system checkup",
        "Software update assistance",
        "Training and tips",
        "Cancel anytime"
      ],
      ctaText: "Subscribe to Support",
      ctaHref: "/protection-plans"
    }
  ];

  const faqs = [
    {
      question: "What computer problems can be fixed remotely?",
      answer: "Most software-related issues can be resolved remotely including slow performance, software problems, email issues, internet connectivity, settings configuration, virus removal, and basic troubleshooting. Hardware problems requiring physical repair cannot be fixed remotely."
    },
    {
      question: "Is remote support safe for my computer?",
      answer: "Yes, absolutely safe. We use encrypted remote access software that requires your explicit permission. You can see everything we&apos;re doing on your screen and can disconnect at any time. We never access your computer without your knowledge or consent."
    },
    {
      question: "How quickly can you help me remotely?",
      answer: "During business hours, we can usually connect within 15-30 minutes. For existing customers with support plans, response time is typically under 15 minutes. Evening and weekend support is available by appointment."
    },
    {
      question: "What do I need for remote support?",
      answer: "You need a working internet connection and the ability to download our remote support software. We&apos;ll guide you through the entire connection process and can even help you download the software if needed."
    },
    {
      question: "Can you help with both Windows and Mac computers?",
      answer: "Yes, our technicians provide remote support for both Windows PCs and Mac computers. We support all recent versions of Windows (10, 11) and macOS, as well as some Linux distributions."
    },
    {
      question: "What if my problem can&apos;t be fixed remotely?",
      answer: "If we determine your issue requires physical repair or hardware replacement, we&apos;ll explain the situation and can schedule in-person service. You&apos;ll only pay for the remote session time used for diagnosis."
    },
    {
      question: "Do you provide remote training?",
      answer: "Yes, remote training is one of our popular services. We can teach you how to use software, configure settings, set up email, organize files, and much more - all through secure remote connection."
    },
    {
      question: "Is there a minimum charge for remote support?",
      answer: "Our minimum session is 15 minutes. If we can&apos;t help with your issue, there&apos;s no charge. Most simple issues are resolved within our basic 30-minute session."
    }
  ];

  const relatedServices = [
    {
      title: "In-Home Support",
      description: "On-site service when remote help isn&apos;t enough",
      href: "/services/home-services/in-home-support",
      icon: Users,
      pricing: { startingPrice: 119, priceNote: "per visit" }
    },
    {
      title: "PC & Mac Repair",
      description: "Hardware repair for issues we can&apos;t fix remotely",
      href: "/services/home-services/pc-mac-repair",
      icon: Monitor,
      pricing: { startingPrice: 89, priceNote: "diagnostic" }
    },
    {
      title: "Computer Setup",
      description: "Complete setup and configuration service",
      href: "/services/home-services/computer-setup",
      icon: Settings,
      pricing: { startingPrice: 75, priceNote: "per computer" }
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
          <span className="text-va-text-primary">Remote Support</span>
        </div>
      </div>

      {/* Hero Section */}
      <ServiceHero
        category="Home Services"
        title="Remote Computer Support"
        description="Get immediate help with your computer problems through our secure remote connection service. Fast, convenient support without leaving your home."
        keyBenefit="Same-day support available - No travel time required"
        pricing={{ startingPrice: 49, priceNote: "per session" }}
        estimatedTime="15-60 minutes"
        emergencyAvailable={false}
      />

      {/* What's Included */}
      <ServiceFeatures
        title="Remote Support Services"
        subtitle="Convenient computer help through secure remote connection"
        features={features}
        columns={4}
      />

      {/* Common Remote Support Issues */}
      <section className="py-16 bg-va-neutral-50">
        <div className="va-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4 text-va-text-primary">
              Issues We Fix Remotely
            </h2>
            <p className="text-lg text-va-text-secondary max-w-2xl mx-auto font-roboto">
              Common computer problems we can solve through remote connection
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Software Problems",
                description: "Program crashes, installation issues, software conflicts",
                icon: Monitor
              },
              {
                title: "Internet & Email",
                description: "Connection issues, email setup, browser problems",
                icon: Wifi
              },
              {
                title: "System Settings",
                description: "Configuration problems, user account issues, privacy settings",
                icon: Settings
              },
              {
                title: "Performance Issues",
                description: "Slow computers, startup problems, memory issues",
                icon: Clock
              },
              {
                title: "Security Concerns",
                description: "Virus scans, security updates, firewall configuration",
                icon: Shield
              },
              {
                title: "Training & Guidance",
                description: "Software training, tips and tricks, general computer education",
                icon: Users
              }
            ].map((issue, index) => {
              const IconComponent = issue.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-lg va-card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-va-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="h-6 w-6 text-va-primary" />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-semibold text-va-text-primary mb-2">
                        {issue.title}
                      </h3>
                      <p className="text-sm text-va-text-secondary font-roboto">
                        {issue.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <PricingCard
        title="Remote Support Pricing"
        subtitle="Flexible pricing options for all your remote support needs"
        tiers={pricingTiers}
        showComparison={true}
      />

      {/* Process */}
      <ProcessTimeline
        title="Remote Support Process"
        subtitle="Getting help is quick and simple with our remote support service"
        steps={processSteps}
      />

      {/* Remote Support Widget */}
      <RemoteSupportWidget 
        title="Request Remote Support Session"
        embedded={false}
      />

      {/* FAQ */}
      <FAQAccordion
        title="Remote Support FAQ"
        subtitle="Common questions about our remote computer support service"
        faqs={faqs}
      />

      {/* Related Services */}
      <RelatedServices
        title="When Remote Support Isn&apos;t Enough"
        subtitle="Additional services for comprehensive computer care"
        services={relatedServices}
      />

      {/* CTA */}
      <ServiceCTA
        title="Computer Problems? Get Help Right Now!"
        description="Don&apos;t struggle with computer issues. Get immediate, professional help through our secure remote support service."
        primaryAction={{
          text: "Start Remote Session",
          href: "#remote-support",
          icon: <Monitor className="mr-2 h-5 w-5" />
        }}
        secondaryAction={{
          text: "Call (757) 375-6764",
          href: "tel:(757)375-6764",
          icon: <Phone className="mr-2 h-5 w-5" />
        }}
        emergencyNote="Available during business hours • Secure encrypted connection"
      />
    </div>
  );
}