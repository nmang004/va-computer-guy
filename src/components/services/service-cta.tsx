import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Phone, Calendar, MessageCircle } from "lucide-react";

interface ServiceCTAProps {
  title?: string;
  description?: string;
  primaryAction?: {
    text: string;
    href: string;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    text: string;
    href: string;
    icon?: React.ReactNode;
  };
  emergencyNote?: string;
  variant?: "default" | "gradient" | "minimal";
}

export function ServiceCTA({
  title = "Ready to Get Started?",
  description = "Contact us today for fast, reliable service you can trust",
  primaryAction = {
    text: "Book Service Now",
    href: "/booking",
    icon: <Calendar className="mr-2 h-5 w-5" />
  },
  secondaryAction = {
    text: "Call (757) 375-6764",
    href: "tel:(757)375-6764",
    icon: <Phone className="mr-2 h-5 w-5" />
  },
  emergencyNote,
  variant = "gradient"
}: ServiceCTAProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "gradient":
        return "bg-gradient-to-r from-va-primary to-va-secondary text-va-neutral-50";
      case "minimal":
        return "bg-va-neutral-100 text-va-text-primary";
      default:
        return "bg-va-primary text-va-neutral-50";
    }
  };

  const getButtonVariants = () => {
    switch (variant) {
      case "gradient":
        return {
          primary: "va-btn-accent",
          secondary: "border-va-neutral-50 text-va-neutral-50 hover:bg-va-neutral-50 hover:text-va-primary"
        };
      case "minimal":
        return {
          primary: "va-btn-primary",
          secondary: "va-btn-secondary"
        };
      default:
        return {
          primary: "va-btn-accent",
          secondary: "border-va-neutral-50 text-va-neutral-50 hover:bg-va-neutral-50 hover:text-va-primary"
        };
    }
  };

  const buttonVariants = getButtonVariants();

  return (
    <section className={`py-16 ${getVariantClasses()}`}>
      <div className="va-container text-center">
        <h2 className="text-3xl font-montserrat font-bold mb-4">
          {title}
        </h2>
        <p className={`text-xl mb-8 max-w-2xl mx-auto font-roboto ${
          variant === "minimal" ? "text-va-text-secondary" : "opacity-90"
        }`}>
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Button size="lg" asChild className={buttonVariants.primary}>
            <Link href={primaryAction.href}>
              {primaryAction.icon}
              {primaryAction.text}
            </Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            asChild 
            className={`bg-transparent ${buttonVariants.secondary}`}
          >
            <Link href={secondaryAction.href}>
              {secondaryAction.icon}
              {secondaryAction.text}
            </Link>
          </Button>
        </div>

        {emergencyNote && (
          <div className={`text-sm font-roboto ${
            variant === "minimal" ? "text-va-text-muted" : "opacity-80"
          }`}>
            {emergencyNote}
          </div>
        )}

        <div className="mt-8 flex items-center justify-center gap-2 text-sm font-roboto">
          <MessageCircle className="h-4 w-4" />
          <span className={variant === "minimal" ? "text-va-text-muted" : "opacity-80"}>
            24/7 Support Available • Same-Day Service • 30-Day Warranty
          </span>
        </div>
      </div>
    </section>
  );
}