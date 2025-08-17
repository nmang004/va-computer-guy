import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, User, ArrowRight } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { postQuery } from "@/sanity/lib/queries";
import { PortableTextRenderer } from "@/components/sanity/portable-text";


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
  body: unknown;
  category?: {
    title: string;
    slug: { current: string };
    color?: string;
  };
  author?: {
    name: string;
    slug: { current: string };
    bio?: string;
    image?: {
      asset: { url: string };
    };
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: {
      asset: { url: string };
    };
  };
}

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string): Promise<Post | null> {
  return client.fetch(postQuery, { slug });
}

async function getRelatedPosts(currentPostId: string): Promise<Post[]> {
  const query = `
    *[_type == "post" && _id != $currentPostId && defined(slug.current)] | order(publishedAt desc) [0...3] {
      _id,
      title,
      slug,
      excerpt,
      mainImage {
        asset->{
          _id,
          url
        },
        alt
      },
      publishedAt,
      category->{
        title,
        color
      }
    }
  `;
  
  return client.fetch(query, { currentPostId });
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

export async function generateStaticParams() {
  const posts = await client.fetch<{ slug: { current: string } }[]>(
    `*[_type == "post" && defined(slug.current)].slug`
  );

  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    return {
      title: 'Post Not Found | VA Computer Guy',
    };
  }

  return {
    title: post.seo?.metaTitle || `${post.title} | VA Computer Guy Blog`,
    description: post.seo?.metaDescription || post.excerpt || 'Read our latest technology tips and insights.',
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      images: post.seo?.ogImage?.asset?.url || post.mainImage?.asset?.url ? [
        {
          url: post.seo?.ogImage?.asset?.url || post.mainImage?.asset?.url || '',
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post._id);

  return (
    <div className="va-container py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="text-va-text-secondary hover:text-va-primary">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>

      <article className="max-w-4xl mx-auto">
        {/* Article Header */}
        <header className="mb-8">
          {post.category && (
            <Badge 
              variant="secondary" 
              className={`mb-4 ${getCategoryBadgeColor(post.category.color)}`}
            >
              {post.category.title}
            </Badge>
          )}
          
          <h1 className="text-4xl font-montserrat font-bold mb-4 text-va-text-primary">
            {post.title}
          </h1>
          
          {post.excerpt && (
            <p className="text-xl text-va-text-secondary font-roboto mb-6">
              {post.excerpt}
            </p>
          )}
          
          <div className="flex items-center gap-6 text-sm text-va-text-muted">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {formatDate(post.publishedAt)}
            </div>
            
            {post.author && (
              <div className="flex items-center gap-3">
                {post.author.image && (
                  <Image
                    src={post.author.image?.asset?.url || ''}
                    alt={post.author.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{post.author.name}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        {/* Featured Image */}
        {post.mainImage && (
          <div className="mb-8">
            <Image
              src={post.mainImage?.asset?.url || ''}
              alt={post.mainImage.alt || post.title}
              width={800}
              height={400}
              className="w-full rounded-lg object-cover"
            />
            {post.mainImage.alt && (
              <p className="text-sm text-va-text-muted text-center mt-2">
                {post.mainImage.alt}
              </p>
            )}
          </div>
        )}

        {/* Article Content */}
        <div className="prose max-w-none">
          <PortableTextRenderer value={post.body as import('@portabletext/types').TypedObject[]} />
        </div>

        {/* Author Bio */}
        {post.author && post.author.bio && (
          <div className="mt-12 p-6 bg-va-neutral-100 rounded-lg">
            <div className="flex items-start gap-4">
              {post.author.image && (
                <Image
                  src={post.author.image?.asset?.url || ''}
                  alt={post.author.name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              )}
              <div>
                <h3 className="font-montserrat font-semibold text-va-text-primary mb-2">
                  About {post.author.name}
                </h3>
                <p className="text-va-text-secondary font-roboto">
                  {post.author.bio}
                </p>
              </div>
            </div>
          </div>
        )}
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-montserrat font-bold mb-8 text-va-text-primary text-center">
            Related Articles
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {relatedPosts.map((relatedPost) => (
              <div key={relatedPost._id} className="va-card p-4 hover:shadow-lg transition-shadow">
                {relatedPost.mainImage && (
                  <div className="relative h-32 w-full overflow-hidden rounded mb-4">
                    <Image
                      src={relatedPost.mainImage?.asset?.url || ''}
                      alt={relatedPost.mainImage.alt || relatedPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                
                {relatedPost.category && (
                  <Badge 
                    variant="secondary" 
                    className={`mb-2 ${getCategoryBadgeColor(relatedPost.category.color)}`}
                  >
                    {relatedPost.category.title}
                  </Badge>
                )}
                
                <h3 className="font-montserrat font-semibold text-va-text-primary mb-2 hover:text-va-primary transition-colors">
                  <Link href={`/blog/${relatedPost.slug.current}`}>
                    {relatedPost.title}
                  </Link>
                </h3>
                
                {relatedPost.excerpt && (
                  <p className="text-sm text-va-text-secondary font-roboto mb-3">
                    {relatedPost.excerpt}
                  </p>
                )}
                
                <div className="text-xs text-va-text-muted">
                  {formatDate(relatedPost.publishedAt)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Call to Action */}
      <div className="text-center mt-16 p-8 bg-gradient-to-r from-va-primary to-va-secondary rounded-lg text-white">
        <h2 className="text-2xl font-montserrat font-bold mb-4">
          Need Help with Your Computer?
        </h2>
        <p className="font-roboto mb-6">
          Our expert technicians are ready to help you with any computer or technology issues.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="secondary">
            <Link href="/booking">
              Schedule Repair
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-va-primary">
            <Link href="/services/home-services">View Our Services</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}