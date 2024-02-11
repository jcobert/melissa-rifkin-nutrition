import { BsGearFill } from 'react-icons/bs'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'general',
  title: 'General',
  type: 'document',
  icon: BsGearFill,
  groups: [{ name: 'contact', title: 'Contact Info' }],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
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
          name: 'twitter',
          title: 'Twitter',
          type: 'string',
        }),
        defineField({
          name: 'pinterest',
          title: 'Pinterest',
          type: 'string',
        }),
        // defineField({
        //   name: 'iherb',
        //   title: 'iHerb',
        //   type: 'string',
        // }),
      ],
      group: 'contact',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      group: 'contact',
    }),
  ],
})
