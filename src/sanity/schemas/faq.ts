import { defineField, defineType } from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: { type: 'faqCategory' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured FAQ',
      type: 'boolean',
      initialValue: false,
      description: 'Show this FAQ prominently on the homepage',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order for displaying FAQs within their category',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Tags for search and filtering',
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category.title',
    },
  },
})