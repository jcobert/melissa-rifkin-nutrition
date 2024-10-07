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
      description: 'E.g. 250g, 1 biscuit',
    }),
    defineField({
      name: 'info',
      title: 'Additional Info',
      type: 'blockContent',
      description: 'Any other nutritional info you wish to share.',
    }),
  ],
})
