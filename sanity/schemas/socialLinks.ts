import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'socialLinks',
  title: 'Social Links',
  description: 'Links to associated profiles.',
  type: 'object',
  fields: [
    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'string',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook',
      type: 'string',
    }),
    defineField({
      name: 'pinterest',
      title: 'Pinterest',
      type: 'string',
    }),
    defineField({
      name: 'tiktok',
      title: 'TikTok',
      type: 'string',
    }),
    defineField({
      name: 'twitter',
      title: 'X (Twitter)',
      type: 'string',
    }),
    // defineField({
    //   name: 'iherb',
    //   title: 'iHerb',
    //   type: 'string',
    // }),
  ],
  options: { collapsible: true },
})
