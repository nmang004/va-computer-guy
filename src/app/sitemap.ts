import { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';
import { SEO_CONFIG } from '@/lib/seo/constants';

// Interface for blog posts from Sanity
interface BlogPost {
  slug: { current: string };
  publishedAt: string;
  _updatedAt: string;
}

// Get all blog posts for sitemap
async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const query = `
      *[_type == "post" && defined(slug.current)] {
        slug,
        publishedAt,
        _updatedAt
      }
    `;
    return await client.fetch(query);
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SEO_CONFIG.siteUrl;
  const currentDate = new Date().toISOString();
  
  // Get blog posts
  const blogPosts = await getBlogPosts();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: SEO_CONFIG.pagePriorities.homepage,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: SEO_CONFIG.pagePriorities.about,
    },
    {
      url: `${baseUrl}/services/home-services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: SEO_CONFIG.pagePriorities.services,
    },
    {
      url: `${baseUrl}/services/business-services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: SEO_CONFIG.pagePriorities.services,
    },
    {
      url: `${baseUrl}/services/remote-services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: SEO_CONFIG.pagePriorities.services,
    },
    {
      url: `${baseUrl}/protection-plans`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: SEO_CONFIG.pagePriorities.protectionPlans,
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: SEO_CONFIG.pagePriorities.services,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: SEO_CONFIG.pagePriorities.support,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: SEO_CONFIG.pagePriorities.blog,
    },
  ];

  // Individual service pages
  const servicePages: MetadataRoute.Sitemap = [
    // Home Services
    {
      url: `${baseUrl}/services/home-services/pc-mac-repair`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: SEO_CONFIG.pagePriorities.serviceDetails,
    },
    {
      url: `${baseUrl}/services/home-services/virus-removal`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: SEO_CONFIG.pagePriorities.serviceDetails,
    },
    {
      url: `${baseUrl}/services/home-services/data-recovery`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: SEO_CONFIG.pagePriorities.serviceDetails,
    },
    {
      url: `${baseUrl}/services/home-services/computer-setup`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: SEO_CONFIG.pagePriorities.serviceDetails,
    },
    {
      url: `${baseUrl}/services/home-services/in-home-support`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: SEO_CONFIG.pagePriorities.serviceDetails,
    },
    {
      url: `${baseUrl}/services/home-services/remote-support`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: SEO_CONFIG.pagePriorities.serviceDetails,
    },
    
    // Business Services
    {
      url: `${baseUrl}/services/business-services/managed-it`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: SEO_CONFIG.pagePriorities.serviceDetails,
    },
    {
      url: `${baseUrl}/services/business-services/network-solutions`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: SEO_CONFIG.pagePriorities.serviceDetails,
    },
    {
      url: `${baseUrl}/services/business-services/server-solutions`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: SEO_CONFIG.pagePriorities.serviceDetails,
    },
    {
      url: `${baseUrl}/services/business-services/data-security`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: SEO_CONFIG.pagePriorities.serviceDetails,
    },
    {
      url: `${baseUrl}/services/business-services/consulting`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: SEO_CONFIG.pagePriorities.serviceDetails,
    },
    
    // Remote Services
    {
      url: `${baseUrl}/services/remote-services/emergency-support`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: SEO_CONFIG.pagePriorities.serviceDetails,
    },
    {
      url: `${baseUrl}/services/remote-services/performance-optimization`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: SEO_CONFIG.pagePriorities.serviceDetails,
    },
    {
      url: `${baseUrl}/services/remote-services/quick-fixes`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: SEO_CONFIG.pagePriorities.serviceDetails,
    },
    {
      url: `${baseUrl}/services/remote-services/software-support`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: SEO_CONFIG.pagePriorities.serviceDetails,
    },
    {
      url: `${baseUrl}/services/remote-services/virus-removal`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: SEO_CONFIG.pagePriorities.serviceDetails,
    },
    
    // Other Services
    {
      url: `${baseUrl}/services/senior-support`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: SEO_CONFIG.pagePriorities.serviceDetails,
    },
    {
      url: `${baseUrl}/services/custom-solutions`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: SEO_CONFIG.pagePriorities.serviceDetails,
    },
    {
      url: `${baseUrl}/services/emergency-support`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: SEO_CONFIG.pagePriorities.serviceDetails,
    },
  ];

  // Blog posts
  const blogPostPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug.current}`,
    lastModified: post._updatedAt || post.publishedAt,
    changeFrequency: 'monthly' as const,
    priority: SEO_CONFIG.pagePriorities.blogPost,
  }));

  // Support pages
  const supportPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/support/search`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/support/troubleshooting/computer-running-slow`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Combine all pages
  return [
    ...staticPages,
    ...servicePages,
    ...blogPostPages,
    ...supportPages,
  ];
}