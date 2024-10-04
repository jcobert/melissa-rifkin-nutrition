import { defineField, defineType } from 'sanity'
import { CustomNumberInput } from 'sanity-studio/components/number-input'

import { formatFraction } from '@/utils/string'

export default defineType({
  name: 'ingredientMeasurement',
  title: 'Ingredient Measurement',
  type: 'object',
  fieldsets: [{ name: 'value', title: ' ', options: { columns: 2 } }],
  options: { columns: 1 },
  fields: [
    defineField({
      name: 'ingredientName',
      title: 'Ingredient',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    /** @todo find a way to not have to create a separate document for ingredients. */
    // defineField({
    //   name: 'ingredientName',
    //   title: 'Ingredient',
    //   type: 'reference',
    //   to: { type: 'ingredient' },
    // }),
    defineField({
      name: 'amount',
      title: 'Amount',
      /** @todo Find a better way to enter fractions or just make this a string field. */
      type: 'string',
      // type: 'number',
      // fieldset: 'value',
      // components: { input: CustomNumberInput },
      description: 'Enter as decimal or use the arrows to increment.',
    }),
    defineField({
      name: 'unit',
      title: 'Unit',
      type: 'string',
      // fieldset: 'value',
      // options: {
      //   list: [
      //     { value: 'tsp', title: 'tsp' },
      //     { value: 'tbsp', title: 'tbsp' },
      //     { value: 'cup', title: 'cup' },
      //     { value: 'pound', title: 'lb' },
      //     { value: 'ounce', title: 'oz' },
      //     { value: 'pinch', title: 'pinch' },
      //   ],
      //   layout: 'dropdown',
      // },
      description:
        "Leave blank if a specific unit of measurement doesn't apply.",
    }),
    defineField({
      name: 'note',
      title: 'Note',
      type: 'string',
      description: 'A comment such as, "sliced" or, "whole grain works best".',
    }),
  ],
  preview: {
    select: { title: 'ingredientName', amount: 'amount', unit: 'unit' },
    prepare: ({ title, amount, unit }) => {
      // const fraction = formatFraction(amount)
      return {
        title,
        subtitle: `${amount} ${unit ? unit : ''}`,
      }
    },
  },
})
