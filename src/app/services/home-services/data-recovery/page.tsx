import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HardDrive, FileSearch, Camera, Database, Phone, CheckCircle, AlertTriangle, Clock } from "lucide-react";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFeatures } from "@/components/services/service-features";
import { ProcessTimeline } from "@/components/services/process-timeline";
import { FAQAccordion } from "@/components/services/faq-accordion";
import { ServiceCTA } from "@/components/services/service-cta";
import { RelatedServices } from "@/components/services/related-services";
import { PricingCard } from "@/components/services/pricing-card";

export default function DataRecoveryPage() {
  const features = [
    {
      title: "Hard Drive Recovery",
      description: "Recover data from failed, damaged, or corrupted hard drives and SSDs",
      icon: HardDrive
    },
    {
      title: "File Recovery",
      description: "Restore accidentally deleted files, photos, documents, and videos",
      icon: FileSearch
    },
    {
      title: "Photo Recovery",
      description: "Specialized recovery for digital photos from cameras, phones, and memory cards",
      icon: Camera
    },
    {
      title: "Database Recovery",
      description: "Professional recovery of corrupted databases and business-critical files",
      icon: Database
    }
  ];

  const processSteps = [
    {
      number: 1,
      title: "Free Evaluation",
      description: "Comprehensive assessment of your storage device to determine recovery possibilities",
      icon: FileSearch,
      estimatedTime: "30-60 minutes"
    },
    {
      number: 2,
      title: "Recovery Quote",
      description: "Detailed quote with recovery timeline and success probability - no obligation",
      icon: Clock,
      estimatedTime: "Same day"
    },
    {
      number: 3,
      title: "Data Recovery Process",
      description: "Professional recovery using specialized tools and clean room facilities when needed",
      icon: HardDrive,
      estimatedTime: "1-5 business days"
    },
    {
      number: 4,
      title: "Data Verification",
      description: "Thorough verification of recovered data and secure transfer to new storage",
      icon: CheckCircle,
      estimatedTime: "2-4 hours"
    }
  ];

  const pricingTiers = [
    {
      name: "Evaluation Only",
      price: 0,
      description: "Free assessment of recovery possibilities",
      features: [
        "Complete diagnostic evaluation",
        "Recovery possibility assessment",
        "Detailed recovery quote",
        "No obligation to proceed",
        "Same-day evaluation",
        "Expert consultation"
      ],
      ctaText: "Get Free Evaluation",
      ctaHref: "/booking"
    },
    {
      name: "Standard Recovery",
      price: 149,
      description: "Most file and logical recovery cases",
      popular: true,
      features: [
        "Free evaluation included",
        "Deleted file recovery",
        "Formatted drive recovery",
        "Corruption repair",
        "Up to 500GB recovered data",
        "30-day warranty on recovery",
        "No recovery, no charge"
      ],
      ctaText: "Start Recovery",
      ctaHref: "/booking"
    },
    {
      name: "Advanced Recovery",
      price: 399,
      description: "Physical damage and complex cases",
      features: [
        "Clean room recovery service",
        "Physical drive repair",
        "Advanced corruption cases",
        "RAID array recovery",
        "Unlimited data recovery",
        "90-day warranty",
        "Priority processing"
      ],
      ctaText: "Advanced Recovery",
      ctaHref: "/booking"
    }
  ];

  const faqs = [
    {
      question: "What are the chances of recovering my data?",
      answer: "Recovery success depends on the type of failure and how much the drive has been used since data loss. For deleted files with minimal drive use, success rates are 85-95%. For physical drive damage, rates vary from 60-90%. We provide honest assessments during our free evaluation."
    },
    {
      question: "How much does data recovery cost?",
      answer: "We offer free evaluation to assess your situation. Standard logical recovery starts at $149, while complex physical recovery can range from $399-$799. You only pay if we successfully recover your data - no recovery, no charge."
    },
    {
      question: "How long does data recovery take?",
      answer: "Timeline depends on the complexity of recovery. Simple deleted file recovery may take 1-2 days, while physical drive recovery can take 3-7 days. Emergency service is available for critical business data with 24-48 hour turnaround."
    },
    {
      question: "Can you recover data from a drive that won&apos;t turn on?",
      answer: "Yes, we specialize in recovering data from drives that won&apos;t power on, make clicking noises, or aren&apos;t recognized by the computer. These often require clean room recovery, but we have high success rates even with severely damaged drives."
    },
    {
      question: "What should I do if I accidentally deleted important files?",
      answer: "Stop using the computer immediately! Every file saved to the drive reduces chances of successful recovery. Turn off the computer and bring it to us as soon as possible. Don&apos;t try data recovery software yourself as it can make recovery more difficult."
    },
    {
      question: "Can you recover data from phones and tablets?",
      answer: "Yes, we recover data from smartphones, tablets, SD cards, and USB drives. We can often recover photos, contacts, messages, and other data from devices with physical damage, water damage, or accidental deletion."
    },
    {
      question: "Do you recover data from RAID arrays?",
      answer: "Yes, we have specialized expertise in RAID recovery including RAID 0, 1, 5, 6, and 10 configurations. RAID recovery is complex and requires specialized knowledge - attempting DIY recovery can cause permanent data loss."
    },
    {
      question: "Is my recovered data secure and private?",
      answer: "Absolutely. We maintain strict confidentiality and security protocols. Your data is never shared or accessed beyond what&apos;s necessary for recovery. We can sign additional confidentiality agreements for sensitive business data."
    }
  ];

  const relatedServices = [
    {
      title: "PC & Mac Repair",
      description: "Fix the hardware that caused your data loss",
      href: "/services/home-services/pc-mac-repair",
      icon: HardDrive,
      pricing: { startingPrice: 89, priceNote: "diagnostic" }
    },
    {
      title: "Virus Removal",
      description: "Clean malware that may have corrupted files",
      href: "/services/home-services/virus-removal",
      icon: CheckCircle,
      pricing: { startingPrice: 99, priceNote: "complete cleanup" }
    },
    {
      title: "Computer Setup",
      description: "Set up backup systems to prevent future loss",
      href: "/services/home-services/computer-setup",
      icon: Database,
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
          <span className="text-va-text-primary">Data Recovery</span>
        </div>
      </div>

      {/* Hero Section */}
      <ServiceHero
        category="Home Services"
        title="Professional Data Recovery"
        description="Recover lost, deleted, or corrupted files from any storage device. From simple file recovery to complex hard drive repair, we save your precious memories and important documents."
        keyBenefit="No recovery, no charge guarantee - Free evaluation included"
        pricing={{ startingPrice: 149, priceNote: "standard recovery" }}
        estimatedTime="1-5 business days"
        emergencyAvailable={true}
      />

      {/* What's Included */}
      <ServiceFeatures
        title="Data Recovery Services"
        subtitle="Professional recovery for all types of data loss situations"
        features={features}
        columns={4}
      />

      {/* Emergency Notice */}
      <section className="py-8 bg-yellow-50 border-l-4 border-yellow-400">
        <div className="va-container">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-8 w-8 text-yellow-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-montserrat font-semibold text-yellow-800 mb-2">
                Data Loss Emergency? Stop Using the Device!
              </h3>
              <p className="text-yellow-700 font-roboto mb-4">
                If you&apos;ve lost important data, stop using the device immediately. Every file saved or program run 
                reduces the chances of successful recovery. Turn off the device and contact us for emergency service.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-white">
                  <Phone className="mr-2 h-4 w-4" />
                  Emergency: (757) 375-6764
                </Button>
                <Button size="sm" variant="outline" className="border-yellow-600 text-yellow-600 hover:bg-yellow-50">
                  <Link href="/booking">Schedule Emergency Recovery</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <PricingCard
        title="Data Recovery Pricing"
        subtitle="Transparent pricing with no hidden fees - you only pay for successful recovery"
        tiers={pricingTiers}
        showComparison={true}
      />

      {/* Process */}
      <ProcessTimeline
        title="Data Recovery Process"
        subtitle="Professional recovery process with no-obligation evaluation"
        steps={processSteps}
      />

      {/* Data Loss Scenarios */}
      <section className="py-16 bg-va-neutral-100">
        <div className="va-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4 text-va-text-primary">
              Data Loss Scenarios We Handle
            </h2>
            <p className="text-lg text-va-text-secondary max-w-2xl mx-auto font-roboto">
              We recover data from all types of storage devices and failure situations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Accidental Deletion",
                description: "Files deleted from recycle bin, formatted drives, or overwritten data",
                recovery: "85-95%",
                urgency: "Medium"
              },
              {
                title: "Hard Drive Failure",
                description: "Clicking sounds, not detected, boot failure, or mechanical damage",
                recovery: "70-85%",
                urgency: "High"
              },
              {
                title: "Virus/Malware Damage",
                description: "Files corrupted or encrypted by malicious software",
                recovery: "60-80%",
                urgency: "High"
              },
              {
                title: "Water/Fire Damage",
                description: "Physical damage from water, fire, or other environmental factors",
                recovery: "40-70%",
                urgency: "Critical"
              },
              {
                title: "SSD Failure",
                description: "Solid state drive corruption, wear leveling issues, or controller failure",
                recovery: "65-85%",
                urgency: "High"
              },
              {
                title: "RAID Array Failure",
                description: "Multiple drive failures in RAID configurations",
                recovery: "70-90%",
                urgency: "Critical"
              }
            ].map((scenario, index) => {
              const urgencyColors = {
                "Critical": "bg-red-100 text-red-800 border-red-200",
                "High": "bg-orange-100 text-orange-800 border-orange-200",
                "Medium": "bg-yellow-100 text-yellow-800 border-yellow-200"
              };
              
              return (
                <div key={index} className="bg-white p-6 rounded-lg va-card">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-montserrat font-semibold text-va-text-primary">
                      {scenario.title}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full border ${urgencyColors[scenario.urgency as keyof typeof urgencyColors]}`}>
                      {scenario.urgency}
                    </span>
                  </div>
                  <p className="text-sm text-va-text-secondary font-roboto mb-3">
                    {scenario.description}
                  </p>
                  <div className="text-sm font-semibold text-va-accent">
                    Success Rate: {scenario.recovery}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion
        title="Data Recovery FAQ"
        subtitle="Important information about data recovery services and pricing"
        faqs={faqs}
      />

      {/* Related Services */}
      <RelatedServices
        title="Prevent Future Data Loss"
        subtitle="Services to protect your data and fix underlying problems"
        services={relatedServices}
      />

      {/* CTA */}
      <ServiceCTA
        title="Lost Important Data? We Can Help!"
        description="Don&apos;t give up on your precious photos, documents, and files. Our data recovery experts have saved over 95% of cases deemed &apos;impossible&apos; by others."
        primaryAction={{
          text: "Start Free Evaluation",
          href: "/booking",
          icon: <FileSearch className="mr-2 h-5 w-5" />
        }}
        secondaryAction={{
          text: "Emergency: (757) 375-6764",
          href: "tel:(757)375-6764",
          icon: <Phone className="mr-2 h-5 w-5" />
        }}
        emergencyNote="24-hour emergency service available • No recovery, no charge guarantee"
        variant="gradient"
      />
    </div>
  );
}