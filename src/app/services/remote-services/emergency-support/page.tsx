import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Clock, AlertTriangle, Zap, Shield, Phone, CheckCircle, Headphones } from "lucide-react";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFeatures } from "@/components/services/service-features";
import { ProcessTimeline } from "@/components/services/process-timeline";
import { FAQAccordion } from "@/components/services/faq-accordion";
import { RelatedServices } from "@/components/services/related-services";
import { PricingCard } from "@/components/services/pricing-card";
import { RemoteSupportWidget } from "@/components/services/remote-support-widget";

export default function EmergencySupportPage() {
  const features = [
    {
      title: "1-Hour Response",
      description: "Guaranteed response within 60 minutes, 7 days a week including holidays",
      icon: Clock
    },
    {
      title: "Critical Issue Priority",
      description: "Immediate attention for business-critical problems and urgent personal needs",
      icon: AlertTriangle
    },
    {
      title: "Rapid Resolution",
      description: "Fast-track problem solving with our most experienced senior technicians",
      icon: Zap
    },
    {
      title: "Business Continuity",
      description: "Minimize downtime and get back to productivity as quickly as possible",
      icon: Shield
    }
  ];

  const processSteps = [
    {
      number: 1,
      title: "Emergency Contact",
      description: "Call our emergency line or submit urgent request with immediate priority routing",
      icon: Phone,
      estimatedTime: "Immediate"
    },
    {
      number: 2,
      title: "Rapid Assessment",
      description: "Senior technician contacts you within 1 hour to assess the critical situation",
      icon: Headphones,
      estimatedTime: "Within 1 hour"
    },
    {
      number: 3,
      title: "Priority Connection",
      description: "Fast-track remote connection setup with priority queue access",
      icon: Zap,
      estimatedTime: "5 minutes"
    },
    {
      number: 4,
      title: "Emergency Resolution",
      description: "Immediate focus on restoring critical functionality and business operations",
      icon: CheckCircle,
      estimatedTime: "ASAP"
    }
  ];

  const pricingTiers = [
    {
      name: "Personal Emergency",
      price: 149,
      description: "Urgent personal computer emergencies",
      features: [
        "1-hour response guarantee",
        "Priority technician assignment",
        "Up to 2 hours of support",
        "Critical issue resolution",
        "Weekend/holiday availability",
        "Follow-up check within 24 hours"
      ],
      ctaText: "Get Emergency Help",
      ctaHref: "#remote-support"
    },
    {
      name: "Business Emergency",
      price: 249,
      description: "Critical business system failures",
      popular: true,
      features: [
        "30-minute response guarantee",
        "Senior technician priority",
        "Up to 4 hours of support",
        "Business continuity focus",
        "Multi-user system support",
        "Incident documentation",
        "24/7 availability",
        "1-week follow-up support"
      ],
      ctaText: "Save My Business",
      ctaHref: "#remote-support"
    },
    {
      name: "Enterprise Emergency",
      price: 399,
      description: "Mission-critical enterprise support",
      features: [
        "15-minute response guarantee",
        "Dedicated emergency team",
        "Unlimited support time",
        "Multi-system coordination",
        "Disaster recovery assistance",
        "Executive escalation path",
        "24/7/365 availability",
        "Post-incident analysis"
      ],
      ctaText: "Enterprise Emergency",
      ctaHref: "tel:(757)375-6764"
    }
  ];

  const faqs = [
    {
      question: "What qualifies as a computer emergency?",
      answer: "Computer emergencies include: complete system failures preventing work, data loss situations, security breaches, ransomware attacks, critical business system outages, or any computer problem causing significant business or personal disruption that requires immediate attention."
    },
    {
      question: "Do you really respond within 1 hour?",
      answer: "Yes, we guarantee response within 1 hour for emergency requests, 7 days a week. Business emergencies get 30-minute response, and enterprise clients get 15-minute response. Response means initial contact and assessment, not necessarily problem resolution."
    },
    {
      question: "What if my emergency happens at night or on weekends?",
      answer: "Our emergency support operates 24/7, including nights, weekends, and holidays. There are no additional after-hours fees - emergency pricing covers round-the-clock availability."
    },
    {
      question: "Can you fix hardware problems remotely in an emergency?",
      answer: "We can diagnose hardware issues and provide immediate workarounds or temporary solutions. For physical repairs, we can connect you with our emergency on-site team or provide guidance until regular service hours."
    },
    {
      question: "What if the problem takes longer than the included time?",
      answer: "We focus on getting you operational first. If additional time is needed after restoring basic functionality, we'll discuss options. Most emergencies are resolved within the included time limits."
    },
    {
      question: "Do you handle data recovery emergencies?",
      answer: "Yes, we provide emergency data recovery assessment and immediate backup of remaining accessible data. Full recovery may require specialized services, but we can stabilize the situation and prevent further loss."
    },
    {
      question: "How do I reach emergency support?",
      answer: "Call (757) 375-6764 and specify 'emergency' or use our online emergency request form. Emergency requests bypass normal queues and immediately alert our on-call technicians."
    },
    {
      question: "Is emergency support more expensive than regular service?",
      answer: "Yes, emergency support includes premium pricing for guaranteed rapid response and priority technician assignment. However, the cost of downtime usually far exceeds the emergency service fee."
    }
  ];

  const relatedServices = [
    {
      title: "Data Recovery",
      description: "Professional data recovery for emergency situations",
      href: "/services/home-services/data-recovery",
      icon: Shield,
      pricing: { startingPrice: 149, priceNote: "evaluation" }
    },
    {
      title: "Virus Removal",
      description: "Emergency malware and security threat cleanup",
      href: "/services/remote-services/virus-removal",
      icon: AlertTriangle,
      pricing: { startingPrice: 99, priceNote: "complete cleanup" }
    },
    {
      title: "Business IT Support",
      description: "Ongoing managed IT to prevent emergencies",
      href: "/services/business-services/managed-it",
      icon: CheckCircle,
      pricing: { startingPrice: 199, priceNote: "per month" }
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Emergency Alert Banner */}
      <div className="bg-red-600 text-white py-3">
        <div className="va-container">
          <div className="flex items-center justify-center gap-3 text-center">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-montserrat font-medium">
              COMPUTER EMERGENCY? Call (757) 375-6764 now for immediate 1-hour response!
            </span>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="va-container py-4">
        <div className="flex items-center gap-2 text-sm text-va-text-secondary font-roboto">
          <Link href="/" className="hover:text-va-primary">Home</Link>
          <span>/</span>
          <Link href="/services/remote-services" className="hover:text-va-primary">Remote Services</Link>
          <span>/</span>
          <span className="text-va-text-primary">Emergency Support</span>
        </div>
      </div>

      {/* Hero Section */}
      <ServiceHero
        category="Emergency Remote Support"
        title="24/7 Emergency Computer Support"
        description="Critical computer problems can't wait. Get immediate expert help through our emergency remote support service with guaranteed 1-hour response time, 7 days a week."
        keyBenefit="1-hour response guarantee, 24/7/365 availability"
        pricing={{ startingPrice: 149, priceNote: "immediate response" }}
        estimatedTime="1-4 hours"
        emergencyAvailable={true}
      />

      {/* What's Included */}
      <ServiceFeatures
        title="Emergency Support Features"
        subtitle="Premium support when every minute counts"
        features={features}
        columns={4}
      />

      {/* Pricing */}
      <PricingCard
        title="Emergency Support Pricing"
        subtitle="Fast response times and priority support for critical situations"
        tiers={pricingTiers}
        showComparison={true}
      />

      {/* Process */}
      <ProcessTimeline
        title="Emergency Response Process"
        subtitle="Rapid response protocol for critical computer emergencies"
        steps={processSteps}
      />

      {/* Emergency Scenarios */}
      <section className="py-16 bg-va-neutral-100">
        <div className="va-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4 text-va-text-primary">
              When to Use Emergency Support
            </h2>
            <p className="text-lg text-va-text-secondary max-w-2xl mx-auto font-roboto">
              Emergency support is designed for situations that require immediate attention
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Complete System Failure",
                description: "Computer won't start or critical system crash preventing all work",
                icon: AlertTriangle
              },
              {
                title: "Data Loss Emergency",
                description: "Important files deleted or corrupted with no backup available",
                icon: Shield
              },
              {
                title: "Security Breach",
                description: "Suspected hacking, ransomware, or unauthorized access to systems",
                icon: Clock
              },
              {
                title: "Business System Down",
                description: "Critical business applications or services completely offline",
                icon: Zap
              },
              {
                title: "Deadline Pressure",
                description: "Computer problems preventing completion of time-critical work",
                icon: CheckCircle
              },
              {
                title: "Network Outage",
                description: "Complete loss of internet or network connectivity for business",
                icon: Phone
              }
            ].map((scenario, index) => {
              const IconComponent = scenario.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-lg va-card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-semibold text-va-text-primary mb-2">
                        {scenario.title}
                      </h3>
                      <p className="text-sm text-va-text-secondary font-roboto">
                        {scenario.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Remote Support Widget */}
      <RemoteSupportWidget 
        title="Request Emergency Support"
      />

      {/* FAQ */}
      <FAQAccordion
        title="Emergency Support FAQ"
        subtitle="Important information about our emergency computer support services"
        faqs={faqs}
      />

      {/* Related Services */}
      <RelatedServices
        title="Prevent Future Emergencies"
        subtitle="Proactive services to avoid computer crises"
        services={relatedServices}
      />

      {/* Emergency CTA */}
      <section className="py-16 bg-red-600 text-white">
        <div className="va-container text-center">
          <div className="max-w-3xl mx-auto">
            <AlertTriangle className="h-16 w-16 mx-auto mb-6 text-red-200" />
            <h2 className="text-3xl font-montserrat font-bold mb-4">
              Having a Computer Emergency Right Now?
            </h2>
            <p className="text-xl mb-8 opacity-90 font-roboto">
              Don&apos;t wait - every minute of downtime costs money and productivity. 
              Get immediate expert help with our emergency support service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-red-600 hover:bg-red-50">
                <Phone className="mr-2 h-5 w-5" />
                Emergency: (757) 375-6764
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
                <Clock className="mr-2 h-5 w-5" />
                1-Hour Response Guaranteed
              </Button>
            </div>
            <p className="text-sm mt-6 opacity-80">
              Available 24/7/365 • No additional after-hours fees • Senior technicians only
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}