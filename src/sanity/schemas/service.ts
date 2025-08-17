import { defineField, defineType } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Service Category',
      type: 'reference',
      to: { type: 'serviceCategory' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of key features or what is included',
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing',
      type: 'object',
      fields: [
        {
          name: 'startingPrice',
          title: 'Starting Price',
          type: 'number',
          description: 'Base price in dollars',
        },
        {
          name: 'priceNote',
          title: 'Price Note',
          type: 'string',
          description: 'Additional pricing information',
        },
        {
          name: 'hourlyRate',
          title: 'Hourly Rate',
          type: 'number',
          description: 'Hourly rate if applicable',
        },
      ],
    }),
    defineField({
      name: 'estimatedTime',
      title: 'Estimated Time',
      type: 'string',
      description: 'How long this service typically takes',
    }),
    defineField({
      name: 'serviceAreas',
      title: 'Service Areas',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Geographic areas where this service is available',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon name for this service',
    }),
    defineField({
      name: 'image',
      title: 'Service Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Service',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order for displaying services (lower numbers first)',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          validation: (Rule) => Rule.max(160),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category.title',
      media: 'image',
    },
  },
})