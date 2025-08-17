import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Customer Title/Company',
      type: 'string',
      description: 'Job title or company name',
    }),
    defineField({
      name: 'content',
      title: 'Testimonial Content',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5).integer(),
      initialValue: 5,
    }),
    defineField({
      name: 'image',
      title: 'Customer Photo',
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
      name: 'service',
      title: 'Related Service',
      type: 'reference',
      to: { type: 'service' },
      description: 'Which service this testimonial is about',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Testimonial',
      type: 'boolean',
      initialValue: false,
      description: 'Show this testimonial prominently on the homepage',
    }),
    defineField({
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      initialValue: false,
      description: 'Testimonial has been approved for display',
    }),
    defineField({
      name: 'dateReceived',
      title: 'Date Received',
      type: 'date',
      initialValue: () => new Date().toISOString().split('T')[0],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'content',
      media: 'image',
    },
    prepare(selection) {
      const { subtitle } = selection
      return {
        ...selection,
        subtitle: subtitle ? `"${subtitle.slice(0, 50)}..."` : 'No content',
      }
    },
  },
})