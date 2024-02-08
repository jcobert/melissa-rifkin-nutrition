import { FaCarrot } from 'react-icons/fa6'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ingredient',
  title: 'Ingredient',
  type: 'document',
  icon: FaCarrot,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'alternativeNames',
      title: 'Alternative Names',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    // defineField({
    //   name: 'substitues',
    //   title: 'Substitutes',
    //   type: 'array',
    //   of: [{ type: 'string' }],
    // }),
  ],
})
