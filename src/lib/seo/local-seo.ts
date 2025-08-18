import { BUSINESS_INFO } from './constants';

// Local search keywords and optimization utilities

// Primary service areas with keywords
export const LOCAL_SERVICE_AREAS = {
  primary: [
    {
      city: "Virginia Beach",
      state: "VA",
      keywords: [
        "computer repair virginia beach",
        "IT support virginia beach", 
        "laptop repair virginia beach",
        "virus removal virginia beach",
        "computer technician virginia beach",
        "computer fix virginia beach"
      ]
    }
  ],
  secondary: [
    {
      city: "Norfolk",
      state: "VA", 
      keywords: [
        "computer repair norfolk va",
        "IT support norfolk",
        "laptop repair norfolk"
      ]
    },
    {
      city: "Chesapeake",
      state: "VA",
      keywords: [
        "computer repair chesapeake va",
        "IT support chesapeake",
        "laptop repair chesapeake"
      ]
    },
    {
      city: "Portsmouth",
      state: "VA",
      keywords: [
        "computer repair portsmouth va",
        "IT support portsmouth"
      ]
    },
    {
      city: "Hampton",
      state: "VA",
      keywords: [
        "computer repair hampton va",
        "IT support hampton"
      ]
    },
    {
      city: "Newport News",
      state: "VA",
      keywords: [
        "computer repair newport news",
        "IT support newport news"
      ]
    }
  ],
  regional: [
    {
      region: "Hampton Roads",
      keywords: [
        "computer repair hampton roads",
        "IT support hampton roads",
        "computer technician hampton roads"
      ]
    },
    {
      region: "Tidewater",
      keywords: [
        "computer repair tidewater",
        "IT support tidewater"
      ]
    }
  ]
} as const;

// Local business citations and NAP consistency
export const BUSINESS_NAP = {
  name: BUSINESS_INFO.name,
  address: {
    full: `${BUSINESS_INFO.address.streetAddress}, ${BUSINESS_INFO.address.city}, ${BUSINESS_INFO.address.state} ${BUSINESS_INFO.address.postalCode}`,
    street: BUSINESS_INFO.address.streetAddress,
    city: BUSINESS_INFO.address.city,
    state: BUSINESS_INFO.address.state,
    zip: BUSINESS_INFO.address.postalCode,
    country: BUSINESS_INFO.address.country
  },
  phone: BUSINESS_INFO.phone,
  formattedPhone: BUSINESS_INFO.phone.replace(/\D/g, ''),
  email: BUSINESS_INFO.email
} as const;

// Local SEO schema helpers
export function generateLocalGeoSchema() {
  return {
    "@type": "GeoCoordinates",
    latitude: BUSINESS_INFO.coordinates.latitude,
    longitude: BUSINESS_INFO.coordinates.longitude,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_INFO.address.streetAddress,
      addressLocality: BUSINESS_INFO.address.city,
      addressRegion: BUSINESS_INFO.address.state,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: BUSINESS_INFO.address.country
    }
  };
}

// Service area schema for multiple locations
export function generateServiceAreaSchema() {
  return BUSINESS_INFO.serviceAreas.map(area => ({
    "@type": "City",
    name: area,
    containedInPlace: {
      "@type": "State",
      name: "Virginia"
    }
  }));
}

// Local business hours schema
export function generateOpeningHoursSchema() {
  const daysMap = {
    monday: "Monday",
    tuesday: "Tuesday", 
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday"
  };

  return Object.entries(BUSINESS_INFO.hours)
    .filter(([_, hours]) => hours !== "closed")
    .map(([day, hours]) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: daysMap[day as keyof typeof daysMap],
      opens: hours.split("-")[0],
      closes: hours.split("-")[1]
    }));
}

// Generate location-specific keywords for pages
export function generateLocationKeywords(service: string, includeNearMe = true): string[] {
  const baseKeywords: string[] = [];
  
  // Primary location keywords
  LOCAL_SERVICE_AREAS.primary.forEach(area => {
    baseKeywords.push(`${service} ${area.city.toLowerCase()}`);
    baseKeywords.push(`${service} ${area.city.toLowerCase()} ${area.state.toLowerCase()}`);
  });
  
  // Secondary location keywords
  LOCAL_SERVICE_AREAS.secondary.forEach(area => {
    baseKeywords.push(`${service} ${area.city.toLowerCase()}`);
  });
  
  // Regional keywords
  LOCAL_SERVICE_AREAS.regional.forEach(region => {
    baseKeywords.push(`${service} ${region.region.toLowerCase()}`);
  });
  
  // "Near me" variations
  if (includeNearMe) {
    baseKeywords.push(`${service} near me`);
    baseKeywords.push(`${service} nearby`);
    baseKeywords.push(`local ${service}`);
  }
  
  return baseKeywords;
}

// Generate breadcrumb data for location pages
export function generateLocationBreadcrumbs(
  service: string, 
  location: string,
  currentUrl: string,
  baseUrl: string
) {
  return [
    { name: "Home", url: baseUrl },
    { name: "Services", url: `${baseUrl}/services` },
    { name: service, url: currentUrl }
  ];
}

// Local content helpers
export const LOCAL_CONTENT = {
  serviceAreas: {
    primary: "Virginia Beach and Hampton Roads",
    expanded: "Virginia Beach, Norfolk, Chesapeake, Portsmouth, Hampton, Newport News, Suffolk, and the greater Hampton Roads area",
    short: "Virginia Beach & Hampton Roads"
  },
  
  travelTime: {
    withinVB: "within 30 minutes",
    hamptonRoads: "within 45 minutes",
    serviceCall: "Service call fees may apply for locations outside Virginia Beach"
  },
  
  localReferences: {
    landmarks: [
      "Virginia Beach Oceanfront",
      "Norfolk Naval Base", 
      "Chesapeake Bay Bridge",
      "Newport News Shipbuilding",
      "Norfolk International Airport"
    ],
    neighborhoods: [
      "Hilltop",
      "Great Neck",
      "Kempsville",
      "Red Mill",
      "Shadowlawn",
      "Ocean Park"
    ]
  }
} as const;

// Emergency service areas (for after-hours support)
export const EMERGENCY_SERVICE_AREAS = [
  "Virginia Beach",
  "Norfolk", 
  "Chesapeake"
] as const;

// Local competitor insights (for differentiation)
export const LOCAL_MARKET_POSITION = {
  advantages: [
    "Same-day service in Virginia Beach",
    "No hidden fees or surprise charges",
    "Local family-owned business since 2010",
    "Certified technicians with local references",
    "Free diagnostics with repair"
  ],
  serviceRadius: "25 miles from Virginia Beach",
  responseTime: "Within 2 hours for emergency calls",
  specializations: [
    "Home and business computer repair",
    "Mac and PC specialist", 
    "Small business IT support",
    "Senior citizen technology help"
  ]
} as const;

// Utility function to get location-specific title
export function getLocationTitle(service: string, location?: string): string {
  if (!location) {
    return `${service} | Computer Guy Virginia Beach`;
  }
  return `${service} in ${location} | Computer Guy`;
}

// Utility function to get location-specific description
export function getLocationDescription(service: string, location?: string): string {
  const baseService = service.toLowerCase();
  const area = location || LOCAL_CONTENT.serviceAreas.primary;
  
  return `Professional ${baseService} services in ${area}. Expert technicians, fair pricing, and fast turnaround. Call Computer Guy at (757) 375-6764.`;
}