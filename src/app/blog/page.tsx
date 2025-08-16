import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, BookOpen, ArrowRight } from "lucide-react";

export default function BlogPage() {
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

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Tech Tips Blog</Badge>
          <h1 className="text-4xl font-bold mb-4">Technology Tips & Insights</h1>
          <p className="text-lg text-muted-foreground">
            Expert advice, tutorials, and insights to help you get the most out of your technology
          </p>
        </div>

        <div className="text-center py-16">
          <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
          <h2 className="text-2xl font-semibold mb-4">Blog Coming Soon!</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            We&apos;re working on creating valuable content to help you with common tech issues, 
            security tips, and the latest technology trends. Check back soon for helpful articles and tutorials.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Security Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Learn how to protect your devices from viruses, malware, and cyber threats
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Discover ways to speed up your computer and optimize system performance
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tech Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Get expert reviews and recommendations on the latest technology products
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/services/home-services">
                Browse Our Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/about">Learn About Our Team</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}