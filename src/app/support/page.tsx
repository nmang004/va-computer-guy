"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, BookOpen, Wrench, Shield, UserCircle, MessageCircle, Phone, Mail } from "lucide-react";
import SearchBar from "@/components/support/search-bar";

export default function SupportPage() {
  const categories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Learn how to use VA Computer Guy services',
      icon: BookOpen,
      articles: [
        'How to Book a Service Appointment',
        'Understanding Our Repair Process',
        'What to Expect During Your Service',
        'Service Areas and Availability'
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      description: 'Common computer issues and solutions',
      icon: Wrench,
      articles: [
        'Computer Won\'t Start - Basic Steps',
        'Slow Computer Performance',
        'Internet Connection Problems',
        'Virus and Malware Symptoms',
        'Blue Screen Error Solutions'
      ]
    },
    {
      id: 'service-info',
      title: 'Service Information',
      description: 'Repair process, pricing, and timelines',
      icon: Shield,
      articles: [
        'Repair Pricing and Estimates',
        'Typical Repair Timelines',
        'Warranty Information',
        'Data Privacy and Security',
        'Pickup and Delivery Service'
      ]
    },
    {
      id: 'protection-plans',
      title: 'Protection Plans',
      description: 'Plan benefits, billing, and management',
      icon: Shield,
      articles: [
        'Residential Protection Plan Benefits',
        'Business Protection Plan Features',
        'Billing and Payment Information',
        'How to Update Your Plan',
        'Protection Plan Cancellation'
      ]
    },
    {
      id: 'account-help',
      title: 'Account Help',
      description: 'Login, password reset, profile updates',
      icon: UserCircle,
      articles: [
        'Creating Your Account',
        'Resetting Your Password',
        'Updating Contact Information',
        'Viewing Your Service History',
        'Managing Notifications'
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Support Center</Badge>
          <h1 className="text-4xl font-bold mb-4">How Can We Help You?</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Find answers to common questions or get in touch with our support team
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar />
          </div>
        </div>

        {/* Quick Contact Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get instant help from our support team
              </p>
              <Button 
                onClick={() => {
                  // This will trigger the Tawk.to chat widget
                  if (typeof window !== 'undefined' && 'Tawk_API' in window) {
                    (window as { Tawk_API: { maximize: () => void } }).Tawk_API.maximize();
                  }
                }}
                className="w-full"
              >
                Start Chat
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Speak directly with our technicians
              </p>
              <Button variant="outline" asChild className="w-full">
                <Link href="tel:(757)375-6764">
                  (757) 375-6764
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Email Support</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Send us a detailed message
              </p>
              <Button variant="outline" asChild className="w-full">
                <Link href="mailto:info@vacomputerguy.com">
                  Send Email
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Knowledge Base Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Browse by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card key={category.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-8 w-8 text-primary" />
                      <div>
                        <CardTitle className="text-lg">{category.title}</CardTitle>
                        <CardDescription className="text-sm">
                          {category.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      {category.articles.slice(0, 3).map((article, index) => (
                        <Link
                          key={index}
                          href={`/support/${category.id}/${article.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                          className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          • {article}
                        </Link>
                      ))}
                      {category.articles.length > 3 && (
                        <p className="text-sm text-muted-foreground">
                          +{category.articles.length - 3} more articles
                        </p>
                      )}
                    </div>
                    <Button variant="outline" asChild className="w-full">
                      <Link href={`/support/${category.id}`}>
                        View All Articles
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Popular Articles */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Popular Articles</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Computer Won\'t Start - Basic Steps',
              'How to Check Your Repair Status',
              'Understanding Our Repair Process',
              'Residential Protection Plan Benefits',
              'Slow Computer Performance Solutions',
              'How to Book a Service Appointment'
            ].map((article, index) => (
              <Link
                key={index}
                href={`/support/article/${article.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <BookOpen className="h-5 w-5 text-primary" />
                <span className="font-medium">{article}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Still Need Help? */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Still Need Help?</h2>
          <p className="text-muted-foreground mb-6">
            Can&apos;t find what you&apos;re looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => {
                if (typeof window !== 'undefined' && 'Tawk_API' in window) {
                  (window as { Tawk_API: { maximize: () => void } }).Tawk_API.maximize();
                }
              }}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Start Live Chat
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="tel:(757)375-6764">
                <Phone className="mr-2 h-4 w-4" />
                Call (757) 375-6764
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}