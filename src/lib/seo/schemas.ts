import { BUSINESS_INFO, SERVICES, SEO_CONFIG, COMMON_FAQS } from "./constants";

// Type definitions for Schema.org structured data
export interface LocalBusinessSchema {
  "@context": "https://schema.org";
  "@type": "LocalBusiness";
  "@id": string;
  name: string;
  alternateName?: string;
  description: string;
  url: string;
  logo: string;
  image: string[];
  telephone: string;
  email: string;
  address: {
    "@type": "PostalAddress";
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    "@type": "GeoCoordinates";
    latitude: string;
    longitude: string;
  };
  openingHoursSpecification: Array<{
    "@type": "OpeningHoursSpecification";
    dayOfWeek: string;
    opens: string;
    closes: string;
  }>;
  areaServed: Array<{
    "@type": "Place";
    name: string;
  }>;
  paymentAccepted: readonly string[];
  priceRange: string;
  foundingDate: string;
  sameAs?: string[];
}

export interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization";
  "@id": string;
  name: string;
  alternateName?: string;
  url: string;
  logo: string;
  description: string;
  telephone: string;
  email: string;
  address: {
    "@type": "PostalAddress";
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  sameAs?: string[];
}

export interface ServiceSchema {
  "@context": "https://schema.org";
  "@type": "Service";
  "@id": string;
  name: string;
  description: string;
  provider: {
    "@type": "LocalBusiness";
    "@id": string;
  };
  areaServed: Array<{
    "@type": "Place";
    name: string;
  }>;
  hasOfferCatalog: {
    "@type": "OfferCatalog";
    name: string;
    itemListElement: Array<{
      "@type": "Offer";
      itemOffered: {
        "@type": "Service";
        name: string;
      };
    }>;
  };
}

export interface BreadcrumbSchema {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
}

export interface FAQPageSchema {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
}

export interface ArticleSchema {
  "@context": "https://schema.org";
  "@type": "Article";
  "@id": string;
  headline: string;
  description?: string;
  image?: string;
  author: {
    "@type": "Organization";
    name: string;
    "@id": string;
  };
  publisher: {
    "@type": "Organization";
    name: string;
    "@id": string;
    logo: {
      "@type": "ImageObject";
      url: string;
    };
  };
  datePublished: string;
  dateModified?: string;
  mainEntityOfPage: string;
}

// Generate Local Business Schema
export function generateLocalBusinessSchema(): LocalBusinessSchema {
  const businessId = `${SEO_CONFIG.siteUrl}/#organization`;
  
  // Convert business hours to schema format
  const openingHours = Object.entries(BUSINESS_INFO.hours)
    .filter(([, hours]) => hours !== "closed")
    .map(([day, hours]) => ({
      "@type": "OpeningHoursSpecification" as const,
      dayOfWeek: day.charAt(0).toUpperCase() + day.slice(1),
      opens: hours.split("-")[0],
      closes: hours.split("-")[1],
    }));

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": businessId,
    name: BUSINESS_INFO.name,
    alternateName: BUSINESS_INFO.alternateName,
    description: BUSINESS_INFO.description,
    url: SEO_CONFIG.siteUrl,
    logo: `${SEO_CONFIG.siteUrl}/images/computer-guy-logo.png`,
    image: [
      `${SEO_CONFIG.siteUrl}/images/computer-guy-logo.png`,
      `${SEO_CONFIG.siteUrl}${SEO_CONFIG.ogImageUrl}`
    ],
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_INFO.address.streetAddress,
      addressLocality: BUSINESS_INFO.address.city,
      addressRegion: BUSINESS_INFO.address.state,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: BUSINESS_INFO.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS_INFO.coordinates.latitude,
      longitude: BUSINESS_INFO.coordinates.longitude,
    },
    openingHoursSpecification: openingHours,
    areaServed: BUSINESS_INFO.serviceAreas.map(area => ({
      "@type": "Place" as const,
      name: area,
    })),
    paymentAccepted: BUSINESS_INFO.paymentAccepted,
    priceRange: BUSINESS_INFO.priceRange,
    foundingDate: BUSINESS_INFO.foundingDate,
    // sameAs will be added when social media profiles are available
  };
}

