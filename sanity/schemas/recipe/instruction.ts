import { defineField, defineType } from 'sanity'
import { Ingredient, Recipe } from 'sanity-studio/types'

export default defineType({
  name: 'instruction',
  title: 'Instruction',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional. A brief heading, such as "In a bowl".',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'The written instruction.',
    }),
    // defineField({
    //   name: 'stepNumber',
    //   title: 'Step',
    //   type: 'number',
    //   hidden: true,
    // }),
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      of: [
        defineField({
          type: 'reference',
          name: 'ingredient',
          to: {
            type: 'ingredient',
          },
          options: {
            filter: ({ document }) => {
              const { ingredientGroups } = (document as Recipe) || {}
              const ingredientMeasurements = ingredientGroups?.flatMap(
                (group) => group?.ingredients?.map((ing) => ing),
              )
              const ingredientRefs = ingredientMeasurements?.map(
                (im) =>
                  (im?.ingredientName as Ingredient & { _ref: string })?._ref,
              )
              return {
                filter: '_id in $ingredients',
                params: {
                  ingredients: ingredientRefs,
                },
              }
            },
            disableNew: true,
          },
          // components: { input: IngredientCheckbox },
        }),
      ],
      // components: { input: IngredientSelector },
      description:
        'Each of the ingredients that are part of this particular step.',
    }),
  ],
  preview: {
    select: { title: 'title', description: 'description' },
    prepare: ({ title, description }) => {
      const desc = ((description as string) || '')?.slice(0, 60)
      return {
        title: title || ' ',
        subtitle: `${desc}...`,
      }
    },
  },
})
