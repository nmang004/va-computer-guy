import Link from "next/link";
import { Monitor, HardDrive, MemoryStick, Cpu, Phone, CheckCircle, Wrench, Laptop } from "lucide-react";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFeatures } from "@/components/services/service-features";
import { ProcessTimeline } from "@/components/services/process-timeline";
import { FAQAccordion } from "@/components/services/faq-accordion";
import { ServiceCTA } from "@/components/services/service-cta";
import { RelatedServices } from "@/components/services/related-services";
import { PricingCard } from "@/components/services/pricing-card";

export default function PCMacRepairPage() {
  const features = [
    {
      title: "Hardware Diagnostics",
      description: "Comprehensive testing of all computer components to identify failing or damaged parts",
      icon: Wrench
    },
    {
      title: "Component Replacement",
      description: "Professional installation of genuine replacement parts with warranty coverage",
      icon: HardDrive
    },
    {
      title: "Performance Upgrades",
      description: "Memory, storage, and component upgrades to boost your computer&apos;s performance",
      icon: MemoryStick
    },
    {
      title: "System Optimization",
      description: "Complete software optimization after hardware repairs for peak performance",
      icon: Cpu
    }
  ];

  const processSteps = [
    {
      number: 1,
      title: "Free Diagnosis",
      description: "Comprehensive hardware and software testing to identify all issues with your computer",
      icon: Wrench,
      estimatedTime: "30-60 minutes"
    },
    {
      number: 2,
      title: "Repair Estimate",
      description: "Detailed quote for all needed repairs with transparent pricing and no hidden fees",
      icon: Monitor,
      estimatedTime: "Within 2 hours"
    },
    {
      number: 3,
      title: "Professional Repair",
      description: "Expert repair using genuine parts with proper testing and quality assurance",
      icon: HardDrive,
      estimatedTime: "1-3 business days"
    },
    {
      number: 4,
      title: "Quality Testing",
      description: "Thorough testing and optimization to ensure your computer works perfectly",
      icon: CheckCircle,
      estimatedTime: "2-4 hours"
    }
  ];

  const pricingTiers = [
    {
      name: "Diagnostic Service",
      price: 89,
      description: "Complete hardware and software evaluation",
      features: [
        "Comprehensive system diagnostic",
        "Hardware component testing",
        "Performance evaluation",
        "Detailed repair estimate",
        "No charge if no issues found",
        "Diagnostic fee waived with repair"
      ],
      ctaText: "Get Diagnosis",
      ctaHref: "/booking"
    },
    {
      name: "Standard Repair",
      price: 149,
      description: "Most common computer repairs",
      popular: true,
      features: [
        "Free diagnostic included",
        "Basic component replacement",
        "Software optimization",
        "Data preservation",
        "30-day warranty",
        "Same-day service available"
      ],
      ctaText: "Book Repair",
      ctaHref: "/booking"
    },
    {
      name: "Major Repair",
      price: 249,
      description: "Complex repairs and motherboard issues",
      features: [
        "Advanced diagnostic tools",
        "Major component replacement",
        "Motherboard repair/replacement",
        "Complete system rebuild",
        "90-day warranty",
        "Performance optimization"
      ],
      ctaText: "Schedule Major Repair",
      ctaHref: "/booking"
    }
  ];

  const faqs = [
    {
      question: "Do you repair both PC and Mac computers?",
      answer: "Yes, we repair all types of desktop and laptop computers including Windows PCs, Mac computers (iMac, MacBook, Mac Pro), and Chromebooks. Our technicians are certified to work on all major brands and models."
    },
    {
      question: "How long do computer repairs typically take?",
      answer: "Most standard repairs are completed within 1-3 business days. Simple issues like RAM upgrades or hard drive replacement can often be done same-day. Complex repairs like motherboard replacement may take 3-5 days depending on parts availability."
    },
    {
      question: "Do you use genuine parts for repairs?",
      answer: "Yes, we use only genuine manufacturer parts or high-quality compatible components that meet or exceed original specifications. All replacement parts come with warranty coverage."
    },
    {
      question: "What if my computer can&apos;t be repaired?",
      answer: "If your computer is beyond economical repair, we&apos;ll explain why and help you understand your options. You&apos;ll only pay the diagnostic fee (waived if you purchase a new computer through us). We can also help with data recovery if needed."
    },
    {
      question: "Will my data be safe during the repair?",
      answer: "Data preservation is our priority. We backup important data before beginning repairs and use safe repair practices. However, we recommend having your own backup as hardware failures can sometimes result in data loss before repair."
    },
    {
      question: "Do you offer in-home computer repair?",
      answer: "Yes, we offer in-home repair services for situations where bringing your computer to our shop isn&apos;t convenient. In-home service includes a travel fee and is subject to availability in your area."
    },
    {
      question: "What warranty do you provide on repairs?",
      answer: "All repairs include warranty coverage: 30 days for standard repairs and 90 days for major repairs. Warranty covers the specific components we repaired or replaced, including parts and labor."
    },
    {
      question: "Can you upgrade my computer while repairing it?",
      answer: "Absolutely! We often recommend upgrades during repair that can improve performance and extend your computer&apos;s life. Common upgrades include more RAM, faster storage (SSD), and improved cooling systems."
    }
  ];

  const relatedServices = [
    {
      title: "Data Recovery",
      description: "Recover important files from failed hard drives",
      href: "/services/home-services/data-recovery",
      icon: HardDrive,
      pricing: { startingPrice: 149, priceNote: "evaluation included" }
    },
    {
      title: "Virus Removal",
      description: "Clean malware and optimize system performance",
      href: "/services/home-services/virus-removal",
      icon: CheckCircle,
      pricing: { startingPrice: 99, priceNote: "complete cleanup" }
    },
    {
      title: "Computer Setup",
      description: "Professional setup and configuration service",
      href: "/services/home-services/computer-setup",
      icon: Monitor,
      pricing: { startingPrice: 75, priceNote: "per device" }
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
          <span className="text-va-text-primary">PC & Mac Repair</span>
        </div>
      </div>

      {/* Hero Section */}
      <ServiceHero
        category="Home Services"
        title="PC & Mac Computer Repair"
        description="Professional computer repair for all brands and models. From simple upgrades to complex motherboard repairs, we fix it right the first time with genuine parts and expert service."
        keyBenefit="No fix, no fee guarantee - Free diagnosis with repair"
        pricing={{ startingPrice: 89, priceNote: "diagnostic" }}
        estimatedTime="1-3 business days"
        emergencyAvailable={true}
      />

      {/* What's Included */}
      <ServiceFeatures
        title="Computer Repair Services"
        subtitle="Comprehensive repair and upgrade services for all computer types"
        features={features}
        columns={4}
      />

      {/* Pricing */}
      <PricingCard
        title="Computer Repair Pricing"
        subtitle="Transparent pricing for all levels of computer repair"
        tiers={pricingTiers}
        showComparison={true}
      />

      {/* Process */}
      <ProcessTimeline
        title="Computer Repair Process"
        subtitle="Professional repair process from diagnosis to delivery"
        steps={processSteps}
      />

      {/* Hardware Issues We Fix */}
      <section className="py-16 bg-va-neutral-100">
        <div className="va-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4 text-va-text-primary">
              Hardware Issues We Fix
            </h2>
            <p className="text-lg text-va-text-secondary max-w-2xl mx-auto font-roboto">
              We repair all types of computer hardware problems with expert precision
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Power Issues",
                description: "Won&apos;t turn on, random shutdowns, power supply failures",
                icon: Monitor
              },
              {
                title: "Hard Drive Problems",
                description: "Slow performance, clicking sounds, boot failures, data recovery",
                icon: HardDrive
              },
              {
                title: "Memory Issues",
                description: "Blue screens, random crashes, memory errors, RAM upgrades",
                icon: MemoryStick
              },
              {
                title: "Overheating",
                description: "Loud fans, thermal shutdowns, component damage from heat",
                icon: Cpu
              },
              {
                title: "Screen Problems",
                description: "Laptop screen replacement, display issues, video card problems",
                icon: Laptop
              },
              {
                title: "Motherboard Repair",
                description: "Component replacement, circuit repair, complete motherboard replacement",
                icon: Wrench
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

      {/* FAQ */}
      <FAQAccordion
        title="Computer Repair FAQ"
        subtitle="Common questions about PC and Mac computer repair services"
        faqs={faqs}
      />

      {/* Related Services */}
      <RelatedServices
        title="Complete Your Computer Service"
        subtitle="Services that work great with computer repair"
        services={relatedServices}
      />

      {/* CTA */}
      <ServiceCTA
        title="Computer Not Working Right? We&apos;ll Fix It!"
        description="Don&apos;t let computer problems slow you down. Get expert repair with genuine parts, transparent pricing, and warranty coverage."
        primaryAction={{
          text: "Book Repair Now",
          href: "/booking",
          icon: <Wrench className="mr-2 h-5 w-5" />
        }}
        secondaryAction={{
          text: "Call (757) 375-6764",
          href: "tel:(757)375-6764",
          icon: <Phone className="mr-2 h-5 w-5" />
        }}
        emergencyNote="Same-day service available • Free diagnosis with repair • 30-90 day warranty"
      />
    </div>
  );
}