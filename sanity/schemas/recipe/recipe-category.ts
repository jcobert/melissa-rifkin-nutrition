import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'recipeCategory',
  title: 'Recipe Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
  ],
})
