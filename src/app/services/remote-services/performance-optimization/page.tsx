import Link from "next/link";
import { Zap, HardDrive, MemoryStick, Settings, Phone, CheckCircle, TrendingUp } from "lucide-react";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFeatures } from "@/components/services/service-features";
import { ProcessTimeline } from "@/components/services/process-timeline";
import { FAQAccordion } from "@/components/services/faq-accordion";
import { ServiceCTA } from "@/components/services/service-cta";
import { RelatedServices } from "@/components/services/related-services";
import { PricingCard } from "@/components/services/pricing-card";
import { RemoteSupportWidget } from "@/components/services/remote-support-widget";

export default function PerformanceOptimizationPage() {
  const features = [
    {
      title: "System Cleanup",
      description: "Remove temporary files, cache, and unnecessary data cluttering your system",
      icon: HardDrive
    },
    {
      title: "Startup Optimization",
      description: "Disable unnecessary startup programs that slow down your computer's boot time",
      icon: Zap
    },
    {
      title: "Memory Management",
      description: "Optimize RAM usage and virtual memory settings for better performance",
      icon: MemoryStick
    },
    {
      title: "Registry Cleaning",
      description: "Clean and optimize Windows registry for improved system responsiveness",
      icon: Settings
    }
  ];

  const processSteps = [
    {
      number: 1,
      title: "Performance Analysis",
      description: "Comprehensive system assessment to identify performance bottlenecks and issues",
      icon: TrendingUp,
      estimatedTime: "10 minutes"
    },
    {
      number: 2,
      title: "System Cleanup",
      description: "Remove temporary files, clear caches, and free up valuable disk space",
      icon: HardDrive,
      estimatedTime: "15 minutes"
    },
    {
      number: 3,
      title: "Optimization Tuning",
      description: "Configure startup programs, services, and system settings for optimal performance",
      icon: Settings,
      estimatedTime: "20 minutes"
    },
    {
      number: 4,
      title: "Performance Testing",
      description: "Verify improvements and provide performance benchmark comparison",
      icon: CheckCircle,
      estimatedTime: "10 minutes"
    }
  ];

  const pricingTiers = [
    {
      name: "Basic Speed Boost",
      price: 89,
      description: "Essential optimization for better performance",
      features: [
        "System cleanup and disk optimization",
        "Startup program management",
        "Basic registry cleaning",
        "Performance benchmark test",
        "30-day satisfaction guarantee"
      ],
      ctaText: "Speed Up My PC",
      ctaHref: "#remote-support"
    },
    {
      name: "Complete Optimization",
      price: 149,
      description: "Comprehensive performance enhancement",
      popular: true,
      features: [
        "Deep system analysis",
        "Complete registry optimization",
        "Memory and virtual memory tuning",
        "Advanced startup optimization",
        "Software update management",
        "Performance monitoring setup",
        "90-day performance warranty"
      ],
      ctaText: "Get Full Optimization",
      ctaHref: "#remote-support"
    },
    {
      name: "Business Performance",
      price: 199,
      description: "Enterprise optimization with monitoring",
      features: [
        "Multi-user system optimization",
        "Network performance tuning",
        "Business software optimization",
        "Security performance balance",
        "Ongoing monitoring setup",
        "Monthly performance reports"
      ],
      ctaText: "Optimize Business PC",
      ctaHref: "#remote-support"
    }
  ];

  const faqs = [
    {
      question: "How much faster will my computer be after optimization?",
      answer: "Most customers see 30-60% improvement in boot time and 25-40% improvement in general responsiveness. Older computers or heavily cluttered systems may see even greater improvements. Results vary based on hardware age and current condition."
    },
    {
      question: "Will optimization delete any of my files or programs?",
      answer: "No, we only remove temporary files, cache, and system junk. Your personal files, photos, documents, and installed programs remain untouched. We may recommend removing unused programs, but only with your permission."
    },
    {
      question: "How long do the performance improvements last?",
      answer: "Basic optimizations typically maintain benefits for 6-12 months. We provide tips for maintaining performance and can set up automatic maintenance schedules. Complete optimization packages include follow-up tune-ups."
    },
    {
      question: "Can you optimize older computers?",
      answer: "Yes, older computers often benefit most from optimization. While we can't make old hardware perform like new, proper optimization can significantly improve responsiveness and extend the useful life of older systems."
    },
    {
      question: "What if my computer is still slow after optimization?",
      answer: "If software optimization doesn't provide satisfactory improvement, the issue may be hardware-related (failing hard drive, insufficient RAM, etc.). We'll explain the situation and recommend hardware upgrades if needed."
    },
    {
      question: "Do you optimize both Windows and Mac computers?",
      answer: "Yes, we optimize both Windows PCs and Mac computers. Each platform has different optimization techniques, and our technicians are trained on both systems."
    },
    {
      question: "Can you optimize my computer for specific tasks?",
      answer: "Absolutely. We can optimize for gaming, video editing, business applications, or general use. Different optimization strategies work better for different use cases."
    },
    {
      question: "Will my antivirus software interfere with optimization?",
      answer: "We work around your existing security software and can actually optimize its settings for better performance while maintaining protection. We'll never disable or remove security software without your consent."
    }
  ];

  const relatedServices = [
    {
      title: "Virus Removal",
      description: "Clean infections that slow down your computer",
      href: "/services/remote-services/virus-removal",
      icon: CheckCircle,
      pricing: { startingPrice: 99, priceNote: "complete cleanup" }
    },
    {
      title: "Software Support",
      description: "Update or optimize installed programs",
      href: "/services/remote-services/software-support",
      icon: Settings,
      pricing: { startingPrice: 75, priceNote: "per session" }
    },
    {
      title: "PC Repair",
      description: "Hardware upgrades for maximum performance",
      href: "/services/home-services/pc-mac-repair",
      icon: HardDrive,
      pricing: { startingPrice: 89, priceNote: "diagnostic" }
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <div className="va-container py-4">
        <div className="flex items-center gap-2 text-sm text-va-text-secondary font-roboto">
          <Link href="/" className="hover:text-va-primary">Home</Link>
          <span>/</span>
          <Link href="/services/remote-services" className="hover:text-va-primary">Remote Services</Link>
          <span>/</span>
          <span className="text-va-text-primary">Performance Optimization</span>
        </div>
      </div>

      {/* Hero Section */}
      <ServiceHero
        category="Remote Services"
        title="Remote Performance Optimization"
        description="Transform your slow computer into a speed machine with professional remote optimization. Comprehensive system tuning for maximum performance and responsiveness."
        keyBenefit="Average 40% improvement in system speed and responsiveness"
        pricing={{ startingPrice: 89, priceNote: "full optimization" }}
        estimatedTime="45-60 minutes"
        emergencyAvailable={false}
      />

      {/* What's Included */}
      <ServiceFeatures
        title="Performance Optimization Services"
        subtitle="Comprehensive system tuning for maximum speed and efficiency"
        features={features}
        columns={4}
      />

      {/* Pricing */}
      <PricingCard
        title="Performance Optimization Pricing"
        subtitle="Choose the optimization level that matches your performance goals"
        tiers={pricingTiers}
        showComparison={true}
      />

      {/* Process */}
      <ProcessTimeline
        title="Optimization Process"
        subtitle="Systematic approach to maximizing your computer's performance"
        steps={processSteps}
      />

      {/* Performance Guarantee */}
      <section className="py-16 bg-va-accent/10">
        <div className="va-container text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-va-accent/20 rounded-full mb-6">
              <TrendingUp className="h-8 w-8 text-va-accent" />
            </div>
            <h2 className="text-3xl font-montserrat font-bold mb-4 text-va-text-primary">
              Performance Guarantee
            </h2>
            <p className="text-lg text-va-text-secondary font-roboto mb-6">
              We guarantee noticeable improvement in your computer&apos;s speed and responsiveness. 
              If you&apos;re not satisfied with the performance boost, we&apos;ll work with you until you are 
              or provide a full refund.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-va-accent mb-2">30-60%</div>
                <div className="text-sm text-va-text-secondary">Average boot time improvement</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-va-accent mb-2">25-40%</div>
                <div className="text-sm text-va-text-secondary">System responsiveness boost</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-va-accent mb-2">90 Days</div>
                <div className="text-sm text-va-text-secondary">Performance warranty</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Remote Support Widget */}
      <RemoteSupportWidget 
        title="Request Performance Optimization"
      />

      {/* FAQ */}
      <FAQAccordion
        title="Performance Optimization FAQ"
        subtitle="Everything you need to know about computer speed optimization"
        faqs={faqs}
      />

      {/* Related Services */}
      <RelatedServices
        title="Maximize Your Computer's Potential"
        subtitle="Services that complement performance optimization for the best results"
        services={relatedServices}
      />

      {/* CTA */}
      <ServiceCTA
        title="Tired of a Slow Computer? Let's Fix That!"
        description="Don't waste another minute waiting for your computer. Get professional optimization that delivers real, measurable performance improvements."
        primaryAction={{
          text: "Optimize Performance Now",
          href: "#remote-support",
          icon: <Zap className="mr-2 h-5 w-5" />
        }}
        secondaryAction={{
          text: "Call (757) 375-6764",
          href: "tel:(757)375-6764",
          icon: <Phone className="mr-2 h-5 w-5" />
        }}
        emergencyNote="90-day performance warranty • Satisfaction guaranteed"
      />
    </div>
  );
}