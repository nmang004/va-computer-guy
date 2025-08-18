import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Monitor, Wifi, Zap, Shield, Clock, CheckCircle, ArrowRight, Phone, MessageCircle } from "lucide-react";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFeatures } from "@/components/services/service-features";
import { ProcessTimeline } from "@/components/services/process-timeline";
import { FAQAccordion } from "@/components/services/faq-accordion";
import { ServiceCTA } from "@/components/services/service-cta";
import { RemoteSupportWidget } from "@/components/services/remote-support-widget";

export default function RemoteServicesPage() {
  const remoteServices = [
    {
      title: "Quick Fixes",
      description: "Immediate solutions for common computer problems",
      href: "/services/remote-services/quick-fixes",
      icon: Zap,
      pricing: { startingPrice: 49, priceNote: "per session" },
      features: ["Software troubleshooting", "Performance optimization", "Settings configuration", "Basic maintenance"]
    },
    {
      title: "Software Support",
      description: "Remote installation and configuration assistance",
      href: "/services/remote-services/software-support", 
      icon: Monitor,
      pricing: { startingPrice: 75, priceNote: "per session" },
      features: ["Software installation", "Program configuration", "Update management", "Compatibility fixes"]
    },
    {
      title: "Virus Removal",
      description: "Complete malware cleaning and protection setup",
      href: "/services/remote-services/virus-removal",
      icon: Shield,
      pricing: { startingPrice: 99, priceNote: "complete cleanup" },
      features: ["Virus detection", "Malware removal", "Security software", "Prevention setup"],
      featured: true
    },
    {
      title: "Performance Optimization",
      description: "Speed up your computer with remote tuning",
      href: "/services/remote-services/performance-optimization",
      icon: Wifi,
      pricing: { startingPrice: 89, priceNote: "full optimization" },
      features: ["System cleanup", "Startup optimization", "Registry cleaning", "Performance testing"]
    },
    {
      title: "Emergency Support",
      description: "Urgent remote assistance when you need it most",
      href: "/services/remote-services/emergency-support",
      icon: Clock,
      pricing: { startingPrice: 149, priceNote: "immediate response" },
      features: ["1-hour response", "Priority support", "Critical fixes", "Business continuity"]
    }
  ];

  const features = [
    {
      title: "Instant Connection",
      description: "Connect to our technicians within minutes using secure remote desktop software",
      icon: Zap
    },
    {
      title: "100% Secure",
      description: "All connections are encrypted and require your explicit permission to proceed",
      icon: Shield
    },
    {
      title: "No Travel Time",
      description: "Get immediate help without waiting for a technician to arrive at your location",
      icon: Clock
    },
    {
      title: "Cost Effective",
      description: "Remote support is typically 30-50% less expensive than on-site service calls",
      icon: Monitor
    }
  ];

  const processSteps = [
    {
      number: 1,
      title: "Submit Request",
      description: "Fill out our quick form describing your computer issue and preferred contact method",
      icon: MessageCircle,
      estimatedTime: "2 minutes"
    },
    {
      number: 2,
      title: "We Contact You",
      description: "Our technician calls to discuss the issue and schedule the remote session",
      icon: Phone,
      estimatedTime: "Within 1 hour"
    },
    {
      number: 3,
      title: "Secure Connection",
      description: "Download our secure remote software and grant permission for the technician to help",
      icon: Shield,
      estimatedTime: "3 minutes"
    },
    {
      number: 4,
      title: "Problem Solved",
      description: "Watch as we fix your computer in real-time while explaining what we're doing",
      icon: CheckCircle,
      estimatedTime: "15-45 minutes"
    }
  ];

  const faqs = [
    {
      question: "Is remote support safe for my computer?",
      answer: "Yes, absolutely. We use industry-standard encrypted remote desktop software that requires your explicit permission to connect. You can see everything we're doing on your screen and can disconnect at any time. We never access your computer without your knowledge."
    },
    {
      question: "What types of problems can be fixed remotely?",
      answer: "Most software-related issues can be resolved remotely, including virus removal, slow performance, software installation, email problems, Windows updates, and system configuration. Hardware issues that require physical repair cannot be fixed remotely."
    },
    {
      question: "How long does remote support typically take?",
      answer: "Most remote sessions last between 15-45 minutes, depending on the complexity of the issue. Simple problems like software installation or settings changes often take 15-20 minutes, while comprehensive virus removal might take 30-45 minutes."
    },
    {
      question: "What do I need for remote support?",
      answer: "You need a working internet connection and the ability to download and run our remote support software. We'll guide you through the entire process and can even help you download the software if needed."
    },
    {
      question: "Can you help with both Windows and Mac computers?",
      answer: "Yes, our technicians are certified to work with both Windows PCs and Mac computers. We support all recent versions of Windows (10, 11) and macOS."
    },
    {
      question: "What if the problem can't be fixed remotely?",
      answer: "If we determine that your issue requires physical repair or replacement parts, we'll explain the situation and can schedule an in-person service call. You'll only pay for the remote session time used for diagnosis."
    },
    {
      question: "Do you offer emergency remote support?",
      answer: "Yes, we offer emergency remote support with 1-hour response time for critical business issues or urgent personal needs. Emergency support is available 7 days a week with premium pricing."
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <div className="va-container py-4">
        <Button variant="ghost" asChild className="text-va-text-secondary hover:text-va-primary">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <ServiceHero
        category="Remote Services"
        title="Get Help Instantly from Anywhere"
        description="Most computer problems can be fixed remotely through our secure connection service. Get immediate expert help without leaving your home or office."
        keyBenefit="90% of software issues resolved in under 30 minutes"
        pricing={{ startingPrice: 49, priceNote: "per session" }}
        estimatedTime="15-45 minutes"
        emergencyAvailable={true}
      />

      {/* Service Categories */}
      <section className="py-16 bg-va-neutral-100">
        <div className="va-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4 text-va-text-primary">
              Remote Service Options
            </h2>
            <p className="text-lg text-va-text-secondary max-w-2xl mx-auto font-roboto">
              Choose the remote service that best fits your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {remoteServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className={`va-card hover:shadow-lg transition-shadow h-full flex flex-col ${
                  service.featured ? 'ring-2 ring-va-primary' : ''
                }`}>
                  {service.featured && (
                    <div className="bg-va-primary text-white text-xs font-medium px-3 py-1 text-center">
                      Most Popular
                    </div>
                  )}
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-va-primary/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-va-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-montserrat text-va-text-primary">
                          {service.title}
                        </CardTitle>
                        <div className="text-sm text-va-primary font-semibold">
                          ${service.pricing.startingPrice} {service.pricing.priceNote}
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-va-text-secondary font-roboto">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <div className="space-y-2 mb-4">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-va-accent" />
                          <span className="text-sm text-va-text-secondary font-roboto">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <Button asChild className={service.featured ? "va-btn-primary" : "va-btn-secondary w-full"}>
                      <Link href={service.href}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <ServiceFeatures
        title="Why Choose Remote Support?"
        subtitle="Experience the convenience and efficiency of professional remote computer assistance"
        features={features}
        columns={4}
      />

      {/* Process */}
      <ProcessTimeline
        title="How Remote Support Works"
        subtitle="Getting help is simple and secure - here's what to expect"
        steps={processSteps}
      />

      {/* Remote Support Widget */}
      <RemoteSupportWidget />

      {/* FAQ */}
      <FAQAccordion
        title="Remote Support FAQ"
        subtitle="Common questions about our remote computer support services"
        faqs={faqs}
      />

      {/* CTA */}
      <ServiceCTA
        title="Ready for Immediate Help?"
        description="Get expert computer support in minutes, not hours. No travel time, no waiting - just fast, professional service."
        primaryAction={{
          text: "Start Remote Session",
          href: "#remote-support",
          icon: <Monitor className="mr-2 h-5 w-5" />
        }}
        secondaryAction={{
          text: "Call (757) 375-6764",
          href: "tel:(757)375-6764",
          icon: <Phone className="mr-2 h-5 w-5" />
        }}
        emergencyNote="Emergency support available 7 days a week with 1-hour response time"
      />
    </div>
  );
}