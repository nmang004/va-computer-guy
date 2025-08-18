import Link from "next/link";
import { Wifi, Router, Shield, Zap, Phone, CheckCircle, Network, Cable } from "lucide-react";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFeatures } from "@/components/services/service-features";
import { ProcessTimeline } from "@/components/services/process-timeline";
import { FAQAccordion } from "@/components/services/faq-accordion";
import { ServiceCTA } from "@/components/services/service-cta";
import { RelatedServices } from "@/components/services/related-services";
import { PricingCard } from "@/components/services/pricing-card";

export default function NetworkSolutionsPage() {
  const features = [
    {
      title: "Network Design",
      description: "Custom network architecture designed for your business requirements and growth",
      icon: Network
    },
    {
      title: "WiFi Optimization",
      description: "High-performance wireless networks with comprehensive coverage and security",
      icon: Wifi
    },
    {
      title: "Security Implementation",
      description: "Advanced network security with firewall configuration and access controls",
      icon: Shield
    },
    {
      title: "Performance Monitoring",
      description: "Ongoing network monitoring and optimization for maximum speed and reliability",
      icon: Zap
    }
  ];

  const processSteps = [
    {
      number: 1,
      title: "Network Assessment",
      description: "Comprehensive evaluation of current network infrastructure and business requirements",
      icon: Network,
      estimatedTime: "1-2 days"
    },
    {
      number: 2,
      title: "Design & Planning",
      description: "Create detailed network design with equipment specifications and implementation plan",
      icon: Router,
      estimatedTime: "3-5 days"
    },
    {
      number: 3,
      title: "Installation & Configuration",
      description: "Professional installation of equipment with complete configuration and testing",
      icon: Cable,
      estimatedTime: "1-3 days"
    },
    {
      number: 4,
      title: "Testing & Optimization",
      description: "Comprehensive testing and performance optimization with user training",
      icon: Zap,
      estimatedTime: "1 day"
    }
  ];

  const pricingTiers = [
    {
      name: "Small Office Network",
      price: 299,
      description: "Basic network setup for small businesses",
      features: [
        "Network assessment and design",
        "Router and switch configuration",
        "Basic WiFi setup (1-2 access points)",
        "Firewall configuration",
        "Guest network setup",
        "30-day support warranty"
      ],
      ctaText: "Setup Small Network",
      ctaHref: "/booking"
    },
    {
      name: "Business Network",
      price: 599,
      description: "Comprehensive network for growing businesses",
      popular: true,
      features: [
        "Advanced network design",
        "Enterprise-grade equipment",
        "Multiple WiFi access points",
        "VLAN configuration",
        "Network security implementation",
        "Performance monitoring setup",
        "90-day support warranty"
      ],
      ctaText: "Design Business Network",
      ctaHref: "/booking"
    },
    {
      name: "Enterprise Network",
      price: 1299,
      description: "Advanced network infrastructure for large businesses",
      features: [
        "Complex network architecture",
        "Redundant connectivity",
        "Advanced security features",
        "Network management system",
        "24/7 monitoring setup",
        "Staff training included",
        "1-year support warranty"
      ],
      ctaText: "Enterprise Solution",
      ctaHref: "/booking"
    }
  ];

  const faqs = [
    {
      question: "What&apos;s included in a network assessment?",
      answer: "Our network assessment includes evaluation of current equipment, network topology analysis, performance testing, security review, coverage analysis, and identification of bottlenecks or vulnerabilities. We provide a detailed report with recommendations."
    },
    {
      question: "How long does network installation take?",
      answer: "Installation time depends on network complexity. Small office networks typically take 1-2 days, business networks take 2-3 days, and enterprise networks can take 3-7 days. We provide detailed timelines during the planning phase."
    },
    {
      question: "Do you provide ongoing network support?",
      answer: "Yes, we offer ongoing network support through our Managed IT services. This includes monitoring, maintenance, troubleshooting, and optimization. We also provide warranty support for all installed equipment."
    },
    {
      question: "Can you improve our existing network performance?",
      answer: "Absolutely. We can optimize existing networks by upgrading equipment, reconfiguring settings, improving WiFi coverage, implementing Quality of Service (QoS), and addressing security vulnerabilities."
    },
    {
      question: "What about network security?",
      answer: "Network security is integral to all our solutions. We implement firewalls, secure WiFi with WPA3 encryption, network segmentation, access controls, intrusion detection, and regular security updates."
    },
    {
      question: "Do you support remote workers?",
      answer: "Yes, we design networks that support hybrid work environments including secure VPN access, cloud connectivity, and remote access solutions. We ensure remote workers have secure, reliable access to business resources."
    },
    {
      question: "What equipment brands do you recommend?",
      answer: "We work with enterprise-grade brands including Cisco, Ubiquiti, SonicWall, and Meraki. Equipment selection depends on your specific requirements, budget, and growth plans. We only recommend reliable, business-class solutions."
    },
    {
      question: "Can you help with WiFi dead zones?",
      answer: "Yes, WiFi coverage optimization is a key service. We perform site surveys to identify dead zones and design solutions using strategically placed access points, mesh systems, or range extenders to ensure complete coverage."
    }
  ];

  const relatedServices = [
    {
      title: "Managed IT Support",
      description: "Ongoing network monitoring and maintenance",
      href: "/services/business-services/managed-it",
      icon: Network,
      pricing: { startingPrice: 199, priceNote: "per month" }
    },
    {
      title: "Data Security",
      description: "Advanced cybersecurity for your network",
      href: "/services/business-services/data-security",
      icon: Shield,
      pricing: { startingPrice: 199, priceNote: "per month" }
    },
    {
      title: "Server Solutions",
      description: "Server infrastructure to complement your network",
      href: "/services/business-services/server-solutions",
      icon: Router,
      pricing: { startingPrice: 399, priceNote: "project start" }
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
          <span className="text-va-text-primary">Network Solutions</span>
        </div>
      </div>

      {/* Hero Section */}
      <ServiceHero
        category="Business Services"
        title="Network & Server Solutions"
        description="Professional network design, implementation, and optimization for businesses. From small office networks to enterprise infrastructure, we build reliable, secure, and scalable network solutions."
        keyBenefit="Enterprise-grade networks with 99.9% uptime reliability"
        pricing={{ startingPrice: 299, priceNote: "project start" }}
        estimatedTime="1-7 days"
        emergencyAvailable={true}
      />

      {/* What's Included */}
      <ServiceFeatures
        title="Network Solution Services"
        subtitle="Complete network infrastructure design and implementation"
        features={features}
        columns={4}
      />

      {/* Network Types */}
      <section className="py-16 bg-va-neutral-50">
        <div className="va-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4 text-va-text-primary">
              Network Solutions We Provide
            </h2>
            <p className="text-lg text-va-text-secondary max-w-2xl mx-auto font-roboto">
              Comprehensive networking solutions for all business environments
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Wired Networks",
                description: "High-speed Ethernet networks with structured cabling and managed switches",
                icon: Cable,
                features: ["Gigabit Ethernet", "Structured cabling", "Managed switches", "VLAN setup"]
              },
              {
                title: "Wireless Networks",
                description: "Enterprise WiFi with seamless coverage and advanced security features",
                icon: Wifi,
                features: ["WiFi 6 technology", "Mesh networks", "Guest access", "Coverage optimization"]
              },
              {
                title: "Hybrid Networks",
                description: "Integrated wired and wireless solutions for maximum flexibility",
                icon: Network,
                features: ["Unified management", "Seamless roaming", "Load balancing", "Redundancy"]
              },
              {
                title: "Security Networks",
                description: "Secure network architecture with advanced threat protection",
                icon: Shield,
                features: ["Firewall integration", "Network segmentation", "Access controls", "Monitoring"]
              },
              {
                title: "Cloud Networks",
                description: "Hybrid cloud connectivity with secure remote access solutions",
                icon: Router,
                features: ["VPN setup", "Cloud integration", "Remote access", "SD-WAN"]
              },
              {
                title: "Performance Networks",
                description: "High-performance networks optimized for demanding applications",
                icon: Zap,
                features: ["QoS configuration", "Traffic shaping", "Bandwidth management", "Monitoring"]
              }
            ].map((solution, index) => {
              const IconComponent = solution.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-lg va-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-va-secondary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-va-secondary" />
                    </div>
                    <h3 className="font-montserrat font-semibold text-va-text-primary">
                      {solution.title}
                    </h3>
                  </div>
                  <p className="text-sm text-va-text-secondary font-roboto mb-4">
                    {solution.description}
                  </p>
                  <ul className="space-y-1">
                    {solution.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-xs text-va-text-muted flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-va-accent" />
                        {feature}
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
        title="Network Solution Pricing"
        subtitle="Professional network design and implementation services"
        tiers={pricingTiers}
        showComparison={true}
      />

      {/* Process */}
      <ProcessTimeline
        title="Network Implementation Process"
        subtitle="Professional network design and deployment methodology"
        steps={processSteps}
      />

      {/* Performance Metrics */}
      <section className="py-16 bg-va-neutral-100">
        <div className="va-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4 text-va-text-primary">
              Network Performance Standards
            </h2>
            <p className="text-lg text-va-text-secondary max-w-2xl mx-auto font-roboto">
              We design and implement networks that meet enterprise performance standards
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                metric: "99.9%",
                label: "Network Uptime",
                description: "Reliable connectivity with minimal downtime"
              },
              {
                metric: "1 Gbps",
                label: "Network Speed",
                description: "High-speed connectivity for demanding applications"
              },
              {
                metric: "<5ms",
                label: "Network Latency",
                description: "Low latency for real-time applications"
              },
              {
                metric: "24/7",
                label: "Monitoring",
                description: "Continuous network performance monitoring"
              }
            ].map((standard, index) => (
              <div key={index} className="bg-white p-6 rounded-lg va-card text-center">
                <div className="text-3xl font-bold text-va-secondary mb-2">{standard.metric}</div>
                <div className="font-montserrat font-semibold text-va-text-primary mb-2">
                  {standard.label}
                </div>
                <p className="text-sm text-va-text-secondary font-roboto">
                  {standard.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion
        title="Network Solutions FAQ"
        subtitle="Common questions about business network design and implementation"
        faqs={faqs}
      />

      {/* Related Services */}
      <RelatedServices
        title="Complete Your IT Infrastructure"
        subtitle="Services that complement your network solution"
        services={relatedServices}
      />

      {/* CTA */}
      <ServiceCTA
        title="Ready to Upgrade Your Business Network?"
        description="Get a reliable, secure, and high-performance network that grows with your business. Professional design and implementation with ongoing support."
        primaryAction={{
          text: "Schedule Network Assessment",
          href: "/booking",
          icon: <Network className="mr-2 h-5 w-5" />
        }}
        secondaryAction={{
          text: "Call (757) 375-6764",
          href: "tel:(757)375-6764",
          icon: <Phone className="mr-2 h-5 w-5" />
        }}
        emergencyNote="Emergency network support available • Enterprise-grade solutions • Scalable designs"
      />
    </div>
  );
}