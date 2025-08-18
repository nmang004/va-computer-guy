import Link from "next/link";
import { Zap, Clock, Phone, AlertTriangle, CheckCircle, Wrench, Shield, Laptop } from "lucide-react";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFeatures } from "@/components/services/service-features";
import { ProcessTimeline } from "@/components/services/process-timeline";
import { FAQAccordion } from "@/components/services/faq-accordion";
import { ServiceCTA } from "@/components/services/service-cta";
import { RelatedServices } from "@/components/services/related-services";
import { PricingCard } from "@/components/services/pricing-card";

export default function EmergencySupportPage() {
  const features = [
    {
      title: "Same-Day Service",
      description: "Emergency computer repair and support available the same day you call",
      icon: Clock
    },
    {
      title: "24/7 Remote Support",
      description: "After-hours remote assistance for critical business operations",
      icon: Shield
    },
    {
      title: "Crisis Response",
      description: "Immediate response to system failures, security breaches, and data emergencies",
      icon: AlertTriangle
    },
    {
      title: "Priority Service",
      description: "Skip the queue with priority scheduling and dedicated emergency technicians",
      icon: Zap
    }
  ];

  const processSteps = [
    {
      number: 1,
      title: "Emergency Call",
      description: "Call our emergency line for immediate assessment and priority scheduling",
      icon: Phone,
      estimatedTime: "Immediate response"
    },
    {
      number: 2,
      title: "Rapid Assessment",
      description: "Quick diagnosis to determine severity and best course of action",
      icon: AlertTriangle,
      estimatedTime: "Within 30 minutes"
    },
    {
      number: 3,
      title: "Emergency Resolution",
      description: "Same-day service with priority parts ordering and extended service hours",
      icon: Wrench,
      estimatedTime: "Same day"
    },
    {
      number: 4,
      title: "Follow-up Support",
      description: "Post-emergency monitoring and prevention recommendations",
      icon: CheckCircle,
      estimatedTime: "24-48 hours"
    }
  ];

  const pricingTiers = [
    {
      name: "Emergency Diagnostic",
      price: 149,
      description: "Same-day emergency assessment",
      features: [
        "Priority scheduling",
        "Emergency diagnostic fee",
        "Same-day service available",
        "Immediate problem assessment",
        "Emergency repair estimate",
        "After-hours availability"
      ],
      ctaText: "Get Emergency Help",
      ctaHref: "tel:(757)375-6764"
    },
    {
      name: "Same-Day Repair",
      price: 299,
      description: "Emergency repair with priority service",
      popular: true,
      features: [
        "Same-day repair guarantee",
        "Priority parts ordering",
        "Extended service hours",
        "Emergency diagnostic included",
        "Weekend/holiday availability",
        "Temporary system setup if needed"
      ],
      ctaText: "Book Emergency Repair",
      ctaHref: "tel:(757)375-6764"
    },
    {
      name: "Crisis Response",
      price: 499,
      description: "Complete emergency business response",
      features: [
        "Immediate on-site response",
        "Multiple technician deployment",
        "24/7 support for critical issues",
        "Data recovery services",
        "Temporary infrastructure setup",
        "Business continuity planning"
      ],
      ctaText: "Call Emergency Line",
      ctaHref: "tel:(757)375-6764"
    }
  ];

  const faqs = [
    {
      question: "What qualifies as a computer emergency?",
      answer: "Computer emergencies include system crashes preventing work, security breaches, data loss events, complete network failures, server outages affecting business operations, or any computer problem that stops critical business functions."
    },
    {
      question: "How quickly can you respond to emergencies?",
      answer: "We aim to respond to emergency calls within 30 minutes during business hours and within 2 hours after hours. Same-day service is available for most emergencies, including weekends and holidays with premium rates."
    },
    {
      question: "Do you charge extra for emergency service?",
      answer: "Yes, emergency service includes premium rates due to priority scheduling, after-hours availability, and expedited parts ordering. Emergency fees start at $149 for same-day diagnostic service."
    },
    {
      question: "Can you provide temporary equipment during repairs?",
      answer: "Yes, we maintain loaner equipment for critical business situations. This includes temporary computers, networking equipment, and servers to keep your business operational during emergency repairs."
    },
    {
      question: "What if the problem can't be fixed the same day?",
      answer: "If immediate repair isn't possible, we'll implement temporary solutions to restore basic functionality, order priority parts for next-day repair, or provide loaner equipment to minimize business disruption."
    },
    {
      question: "Do you offer 24/7 emergency support?",
      answer: "We offer 24/7 remote support for critical business systems and can provide after-hours on-site service for true emergencies. Weekend and holiday service is available with premium emergency rates."
    },
    {
      question: "How do I reach you for emergencies?",
      answer: "Call our main number (757) 375-6764 and select the emergency option, or mention you have an emergency when calling. Our emergency line is monitored during business hours and has after-hours callback service."
    },
    {
      question: "What payment methods do you accept for emergency service?",
      answer: "We accept all major credit cards, business checks, and can invoice established business customers. Payment is required at time of service for emergency support due to the priority nature of the work."
    }
  ];

  const relatedServices = [
    {
      title: "Remote Support",
      description: "24/7 remote assistance for immediate help",
      href: "/services/home-services/remote-support",
      icon: Shield,
      pricing: { startingPrice: 89, priceNote: "per session" }
    },
    {
      title: "Data Recovery",
      description: "Emergency data recovery from failed systems",
      href: "/services/home-services/data-recovery",
      icon: AlertTriangle,
      pricing: { startingPrice: 149, priceNote: "evaluation" }
    },
    {
      title: "Managed IT Support",
      description: "Prevent emergencies with proactive monitoring",
      href: "/services/business-services/managed-it",
      icon: CheckCircle,
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
          <Link href="/services" className="hover:text-va-primary">Services</Link>
          <span>/</span>
          <span className="text-va-text-primary">Emergency Support</span>
        </div>
      </div>

      {/* Hero Section */}
      <ServiceHero
        category="Specialized Services"
        title="Emergency Computer Support"
        description="When computer problems can't wait, we provide same-day emergency repair and support services. From system crashes to security breaches, get immediate expert help to minimize downtime."
        keyBenefit="Same-day service guarantee with 24/7 emergency response available"
        pricing={{ startingPrice: 149, priceNote: "emergency diagnostic" }}
        estimatedTime="Same day service"
        emergencyAvailable={true}
      />

      {/* What's Included */}
      <ServiceFeatures
        title="Emergency Support Services"
        subtitle="Comprehensive emergency response for critical computer problems"
        features={features}
        columns={4}
      />

      {/* Pricing */}
      <PricingCard
        title="Emergency Service Pricing"
        subtitle="Priority service rates for when you can't wait for regular scheduling"
        tiers={pricingTiers}
        showComparison={true}
      />

      {/* Process */}
      <ProcessTimeline
        title="Emergency Response Process"
        subtitle="Fast-track process designed for urgent computer problems"
        steps={processSteps}
      />

      {/* Emergency Situations We Handle */}
      <section className="py-16 bg-va-neutral-100">
        <div className="va-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4 text-va-text-primary">
              Emergency Situations We Handle
            </h2>
            <p className="text-lg text-va-text-secondary max-w-2xl mx-auto font-roboto">
              We respond immediately to critical computer emergencies that impact your work or business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "System Crashes",
                description: "Computer won't boot, blue screens, complete system failures preventing work",
                icon: AlertTriangle
              },
              {
                title: "Data Emergencies",
                description: "Accidental deletions, hard drive failures, corrupted files threatening data loss",
                icon: Shield
              },
              {
                title: "Security Breaches",
                description: "Malware infections, ransomware attacks, suspected hacking incidents",
                icon: Wrench
              },
              {
                title: "Network Outages",
                description: "Complete internet/network loss affecting business operations",
                icon: Zap
              },
              {
                title: "Server Failures",
                description: "Business server crashes preventing access to files and applications",
                icon: Laptop
              },
              {
                title: "Critical Deadlines",
                description: "Computer problems preventing meeting important deadlines or presentations",
                icon: Clock
              }
            ].map((situation, index) => {
              const IconComponent = situation.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-lg va-card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-semibold text-va-text-primary mb-2">
                        {situation.title}
                      </h3>
                      <p className="text-sm text-va-text-secondary font-roboto">
                        {situation.description}
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
        title="Emergency Support FAQ"
        subtitle="Common questions about emergency computer support services"
        faqs={faqs}
      />

      {/* Related Services */}
      <RelatedServices
        title="Prevent Future Emergencies"
        subtitle="Services to avoid computer emergencies before they happen"
        services={relatedServices}
      />

      {/* CTA */}
      <ServiceCTA
        title="Computer Emergency? Get Help Now!"
        description="Don't let computer problems shut down your work or business. Call now for same-day emergency service and get back up and running fast."
        primaryAction={{
          text: "Call Emergency Line",
          href: "tel:(757)375-6764",
          icon: <Phone className="mr-2 h-5 w-5" />
        }}
        secondaryAction={{
          text: "Schedule Service",
          href: "/booking",
          icon: <Clock className="mr-2 h-5 w-5" />
        }}
        emergencyNote="Same-day service available • 24/7 remote support • Priority scheduling"
      />
    </div>
  );
}