// Generate Organization Schema
export function generateOrganizationSchema(): OrganizationSchema {
  const organizationId = `${SEO_CONFIG.siteUrl}/#organization`;
  
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: BUSINESS_INFO.name,
    alternateName: BUSINESS_INFO.alternateName,
    url: SEO_CONFIG.siteUrl,
    logo: `${SEO_CONFIG.siteUrl}/images/computer-guy-logo.png`,
    description: BUSINESS_INFO.description,
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_INFO.address.streetAddress,
      addressLocality: BUSINESS_INFO.address.city,
      addressRegion: BUSINESS_INFO.address.state,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: BUSINESS_INFO.address.country,
    },
    // sameAs will be added when social media profiles are available
  };
}

// Generate Service Schema for Home Services
export function generateHomeServicesSchema(): ServiceSchema {
  const businessId = `${SEO_CONFIG.siteUrl}/#organization`;
  const serviceId = `${SEO_CONFIG.siteUrl}/services/home-services#service`;
  
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": serviceId,
    name: SERVICES.homeServices.name,
    description: SERVICES.homeServices.description,
    provider: {
      "@type": "LocalBusiness",
      "@id": businessId,
    },
    areaServed: BUSINESS_INFO.serviceAreas.map(area => ({
      "@type": "Place" as const,
      name: area,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Home Computer Services",
      itemListElement: SERVICES.homeServices.services.map(service => ({
        "@type": "Offer" as const,
        itemOffered: {
          "@type": "Service" as const,
          name: service,
        },
      })),
    },
  };
}

// Generate Service Schema for Business Services
export function generateBusinessServicesSchema(): ServiceSchema {
  const businessId = `${SEO_CONFIG.siteUrl}/#organization`;
  const serviceId = `${SEO_CONFIG.siteUrl}/services/business-services#service`;
  
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": serviceId,
    name: SERVICES.businessServices.name,
    description: SERVICES.businessServices.description,
    provider: {
      "@type": "LocalBusiness",
      "@id": businessId,
    },
    areaServed: BUSINESS_INFO.serviceAreas.map(area => ({
      "@type": "Place" as const,
      name: area,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Business IT Services",
      itemListElement: SERVICES.businessServices.services.map(service => ({
        "@type": "Offer" as const,
        itemOffered: {
          "@type": "Service" as const,
          name: service,
        },
      })),
    },
  };
}

// Generate Breadcrumb Schema
export function generateBreadcrumbSchema(breadcrumbs: Array<{name: string, url: string}>): BreadcrumbSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Generate FAQ Page Schema
export function generateFAQPageSchema(faqs?: Array<{question: string, answer: string}>): FAQPageSchema {
  const faqData = faqs || COMMON_FAQS;
  
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map(faq => ({
      "@type": "Question" as const,
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: faq.answer,
      },
    })),
  };
}

// Generate Article Schema for Blog Posts
export function generateArticleSchema(
  title: string,
  slug: string,
  publishedAt: string,
  modifiedAt?: string,
  description?: string,
  image?: string
): ArticleSchema {
  const articleUrl = `${SEO_CONFIG.siteUrl}/blog/${slug}`;
  const organizationId = `${SEO_CONFIG.siteUrl}/#organization`;
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": articleUrl,
    headline: title,
    description: description,
    image: image,
    author: {
      "@type": "Organization",
      name: BUSINESS_INFO.name,
      "@id": organizationId,
    },
    publisher: {
      "@type": "Organization",
      name: BUSINESS_INFO.name,
      "@id": organizationId,
      logo: {
        "@type": "ImageObject",
        url: `${SEO_CONFIG.siteUrl}/images/computer-guy-logo.png`,
      },
    },
    datePublished: publishedAt,
    dateModified: modifiedAt || publishedAt,
    mainEntityOfPage: articleUrl,
  };
}

// Generate Website Schema
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SEO_CONFIG.siteUrl}/#website`,
    url: SEO_CONFIG.siteUrl,
    name: SEO_CONFIG.siteName,
    description: SEO_CONFIG.defaultDescription,
    publisher: {
      "@type": "Organization",
      "@id": `${SEO_CONFIG.siteUrl}/#organization`,
    },
    potentialAction: [
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SEO_CONFIG.siteUrl}/support/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    ],
  };
}

// Utility function to combine multiple schemas
export function combineSchemas(...schemas: unknown[]): string {
  const validSchemas = schemas.filter(schema => schema !== null && schema !== undefined);
  
  if (validSchemas.length === 1) {
    return JSON.stringify(validSchemas[0], null, 0);
  }
  
  return JSON.stringify(validSchemas, null, 0);
}