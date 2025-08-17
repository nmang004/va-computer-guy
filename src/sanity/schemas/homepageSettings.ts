import { defineField, defineType } from 'sanity'

export const homepageSettings = defineType({
  name: 'homepageSettings',
  title: 'Homepage Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Badge Text',
          type: 'string',
        },
        {
          name: 'headline',
          title: 'Main Headline',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'subheadline',
          title: 'Sub Headline',
          type: 'text',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'ctaPrimary',
          title: 'Primary CTA',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Button Text',
              type: 'string',
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string',
            },
          ],
        },
        {
          name: 'ctaSecondary',
          title: 'Secondary CTA',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Button Text',
              type: 'string',
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string',
            },
          ],
        },
        {
          name: 'features',
          title: 'Key Features',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Short feature highlights (e.g., "Same-Day Service")',
        },
      ],
    }),
    defineField({
      name: 'aboutSection',
      title: 'About Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
        },
        {
          name: 'stats',
          title: 'Statistics',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'number',
                  title: 'Number',
                  type: 'string',
                },
                {
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'announcement',
      title: 'Site Announcement',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Show Announcement',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'message',
          title: 'Announcement Message',
          type: 'string',
        },
        {
          name: 'link',
          title: 'Link (optional)',
          type: 'string',
        },
        {
          name: 'type',
          title: 'Announcement Type',
          type: 'string',
          options: {
            list: [
              { title: 'Info', value: 'info' },
              { title: 'Warning', value: 'warning' },
              { title: 'Success', value: 'success' },
              { title: 'Promotion', value: 'promotion' },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Address',
          type: 'text',
        },
        {
          name: 'hours',
          title: 'Business Hours',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'day',
                  title: 'Day',
                  type: 'string',
                },
                {
                  name: 'hours',
                  title: 'Hours',
                  type: 'string',
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Homepage Settings',
      }
    },
  },
})