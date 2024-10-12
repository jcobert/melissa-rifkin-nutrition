import { FaBook } from 'react-icons/fa6'
import {
  ObjectOptions,
  defineArrayMember,
  defineField,
  defineType,
} from 'sanity'
import { CustomTextInput } from 'sanity-studio/components/text-input'
import { Recipe } from 'sanity-studio/types'

export default defineType({
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  icon: FaBook,
  fieldsets: [
    {
      name: 'seo',
      title: 'Seach Engine Optimization (SEO)',
      description:
        'These fields impact your presence on Google search results.',
    },
    {
      name: 'basicInfo',
      title: 'Basic Info',
      options: { collapsible: true },
    },
    {
      name: 'classification',
      title: 'Classification',
      // title: 'Categories and Keywords',
      options: { collapsible: true },
    },
    {
      name: 'times',
      title: 'Times',
      options: { collapsible: true, columns: 2 },
    },
  ],
  groups: [
    {
      name: 'basicInfo',
      title: 'Basic Info',
    },
    {
      name: 'classification',
      title: 'Classification',
      // title: 'Categories and Keywords',
    },
    {
      name: 'stepsAndIgredients',
      title: 'Steps and Ingredients',
    },
    {
      name: 'detailsAndNutrition',
      title: 'Details and Nutrition',
    },
    {
      name: 'additionalContent',
      title: 'Additional Content',
    },
    {
      name: 'related',
      title: 'Related Posts',
    },
  ],
  // groups: [{ name: 'seo', title: 'SEO (Google Optimization)' }],
  fields: [
    defineField({
      name: 'title',
      title: 'Recipe Name',
      type: 'string',
      // fieldset: 'basicInfo',
      group: 'basicInfo',
      validation: (rule) => rule.required(),
      // components: {
      //   field: CustomTextField,
      // },
    }),

    defineField({
      name: 'seoDescription',
      title: 'Recipe Description',
      description:
        'Provide a short description of this recipe (one or two sentences). This is important for Google search results.',
      type: 'string',
      // fieldset: 'basicInfo',
      group: 'basicInfo',
      validation: (rule) => rule.required(),
      // group: 'seo',
      components: {
        input: CustomTextInput,
        // field: CustomTextField,
      },
    }),

    defineField({
      name: 'slug',
      title: 'URL-friendly Name (required)',
      type: 'slug',
      // validation: (rule) => rule.required(),
      hidden: true,
      options: {
        source: 'title',
        maxLength: 96,
      },
      description:
        'Just click "Generate" after entering something in the Recipe Name field above, to automatically fill this in.',
    }),

    defineField({
      name: 'mainImage',
      title: 'Main Photo',
      type: 'image',
      // fieldset: 'basicInfo',
      group: 'basicInfo',
      description: 'The featured image at the top of the recipe.',
      validation: (rule) => rule.required(),
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
            'Used for people who cannot see the image. E.g. "A piece of salmon on a plate."',
        },
      ],
    }),

    defineField({
      name: 'introduction',
      type: 'blockContent',
      group: 'additionalContent',
      title: 'Introduction',
      description:
        'Add any lead-in to the recipe here. (E.g. backstory, images, etc.)',
    }),
    // defineField({
    //   name: 'introduction',
    //   type: 'object',
    //   group: 'additionalContent',
    //   title: 'Introduction',
    //   description:
    //     'Add any lead-in to the recipe here. (E.g. backstory, images, etc.)',
    //   fields: [
    //     defineField({
    //       name: 'heading',
    //       type: 'string',
    //       title: 'Heading',
    //     }),
    //     defineField({
    //       name: 'body',
    //       type: 'blockContent',
    //       title: 'Body',
    //     }),
    //   ],
    // }),

    // defineField({
    //   name: 'additionalImages',
    //   title: 'Additional Photos',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'image',
    //       options: {
    //         hotspot: true,
    //         // collapsible: true,
    //       },
    //       fields: [
    //         {
    //           name: 'alt',
    //           type: 'string',
    //           validation: (rule) =>
    //             rule.custom((alt: string, ctx) => {
    //               if (!!(ctx.parent as Image)?.asset && !alt) return 'Required'
    //               return true
    //             }),
    //           title: 'Image Description (alt text)',
    //           description:
    //             'Used for people who cannot see the image. E.g. "A piece of salmon on a plate."',
    //         },
    //       ],
    //     },
    //   ],
    //   options: { layout: 'grid' },
    //   // fieldset: 'basicInfo',
    //   group: 'basicInfo',
    //   description: 'Any other photos you wish to display.',
    // }),

    defineField({
      name: 'category',
      title: 'Meal Type Categories',
      description: 'Select any that apply.',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.min(1).required(),
      // fieldset: 'classification',
      group: 'classification',
      options: {
        list: [
          { value: 'breakfast', title: 'Breakfast' },
          { value: 'lunch', title: 'Lunch' },
          { value: 'dinner', title: 'Dinner' },
          { value: 'dessert', title: 'Dessert' },
          { value: 'side', title: 'Side' },
          { value: 'snack', title: 'Snack' },
        ],
        // layout: 'radio',
        // direction: 'horizontal',
      },
    }),

    defineField({
      name: 'tags',
      title: 'Filter Tags',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.min(1).required(),
      // fieldset: 'classification',
      group: 'classification',
      options: { layout: 'tags' },
      description:
        'Keywords to help someone filtering for recipes on the website. These are user-facing. Keep them short and more generic. E.g. pasta, soup, instant pot, vegan.',
    }),

    // defineField({
    //   name: 'seoTags',
    //   title: 'SEO Tags',
    //   type: 'array',
    //   of: [{ type: 'string' }],
    //   // fieldset: 'classification',
    //   group: 'classification',
    //   // group: 'seo',
    //   options: { layout: 'tags' },
    //   description:
    //     'Additional keywords/short phrases related to the recipe. These are hidden and only used to help Google search. E.g. garlicky shrimp, zesty indian curry',
    // }),

    defineField({
      name: 'cuisines',
      title: 'Cuisine Types',
      type: 'array',
      of: [{ type: 'string' }],
      // fieldset: 'classification',
      group: 'classification',
      // group: 'seo',
      options: { layout: 'tags' },
      description: 'E.g. Mexican, Greek, Japanese',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      hidden: true,
    }),

    // defineField({
    //   name: 'layout',
    //   title: 'Layout',
    //   type: 'string',
    //   description:
    //     '"Basic" will display the recipe as one block of text. "Advanced" uses a layout that groups ingredients per step (a little bit more work to set up here, but a more pleasant experience for the reader).',
    //   options: {
    //     list: [
    //       { value: 'basic', title: 'Basic' },
    //       { value: 'advanced', title: 'Advanced' },
    //     ],
    //     layout: 'radio',
    //   },
    //   initialValue: 'advanced',
    //   hidden: true,
    // }),

    // defineField({
    //   name: 'body',
    //   title: 'Instructions',
    //   type: 'blockContent',
    //   description:
    //     'The full recipe content. Write/paste all steps and ingredients here.',
    //   // hidden: (ctx) => ctx.parent?.layout !== 'basic',
    //   hidden: true,
    // }),

    defineField({
      name: 'ingredientGroups',
      title: 'Ingredient Groups',
      type: 'array',
      of: [{ type: 'ingredientGroup' }],
      group: 'stepsAndIgredients',
      validation: (rule) => rule.min(1).required(),
      options: { modal: { type: 'dialog', width: 'auto' } },
      description:
        'Sets of ingredients for the recipe. For example, you might have one ingredient group for the salad and another for the dressing. At least one group is required.',
      // hidden: (ctx) => ctx.parent?.layout !== 'advanced',
    }),

    defineField({
      name: 'instructions',
      title: 'Instructions',
      type: 'array',
      of: [{ type: 'instruction' }],
      group: 'stepsAndIgredients',
      validation: (rule) => rule.min(1).required(),
      options: { modal: { type: 'dialog', width: 'auto' } },
      description: 'All recipe steps. Drag to reorder. Top is the first step.',
      // hidden: (ctx) => ctx.parent?.layout !== 'advanced',
    }),

    defineField({
      name: 'prepTime',
      title: 'Prep Time',
      type: 'number',
      // fieldset: 'times',
      group: 'detailsAndNutrition',
      description: 'In minutes',
    }),

    defineField({
      name: 'cookTime',
      title: 'Cook Time',
      type: 'number',
      // fieldset: 'times',
      group: 'detailsAndNutrition',
      description: 'In minutes',
    }),

    defineField({
      name: 'servings',
      title: 'Servings',
      description:
        'How much this recipe yields. E.g. 4 servings, 12 cookies, etc.',
      type: 'object',
      group: 'detailsAndNutrition',
      options: { columns: 2 },
      fields: [
        defineField({
          name: 'quantity',
          title: 'Qty',
          type: 'number',
        }),
        defineField({
          name: 'unit',
          title: 'Unit',
          type: 'string',
          validation: (rule) =>
            rule.custom((unit: string | undefined, ctx) => {
              if (!!(ctx.parent as Recipe['servings'])?.quantity && !unit)
                return 'Required'
              return true
            }),
          initialValue: 'servings',
        }),
      ],
    }),

    defineField({
      name: 'nutritionInformation',
      title: 'Nutrition Information',
      type: 'nutrition',
      group: 'detailsAndNutrition',
      options: {
        // collapsible: true,
        // columns: 2,
      } as ObjectOptions,
    }),

    defineField({
      name: 'postContent',
      title: 'Blog Post Content',
      type: 'blockContent',
      group: 'additionalContent',
      description:
        'Add any text and media content here. Discuss the recipe, share tips and tricks, etc.',
    }),

    // defineField({
    //   name: 'howToStore',
    //   title: 'How to Store',
    //   type: 'object',
    //   group: 'additionalContent',
    //   fields: [
    //     defineField({
    //       name: 'heading',
    //       type: 'string',
    //       title: 'Heading',
    //       initialValue: 'How to Store',
    //     }),
    //     defineField({
    //       name: 'body',
    //       type: 'blockContent',
    //       title: 'Body',
    //     }),
    //   ],
    // }),

    // defineField({
    //   name: 'tipsAndTricks',
    //   title: 'Tips and Tricks',
    //   type: 'object',
    //   group: 'additionalContent',
    //   fields: [
    //     defineField({
    //       name: 'heading',
    //       type: 'string',
    //       title: 'Heading',
    //       initialValue: 'Tips for Best Results',
    //     }),
    //     defineField({
    //       name: 'body',
    //       type: 'blockContent',
    //       title: 'Body',
    //     }),
    //   ],
    // }),

    // defineField({
    //   name: 'faqSet',
    //   title: 'FAQ',
    //   type: 'array',
    //   of: [defineArrayMember({ type: 'faq' })],
    //   group: 'additionalContent',
    // }),

    defineField({
      name: 'similarRecipes',
      title: 'Similar Recipes',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [
            {
              type: 'recipe',
            },
          ],
          options: { disableNew: true },
        }),
      ],
      // options: { layout: 'grid' },
      group: 'related',
    }),

    defineField({
      name: 'relatedPosts',
      title: 'Related Blog Posts',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [
            {
              type: 'post',
            },
          ],
          options: { disableNew: true },
        }),
      ],
      // options: { layout: 'grid' },
      group: 'related',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
    prepare(selection) {
      return selection
    },
  },
})
