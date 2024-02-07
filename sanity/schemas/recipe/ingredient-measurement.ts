import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ingredientMeasurement',
  title: 'Ingredient Measurement',
  type: 'object',
  fields: [
    defineField({
      name: 'ingredient',
      title: 'Ingredient',
      type: 'reference',
      to: { type: 'ingredient' },
    }),
    defineField({
      name: 'measurement',
      title: 'Measurement',
      type: 'number',
    }),
    defineField({
      name: 'unit',
      title: 'Unit',
      type: 'string',
    }),
  ],
})
