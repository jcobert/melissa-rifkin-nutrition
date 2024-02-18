import { BsPersonFill } from 'react-icons/bs'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'bio',
  title: 'Bio',
  type: 'document',
  icon: BsPersonFill,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'URL-friendly Name',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      description:
        'Just click "Generate" after entering something in the Name field above, to automatically fill this in.',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'background',
      title: 'Background',
      type: 'blockContent',
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Info',
      type: 'contactInfo',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'socialLinks',
    }),
    // defineField({
    //   name: 'feature',
    //   title: 'Feature on About Page',
    //   type: 'boolean',
    //   description: 'Whether to display this bio on the About page.',
    //   initialValue: true,
    // }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
