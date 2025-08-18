import Link from "next/link";
import { Heart, Users, GraduationCap, Smartphone, Phone, CheckCircle, Clock, Shield } from "lucide-react";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFeatures } from "@/components/services/service-features";
import { ProcessTimeline } from "@/components/services/process-timeline";
import { FAQAccordion } from "@/components/services/faq-accordion";
import { ServiceCTA } from "@/components/services/service-cta";
import { RelatedServices } from "@/components/services/related-services";
import { PricingCard } from "@/components/services/pricing-card";

export default function SeniorSupportPage() {
  const features = [
    {
      title: "Patient Technology Training",
      description: "Step-by-step computer and device training at a comfortable pace with clear explanations",
      icon: GraduationCap
    },
    {
      title: "Simplified Setup",
      description: "Computer and device configuration optimized for ease of use and accessibility",
      icon: Users
    },
    {
      title: "Ongoing Support",
      description: "Regular check-ins and continued assistance as technology needs evolve",
      icon: Heart
    },
    {
      title: "Family Coordination",
      description: "Work with family members to ensure consistent support and communication methods",
      icon: Smartphone
    }
  ];

  const processSteps = [
    {
      number: 1,
      title: "Needs Assessment",
      description: "Understanding your specific technology goals and comfort level with computers",
      icon: Users,
      estimatedTime: "1 hour consultation"
    },
    {
      number: 2,
      title: "Customized Setup",
      description: "Configuring devices for simplicity, larger text, and easier navigation",
      icon: Shield,
      estimatedTime: "1-2 hours"
    },
    {
      number: 3,
      title: "Personal Training",
      description: "One-on-one training sessions covering your specific technology interests",
      icon: GraduationCap,
      estimatedTime: "2-4 hours"
    },
    {
      number: 4,
      title: "Follow-up Support",
      description: "Regular check-ins and additional training as you become more comfortable",
      icon: CheckCircle,
      estimatedTime: "Ongoing"
    }
  ];

  const pricingTiers = [
    {
      name: "Technology Assessment",
      price: 89,
      description: "Understanding your technology needs",
      features: [
        "Current device evaluation",
        "Technology goals discussion",
        "Accessibility needs assessment",
        "Simplified recommendations",
        "Family coordination planning",
        "Written summary provided"
      ],
      ctaText: "Schedule Assessment",
      ctaHref: "/booking"
    },
    {
      name: "Setup & Training",
      price: 149,
      description: "Complete device setup and training",
      popular: true,
      features: [
        "Simplified device configuration",
        "Large text and icon setup",
        "Essential applications training",
        "Email and messaging setup",
        "Safety and security overview",
        "Take-home reference guide"
      ],
      ctaText: "Book Training",
      ctaHref: "/booking"
    },
    {
      name: "Ongoing Support",
      price: 119,
      description: "Monthly check-ins and assistance",
      features: [
        "Monthly technology check-ins",
        "Additional training sessions",
        "Device maintenance and updates",
        "New feature introductions",
        "Problem-solving assistance",
        "Family communication included"
      ],
      ctaText: "Start Support Plan",
      ctaHref: "/booking"
    }
  ];

  const faqs = [
    {
      question: "I'm not good with computers. Can you really help me learn?",
      answer: "Absolutely! We specialize in patient, step-by-step training that goes at your pace. Many of our clients started with little computer experience and now confidently use email, video calls, and more. We believe anyone can learn technology with the right approach."
    },
    {
      question: "Will you set up my computer to be easier to use?",
      answer: "Yes, we configure computers and devices for simplicity and accessibility. This includes larger text, simplified desktops, easier navigation, and removing confusing features. We make technology work for you, not against you."
    },
    {
      question: "Can you help me stay in touch with family and grandchildren?",
      answer: "Definitely! We specialize in setting up and teaching video calling (Zoom, FaceTime, Skype), social media, email, photo sharing, and messaging apps. Staying connected with family is one of our most popular services."
    },
    {
      question: "What if I forget what you taught me?",
      answer: "That's completely normal! We provide written guides, offer follow-up sessions, and can always come back for refresher training. Many clients start with ongoing support plans that include regular check-ins."
    },
    {
      question: "Do you work with tablets and smartphones too?",
      answer: "Yes, we help with all devices including iPads, Android tablets, iPhones, and Android phones. We can set them up for easier use and teach you the features that matter most to you."
    },
    {
      question: "Can my adult children coordinate with you about my technology needs?",
      answer: "Absolutely! With your permission, we're happy to communicate with family members about your technology setup and progress. This helps ensure everyone can provide consistent support."
    },
    {
      question: "Is it safe for me to use computers and the internet?",
      answer: "Yes, when set up properly. We teach safe internet practices, help you recognize scams, set up security software, and configure settings to protect your privacy and financial information."
    },
    {
      question: "How long does it take to learn basic computer skills?",
      answer: "Everyone learns at their own pace. Basic skills like email and web browsing often take 2-3 training sessions. More advanced features can be learned over time as your comfort level increases. We never rush the process."
    }
  ];

  const relatedServices = [
    {
      title: "Computer Setup",
      description: "Complete computer setup and configuration",
      href: "/services/home-services/computer-setup",
      icon: Shield,
      pricing: { startingPrice: 75, priceNote: "per device" }
    },
    {
      title: "In-Home Support",
      description: "Comfortable learning in your own home",
      href: "/services/home-services/in-home-support",
      icon: Heart,
      pricing: { startingPrice: 119, priceNote: "per visit" }
    },
    {
      title: "Remote Support",
      description: "Ongoing help via phone and remote access",
      href: "/services/home-services/remote-support",
      icon: Phone,
      pricing: { startingPrice: 89, priceNote: "per session" }
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
          <span className="text-va-text-primary">Senior Technology Support</span>
        </div>
      </div>

      {/* Hero Section */}
      <ServiceHero
        category="Specialized Services"
        title="Senior Technology Support"
        description="Patient, personalized technology training and support for seniors. Learn computers, tablets, and smartphones at your own pace with kind, understanding instruction designed for mature adults."
        keyBenefit="Technology training designed specifically for seniors with patience and understanding"
        pricing={{ startingPrice: 89, priceNote: "assessment" }}
        estimatedTime="At your pace"
        emergencyAvailable={false}
      />

      {/* What's Included */}
      <ServiceFeatures
        title="Senior Support Services"
        subtitle="Technology services designed with patience and understanding for mature adults"
        features={features}
        columns={4}
      />

      {/* Pricing */}
      <PricingCard
        title="Senior Support Pricing"
        subtitle="Affordable technology training and support for seniors"
        tiers={pricingTiers}
        showComparison={true}
      />

      {/* Process */}
      <ProcessTimeline
        title="Senior Support Process"
        subtitle="Gentle, patient approach to technology learning and support"
        steps={processSteps}
      />

      {/* Services We Provide for Seniors */}
      <section className="py-16 bg-va-neutral-100">
        <div className="va-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4 text-va-text-primary">
              Technology Services for Seniors
            </h2>
            <p className="text-lg text-va-text-secondary max-w-2xl mx-auto font-roboto">
              Comprehensive technology support designed to help seniors stay connected and confident
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Video Calling Setup",
                description: "Learn Zoom, FaceTime, and Skype to stay connected with family and friends",
                icon: Users
              },
              {
                title: "Email Management",
                description: "Master email basics, organization, and staying safe from scams",
                icon: CheckCircle
              },
              {
                title: "Social Media Guidance",
                description: "Facebook, Instagram basics for sharing photos and staying in touch",
                icon: Heart
              },
              {
                title: "Online Safety",
                description: "Learn to identify scams, protect personal information, and browse safely",
                icon: Shield
              },
              {
                title: "Device Simplification",
                description: "Customize computers and phones for larger text and easier navigation",
                icon: Smartphone
              },
              {
                title: "Photo Management",
                description: "Organize, share, and print digital photos and memories",
                icon: Clock
              }
            ].map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-lg va-card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-va-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="h-6 w-6 text-va-accent" />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-semibold text-va-text-primary mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm text-va-text-secondary font-roboto">
                        {service.description}
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
        title="Senior Technology FAQ"
        subtitle="Common questions about technology support for seniors"
        faqs={faqs}
      />

      {/* Related Services */}
      <RelatedServices
        title="Additional Support Options"
        subtitle="Other services that complement senior technology support"
        services={relatedServices}
      />

      {/* CTA */}
      <ServiceCTA
        title="Ready to Embrace Technology with Confidence?"
        description="You're never too old to learn new technology. Get patient, understanding support to help you stay connected with family and enjoy the benefits of modern technology."
        primaryAction={{
          text: "Schedule Assessment",
          href: "/booking",
          icon: <Heart className="mr-2 h-5 w-5" />
        }}
        secondaryAction={{
          text: "Call (757) 375-6764",
          href: "tel:(757)375-6764",
          icon: <Phone className="mr-2 h-5 w-5" />
        }}
        emergencyNote="Patient instruction • At your pace • Family coordination available"
      />
    </div>
  );
}