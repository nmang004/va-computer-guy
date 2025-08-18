import type { Metadata } from "next";
import { BUSINESS_INFO, SEO_CONFIG, META_PATTERNS } from "./constants";

// Base metadata configuration
export function createBaseMetadata(): Metadata {
  return {
    metadataBase: new URL(SEO_CONFIG.siteUrl),
    title: {
      default: SEO_CONFIG.defaultTitle,
      template: SEO_CONFIG.titleTemplate,
    },
    description: SEO_CONFIG.defaultDescription,
    keywords: [...SEO_CONFIG.primaryKeywords, ...SEO_CONFIG.localKeywords],
    authors: [{ name: BUSINESS_INFO.name }],
    creator: BUSINESS_INFO.name,
    publisher: BUSINESS_INFO.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: SEO_CONFIG.locale,
      url: SEO_CONFIG.siteUrl,
      siteName: SEO_CONFIG.siteName,
      title: SEO_CONFIG.defaultTitle,
      description: SEO_CONFIG.defaultDescription,
      images: [
        {
          url: SEO_CONFIG.ogImageUrl,
          width: SEO_CONFIG.ogImageWidth,
          height: SEO_CONFIG.ogImageHeight,
          alt: SEO_CONFIG.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: SEO_CONFIG.twitterSite,
      creator: SEO_CONFIG.twitterSite,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      // Will be added when Google Search Console is set up
      google: "",
    },
  };
}

// Homepage metadata with local SEO focus
export function createHomepageMetadata(): Metadata {
  const title = "Computer Guy | Computer Repair & IT Support Virginia Beach";
  const description = "Professional computer repair and IT support services in Virginia Beach and Hampton Roads. Same-day service, 30-day warranty, no fix no fee guarantee. Call (757) 375-6764.";
  
  return {
    title,
    description,
    keywords: [
      "computer repair virginia beach",
      "IT support hampton roads",
      "computer technician virginia beach", 
      "laptop repair virginia beach",
      "virus removal virginia beach",
      "computer repair near me",
      "same day computer repair",
      "business IT support"
    ],
    openGraph: {
      title,
      description,
      url: SEO_CONFIG.siteUrl,
      images: [
        {
          url: SEO_CONFIG.ogImageUrl,
          width: SEO_CONFIG.ogImageWidth,
          height: SEO_CONFIG.ogImageHeight,
          alt: "Computer Guy - Professional Computer Repair in Virginia Beach",
        },
      ],
    },
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: SEO_CONFIG.siteUrl,
    },
  };
}

// About page metadata
export function createAboutMetadata(): Metadata {
  const title = "About Computer Guy | Local Computer Repair Experts Virginia Beach";
  const description = "Learn about Computer Guy, Virginia Beach's trusted computer repair service since 2010. Certified technicians, transparent pricing, and exceptional customer service.";
  
  return {
    title,
    description,
    keywords: [
      "about computer guy",
      "computer repair company virginia beach",
      "certified computer technicians",
      "local computer repair",
      "virginia beach IT company",
      "computer repair experience"
    ],
    openGraph: {
      title,
      description,
      url: `${SEO_CONFIG.siteUrl}/about`,
    },
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: `${SEO_CONFIG.siteUrl}/about`,
    },
  };
}

// Service page metadata generator
export function createServiceMetadata(
  serviceName: string,
  serviceDescription: string,
  slug: string,
  keywords?: string[]
): Metadata {
  const title = META_PATTERNS.serviceTitle(serviceName);
  const description = META_PATTERNS.serviceDescription(serviceName);
  
  return {
    title,
    description,
    keywords: keywords || [
      `${serviceName.toLowerCase()} virginia beach`,
      `${serviceName.toLowerCase()} hampton roads`,
      `professional ${serviceName.toLowerCase()}`,
      "computer repair services",
      "IT support virginia beach"
    ],
    openGraph: {
      title,
      description,
      url: `${SEO_CONFIG.siteUrl}/services/${slug}`,
    },
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: `${SEO_CONFIG.siteUrl}/services/${slug}`,
    },
  };
}

