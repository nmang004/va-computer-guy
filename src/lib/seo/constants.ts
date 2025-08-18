// SEO Configuration and Business Information for Computer Guy
// This file contains all the centralized SEO constants and business data

export const BUSINESS_INFO = {
  // Core Business Details
  name: "Computer Guy",
  legalName: "Computer Guy LLC",
  alternateName: "VA Computer Guy",
  description: "Professional computer repair and IT support services in Virginia Beach and Hampton Roads. Fast, reliable solutions for home and business.",
  foundingDate: "2010",
  
  // Contact Information
  phone: "(757) 375-6764",
  email: "info@vacomputerguy.com",
  
  // Address
  address: {
    streetAddress: "355 Independence Blvd.",
    city: "Virginia Beach",
    state: "VA",
    postalCode: "23462",
    country: "US",
    region: "Hampton Roads"
  },
  
  // Business Hours
  hours: {
    monday: "09:00-17:00",
    tuesday: "09:00-19:00", 
    wednesday: "09:00-17:00",
    thursday: "09:00-19:00",
    friday: "09:00-17:00",
    saturday: "10:00-16:00",
    sunday: "closed"
  },
  
  // Geographic Data
  coordinates: {
    latitude: "36.8529",
    longitude: "-76.0253"
  },
  
  // Service Areas
  serviceAreas: [
    "Virginia Beach",
    "Norfolk", 
    "Chesapeake",
    "Portsmouth",
    "Hampton",
    "Newport News",
    "Suffolk",
    "Hampton Roads"
  ],
  
  // Price Range
  priceRange: "$$",
  
  // Payment Methods
  paymentAccepted: [
    "Cash",
    "Credit Card", 
    "Debit Card",
    "Check",
    "Square"
  ]
} as const;

// Core Services
export const SERVICES = {
  homeServices: {
    name: "Home Computer Services",
    description: "Personal computer and device repair for families and individuals",
    services: [
      "PC & Mac Repair",
      "Virus & Malware Removal", 
      "Data Recovery",
      "In-Home Setup & Support"
    ]
  },
  businessServices: {
    name: "Business IT Services", 
    description: "Enterprise-grade IT solutions and managed services",
    services: [
      "Managed IT Support",
      "Network & Server Solutions",
      "Data Backup & Security", 
      "Business Consulting"
    ]
  },
  remoteServices: {
    name: "Remote Support Services",
    description: "Fast remote assistance for immediate technical support",
    services: [
      "Remote Troubleshooting",
      "Software Installation",
      "Performance Optimization",
      "Quick Technical Fixes"
    ]
  }
} as const;

// SEO Configuration
export const SEO_CONFIG = {
  // Default Meta Tags
  defaultTitle: "Computer Guy | Computer Repair & IT Support Virginia Beach",
  titleTemplate: "%s | Computer Guy",
  defaultDescription: "Professional computer repair and IT support services in Virginia Beach and Hampton Roads. Fast, reliable solutions for home and business. Call (757) 375-6764.",
  
  // Site Information
  siteUrl: "https://va-computer-g2iufb9ez-nick-mangubats-projects.vercel.app",
  siteName: "Computer Guy",
  locale: "en_US",
  
  // Open Graph Defaults
  ogType: "website",
  ogImageUrl: "/og-image.png",
  ogImageAlt: "Computer Guy - Professional Computer Repair in Virginia Beach",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  
  // Twitter Card Configuration
  twitterCard: "summary_large_image",
  twitterSite: "@ComputerGuyVB", // Will be updated when social media is set up
  
  // Keywords and Focus Areas
  primaryKeywords: [
    "computer repair virginia beach",
    "IT support hampton roads", 
    "computer technician virginia beach",
    "laptop repair virginia beach",
    "virus removal virginia beach",
    "data recovery virginia beach"
  ],
  
  // Local SEO Keywords
  localKeywords: [
    "computer repair near me",
    "IT support virginia beach", 
    "computer fix virginia beach",
    "laptop repair near me",
    "computer technician hampton roads",
    "business IT support virginia beach"
  ],
  
  // Page Priorities for Sitemap
  pagePriorities: {
    homepage: 1.0,
    services: 0.9,
    serviceDetails: 0.8,
    about: 0.7,
    blog: 0.7,
    blogPost: 0.6,
    protectionPlans: 0.8,
    repairStatus: 0.4, // Lower priority, private content
    support: 0.6
  }
} as const;

// Schema.org Types
export const SCHEMA_TYPES = {
  LocalBusiness: "LocalBusiness",
  Organization: "Organization", 
  Service: "Service",
  BreadcrumbList: "BreadcrumbList",
  FAQPage: "FAQPage",
  Article: "Article",
  WebSite: "WebSite",
  WebPage: "WebPage"
} as const;

// Social Media Links (for future use)
export const SOCIAL_LINKS = {
  facebook: "", // To be added when available
  twitter: "",  // To be added when available
  linkedin: "", // To be added when available
  instagram: "" // To be added when available
} as const;

// Common Meta Tag Utilities
export const META_PATTERNS = {
  // Title patterns for different page types
  serviceTitle: (serviceName: string) => `${serviceName} | Professional Computer Repair Virginia Beach`,
  locationTitle: (service: string, location: string) => `${service} in ${location} | Computer Guy`,
  blogTitle: (title: string) => `${title} | Computer Guy Blog`,
  
  // Description patterns
  serviceDescription: (service: string) => `Professional ${service.toLowerCase()} services in Virginia Beach and Hampton Roads. Expert technicians, fair pricing, and fast turnaround. Call (757) 375-6764.`,
  locationDescription: (service: string, location: string) => `Get reliable ${service.toLowerCase()} services in ${location}. Computer Guy provides expert computer repair and IT support throughout Hampton Roads.`
} as const;

// FAQ Data for Schema
export const COMMON_FAQS = [
  {
    question: "How long does computer repair typically take?",
    answer: "Most computer repairs are completed within 24-48 hours. Simple issues like virus removal may be done same-day, while complex hardware repairs might take 2-3 business days."
  },
  {
    question: "Do you offer in-home computer repair services?",
    answer: "Yes, we provide in-home computer repair services throughout Virginia Beach and Hampton Roads. There's a service call fee, but we'll diagnose and fix many issues right at your location."
  },
  {
    question: "What areas do you serve?",
    answer: "We serve Virginia Beach, Norfolk, Chesapeake, Portsmouth, Hampton, Newport News, Suffolk, and the greater Hampton Roads area."
  },
  {
    question: "Do you work on both PC and Mac computers?",
    answer: "Yes, our certified technicians are experienced with both Windows PCs and Apple Mac computers, as well as laptops and desktop systems."
  },
  {
    question: "What if my computer can't be fixed?",
    answer: "We offer a 'No Fix, No Fee' guarantee. If we can't repair your computer, you won't be charged for the repair attempt. We'll also help you explore replacement options."
  }
] as const;