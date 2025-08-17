import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Search, BookOpen, MessageCircle, Phone } from "lucide-react";
import SearchBar from "@/components/support/search-bar";
import { Suspense } from "react";

// Mock search results - in a real app, this would come from a database or search service
const searchResults = [
  {
    id: 'computer-wont-start',
    title: 'Computer Won\'t Start - Basic Steps',
    category: 'troubleshooting',
    categoryName: 'Troubleshooting',
    excerpt: 'Basic troubleshooting steps to try when your computer won\'t turn on.',
    readTime: '6 min read',
    difficulty: 'Intermediate'
  },
  {
    id: 'slow-performance',
    title: 'Slow Computer Performance',
    category: 'troubleshooting',
    categoryName: 'Troubleshooting',
    excerpt: 'Common causes and solutions for slow computer performance issues.',
    readTime: '8 min read',
    difficulty: 'Intermediate'
  },
  {
    id: 'how-to-book-service',
    title: 'How to Book a Service Appointment',
    category: 'getting-started',
    categoryName: 'Getting Started',
    excerpt: 'Step-by-step guide to scheduling your service appointment through our online booking system.',
    readTime: '3 min read',
    difficulty: 'Beginner'
  },
  {
    id: 'residential-protection',
    title: 'Residential Protection Plan Benefits',
    category: 'protection-plans',
    categoryName: 'Protection Plans',
    excerpt: 'Complete overview of our residential protection plan features and benefits.',
    readTime: '5 min read',
    difficulty: 'Beginner'
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner': return 'bg-green-100 text-green-800';
    case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
    case 'Advanced': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

function SearchResults({ query }: { query: string }) {
  // Filter results based on query
  const filteredResults = searchResults.filter(result =>
    result.title.toLowerCase().includes(query.toLowerCase()) ||
    result.excerpt.toLowerCase().includes(query.toLowerCase()) ||
    result.categoryName.toLowerCase().includes(query.toLowerCase())
  );

  if (filteredResults.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No Results Found</h3>
        <p className="text-muted-foreground mb-6">
          We couldn&apos;t find any articles matching &quot;{query}&quot;. Try different keywords or browse our categories.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/support">
              Browse Categories
            </Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              if (typeof window !== 'undefined' && 'Tawk_API' in window) {
                (window as { Tawk_API: { maximize: () => void } }).Tawk_API.maximize();
              }
            }}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Ask Support Team
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} for &quot;{query}&quot;
        </h2>
        <div className="text-sm text-muted-foreground">
          Showing {filteredResults.length} of {searchResults.length} articles
        </div>
      </div>

      <div className="space-y-4">
        {filteredResults.map((result) => (
          <Card key={result.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{result.categoryName}</Badge>
                    <Badge 
                      variant="secondary" 
                      className={getDifficultyColor(result.difficulty)}
                    >
                      {result.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mb-2">
                    <Link 
                      href={`/support/${result.category}/${result.id}`}
                      className="hover:text-primary transition-colors"
                    >
                      {result.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-base">
                    {result.excerpt}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {result.readTime}
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/support/${result.category}/${result.id}`}>
                    <BookOpen className="mr-1 h-4 w-4" />
                    Read Article
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query = '' } = await searchParams;

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
          <Badge variant="secondary" className="mb-4">Search Results</Badge>
          <h1 className="text-3xl font-bold mb-4">Search Knowledge Base</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Find answers to your questions in our comprehensive knowledge base
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar />
          </div>
        </div>

        {/* Search Results */}
        <Suspense fallback={
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-6 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                </CardHeader>
              </Card>
            ))}
          </div>
        }>
          <SearchResults query={query} />
        </Suspense>

        {/* Help Section */}
        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold mb-4">Still Need Help?</h2>
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
              <MessageCircle className="mr-2 h-4 w-4" />
              Start Live Chat
            </Button>
            <Button variant="outline" asChild>
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