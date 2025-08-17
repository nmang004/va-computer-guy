import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen, ArrowRight, Calendar, User } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { postsQuery, categoriesQuery } from "@/sanity/lib/queries";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  mainImage?: {
    asset: { url: string };
    alt?: string;
  };
  publishedAt: string;
  featured: boolean;
  tags?: string[];
  category?: {
    title: string;
    slug: { current: string };
    color?: string;
  };
  author?: {
    name: string;
    slug: { current: string };
    image?: {
      asset: { url: string };
    };
  };
}

interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  color?: string;
}

async function getData() {
  const [posts, categories] = await Promise.all([
    client.fetch<Post[]>(postsQuery),
    client.fetch<Category[]>(categoriesQuery),
  ]);

  return { posts, categories };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function getCategoryBadgeColor(color?: string) {
  switch (color) {
    case 'blue': return 'bg-blue-100 text-blue-800';
    case 'green': return 'bg-green-100 text-green-800';
    case 'purple': return 'bg-purple-100 text-purple-800';
    case 'red': return 'bg-red-100 text-red-800';
    case 'orange': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export default async function BlogPage() {
  const { posts, categories } = await getData();

  return (
    <div className="va-container py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="text-va-text-secondary hover:text-va-primary">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-va-secondary text-va-neutral-50 font-montserrat">
            Tech Tips Blog
          </Badge>
          <h1 className="text-4xl font-montserrat font-bold mb-4 text-va-text-primary">
            Technology Tips & Insights
          </h1>
          <p className="text-lg text-va-text-secondary font-roboto">
            Expert advice, tutorials, and insights to help you get the most out of your technology
          </p>
        </div>

        {posts.length === 0 ? (
          // Fallback content when no posts exist
          <div className="text-center py-16">
            <BookOpen className="h-16 w-16 mx-auto text-va-text-muted mb-6" />
            <h2 className="text-2xl font-semibold mb-4 text-va-text-primary font-montserrat">
              Blog Coming Soon!
            </h2>
            <p className="text-va-text-secondary mb-8 max-w-2xl mx-auto font-roboto">
              We&apos;re working on creating valuable content to help you with common tech issues, 
              security tips, and the latest technology trends. Check back soon for helpful articles and tutorials.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="va-card">
                <CardHeader>
                  <CardTitle className="text-lg font-montserrat text-va-text-primary">Security Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-va-text-secondary font-roboto">
                    Learn how to protect your devices from viruses, malware, and cyber threats
                  </p>
                </CardContent>
              </Card>

              <Card className="va-card">
                <CardHeader>
                  <CardTitle className="text-lg font-montserrat text-va-text-primary">Performance Guides</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-va-text-secondary font-roboto">
                    Discover ways to speed up your computer and optimize system performance
                  </p>
                </CardContent>
              </Card>

              <Card className="va-card">
                <CardHeader>
                  <CardTitle className="text-lg font-montserrat text-va-text-primary">Tech Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-va-text-secondary font-roboto">
                    Get expert reviews and recommendations on the latest technology products
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="va-btn-primary">
                <Link href="/services/home-services">
                  Browse Our Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="va-btn-secondary">
                <Link href="/about">Learn About Our Team</Link>
              </Button>
            </div>
          </div>
        ) : (
          // Display posts when they exist
          <div className="space-y-8">
            {/* Categories filter */}
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="outline" className="cursor-pointer hover:bg-va-primary hover:text-white">
                  All Posts
                </Badge>
                {categories.map((category) => (
                  <Badge
                    key={category._id}
                    variant="outline"
                    className={`cursor-pointer hover:bg-va-primary hover:text-white ${getCategoryBadgeColor(category.color)}`}
                  >
                    {category.title}
                  </Badge>
                ))}
              </div>
            )}

            {/* Posts grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Card key={post._id} className="va-card hover:shadow-lg transition-shadow">
                  {post.mainImage && (
                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                      <Image
                        src={post.mainImage?.asset?.url || ''}
                        alt={post.mainImage.alt || post.title}
                        fill
                        className="object-cover"
                      />
                      {post.featured && (
                        <Badge className="absolute top-2 left-2 bg-va-accent text-white">
                          Featured
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  <CardHeader>
                    {post.category && (
                      <Badge 
                        variant="secondary" 
                        className={`w-fit mb-2 ${getCategoryBadgeColor(post.category.color)}`}
                      >
                        {post.category.title}
                      </Badge>
                    )}
                    <CardTitle className="font-montserrat text-va-text-primary hover:text-va-primary transition-colors">
                      <Link href={`/blog/${post.slug.current}`}>
                        {post.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    {post.excerpt && (
                      <p className="text-va-text-secondary font-roboto mb-4">
                        {post.excerpt}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-va-text-muted">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {formatDate(post.publishedAt)}
                      </div>
                      
                      {post.author && (
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {post.author.name}
                        </div>
                      )}
                    </div>
                    
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                      <Link href={`/blog/${post.slug.current}`}>
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}