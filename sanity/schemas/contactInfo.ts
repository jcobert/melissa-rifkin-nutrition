import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactInfo',
  title: 'Contact Info',
  type: 'object',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
  ],
})
