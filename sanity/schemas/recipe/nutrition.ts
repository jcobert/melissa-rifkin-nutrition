import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'nutrition',
  title: 'Nutrition',
  type: 'object',
  fields: [
    defineField({
      name: 'servingSize',
      title: 'Serving Size',
      type: 'string',
      description: 'E.g. 250 g, 1 biscuit',
    }),
    defineField({
      name: 'calories',
      title: 'Calories',
      type: 'number',
    }),
    defineField({
      name: 'carbohydrates',
      title: 'Carbohydrates',
      type: 'number',
      description: 'In grams (g).',
    }),
    defineField({
      name: 'sodium',
      title: 'Sodium',
      type: 'number',
      description: 'In milligrams (mg).',
    }),
    defineField({
      name: 'sugar',
      title: 'Sugar',
      type: 'number',
      description: 'In grams (g).',
    }),
    defineField({
      name: 'protein',
      title: 'Protein',
      type: 'number',
      description: 'In grams (g).',
    }),
    defineField({
      name: 'fat',
      title: 'Fat',
      type: 'number',
      description: 'In grams (g).',
    }),
    defineField({
      name: 'saturatedFat',
      title: 'Saturated Fat',
      type: 'number',
      description: 'In grams (g).',
    }),
    defineField({
      name: 'unsaturatedFat',
      title: 'Unsaturated Fat',
      type: 'number',
      description: 'In grams (g).',
    }),
    defineField({
      name: 'transFat',
      title: 'Trans Fat',
      type: 'number',
      description: 'In grams (g).',
    }),
    defineField({
      name: 'cholesterol',
      title: 'Cholesterol',
      type: 'number',
      description: 'In milligrams (mg).',
    }),
    defineField({
      name: 'fiber',
      title: 'Fiber',
      type: 'number',
      description: 'In grams (g).',
    }),
    defineField({
      name: 'info',
      title: 'Additional Info',
      type: 'blockContent',
      description: 'Any other nutritional info you wish to share.',
    }),
  ],
})
