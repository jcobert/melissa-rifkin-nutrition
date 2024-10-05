import { FaNewspaper } from 'react-icons/fa6'
import { defineField, defineType } from 'sanity'
import {
  CustomTextField,
  CustomTextInput,
} from 'sanity-studio/components/text-input'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  icon: FaNewspaper,
  fieldsets: [
    {
      name: 'externalPost',
      title: 'External Post',
      description:
        'If the blog post was published on another site like iHerb.com, select this.',
    },
    {
      name: 'seo',
      title: 'Seach Engine Optimization (SEO)',
      description:
        'These fields impact your presence on Google search results.',
    },
    {
      name: 'info',
      title: 'Misc.',
      description: 'Additional info and metadata about the post.',
    },
  ],
  groups: [{ name: 'seo', title: 'SEO (Google Optimization)' }],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
      components: {
        field: CustomTextField,
      },
    }),
    defineField({
      name: 'seoDescription',
      title: 'Post Description',
      description:
        'Provide a short summary of this blog post (one or two sentences). This is important for Google search results.',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'seo',
      // fieldset: 'seo',
      components: {
        input: CustomTextInput,
        field: CustomTextField,
      },
    }),
    defineField({
      name: 'slug',
      title: 'URL-friendly Name (required)',
      type: 'slug',
      // validation: (rule) => rule.required(),
      hidden: true,
      options: {
        source: 'title',
        maxLength: 96,
      },
      description:
        'Just click "Generate" after entering something in the Title field above, to automatically fill this in.',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'bio' },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Image Description (alt text)',
          description:
            'Used for people who cannot see the image. E.g. "A woman gardening"',
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'external',
      title: 'External?',
      type: 'boolean',
      fieldset: 'externalPost',
      initialValue: false,
    }),
    defineField({
      name: 'externalUrl',
      title: 'URL',
      type: 'string',
      description: 'Copy and paste the link to the post here.',
      fieldset: 'externalPost',
      hidden: (props) => !props.parent.external,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      description:
        'If linking to an external post, add a preview here (e.g. the first paragraph of the post). A link will be provided to the reader to continue reading at the URL you provided above.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      description:
        'When the post was written. Defaults to today. You should rarely need to change this.',
      type: 'datetime',
      fieldset: 'info',
      initialValue: new Date().toISOString(),
      readOnly: (props) => !props.parent.overridePublishedAt,
    }),
    defineField({
      name: 'overridePublishedAt',
      title: 'Change Date',
      type: 'boolean',
      fieldset: 'info',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})
