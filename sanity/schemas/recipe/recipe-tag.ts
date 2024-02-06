import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'recipeTag',
  title: 'Recipe Tag',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
  ],
})
