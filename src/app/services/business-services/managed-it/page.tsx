import Link from "next/link";
import { Building, Monitor, Clock, Shield, Phone, CheckCircle, Users, Headphones } from "lucide-react";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFeatures } from "@/components/services/service-features";
import { ProcessTimeline } from "@/components/services/process-timeline";
import { FAQAccordion } from "@/components/services/faq-accordion";
import { ServiceCTA } from "@/components/services/service-cta";
import { RelatedServices } from "@/components/services/related-services";
import { PricingCard } from "@/components/services/pricing-card";

export default function ManagedITPage() {
  const features = [
    {
      title: "24/7 Monitoring",
      description: "Round-the-clock system monitoring with proactive issue detection and resolution",
      icon: Clock
    },
    {
      title: "Help Desk Support",
      description: "Dedicated help desk for your team with priority response times",
      icon: Headphones
    },
    {
      title: "Security Management",
      description: "Comprehensive cybersecurity monitoring, updates, and threat protection",
      icon: Shield
    },
    {
      title: "System Maintenance",
      description: "Regular updates, patches, and maintenance to keep systems running optimally",
      icon: Monitor
    }
  ];

  const processSteps = [
    {
      number: 1,
      title: "IT Assessment",
      description: "Comprehensive evaluation of your current IT infrastructure and business needs",
      icon: Building,
      estimatedTime: "1-2 weeks"
    },
    {
      number: 2,
      title: "Custom IT Plan",
      description: "Design tailored managed IT solution with service levels matching your requirements",
      icon: Users,
      estimatedTime: "1 week"
    },
    {
      number: 3,
      title: "System Integration",
      description: "Implement monitoring tools and establish support procedures for your environment",
      icon: Monitor,
      estimatedTime: "1-2 weeks"
    },
    {
      number: 4,
      title: "Ongoing Support",
      description: "Continuous monitoring, maintenance, and support with regular reporting",
      icon: Headphones,
      estimatedTime: "Ongoing"
    }
  ];

  const pricingTiers = [
    {
      name: "Essential IT",
      price: 199,
      priceNote: "per month (5-10 users)",
      description: "Basic managed IT for small businesses",
      features: [
        "Business hours help desk support",
        "Remote monitoring and maintenance",
        "Antivirus and security management",
        "Monthly system reports",
        "Email and phone support",
        "Backup monitoring"
      ],
      ctaText: "Start Essential Plan",
      ctaHref: "/booking"
    },
    {
      name: "Business IT",
      price: 399,
      priceNote: "per month (10-25 users)",
      description: "Comprehensive IT management for growing businesses",
      popular: true,
      features: [
        "24/7 monitoring and support",
        "Proactive maintenance",
        "Advanced security monitoring",
        "Server and network management",
        "Priority help desk support",
        "Quarterly business reviews",
        "On-site support included"
      ],
      ctaText: "Get Business Plan",
      ctaHref: "/booking"
    },
    {
      name: "Enterprise IT",
      price: 699,
      priceNote: "per month (25+ users)",
      description: "Enterprise-grade IT management and support",
      features: [
        "Dedicated account manager",
        "Custom SLA agreements",
        "Advanced threat protection",
        "Compliance management",
        "24/7 emergency support",
        "Monthly on-site visits",
        "Strategic IT planning"
      ],
      ctaText: "Enterprise Solution",
      ctaHref: "/booking"
    }
  ];

  const faqs = [
    {
      question: "What is managed IT support?",
      answer: "Managed IT support is a comprehensive service where we proactively monitor, maintain, and support your business technology infrastructure. Instead of waiting for problems to occur, we prevent issues and ensure your systems run smoothly 24/7."
    },
    {
      question: "How quickly do you respond to IT issues?",
      answer: "Response times depend on your service level: Essential plan customers receive business hours support with 4-hour response, Business plan customers get 24/7 support with 2-hour response, and Enterprise customers receive 1-hour priority response times."
    },
    {
      question: "Do you support both on-site and remote work environments?",
      answer: "Yes, we support hybrid work environments including on-site servers, cloud services, and remote workers. We ensure secure connectivity and consistent support regardless of where your team works."
    },
    {
      question: "What&apos;s included in proactive monitoring?",
      answer: "Our monitoring includes server performance, network connectivity, security threats, backup verification, software updates, disk space, and system health. We identify and resolve issues before they impact your business operations."
    },
    {
      question: "Can you help with compliance requirements?",
      answer: "Yes, we assist with various compliance requirements including HIPAA, PCI-DSS, SOC 2, and general data protection regulations. Our Enterprise plans include dedicated compliance management and documentation."
    },
    {
      question: "Do you provide cybersecurity services?",
      answer: "Cybersecurity is a core component of our managed IT services. We provide firewall management, endpoint protection, email security, security awareness training, and incident response planning."
    },
    {
      question: "What if we need on-site support?",
      answer: "Business and Enterprise plans include on-site support. Essential plan customers can request on-site visits at our standard hourly rates. We maintain local technicians in the Virginia Beach area for rapid response."
    },
    {
      question: "How do you handle after-hours emergencies?",
      answer: "Business and Enterprise customers have access to our 24/7 emergency support line. We maintain on-call technicians who can remotely resolve most issues or dispatch on-site support when necessary."
    }
  ];

  const relatedServices = [
    {
      title: "Network Solutions",
      description: "Design and implement robust business networks",
      href: "/services/business-services/network-solutions",
      icon: Monitor,
      pricing: { startingPrice: 299, priceNote: "project start" }
    },
    {
      title: "Data Security",
      description: "Advanced cybersecurity and backup solutions",
      href: "/services/business-services/data-security",
      icon: Shield,
      pricing: { startingPrice: 199, priceNote: "per month" }
    },
    {
      title: "Business Consulting",
      description: "Strategic IT planning and technology consulting",
      href: "/services/business-services/consulting",
      icon: Users,
      pricing: { startingPrice: 150, priceNote: "per hour" }
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <div className="va-container py-4">
        <div className="flex items-center gap-2 text-sm text-va-text-secondary font-roboto">
          <Link href="/" className="hover:text-va-primary">Home</Link>
          <span>/</span>
          <Link href="/services/business-services" className="hover:text-va-primary">Business Services</Link>
          <span>/</span>
          <span className="text-va-text-primary">Managed IT Support</span>
        </div>
      </div>

      {/* Hero Section */}
      <ServiceHero
        category="Business Services"
        title="Managed IT Support"
        description="Comprehensive IT management and support for your business. Proactive monitoring, help desk support, and strategic technology management to keep your business running smoothly."
        keyBenefit="24/7 monitoring with guaranteed response times"
        pricing={{ startingPrice: 199, priceNote: "per month" }}
        estimatedTime="Ongoing support"
        emergencyAvailable={true}
      />

      {/* What's Included */}
      <ServiceFeatures
        title="Managed IT Services"
        subtitle="Comprehensive technology management for modern businesses"
        features={features}
        columns={4}
      />

      {/* Service Benefits */}
      <section className="py-16 bg-va-neutral-50">
        <div className="va-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4 text-va-text-primary">
              Why Choose Managed IT?
            </h2>
            <p className="text-lg text-va-text-secondary max-w-2xl mx-auto font-roboto">
              Transform your technology from a cost center to a competitive advantage
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Reduce Downtime",
                description: "Proactive monitoring prevents issues before they impact your business",
                stat: "99.9%",
                statLabel: "Uptime Guarantee"
              },
              {
                title: "Lower IT Costs",
                description: "Predictable monthly costs replace expensive emergency repairs",
                stat: "40%",
                statLabel: "Average Cost Savings"
              },
              {
                title: "Improve Security",
                description: "Advanced threat protection and compliance management",
                stat: "24/7",
                statLabel: "Security Monitoring"
              },
              {
                title: "Increase Productivity",
                description: "Your team focuses on business goals while we handle technology",
                stat: "2-Hour",
                statLabel: "Average Response"
              },
              {
                title: "Strategic Planning",
                description: "Technology roadmap aligned with your business objectives",
                stat: "Quarterly",
                statLabel: "Business Reviews"
              },
              {
                title: "Expert Support",
                description: "Certified technicians with deep business technology expertise",
                stat: "15+ Years",
                statLabel: "Average Experience"
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg va-card text-center">
                <div className="text-3xl font-bold text-va-primary mb-2">{benefit.stat}</div>
                <div className="text-sm text-va-text-muted mb-3">{benefit.statLabel}</div>
                <h3 className="font-montserrat font-semibold text-va-text-primary mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-va-text-secondary font-roboto">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <PricingCard
        title="Managed IT Support Plans"
        subtitle="Scalable IT support solutions for businesses of all sizes"
        tiers={pricingTiers}
        showComparison={true}
      />

      {/* Process */}
      <ProcessTimeline
        title="Managed IT Implementation"
        subtitle="Professional onboarding and ongoing support process"
        steps={processSteps}
      />

      {/* Technology We Support */}
      <section className="py-16 bg-va-neutral-100">
        <div className="va-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4 text-va-text-primary">
              Technology We Support
            </h2>
            <p className="text-lg text-va-text-secondary max-w-2xl mx-auto font-roboto">
              Comprehensive support for all major business technology platforms
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                category: "Operating Systems",
                items: ["Windows Server", "Windows 10/11", "macOS", "Linux distributions"],
                icon: Monitor
              },
              {
                category: "Cloud Platforms",
                items: ["Microsoft 365", "Google Workspace", "AWS", "Azure"],
                icon: Shield
              },
              {
                category: "Business Software",
                items: ["QuickBooks", "Salesforce", "Office Suite", "Industry-specific apps"],
                icon: Building
              },
              {
                category: "Infrastructure",
                items: ["Servers", "Firewalls", "Switches", "Wireless access points"],
                icon: Users
              }
            ].map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-lg va-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-va-secondary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-va-secondary" />
                    </div>
                    <h3 className="font-montserrat font-semibold text-va-text-primary">
                      {category.category}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-va-text-secondary font-roboto flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-va-accent" />
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

      {/* FAQ */}
      <FAQAccordion
        title="Managed IT Support FAQ"
        subtitle="Common questions about our managed IT services"
        faqs={faqs}
      />

      {/* Related Services */}
      <RelatedServices
        title="Complete Your IT Infrastructure"
        subtitle="Additional services that complement managed IT support"
        services={relatedServices}
      />

      {/* CTA */}
      <ServiceCTA
        title="Ready to Transform Your Business IT?"
        description="Stop dealing with technology headaches. Get proactive IT management that keeps your business running smoothly and securely."
        primaryAction={{
          text: "Start IT Assessment",
          href: "/booking",
          icon: <Building className="mr-2 h-5 w-5" />
        }}
        secondaryAction={{
          text: "Call (757) 375-6764",
          href: "tel:(757)375-6764",
          icon: <Phone className="mr-2 h-5 w-5" />
        }}
        emergencyNote="24/7 support available • 99.9% uptime guarantee • No long-term contracts"
      />
    </div>
  );
}