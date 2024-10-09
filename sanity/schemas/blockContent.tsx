import { defineArrayMember, defineField, defineType } from 'sanity'
import { Divider, DividerIcon } from 'sanity-studio/components/divider'
import FieldDescription from 'sanity-studio/components/field-description'
import { BlockLink } from 'sanity-studio/types'

/**
 * This is the schema type for block content used in the post document type
 * Importing this type into the studio configuration's `schema` property
 * lets you reuse it in other document types with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      // Styles let you define what blocks can be marked up as. The default
      // set corresponds with HTML tags, but you can set any title or value
      // you want, and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bulletted List', value: 'bullet' },
        { title: 'Numbered List', value: 'number' },
      ],
      // Marks let you mark up inline text in the Portable Text Editor
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Underline', value: 'underline' },
          { title: 'Strike', value: 'strike-through' },
          {
            title: 'Divider',
            value: 'divider',
            component: Divider,
            icon: DividerIcon,
          },
        ],
        annotations: [
          defineField({
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {
                name: 'url',
                title: 'URL',
                placeholder: 'https://example.com',
                type: 'url',
                validation: (rule) => rule.required(),
              },
              {
                name: 'external',
                title: 'External',
                description:
                  'Link is to another website (usually the case). Adds icon next to link.',
                type: 'boolean',
                initialValue: true,
                options: { layout: 'checkbox' },
              },
              {
                name: 'sponsored',
                title: 'Mark as sponsored',
                description: (
                  <FieldDescription
                    description='Important: Select if link is to a sponsored/affiliate site or is otherwise monetized.'
                    link={{
                      text: 'Learn when to use',
                      url: 'https://sheknowsseo.co/mark-a-link-as-sponsored/',
                    }}
                  />
                ),
                type: 'boolean',
                validation: (rule) =>
                  rule.custom((val, ctx) => {
                    if (
                      (ctx?.parent as BlockLink)?.external &&
                      typeof val === 'undefined'
                    ) {
                      return 'Must be checked or unchecked.'
                    }
                    return true
                  }),
                // initialValue: false,
                // hidden: (schema) => !schema?.parent?.external,
                options: { layout: 'checkbox' },
              },
              {
                name: 'noFollow',
                title: 'Mark as nofollow',
                description: (
                  <FieldDescription
                    link={{
                      text: 'Learn when to use',
                      url: 'https://sheknowsseo.co/when-to-mark-a-link-no-follow/',
                    }}
                  />
                ),
                type: 'boolean',
                validation: (rule) =>
                  rule.custom((val, ctx) => {
                    if (
                      (ctx?.parent as BlockLink)?.external &&
                      typeof val === 'undefined' &&
                      !(ctx?.parent as BlockLink)?.sponsored
                    ) {
                      return 'Must be checked or unchecked.'
                    }
                    return true
                  }),
                // initialValue: false,
                // hidden: (schema) => !schema?.parent?.external,
                options: { layout: 'checkbox' },
              },
              {
                name: 'newTab',
                title: 'Open in new tab',
                description: 'Whether link should open in a new tab.',
                type: 'boolean',
                initialValue: false,
                options: { layout: 'checkbox' },
              },
            ],
          }),
          // {
          //   name: 'referenceLink',
          //   type: 'object',
          //   title: 'Reference link',
          //   // icon: ,
          //   fields: [
          //     {
          //       name: 'reference',
          //       type: 'reference',
          //       to: [
          //         { type: 'recipe' },
          //         // other types you may want to link to
          //       ],
          //     },
          //   ],
          // },
        ],
      },
    }),
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          validation: (rule) =>
            rule.custom((alt: string, ctx) => {
              if (!!ctx.parent && !alt) return 'Required'
              return true
            }),
          title: 'Image Description (alt text)',
          description:
            'Used for people who cannot see the image and for Google search. E.g. "A woman gardening"',
        },
      ],
    }),
    defineArrayMember({
      type: 'video',
      name: 'videoEmbed',
      title: 'Video',
    }),
  ],
})
