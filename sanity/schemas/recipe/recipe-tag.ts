import { FaTags } from 'react-icons/fa6'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'recipeTag',
  title: 'Recipe Tag',
  type: 'document',
  icon: FaTags,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
  ],
})
