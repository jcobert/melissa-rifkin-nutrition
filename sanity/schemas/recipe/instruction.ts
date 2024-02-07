import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'instruction',
  title: 'Instruction',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
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
        {
          type: 'reference',
          to: {
            type: 'ingredient',
            // options: {
            //   filter: ({ document }) => {
            //     if (!document.ingredientGroups) {
            //       return {
            //         filter: '*',
            //         params: {},
            //       }
            //     }
            //     return {
            //       filter: groq`*[defined(ingredients)]{}`,
            //       params: {},
            //     }
            //   },
            // },
          },
        },
      ],
      // options: {list: []}
    }),
  ],
  preview: {
    select: { title: 'title', description: 'description' },
    prepare: ({ title, description }) => {
      const desc = ((description as string) || '')?.slice(0, 40)
      return {
        title,
        subtitle: `${desc}...`,
      }
    },
  },
})
