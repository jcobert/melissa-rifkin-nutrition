import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ingredientGroup',
  title: 'Ingredient Group',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description:
        'E.g. "Sauce". If only one group, title won\'t be shown, so you can leave blank.',
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      of: [{ type: 'ingredientMeasurement' }],
      // of: [{ type: 'reference', to: { type: 'ingredient' } }],
    }),
  ],
})
