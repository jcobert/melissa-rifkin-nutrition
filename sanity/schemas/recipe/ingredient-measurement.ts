import { defineField, defineType } from 'sanity'
import { CustomNumberInput } from 'sanity-studio/components/number-input'

import { formatFraction } from '@/utils/string'

export default defineType({
  name: 'ingredientMeasurement',
  title: 'Ingredient Measurement',
  type: 'object',
  fields: [
    defineField({
      name: 'ingredientName',
      title: 'Ingredient',
      type: 'reference',
      to: { type: 'ingredient' },
    }),
    defineField({
      name: 'amount',
      title: 'Amount',
      type: 'number',
      // options: {
      //   list: [
      //     { value: 0.125, title: '1/8' },
      //     { value: 0.25, title: '1/4' },
      //     { value: 0.5, title: '1/2' },
      //     { value: 0.75, title: '3/4' },
      //     { value: 1, title: '1' },
      //     { value: 1.5, title: '1 1/2' },
      //     { value: 2, title: '2' },
      //   ],
      //   layout: 'radio',
      //   direction: 'horizontal',
      // },
      components: { input: CustomNumberInput },
      description: 'Enter as decimal or use the arrows to increment by 1/8',
    }),
    defineField({
      name: 'unit',
      title: 'Unit',
      type: 'string',
      options: {
        list: [
          { value: 'tsp', title: 'tsp' },
          { value: 'tbsp', title: 'Tbsp' },
          { value: 'cup', title: 'Cup' },
          { value: 'pound', title: 'lb' },
          { value: 'ounce', title: 'oz' },
          { value: 'pinch', title: 'Pinch' },
          { value: 'piece', title: 'Piece' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'note',
      title: 'Note',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'ingredientName.name', amount: 'amount', unit: 'unit' },
    prepare: ({ title, amount, unit }) => {
      const fraction = formatFraction(amount)
      return {
        title,
        subtitle: `${fraction} ${unit ? unit : ''}`,
      }
    },
  },
})
