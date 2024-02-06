import { FaBookmark } from 'react-icons/fa6'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'recipeCategory',
  title: 'Recipe Category',
  type: 'document',
  icon: FaBookmark,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
  ],
})
