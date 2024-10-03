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
      description: 'E.g. "Dressing". If only one group, leave blank.',
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      // options: { modal: { type: 'popover' } },
      of: [{ type: 'ingredientMeasurement' }],
      // of: [{ type: 'reference', to: { type: 'ingredient' } }],
      validation: (rule) => rule.min(1).required(),
    }),
  ],
})
