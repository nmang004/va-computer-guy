import { groq } from 'next-sanity'

// Blog queries
export const postsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
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
    featured,
    tags,
    category->{
      title,
      slug,
      color
    },
    author->{
      name,
      slug,
      image {
        asset->{
          _id,
          url
        }
      }
    }
  }
`

export const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
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
    featured,
    tags,
    body,
    category->{
      title,
      slug,
      color
    },
    author->{
      name,
      slug,
      bio,
      image {
        asset->{
          _id,
          url
        }
      }
    },
    seo
  }
`

export const featuredPostsQuery = groq`
  *[_type == "post" && featured == true && defined(slug.current)] | order(publishedAt desc) [0...3] {
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
`

// Service queries
export const servicesQuery = groq`
  *[_type == "service" && defined(slug.current)] | order(order asc) {
    _id,
    title,
    slug,
    description,
    features,
    pricing,
    estimatedTime,
    serviceAreas,
    icon,
    image {
      asset->{
        _id,
        url
      },
      alt
    },
    featured,
    category->{
      title,
      slug,
      icon,
      color
    }
  }
`

export const serviceQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    features,
    pricing,
    estimatedTime,
    serviceAreas,
    icon,
    image {
      asset->{
        _id,
        url
      },
      alt
    },
    category->{
      title,
      slug,
      description,
      icon,
      color
    },
    seo
  }
`

export const servicesByCategoryQuery = groq`
  *[_type == "service" && category->slug.current == $category && defined(slug.current)] | order(order asc) {
    _id,
    title,
    slug,
    description,
    features,
    pricing,
    estimatedTime,
    icon,
    image {
      asset->{
        _id,
        url
      },
      alt
    }
  }
`

// FAQ queries
export const faqsQuery = groq`
  *[_type == "faq"] | order(category->order asc, order asc) {
    _id,
    question,
    answer,
    featured,
    tags,
    category->{
      title,
      slug,
      icon
    }
  }
`

export const faqsByCategoryQuery = groq`
  *[_type == "faq" && category->slug.current == $category] | order(order asc) {
    _id,
    question,
    answer,
    tags
  }
`

export const featuredFaqsQuery = groq`
  *[_type == "faq" && featured == true] | order(order asc) [0...6] {
    _id,
    question,
    answer,
    category->{
      title,
      icon
    }
  }
`

// Testimonial queries
export const testimonialsQuery = groq`
  *[_type == "testimonial" && approved == true] | order(dateReceived desc) {
    _id,
    name,
    title,
    content,
    rating,
    image {
      asset->{
        _id,
        url
      },
      alt
    },
    featured,
    service->{
      title,
      slug
    }
  }
`

export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && featured == true && approved == true] | order(dateReceived desc) [0...6] {
    _id,
    name,
    title,
    content,
    rating,
    image {
      asset->{
        _id,
        url
      },
      alt
    }
  }
`

// Homepage settings query
export const homepageSettingsQuery = groq`
  *[_type == "homepageSettings" && _id == "homepage"][0] {
    hero,
    aboutSection,
    announcement,
    contact
  }
`

// Categories queries
export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color
  }
`

export const serviceCategoriesQuery = groq`
  *[_type == "serviceCategory"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    icon,
    color,
    order
  }
`

export const faqCategoriesQuery = groq`
  *[_type == "faqCategory"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    icon,
    order
  }
`