'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Fuse from 'fuse.js';

// Knowledge base articles data
const articles = [
  // Getting Started
  { id: 'how-to-book-service', title: 'How to Book a Service Appointment', category: 'getting-started', excerpt: 'Learn how to schedule a service appointment with VA Computer Guy through our booking system.' },
  { id: 'understanding-repair-process', title: 'Understanding Our Repair Process', category: 'getting-started', excerpt: 'Step-by-step guide to our computer repair process from drop-off to pickup.' },
  { id: 'what-to-expect', title: 'What to Expect During Your Service', category: 'getting-started', excerpt: 'Overview of our service process and what you can expect when working with us.' },
  { id: 'service-areas', title: 'Service Areas and Availability', category: 'getting-started', excerpt: 'Areas we serve in Hampton Roads and our availability for different services.' },

  // Troubleshooting
  { id: 'computer-wont-start', title: 'Computer Won\'t Start - Basic Steps', category: 'troubleshooting', excerpt: 'Basic troubleshooting steps to try when your computer won\'t turn on.' },
  { id: 'slow-performance', title: 'Slow Computer Performance', category: 'troubleshooting', excerpt: 'Common causes and solutions for slow computer performance issues.' },
  { id: 'internet-problems', title: 'Internet Connection Problems', category: 'troubleshooting', excerpt: 'How to diagnose and fix common internet connectivity issues.' },
  { id: 'virus-malware-symptoms', title: 'Virus and Malware Symptoms', category: 'troubleshooting', excerpt: 'How to identify if your computer is infected with viruses or malware.' },
  { id: 'blue-screen-errors', title: 'Blue Screen Error Solutions', category: 'troubleshooting', excerpt: 'Understanding and resolving Windows blue screen of death errors.' },

  // Service Information
  { id: 'repair-pricing', title: 'Repair Pricing and Estimates', category: 'service-info', excerpt: 'Information about our repair pricing structure and how estimates work.' },
  { id: 'repair-timelines', title: 'Typical Repair Timelines', category: 'service-info', excerpt: 'Expected timeframes for different types of computer repairs.' },
  { id: 'warranty-info', title: 'Warranty Information', category: 'service-info', excerpt: 'Details about our repair warranties and what they cover.' },
  { id: 'data-privacy', title: 'Data Privacy and Security', category: 'service-info', excerpt: 'How we protect your personal data during the repair process.' },
  { id: 'pickup-delivery', title: 'Pickup and Delivery Service', category: 'service-info', excerpt: 'Information about our pickup and delivery service options.' },

  // Protection Plans
  { id: 'residential-protection', title: 'Residential Protection Plan Benefits', category: 'protection-plans', excerpt: 'Complete overview of our residential protection plan features and benefits.' },
  { id: 'business-protection', title: 'Business Protection Plan Features', category: 'protection-plans', excerpt: 'Comprehensive business protection plan features for enterprise clients.' },
  { id: 'billing-payment', title: 'Billing and Payment Information', category: 'protection-plans', excerpt: 'How billing works for protection plans and available payment methods.' },
  { id: 'update-plan', title: 'How to Update Your Plan', category: 'protection-plans', excerpt: 'Steps to modify or upgrade your current protection plan.' },
  { id: 'plan-cancellation', title: 'Protection Plan Cancellation', category: 'protection-plans', excerpt: 'How to cancel your protection plan and what to expect.' },

  // Account Help
  { id: 'creating-account', title: 'Creating Your Account', category: 'account-help', excerpt: 'Step-by-step guide to creating your VA Computer Guy account.' },
  { id: 'password-reset', title: 'Resetting Your Password', category: 'account-help', excerpt: 'How to reset your password if you\'ve forgotten it.' },
  { id: 'update-contact-info', title: 'Updating Contact Information', category: 'account-help', excerpt: 'How to update your contact information in your account.' },
  { id: 'service-history', title: 'Viewing Your Service History', category: 'account-help', excerpt: 'How to view your past services and repair history.' },
  { id: 'manage-notifications', title: 'Managing Notifications', category: 'account-help', excerpt: 'How to control email and SMS notifications from your account.' }
];

const categories = {
  'getting-started': 'Getting Started',
  'troubleshooting': 'Troubleshooting',
  'service-info': 'Service Information',
  'protection-plans': 'Protection Plans',
  'account-help': 'Account Help'
};

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [fuse, setFuse] = useState<Fuse<any> | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Initialize Fuse.js
  useEffect(() => {
    const fuseOptions = {
      keys: ['title', 'excerpt', 'category'],
      threshold: 0.3,
      includeScore: true,
      includeMatches: true
    };
    setFuse(new Fuse(articles, fuseOptions));
  }, []);

  // Handle search
  useEffect(() => {
    if (!fuse || !query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const searchResults = fuse.search(query).slice(0, 6);
    setResults(searchResults);
    setIsOpen(searchResults.length > 0);
  }, [query, fuse]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search articles, guides, and FAQs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10 h-12 text-base"
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Search Results */}
      {isOpen && results.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-96 overflow-y-auto">
          <CardContent className="p-0">
            {results.map((result, index) => {
              const article = result.item;
              return (
                <Link
                  key={article.id}
                  href={`/support/${article.category}/${article.id}`}
                  onClick={() => {
                    setIsOpen(false);
                    setQuery('');
                  }}
                  className={`block p-4 hover:bg-muted/50 transition-colors ${
                    index !== results.length - 1 ? 'border-b' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Search className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm mb-1 line-clamp-1">
                        {article.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-1 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <span className="text-xs text-primary">
                        {categories[article.category as keyof typeof categories]}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
            
            {/* Show all results link */}
            <div className="p-4 border-t bg-muted/20">
              <Link
                href={`/support/search?q=${encodeURIComponent(query)}`}
                onClick={() => {
                  setIsOpen(false);
                  setQuery('');
                }}
                className="text-sm text-primary hover:underline"
              >
                View all {results.length} results for "{query}"
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* No results */}
      {isOpen && query.trim() && results.length === 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              No articles found for "{query}"
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // This will trigger the Tawk.to chat widget
                if (typeof window !== 'undefined' && (window as any).Tawk_API) {
                  (window as any).Tawk_API.maximize();
                  // Pre-fill the chat with the search query
                  setTimeout(() => {
                    if ((window as any).Tawk_API && (window as any).Tawk_API.setAttributes) {
                      (window as any).Tawk_API.setAttributes({
                        'Search Query': query
                      });
                    }
                  }, 1000);
                }
                setIsOpen(false);
              }}
            >
              Ask Support Team
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}