import { defineField, defineType } from 'sanity'

export const serviceCategory = defineType({
  name: 'serviceCategory',
  title: 'Service Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Title',
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
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon name for this category',
    }),
    defineField({
      name: 'color',
      title: 'Category Color',
      type: 'string',
      options: {
        list: [
          { title: 'Primary Blue', value: 'primary' },
          { title: 'Secondary Blue', value: 'secondary' },
          { title: 'Accent Green', value: 'accent' },
          { title: 'Gray', value: 'gray' },
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order for displaying categories (lower numbers first)',
    }),
  ],
})