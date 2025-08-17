import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  name: 'va-computer-guy',
  title: 'VA Computer Guy CMS',
  projectId,
  dataset,
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Blog Posts')
              .child(S.documentTypeList('post').title('Blog Posts')),
            S.listItem()
              .title('Categories')
              .child(S.documentTypeList('category').title('Categories')),
            S.listItem()
              .title('Authors')
              .child(S.documentTypeList('author').title('Authors')),
            S.divider(),
            S.listItem()
              .title('Services')
              .child(S.documentTypeList('service').title('Services')),
            S.listItem()
              .title('Service Categories')
              .child(S.documentTypeList('serviceCategory').title('Service Categories')),
            S.divider(),
            S.listItem()
              .title('FAQ')
              .child(S.documentTypeList('faq').title('FAQ')),
            S.listItem()
              .title('FAQ Categories')
              .child(S.documentTypeList('faqCategory').title('FAQ Categories')),
            S.divider(),
            S.listItem()
              .title('Testimonials')
              .child(S.documentTypeList('testimonial').title('Testimonials')),
            S.listItem()
              .title('Homepage Settings')
              .child(S.document().schemaType('homepageSettings').documentId('homepage')),
          ])
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})