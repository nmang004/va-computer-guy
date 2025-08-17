import { post } from './post'
import { category } from './category'
import { author } from './author'
import { service } from './service'
import { serviceCategory } from './serviceCategory'
import { faq } from './faq'
import { faqCategory } from './faqCategory'
import { testimonial } from './testimonial'
import { homepageSettings } from './homepageSettings'
import { blockContent } from './blockContent'

export const schemaTypes = [
  // Content types
  blockContent,
  
  // Blog related
  post,
  category,
  author,
  
  // Services
  service,
  serviceCategory,
  
  // Support & FAQ
  faq,
  faqCategory,
  
  // Marketing
  testimonial,
  homepageSettings,
]