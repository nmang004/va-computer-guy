import Link from "next/link";
import { Monitor, Download, Settings, Users, Phone, CheckCircle, Laptop, Cloud } from "lucide-react";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFeatures } from "@/components/services/service-features";
import { ProcessTimeline } from "@/components/services/process-timeline";
import { FAQAccordion } from "@/components/services/faq-accordion";
import { ServiceCTA } from "@/components/services/service-cta";
import { RelatedServices } from "@/components/services/related-services";
import { PricingCard } from "@/components/services/pricing-card";

export default function ComputerSetupPage() {
  const features = [
    {
      title: "Software Installation",
      description: "Complete installation and configuration of essential software and applications",
      icon: Download
    },
    {
      title: "System Optimization",
      description: "Performance tuning and settings configuration for optimal speed and reliability",
      icon: Settings
    },
    {
      title: "Data Transfer",
      description: "Safe transfer of files, photos, and settings from your old computer",
      icon: Cloud
    },
    {
      title: "User Training",
      description: "Personalized training to help you use your new computer effectively",
      icon: Users
    }
  ];

  const processSteps = [
    {
      number: 1,
      title: "Initial Setup",
      description: "Unbox, connect, and perform initial system configuration and updates",
      icon: Monitor,
      estimatedTime: "30-45 minutes"
    },
    {
      number: 2,
      title: "Software Installation",
      description: "Install essential software, security programs, and your preferred applications",
      icon: Download,
      estimatedTime: "45-60 minutes"
    },
    {
      number: 3,
      title: "Data Transfer",
      description: "Transfer files, settings, and preferences from your old computer safely",
      icon: Cloud,
      estimatedTime: "30-90 minutes"
    },
    {
      number: 4,
      title: "Optimization & Training",
      description: "Optimize performance settings and provide hands-on training for your new system",
      icon: Users,
      estimatedTime: "30-45 minutes"
    }
  ];

  const pricingTiers = [
    {
      name: "Basic Setup",
      price: 75,
      description: "Essential new computer configuration",
      features: [
        "Initial system setup",
        "Basic software installation",
        "Security software setup",
        "Simple data transfer",
        "Quick user orientation",
        "30-day setup warranty"
      ],
      ctaText: "Basic Setup",
      ctaHref: "/booking"
    },
    {
      name: "Complete Setup",
      price: 149,
      description: "Comprehensive computer configuration",
      popular: true,
      features: [
        "Complete system setup",
        "Full software suite installation",
        "Comprehensive data transfer",
        "Email and account setup",
        "Performance optimization",
        "Detailed user training",
        "90-day setup warranty"
      ],
      ctaText: "Complete Setup",
      ctaHref: "/booking"
    },
    {
      name: "Premium Setup",
      price: 199,
      description: "Advanced setup with training and optimization",
      features: [
        "Premium system configuration",
        "Advanced software installation",
        "Cloud services setup",
        "Multiple user account setup",
        "Advanced security configuration",
        "Extended training session",
        "6-month priority support"
      ],
      ctaText: "Premium Setup",
      ctaHref: "/booking"
    }
  ];

  const faqs = [
    {
      question: "What&apos;s included in computer setup service?",
      answer: "Our setup service includes unboxing, initial configuration, software installation, data transfer from your old computer, security setup, performance optimization, and user training. We ensure your computer is ready to use when we&apos;re finished."
    },
    {
      question: "How long does computer setup take?",
      answer: "Basic setup typically takes 2-3 hours, while complete setup with full data transfer and training can take 3-5 hours. The timeline depends on how much data needs to be transferred and the complexity of your software needs."
    },
    {
      question: "Can you transfer data from my old computer?",
      answer: "Yes, data transfer is a key part of our service. We can transfer files, photos, documents, email, bookmarks, and even some software settings from Windows to Windows, Mac to Mac, or between different operating systems."
    },
    {
      question: "Do I need to purchase software before setup?",
      answer: "We&apos;ll discuss your software needs during consultation. Some essential software is free, while others require purchase. We can recommend the best options for your needs and budget, and install everything during setup."
    },
    {
      question: "Can you set up my email and online accounts?",
      answer: "Yes, we can configure email accounts, cloud storage services, streaming services, and other online accounts. We&apos;ll need your login information and can help you organize everything securely."
    },
    {
      question: "Do you provide training on how to use my new computer?",
      answer: "Absolutely! Training is included with all setup services. We provide hands-on instruction tailored to your experience level and leave detailed written guides for reference."
    },
    {
      question: "What if I have problems after setup?",
      answer: "All setup services include warranty coverage (30-90 days depending on service level). If you have issues related to our setup work, we&apos;ll resolve them at no charge. We also offer ongoing support services."
    },
    {
      question: "Can you set up multiple computers at once?",
      answer: "Yes, we offer discounts for setting up multiple computers simultaneously. This is perfect for families getting new computers or small businesses upgrading their systems."
    }
  ];

  const relatedServices = [
    {
      title: "In-Home Support",
      description: "On-site setup and training at your home",
      href: "/services/home-services/in-home-support",
      icon: Users,
      pricing: { startingPrice: 119, priceNote: "per visit" }
    },
    {
      title: "Data Recovery",
      description: "Recover data from your old computer before transfer",
      href: "/services/home-services/data-recovery",
      icon: Cloud,
      pricing: { startingPrice: 149, priceNote: "evaluation" }
    },
    {
      title: "Remote Support",
      description: "Ongoing remote support for questions and issues",
      href: "/services/home-services/remote-support",
      icon: Settings,
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
          <span className="text-va-text-primary">Computer Setup</span>
        </div>
      </div>

      {/* Hero Section */}
      <ServiceHero
        category="Home Services"
        title="New Computer Setup & Configuration"
        description="Professional setup service for your new computer. We handle everything from unboxing to data transfer, software installation, and training so your computer is ready to use immediately."
        keyBenefit="Ready to use when we&apos;re done - includes data transfer & training"
        pricing={{ startingPrice: 75, priceNote: "per computer" }}
        estimatedTime="2-5 hours"
        emergencyAvailable={false}
      />

      {/* What's Included */}
      <ServiceFeatures
        title="Computer Setup Services"
        subtitle="Complete configuration and setup for your new computer"
        features={features}
        columns={4}
      />

      {/* Setup Process */}
      <ProcessTimeline
        title="Computer Setup Process"
        subtitle="Professional setup from unboxing to ready-to-use"
        steps={processSteps}
      />

      {/* Software We Install */}
      <section className="py-16 bg-va-neutral-50">
        <div className="va-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4 text-va-text-primary">
              Software We Install & Configure
            </h2>
            <p className="text-lg text-va-text-secondary max-w-2xl mx-auto font-roboto">
              Essential software and applications to get you started
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                category: "Security",
                items: ["Antivirus software", "Windows Defender", "Malware protection", "Firewall setup"],
                icon: CheckCircle
              },
              {
                category: "Productivity",
                items: ["Microsoft Office", "Google Workspace", "PDF readers", "File compression"],
                icon: Laptop
              },
              {
                category: "Internet & Email",
                items: ["Web browsers", "Email clients", "Video calling", "Cloud storage"],
                icon: Cloud
              },
              {
                category: "Media & Entertainment",
                items: ["Media players", "Photo viewers", "Streaming apps", "Audio software"],
                icon: Monitor
              }
            ].map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-lg va-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-va-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-va-primary" />
                    </div>
                    <h3 className="font-montserrat font-semibold text-va-text-primary">
                      {category.category}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-va-text-secondary font-roboto flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-va-accent rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <PricingCard
        title="Computer Setup Pricing"
        subtitle="Professional setup services for new computers"
        tiers={pricingTiers}
        showComparison={true}
      />

      {/* Data Transfer Options */}
      <section className="py-16 bg-va-neutral-100">
        <div className="va-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4 text-va-text-primary">
              Data Transfer Options
            </h2>
            <p className="text-lg text-va-text-secondary max-w-2xl mx-auto font-roboto">
              We safely transfer your important data from your old computer
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: "Direct Transfer",
                description: "Direct connection between old and new computer for fastest transfer",
                time: "30-60 minutes",
                bestFor: "When both computers are working"
              },
              {
                title: "External Drive",
                description: "Transfer via external hard drive or USB storage device",
                time: "45-90 minutes", 
                bestFor: "Large amounts of data or slow networks"
              },
              {
                title: "Cloud Transfer",
                description: "Upload to cloud storage and download to new computer",
                time: "Variable",
                bestFor: "Remote transfer or backup creation"
              }
            ].map((option, index) => (
              <div key={index} className="bg-white p-6 rounded-lg va-card">
                <h3 className="font-montserrat font-semibold text-va-text-primary mb-2">
                  {option.title}
                </h3>
                <p className="text-sm text-va-text-secondary font-roboto mb-4">
                  {option.description}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-va-text-muted">Time:</span>
                    <span className="font-medium text-va-text-primary">{option.time}</span>
                  </div>
                  <div className="text-va-text-muted">
                    <span className="font-medium">Best for:</span> {option.bestFor}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion
        title="Computer Setup FAQ"
        subtitle="Common questions about new computer setup and configuration"
        faqs={faqs}
      />

      {/* Related Services */}
      <RelatedServices
        title="Complete Your Computer Experience"
        subtitle="Additional services to enhance your new computer"
        services={relatedServices}
      />

      {/* CTA */}
      <ServiceCTA
        title="Got a New Computer? Let Us Set It Up!"
        description="Skip the hassle and frustration of setting up your new computer. Our experts will have you up and running with all your data, software, and settings configured perfectly."
        primaryAction={{
          text: "Schedule Setup",
          href: "/booking",
          icon: <Monitor className="mr-2 h-5 w-5" />
        }}
        secondaryAction={{
          text: "Call (757) 375-6764",
          href: "tel:(757)375-6764",
          icon: <Phone className="mr-2 h-5 w-5" />
        }}
        emergencyNote="Setup includes data transfer, software installation, and training"
      />
    </div>
  );
}