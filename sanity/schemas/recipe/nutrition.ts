import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'nutrition',
  title: 'Nutrition',
  type: 'object',
  fields: [
    defineField({
      name: 'calories',
      title: 'Calories',
      type: 'number',
    }),
    defineField({
      name: 'servingSize',
      title: 'Serving Size',
      type: 'string',
      description: 'E.g. 1/4 cup, 150 g',
    }),
  ],
})
