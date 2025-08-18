import Link from "next/link";
import { Target, TrendingUp, Users, Lightbulb, Phone, CheckCircle, FileText, BarChart } from "lucide-react";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFeatures } from "@/components/services/service-features";
import { ProcessTimeline } from "@/components/services/process-timeline";
import { FAQAccordion } from "@/components/services/faq-accordion";
import { ServiceCTA } from "@/components/services/service-cta";
import { RelatedServices } from "@/components/services/related-services";
import { PricingCard } from "@/components/services/pricing-card";

export default function BusinessConsultingPage() {
  const features = [
    {
      title: "IT Strategy & Planning",
      description: "Comprehensive technology roadmaps aligned with your business goals and budget",
      icon: Target
    },
    {
      title: "Technology Assessment",
      description: "Detailed evaluation of current systems with recommendations for improvement",
      icon: BarChart
    },
    {
      title: "Vendor Management",
      description: "Expert guidance on technology vendor selection and contract negotiation",
      icon: Users
    },
    {
      title: "Digital Transformation",
      description: "Strategic planning for adopting new technologies and improving efficiency",
      icon: TrendingUp
    }
  ];

  const processSteps = [
    {
      number: 1,
      title: "Business Analysis",
      description: "Comprehensive review of current business processes and technology infrastructure",
      icon: BarChart,
      estimatedTime: "1-2 business days"
    },
    {
      number: 2,
      title: "Strategic Planning",
      description: "Development of customized IT strategy aligned with business objectives",
      icon: Target,
      estimatedTime: "3-5 business days"
    },
    {
      number: 3,
      title: "Implementation Roadmap",
      description: "Detailed timeline and budget for implementing recommended solutions",
      icon: FileText,
      estimatedTime: "2-3 business days"
    },
    {
      number: 4,
      title: "Ongoing Support",
      description: "Regular reviews and adjustments to ensure strategic goals are met",
      icon: CheckCircle,
      estimatedTime: "Quarterly reviews"
    }
  ];

  const pricingTiers = [
    {
      name: "Technology Assessment",
      price: 199,
      description: "Current state evaluation",
      features: [
        "IT infrastructure review",
        "Process efficiency analysis",
        "Security assessment",
        "Cost analysis report",
        "Priority recommendations",
        "2-hour consultation included"
      ],
      ctaText: "Get Assessment",
      ctaHref: "/booking"
    },
    {
      name: "Strategic Planning",
      price: 499,
      description: "Complete IT strategy development",
      popular: true,
      features: [
        "Comprehensive business analysis",
        "3-year technology roadmap",
        "Budget planning assistance",
        "Vendor recommendation report",
        "Implementation timeline",
        "6 months of follow-up calls"
      ],
      ctaText: "Start Planning",
      ctaHref: "/booking"
    },
    {
      name: "Implementation Support",
      price: 299,
      description: "Ongoing consulting and support",
      features: [
        "Monthly strategy reviews",
        "Vendor negotiation support",
        "Project management guidance",
        "Performance monitoring",
        "Quarterly assessments",
        "Priority phone support"
      ],
      ctaText: "Get Support",
      ctaHref: "/booking"
    }
  ];

  const faqs = [
    {
      question: "What's included in a technology assessment?",
      answer: "Our technology assessment includes a comprehensive review of your current IT infrastructure, software applications, security posture, and business processes. We provide a detailed report with prioritized recommendations and cost estimates for improvements."
    },
    {
      question: "How long does strategic planning take?",
      answer: "Strategic planning typically takes 1-2 weeks depending on business complexity. This includes initial assessment, stakeholder interviews, analysis, and development of a comprehensive IT strategy document with implementation roadmap."
    },
    {
      question: "Do you help with vendor selection and negotiations?",
      answer: "Yes, we assist with vendor research, RFP development, proposal evaluation, and contract negotiations. Our expertise helps ensure you get the best technology solutions at competitive prices with favorable terms."
    },
    {
      question: "Can you help with budgeting for IT projects?",
      answer: "Absolutely. We provide detailed cost estimates for recommended solutions, help prioritize investments based on ROI, and can assist with budget planning for both operational and capital IT expenses."
    },
    {
      question: "What if our business needs change during implementation?",
      answer: "Technology strategies must be flexible. We build adaptability into our plans and provide ongoing support to adjust strategies as business needs evolve. Regular reviews ensure your IT strategy stays aligned with business goals."
    },
    {
      question: "Do you work with businesses that already have IT staff?",
      answer: "Yes, we often work alongside existing IT teams to provide strategic guidance, specialized expertise, or additional capacity for major projects. We complement internal resources rather than replace them."
    },
    {
      question: "How do you measure the success of IT initiatives?",
      answer: "We establish clear metrics and KPIs at the beginning of each project, including efficiency gains, cost savings, security improvements, and user satisfaction. Regular monitoring ensures initiatives deliver expected results."
    },
    {
      question: "Can you help with compliance and regulatory requirements?",
      answer: "Yes, we have expertise in various compliance frameworks including HIPAA, PCI DSS, SOX, and industry-specific regulations. We help ensure technology solutions meet all applicable compliance requirements."
    }
  ];

  const relatedServices = [
    {
      title: "Managed IT Support",
      description: "Complete IT management and support services",
      href: "/services/business-services/managed-it",
      icon: Target,
      pricing: { startingPrice: 199, priceNote: "per month" }
    },
    {
      title: "Server Solutions",
      description: "Strategic server and infrastructure planning",
      href: "/services/business-services/server-solutions",
      icon: BarChart,
      pricing: { startingPrice: 1299, priceNote: "project" }
    },
    {
      title: "Data Security",
      description: "Security strategy and implementation planning",
      href: "/services/business-services/data-security",
      icon: Users,
      pricing: { startingPrice: 199, priceNote: "assessment" }
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
          <span className="text-va-text-primary">Business Consulting</span>
        </div>
      </div>

      {/* Hero Section */}
      <ServiceHero
        category="Business Services"
        title="IT Strategy & Business Consulting"
        description="Strategic IT consulting to align technology with your business goals. From technology assessments to digital transformation planning, we help you make informed decisions that drive growth."
        keyBenefit="Expert guidance to maximize your technology investments and competitive advantage"
        pricing={{ startingPrice: 199, priceNote: "consultation" }}
        estimatedTime="1-2 weeks"
        emergencyAvailable={false}
      />

      {/* What's Included */}
      <ServiceFeatures
        title="Business Consulting Services"
        subtitle="Strategic technology guidance to accelerate your business success"
        features={features}
        columns={4}
      />

      {/* Pricing */}
      <PricingCard
        title="Consulting Service Pricing"
        subtitle="Flexible consulting options to meet your strategic planning needs"
        tiers={pricingTiers}
        showComparison={true}
      />

      {/* Process */}
      <ProcessTimeline
        title="Strategic Consulting Process"
        subtitle="Systematic approach to developing effective IT strategies"
        steps={processSteps}
      />

      {/* Consulting Areas We Cover */}
      <section className="py-16 bg-va-neutral-100">
        <div className="va-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4 text-va-text-primary">
              Consulting Areas We Cover
            </h2>
            <p className="text-lg text-va-text-secondary max-w-2xl mx-auto font-roboto">
              Comprehensive strategic guidance across all aspects of business technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Technology Strategy",
                description: "Long-term IT planning aligned with business objectives and growth plans",
                icon: Target
              },
              {
                title: "Digital Transformation",
                description: "Modernization strategies for adopting cloud, automation, and digital tools",
                icon: TrendingUp
              },
              {
                title: "Security Planning",
                description: "Comprehensive cybersecurity strategies and risk management planning",
                icon: CheckCircle
              },
              {
                title: "Cost Optimization",
                description: "IT budget analysis and recommendations for reducing technology costs",
                icon: BarChart
              },
              {
                title: "Vendor Management",
                description: "Technology vendor evaluation, selection, and contract negotiation support",
                icon: Users
              },
              {
                title: "Process Improvement",
                description: "Technology solutions to streamline operations and improve efficiency",
                icon: Lightbulb
              }
            ].map((area, index) => {
              const IconComponent = area.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-lg va-card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-va-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="h-6 w-6 text-va-primary" />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-semibold text-va-text-primary mb-2">
                        {area.title}
                      </h3>
                      <p className="text-sm text-va-text-secondary font-roboto">
                        {area.description}
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
        title="Business Consulting FAQ"
        subtitle="Common questions about strategic IT consulting and planning services"
        faqs={faqs}
      />

      {/* Related Services */}
      <RelatedServices
        title="Complete Business Solutions"
        subtitle="Services that complement your strategic planning"
        services={relatedServices}
      />

      {/* CTA */}
      <ServiceCTA
        title="Ready to Develop a Winning IT Strategy?"
        description="Don't let technology decisions hold back your business growth. Get expert strategic guidance to maximize your technology investments and competitive advantage."
        primaryAction={{
          text: "Schedule Consultation",
          href: "/booking",
          icon: <Target className="mr-2 h-5 w-5" />
        }}
        secondaryAction={{
          text: "Call (757) 375-6764",
          href: "tel:(757)375-6764",
          icon: <Phone className="mr-2 h-5 w-5" />
        }}
        emergencyNote="Free initial consultation • Flexible engagement options • Expert strategic guidance"
      />
    </div>
  );
}