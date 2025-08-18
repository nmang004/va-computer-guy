import Link from "next/link";
import { Server, Database, Shield, Cloud, Phone, CheckCircle, Wrench, Network } from "lucide-react";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFeatures } from "@/components/services/service-features";
import { ProcessTimeline } from "@/components/services/process-timeline";
import { FAQAccordion } from "@/components/services/faq-accordion";
import { ServiceCTA } from "@/components/services/service-cta";
import { RelatedServices } from "@/components/services/related-services";
import { PricingCard } from "@/components/services/pricing-card";

export default function ServerSolutionsPage() {
  const features = [
    {
      title: "Server Setup & Configuration",
      description: "Professional installation and configuration of physical and virtual servers",
      icon: Server
    },
    {
      title: "Virtualization Solutions",
      description: "VMware, Hyper-V, and cloud virtualization for maximum efficiency and cost savings",
      icon: Cloud
    },
    {
      title: "Database Management",
      description: "SQL Server, MySQL, and database optimization for reliable data storage",
      icon: Database
    },
    {
      title: "24/7 Monitoring",
      description: "Proactive server monitoring with immediate alerts for issues",
      icon: Shield
    }
  ];

  const processSteps = [
    {
      number: 1,
      title: "Infrastructure Assessment",
      description: "Comprehensive analysis of your current IT infrastructure and business requirements",
      icon: Wrench,
      estimatedTime: "1-2 business days"
    },
    {
      number: 2,
      title: "Solution Design",
      description: "Custom server architecture design with scalability and security considerations",
      icon: Network,
      estimatedTime: "2-3 business days"
    },
    {
      number: 3,
      title: "Implementation",
      description: "Professional installation, configuration, and testing of server solutions",
      icon: Server,
      estimatedTime: "3-7 business days"
    },
    {
      number: 4,
      title: "Training & Support",
      description: "Staff training and ongoing support for your new server infrastructure",
      icon: CheckCircle,
      estimatedTime: "1-2 business days"
    }
  ];

  const pricingTiers = [
    {
      name: "Server Assessment",
      price: 299,
      description: "Complete infrastructure evaluation",
      features: [
        "Current system analysis",
        "Performance evaluation",
        "Security assessment",
        "Detailed recommendations",
        "ROI calculations",
        "Implementation roadmap"
      ],
      ctaText: "Get Assessment",
      ctaHref: "/booking"
    },
    {
      name: "Small Business Server",
      price: 1299,
      description: "Complete server solution for 5-15 users",
      popular: true,
      features: [
        "Server hardware setup",
        "Windows Server installation",
        "User account management",
        "Basic backup configuration",
        "Remote access setup",
        "30-day support included"
      ],
      ctaText: "Deploy Server",
      ctaHref: "/booking"
    },
    {
      name: "Enterprise Server",
      price: 2999,
      description: "Advanced server infrastructure",
      features: [
        "Multiple server deployment",
        "Virtualization platform",
        "High availability setup",
        "Advanced security configuration",
        "Database server setup",
        "90-day support included"
      ],
      ctaText: "Contact for Quote",
      ctaHref: "/booking"
    }
  ];

  const faqs = [
    {
      question: "Do I need a dedicated server for my small business?",
      answer: "It depends on your business needs. If you have 5+ computers sharing files, need centralized backup, or use business applications that require a server, then yes. We can assess your specific situation and recommend the most cost-effective solution."
    },
    {
      question: "What's the difference between physical and virtual servers?",
      answer: "Physical servers are dedicated hardware machines, while virtual servers run multiple 'virtual machines' on one physical server. Virtual servers are more cost-effective, easier to backup, and allow better resource utilization for most businesses."
    },
    {
      question: "How long does server setup take?",
      answer: "Basic server setup typically takes 3-5 business days, including configuration and testing. Complex enterprise deployments may take 1-2 weeks. We provide detailed timelines during the planning phase."
    },
    {
      question: "Do you provide ongoing server maintenance?",
      answer: "Yes, we offer comprehensive managed server support including monitoring, updates, backups, and maintenance. This ensures optimal performance and prevents issues before they impact your business."
    },
    {
      question: "Can you migrate our existing data to a new server?",
      answer: "Absolutely. We handle complete data migration including user accounts, files, applications, and settings. Migration is planned to minimize downtime, often completed over weekends."
    },
    {
      question: "What about server backup and disaster recovery?",
      answer: "We implement comprehensive backup strategies including local and cloud backups. Disaster recovery planning ensures your business can quickly recover from hardware failures or other emergencies."
    },
    {
      question: "Do you work with cloud servers like AWS or Azure?",
      answer: "Yes, we design and implement hybrid solutions combining on-premise and cloud servers. This provides flexibility, scalability, and cost optimization based on your specific business needs."
    },
    {
      question: "What security measures do you implement?",
      answer: "We implement multi-layered security including firewalls, antivirus, user access controls, encryption, and regular security updates. Security is built into every server deployment from the ground up."
    }
  ];

  const relatedServices = [
    {
      title: "Managed IT Support",
      description: "Complete IT management and support services",
      href: "/services/business-services/managed-it",
      icon: Shield,
      pricing: { startingPrice: 199, priceNote: "per month" }
    },
    {
      title: "Network Solutions",
      description: "Complete network design and implementation",
      href: "/services/business-services/network-solutions",
      icon: Network,
      pricing: { startingPrice: 499, priceNote: "project" }
    },
    {
      title: "Data Security",
      description: "Backup and security solutions for businesses",
      href: "/services/business-services/data-security",
      icon: Database,
      pricing: { startingPrice: 199, priceNote: "per month" }
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
          <span className="text-va-text-primary">Server Solutions</span>
        </div>
      </div>

      {/* Hero Section */}
      <ServiceHero
        category="Business Services"
        title="Server & Network Solutions"
        description="Professional server deployment, virtualization, and infrastructure solutions. Build a reliable, scalable IT foundation that grows with your business and keeps your data secure."
        keyBenefit="Enterprise-grade infrastructure designed for small to medium businesses"
        pricing={{ startingPrice: 299, priceNote: "assessment" }}
        estimatedTime="3-7 business days"
        emergencyAvailable={false}
      />

      {/* What's Included */}
      <ServiceFeatures
        title="Server Solution Services"
        subtitle="Complete server infrastructure design, deployment, and management"
        features={features}
        columns={4}
      />

      {/* Pricing */}
      <PricingCard
        title="Server Solution Pricing"
        subtitle="Scalable server solutions for businesses of all sizes"
        tiers={pricingTiers}
        showComparison={true}
      />

      {/* Process */}
      <ProcessTimeline
        title="Server Implementation Process"
        subtitle="Systematic approach to server deployment and configuration"
        steps={processSteps}
      />

      {/* Server Solutions We Provide */}
      <section className="py-16 bg-va-neutral-100">
        <div className="va-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4 text-va-text-primary">
              Server Solutions We Provide
            </h2>
            <p className="text-lg text-va-text-secondary max-w-2xl mx-auto font-roboto">
              Comprehensive server services tailored to your business requirements
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "File Servers",
                description: "Centralized file storage and sharing with user permissions and backup",
                icon: Database
              },
              {
                title: "Application Servers",
                description: "Dedicated servers for business applications like QuickBooks, CRM systems",
                icon: Server
              },
              {
                title: "Email Servers",
                description: "Microsoft Exchange or alternative email solutions with calendar integration",
                icon: Shield
              },
              {
                title: "Backup Servers",
                description: "Automated backup solutions with disaster recovery capabilities",
                icon: Cloud
              },
              {
                title: "Terminal Servers",
                description: "Remote desktop services for accessing applications from anywhere",
                icon: Network
              },
              {
                title: "Database Servers",
                description: "SQL Server, MySQL, and other database platforms for business applications",
                icon: Wrench
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
        title="Server Solutions FAQ"
        subtitle="Common questions about business server implementation and management"
        faqs={faqs}
      />

      {/* Related Services */}
      <RelatedServices
        title="Complete IT Infrastructure"
        subtitle="Services that complement your server solution"
        services={relatedServices}
      />

      {/* CTA */}
      <ServiceCTA
        title="Ready to Build a Reliable Server Infrastructure?"
        description="Stop dealing with slow networks and unreliable file sharing. Get a professional server solution designed for your business needs."
        primaryAction={{
          text: "Get Server Quote",
          href: "/booking",
          icon: <Server className="mr-2 h-5 w-5" />
        }}
        secondaryAction={{
          text: "Call (757) 375-6764",
          href: "tel:(757)375-6764",
          icon: <Phone className="mr-2 h-5 w-5" />
        }}
        emergencyNote="Free assessment • Scalable solutions • Professional implementation"
      />
    </div>
  );
}