// Blog post metadata generator
export function createBlogPostMetadata(
  title: string,
  excerpt?: string,
  slug?: string,
  publishedAt?: string,
  ogImage?: string,
  keywords?: string[]
): Metadata {
  const fullTitle = META_PATTERNS.blogTitle(title);
  const description = excerpt || "Read our latest technology tips, computer maintenance guides, and IT insights from Computer Guy's expert technicians.";
  
  return {
    title: fullTitle,
    description,
    keywords: keywords || [
      "computer tips",
      "technology advice", 
      "computer maintenance",
      "IT insights",
      "tech troubleshooting"
    ],
    authors: [{ name: BUSINESS_INFO.name }],
    openGraph: {
      title: fullTitle,
      description,
      url: slug ? `${SEO_CONFIG.siteUrl}/blog/${slug}` : undefined,
      type: "article",
      publishedTime: publishedAt,
      authors: [BUSINESS_INFO.name],
      images: ogImage ? [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        }
      ] : undefined,
    },
    twitter: {
      title: fullTitle,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    alternates: {
      canonical: slug ? `${SEO_CONFIG.siteUrl}/blog/${slug}` : undefined,
    },
  };
}

// Protection plans metadata
export function createProtectionPlansMetadata(): Metadata {
  const title = "Protection Plans | Ongoing Computer Support Virginia Beach";
  const description = "Stay protected year-round with Computer Guy's protection plans. Proactive monitoring, regular maintenance, and priority support starting at $19.99/month.";
  
  return {
    title,
    description,
    keywords: [
      "computer protection plans",
      "IT support plans virginia beach",
      "computer maintenance plans",
      "managed IT services",
      "business protection plans",
      "computer monitoring services"
    ],
    openGraph: {
      title,
      description,
      url: `${SEO_CONFIG.siteUrl}/protection-plans`,
    },
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: `${SEO_CONFIG.siteUrl}/protection-plans`,
    },
  };
}

// Repair status metadata (should be noindex for privacy)
export function createRepairStatusMetadata(): Metadata {
  return {
    title: "Repair Status | Track Your Computer Repair",
    description: "Check the status of your computer repair with Computer Guy. Enter your service details to get real-time updates on your repair progress.",
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: "Repair Status | Computer Guy",
      description: "Check your computer repair status",
    },
  };
}

// Support page metadata
export function createSupportMetadata(): Metadata {
  const title = "Support Center | Computer Help & Tech Resources";
  const description = "Find answers to common computer problems, troubleshooting guides, and helpful tech resources from Computer Guy's support center.";
  
  return {
    title,
    description,
    keywords: [
      "computer support",
      "tech help",
      "troubleshooting guides",
      "computer problems",
      "technical support",
      "computer help virginia beach"
    ],
    openGraph: {
      title,
      description,
      url: `${SEO_CONFIG.siteUrl}/support`,
    },
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: `${SEO_CONFIG.siteUrl}/support`,
    },
  };
}

// Booking page metadata
export function createBookingMetadata(): Metadata {
  const title = "Book Computer Repair | Schedule Service Virginia Beach";
  const description = "Schedule your computer repair appointment with Computer Guy. Fast, professional service in Virginia Beach and Hampton Roads. Book online or call (757) 375-6764.";
  
  return {
    title,
    description,
    keywords: [
      "book computer repair",
      "schedule computer service",
      "computer repair appointment",
      "virginia beach computer repair booking",
      "schedule IT support"
    ],
    openGraph: {
      title,
      description,
      url: `${SEO_CONFIG.siteUrl}/booking`,
    },
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: `${SEO_CONFIG.siteUrl}/booking`,
    },
  };
}

// Utility function to generate location-specific metadata
export function createLocationMetadata(
  service: string,
  location: string,
  slug: string
): Metadata {
  const title = META_PATTERNS.locationTitle(service, location);
  const description = META_PATTERNS.locationDescription(service, location);
  
  return {
    title,
    description,
    keywords: [
      `${service.toLowerCase()} ${location.toLowerCase()}`,
      `${service.toLowerCase()} near ${location.toLowerCase()}`,
      `computer repair ${location.toLowerCase()}`,
      `IT support ${location.toLowerCase()}`
    ],
    openGraph: {
      title,
      description,
      url: `${SEO_CONFIG.siteUrl}/${slug}`,
    },
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: `${SEO_CONFIG.siteUrl}/${slug}`,
    },
  };
}