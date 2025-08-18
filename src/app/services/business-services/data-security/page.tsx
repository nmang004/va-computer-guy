import Link from "next/link";
import { Shield, Lock, Database, CloudDownload, Phone, CheckCircle, FileCheck, AlertTriangle } from "lucide-react";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFeatures } from "@/components/services/service-features";
import { ProcessTimeline } from "@/components/services/process-timeline";
import { FAQAccordion } from "@/components/services/faq-accordion";
import { ServiceCTA } from "@/components/services/service-cta";
import { RelatedServices } from "@/components/services/related-services";
import { PricingCard } from "@/components/services/pricing-card";

export default function DataSecurityPage() {
  const features = [
    {
      title: "Automated Backup Solutions",
      description: "Scheduled, automated backups to multiple locations with verification and monitoring",
      icon: Database
    },
    {
      title: "Cybersecurity Protection",
      description: "Advanced threat protection, firewalls, and security monitoring for your business",
      icon: Shield
    },
    {
      title: "Data Encryption",
      description: "End-to-end encryption for sensitive data both in transit and at rest",
      icon: Lock
    },
    {
      title: "Disaster Recovery Planning",
      description: "Comprehensive recovery plans to minimize downtime during emergencies",
      icon: CloudDownload
    }
  ];

  const processSteps = [
    {
      number: 1,
      title: "Security Assessment",
      description: "Comprehensive evaluation of current security posture and vulnerability assessment",
      icon: AlertTriangle,
      estimatedTime: "1-2 business days"
    },
    {
      number: 2,
      title: "Solution Design",
      description: "Custom security and backup strategy tailored to your business requirements",
      icon: FileCheck,
      estimatedTime: "2-3 business days"
    },
    {
      number: 3,
      title: "Implementation",
      description: "Professional deployment of security tools, backup systems, and monitoring",
      icon: Shield,
      estimatedTime: "3-5 business days"
    },
    {
      number: 4,
      title: "Training & Monitoring",
      description: "Staff training on security best practices and ongoing monitoring setup",
      icon: CheckCircle,
      estimatedTime: "1-2 business days"
    }
  ];

  const pricingTiers = [
    {
      name: "Security Assessment",
      price: 199,
      description: "Complete security evaluation",
      features: [
        "Vulnerability scanning",
        "Security policy review",
        "Risk assessment report",
        "Compliance gap analysis",
        "Detailed recommendations",
        "ROI projections"
      ],
      ctaText: "Get Assessment",
      ctaHref: "/booking"
    },
    {
      name: "Essential Protection",
      price: 299,
      description: "Core security and backup for small businesses",
      popular: true,
      features: [
        "Automated daily backups",
        "Cloud backup storage",
        "Basic firewall setup",
        "Antivirus management",
        "Monthly security reports",
        "Email security filtering"
      ],
      ctaText: "Start Protection",
      ctaHref: "/booking"
    },
    {
      name: "Enterprise Security",
      price: 699,
      description: "Advanced security and compliance",
      features: [
        "24/7 security monitoring",
        "Advanced threat detection",
        "Compliance reporting",
        "Disaster recovery planning",
        "Security incident response",
        "Employee security training"
      ],
      ctaText: "Contact for Quote",
      ctaHref: "/booking"
    }
  ];

  const faqs = [
    {
      question: "How often should we backup our business data?",
      answer: "We recommend daily automated backups for most businesses, with hourly backups for critical systems. The frequency depends on how much data you can afford to lose - our assessment will determine the optimal backup schedule for your business."
    },
    {
      question: "What's the difference between local and cloud backups?",
      answer: "Local backups are faster to restore but vulnerable to on-site disasters. Cloud backups protect against local disasters but take longer to restore large amounts of data. We typically recommend a hybrid approach with both local and cloud backups."
    },
    {
      question: "Do small businesses really need advanced cybersecurity?",
      answer: "Absolutely. Small businesses are increasingly targeted by cybercriminals because they often have weaker security. The average cost of a data breach for small businesses is $2.98 million, making cybersecurity protection a critical investment."
    },
    {
      question: "How long does it take to recover from a security incident?",
      answer: "Recovery time depends on the incident type and your preparation. With proper backup and disaster recovery plans, most businesses can be operational within 4-24 hours. Without preparation, recovery can take weeks and may result in permanent data loss."
    },
    {
      question: "What compliance requirements might affect our business?",
      answer: "Common requirements include HIPAA (healthcare), PCI DSS (credit card processing), SOX (public companies), and GDPR (EU customers). We assess your specific compliance needs and implement appropriate security measures."
    },
    {
      question: "Can you help with cyber insurance requirements?",
      answer: "Yes, many cyber insurance policies require specific security measures. We help implement these requirements and provide documentation needed for insurance applications and claims."
    },
    {
      question: "What happens if our current backup system fails?",
      answer: "Backup failures are unfortunately common. We perform regular backup testing and monitoring to catch failures immediately. Our systems include multiple redundant backup methods to ensure your data is always protected."
    },
    {
      question: "How do you keep our business data secure in the cloud?",
      answer: "We use enterprise-grade encryption, secure transmission protocols, and reputable cloud providers with strong security certifications. Your data is encrypted before leaving your premises and remains encrypted in the cloud."
    }
  ];

  const relatedServices = [
    {
      title: "Managed IT Support",
      description: "Complete IT management including security monitoring",
      href: "/services/business-services/managed-it",
      icon: Shield,
      pricing: { startingPrice: 199, priceNote: "per month" }
    },
    {
      title: "Server Solutions",
      description: "Secure server infrastructure and deployment",
      href: "/services/business-services/server-solutions",
      icon: Database,
      pricing: { startingPrice: 1299, priceNote: "project" }
    },
    {
      title: "Business Consulting",
      description: "IT strategy and security planning services",
      href: "/services/business-services/consulting",
      icon: FileCheck,
      pricing: { startingPrice: 199, priceNote: "per consultation" }
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
          <span className="text-va-text-primary">Data Backup & Security</span>
        </div>
      </div>

      {/* Hero Section */}
      <ServiceHero
        category="Business Services"
        title="Data Backup & Security Solutions"
        description="Comprehensive data protection and cybersecurity services to safeguard your business. From automated backups to advanced threat protection, we keep your critical data secure and recoverable."
        keyBenefit="Protect your business from data loss and cyber threats with enterprise-grade security"
        pricing={{ startingPrice: 199, priceNote: "assessment" }}
        estimatedTime="3-5 business days"
        emergencyAvailable={false}
      />

      {/* What's Included */}
      <ServiceFeatures
        title="Data Security Services"
        subtitle="Complete data protection and cybersecurity solutions for businesses"
        features={features}
        columns={4}
      />

      {/* Pricing */}
      <PricingCard
        title="Data Security Pricing"
        subtitle="Scalable security solutions to protect businesses of all sizes"
        tiers={pricingTiers}
        showComparison={true}
      />

      {/* Process */}
      <ProcessTimeline
        title="Security Implementation Process"
        subtitle="Systematic approach to securing your business data and systems"
        steps={processSteps}
      />

      {/* Security Solutions We Provide */}
      <section className="py-16 bg-va-neutral-100">
        <div className="va-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4 text-va-text-primary">
              Security Solutions We Provide
            </h2>
            <p className="text-lg text-va-text-secondary max-w-2xl mx-auto font-roboto">
              Comprehensive security services to protect your business from all angles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Backup Management",
                description: "Automated backup scheduling, monitoring, and verification with multiple restore points",
                icon: Database
              },
              {
                title: "Firewall Protection",
                description: "Advanced firewall configuration and management to block unauthorized access",
                icon: Shield
              },
              {
                title: "Email Security",
                description: "Spam filtering, phishing protection, and secure email encryption services",
                icon: Lock
              },
              {
                title: "Endpoint Protection",
                description: "Advanced antivirus and anti-malware protection for all devices",
                icon: CheckCircle
              },
              {
                title: "Security Monitoring",
                description: "24/7 monitoring for threats, intrusions, and suspicious activities",
                icon: AlertTriangle
              },
              {
                title: "Compliance Support",
                description: "HIPAA, PCI DSS, and other compliance requirement implementation",
                icon: FileCheck
              }
            ].map((solution, index) => {
              const IconComponent = solution.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-lg va-card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-va-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="h-6 w-6 text-va-primary" />
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
        title="Data Security FAQ"
        subtitle="Common questions about business data protection and cybersecurity"
        faqs={faqs}
      />

      {/* Related Services */}
      <RelatedServices
        title="Complete Business Protection"
        subtitle="Services that complement your data security solution"
        services={relatedServices}
      />

      {/* CTA */}
      <ServiceCTA
        title="Don't Wait for a Security Incident to Act"
        description="Protect your business data and reputation with comprehensive security solutions. One security breach can cost more than years of protection."
        primaryAction={{
          text: "Get Security Assessment",
          href: "/booking",
          icon: <Shield className="mr-2 h-5 w-5" />
        }}
        secondaryAction={{
          text: "Call (757) 375-6764",
          href: "tel:(757)375-6764",
          icon: <Phone className="mr-2 h-5 w-5" />
        }}
        emergencyNote="Free security assessment • 24/7 monitoring available • Compliance support"
      />
    </div>
  );
}