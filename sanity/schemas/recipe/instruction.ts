import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'instruction',
  title: 'Instruction',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'stepNumber',
      title: 'Step',
      type: 'number',
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'ingredient' } }],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
  ],
})
