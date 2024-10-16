import { defineField, defineType } from 'sanity'
import { IngredientSelector } from 'sanity-studio/components/ingredient-selector'
import { Recipe } from 'sanity-studio/types'

export default defineType({
  name: 'instruction',
  title: 'Instruction',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description:
        'A very brief title for the step, such as "Pour", "Bake", or "In a bowl". Using the action word (often the first word) of the step is common.',
      validation: (rule) => rule.required(),
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
        { type: 'ingredientMeasurement' },
        // defineField({
        //   type: 'ingredientMeasurement',
        //   name: 'ingredient',
        //   // options: {
        //   //   filter: ({ document }) => {
        //   //     const { ingredientGroups } = (document as Recipe) || {}
        //   //     const ingredientMeasurements = ingredientGroups?.flatMap(
        //   //       (group) => group?.ingredients?.map((ing) => ing),
        //   //     )
        //   //     const ingredientRefs = ingredientMeasurements?.map(
        //   //       (im) =>
        //   //         (im?.ingredientName as Ingredient & { _ref: string })?._ref,
        //   //     )
        //   //     return {
        //   //       filter: '_id in $ingredients',
        //   //       params: {
        //   //         ingredients: ingredientRefs,
        //   //       },
        //   //     }
        //   //   },
        //   //   disableNew: true,
        //   // },
        //   // components: { input: IngredientCheckbox },
        // }),
        // defineField({
        //   type: 'reference',
        //   name: 'ingredient',
        //   to: {
        //     type: 'ingredient',
        //   },
        //   options: {
        //     filter: ({ document }) => {
        //       const { ingredientGroups } = (document as Recipe) || {}
        //       const ingredientMeasurements = ingredientGroups?.flatMap(
        //         (group) => group?.ingredients?.map((ing) => ing),
        //       )
        //       const ingredientRefs = ingredientMeasurements?.map(
        //         (im) =>
        //           (im?.ingredientName as Ingredient & { _ref: string })?._ref,
        //       )
        //       return {
        //         filter: '_id in $ingredients',
        //         params: {
        //           ingredients: ingredientRefs,
        //         },
        //       }
        //     },
        //     disableNew: true,
        //   },
        //   // components: { input: IngredientCheckbox },
        // }),
      ],
      // options: {},
      components: { input: IngredientSelector },
      description:
        'Select the ingredients that are part of this particular step.',
    }),
    defineField({
      name: 'stepImage',
      title: 'Photo',
      type: 'image',
      description: 'An optional image to accompany the instruction step.',
      options: {
        hotspot: true,
        // collapsible: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          validation: (rule) =>
            rule.custom((alt: string, ctx) => {
              if (!!ctx.parent && !alt) return 'Required'
              return true
            }),
          title: 'Image Description (alt text)',
          description:
            'Used for people who cannot see the image. E.g. "Ground beef in a mixing bowl."',
        },
      ],
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
