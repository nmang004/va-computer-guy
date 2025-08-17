import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, Users } from "lucide-react";
import { notFound } from "next/navigation";

// Knowledge base structure
const categoryData = {
  'getting-started': {
    title: 'Getting Started',
    description: 'Learn how to use VA Computer Guy services effectively',
    articles: [
      {
        id: 'how-to-book-service',
        title: 'How to Book a Service Appointment',
        excerpt: 'Step-by-step guide to scheduling your service appointment through our online booking system.',
        readTime: '3 min read',
        difficulty: 'Beginner',
        lastUpdated: '2025-01-15'
      },
      {
        id: 'understanding-repair-process',
        title: 'Understanding Our Repair Process',
        excerpt: 'Complete overview of our repair process from initial assessment to final delivery.',
        readTime: '5 min read',
        difficulty: 'Beginner',
        lastUpdated: '2025-01-12'
      },
      {
        id: 'what-to-expect',
        title: 'What to Expect During Your Service',
        excerpt: 'Timeline and communication expectations during your computer repair service.',
        readTime: '4 min read',
        difficulty: 'Beginner',
        lastUpdated: '2025-01-10'
      },
      {
        id: 'service-areas',
        title: 'Service Areas and Availability',
        excerpt: 'Geographic coverage and service availability throughout Hampton Roads.',
        readTime: '2 min read',
        difficulty: 'Beginner',
        lastUpdated: '2025-01-08'
      },
      {
        id: 'preparing-device',
        title: 'Preparing Your Device for Service',
        excerpt: 'Important steps to take before bringing your device in for repair.',
        readTime: '3 min read',
        difficulty: 'Beginner',
        lastUpdated: '2025-01-05'
      }
    ]
  },
  'troubleshooting': {
    title: 'Troubleshooting',
    description: 'Common computer issues and step-by-step solutions',
    articles: [
      {
        id: 'computer-wont-start',
        title: 'Computer Won\'t Start - Basic Steps',
        excerpt: 'Troubleshooting guide for computers that won\'t power on or boot properly.',
        readTime: '6 min read',
        difficulty: 'Intermediate',
        lastUpdated: '2025-01-14'
      },
      {
        id: 'slow-performance',
        title: 'Slow Computer Performance',
        excerpt: 'Identify and resolve common causes of slow computer performance.',
        readTime: '8 min read',
        difficulty: 'Intermediate',
        lastUpdated: '2025-01-11'
      },
      {
        id: 'internet-problems',
        title: 'Internet Connection Problems',
        excerpt: 'Diagnose and fix common internet connectivity issues at home.',
        readTime: '7 min read',
        difficulty: 'Intermediate',
        lastUpdated: '2025-01-09'
      },
      {
        id: 'virus-malware-symptoms',
        title: 'Virus and Malware Symptoms',
        excerpt: 'Recognize signs of malware infection and immediate steps to take.',
        readTime: '5 min read',
        difficulty: 'Beginner',
        lastUpdated: '2025-01-07'
      },
      {
        id: 'blue-screen-errors',
        title: 'Blue Screen Error Solutions',
        excerpt: 'Understanding Windows BSOD errors and recovery options.',
        readTime: '10 min read',
        difficulty: 'Advanced',
        lastUpdated: '2025-01-06'
      },
      {
        id: 'wifi-troubleshooting',
        title: 'WiFi Connection Troubleshooting',
        excerpt: 'Step-by-step guide to resolving WiFi connectivity problems.',
        readTime: '6 min read',
        difficulty: 'Intermediate',
        lastUpdated: '2025-01-04'
      }
    ]
  },
  'service-info': {
    title: 'Service Information',
    description: 'Detailed information about our repair services, pricing, and policies',
    articles: [
      {
        id: 'repair-pricing',
        title: 'Repair Pricing and Estimates',
        excerpt: 'Transparent pricing structure and how our estimation process works.',
        readTime: '4 min read',
        difficulty: 'Beginner',
        lastUpdated: '2025-01-13'
      },
      {
        id: 'repair-timelines',
        title: 'Typical Repair Timelines',
        excerpt: 'Expected timeframes for different types of computer repairs and services.',
        readTime: '3 min read',
        difficulty: 'Beginner',
        lastUpdated: '2025-01-10'
      },
      {
        id: 'warranty-info',
        title: 'Warranty Information',
        excerpt: 'Comprehensive warranty coverage details for all repair services.',
        readTime: '5 min read',
        difficulty: 'Beginner',
        lastUpdated: '2025-01-08'
      },
      {
        id: 'data-privacy',
        title: 'Data Privacy and Security',
        excerpt: 'How we protect your personal and business data during repairs.',
        readTime: '6 min read',
        difficulty: 'Intermediate',
        lastUpdated: '2025-01-05'
      },
      {
        id: 'pickup-delivery',
        title: 'Pickup and Delivery Service',
        excerpt: 'Convenient pickup and delivery options for residential and business clients.',
        readTime: '4 min read',
        difficulty: 'Beginner',
        lastUpdated: '2025-01-03'
      }
    ]
  },
  'protection-plans': {
    title: 'Protection Plans',
    description: 'Everything about our residential and business protection plans',
    articles: [
      {
        id: 'residential-protection',
        title: 'Residential Protection Plan Benefits',
        excerpt: 'Complete overview of features included in our residential protection plan.',
        readTime: '5 min read',
        difficulty: 'Beginner',
        lastUpdated: '2025-01-12'
      },
      {
        id: 'business-protection',
        title: 'Business Protection Plan Features',
        excerpt: 'Comprehensive business protection plan for enterprise-level support.',
        readTime: '7 min read',
        difficulty: 'Intermediate',
        lastUpdated: '2025-01-09'
      },
      {
        id: 'billing-payment',
        title: 'Billing and Payment Information',
        excerpt: 'How protection plan billing works and available payment methods.',
        readTime: '3 min read',
        difficulty: 'Beginner',
        lastUpdated: '2025-01-06'
      },
      {
        id: 'update-plan',
        title: 'How to Update Your Plan',
        excerpt: 'Steps to modify, upgrade, or downgrade your current protection plan.',
        readTime: '4 min read',
        difficulty: 'Beginner',
        lastUpdated: '2025-01-04'
      },
      {
        id: 'plan-cancellation',
        title: 'Protection Plan Cancellation',
        excerpt: 'Cancellation process, refund policies, and what to expect.',
        readTime: '3 min read',
        difficulty: 'Beginner',
        lastUpdated: '2025-01-02'
      }
    ]
  },
  'account-help': {
    title: 'Account Help',
    description: 'Managing your account, login issues, and profile settings',
    articles: [
      {
        id: 'creating-account',
        title: 'Creating Your Account',
        excerpt: 'Step-by-step guide to setting up your VA Computer Guy account.',
        readTime: '3 min read',
        difficulty: 'Beginner',
        lastUpdated: '2025-01-11'
      },
      {
        id: 'password-reset',
        title: 'Resetting Your Password',
        excerpt: 'How to reset your password if you\'ve forgotten your login credentials.',
        readTime: '2 min read',
        difficulty: 'Beginner',
        lastUpdated: '2025-01-08'
      },
      {
        id: 'update-contact-info',
        title: 'Updating Contact Information',
        excerpt: 'How to change your email, phone number, and address in your account.',
        readTime: '3 min read',
        difficulty: 'Beginner',
        lastUpdated: '2025-01-05'
      },
      {
        id: 'service-history',
        title: 'Viewing Your Service History',
        excerpt: 'Access your complete service history and previous repair details.',
        readTime: '2 min read',
        difficulty: 'Beginner',
        lastUpdated: '2025-01-03'
      },
      {
        id: 'manage-notifications',
        title: 'Managing Notifications',
        excerpt: 'Control email, SMS, and app notifications from your account settings.',
        readTime: '4 min read',
        difficulty: 'Beginner',
        lastUpdated: '2025-01-01'
      }
    ]
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner': return 'bg-green-100 text-green-800';
    case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
    case 'Advanced': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  
  const categoryInfo = categoryData[category as keyof typeof categoryData];
  
  if (!categoryInfo) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/support">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Support
          </Link>
        </Button>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Badge variant="secondary" className="mb-4">
            {categoryInfo.title}
          </Badge>
          <h1 className="text-3xl font-bold mb-4">{categoryInfo.title}</h1>
          <p className="text-lg text-muted-foreground">
            {categoryInfo.description}
          </p>
        </div>

        <div className="space-y-6">
          {categoryInfo.articles.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">
                      <Link 
                        href={`/support/${category}/${article.id}`}
                        className="hover:text-primary transition-colors"
                      >
                        {article.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-base">
                      {article.excerpt}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {article.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      Updated {new Date(article.lastUpdated).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="secondary" 
                      className={getDifficultyColor(article.difficulty)}
                    >
                      {article.difficulty}
                    </Badge>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/support/${category}/${article.id}`}>
                        <BookOpen className="mr-1 h-4 w-4" />
                        Read Article
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Related Categories */}
        <div className="mt-12 pt-8 border-t">
          <h2 className="text-xl font-semibold mb-4">Related Categories</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(categoryData)
              .filter(([key]) => key !== category)
              .slice(0, 4)
              .map(([key, data]) => (
                <Link
                  key={key}
                  href={`/support/${key}`}
                  className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <BookOpen className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">{data.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {data.articles.length} articles
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold mb-4">Need More Help?</h2>
          <p className="text-muted-foreground mb-6">
            Can&apos;t find what you&apos;re looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => {
                if (typeof window !== 'undefined' && 'Tawk_API' in window) {
                  (window as { Tawk_API: { maximize: () => void } }).Tawk_API.maximize();
                }
              }}
            >
              Start Live Chat
            </Button>
            <Button variant="outline" asChild>
              <Link href="tel:(757)375-6764">
                Call (757) 375-6764
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}