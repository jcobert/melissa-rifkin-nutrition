import { FaBook } from 'react-icons/fa6'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  icon: FaBook,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description:
        'Just click "Generate" after entering something in the Title field, to automatically fill this in.',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Image Description',
          description:
            'Used for people who cannot see the image. E.g. "A piece of salmon on a plate."',
        },
      ],
    }),
    // defineField({
    //   name: 'category',
    //   title: 'Category',
    //   type: 'reference',
    //   to: { type: 'recipeCategory' },
    // }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'array',
      of: [{ type: 'string' }],
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
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      // of: [{ type: 'reference', to: { type: 'recipeTag' } }],
      options: { layout: 'tags' },
      description: 'E.g. pasta, soup, instant pot, vegan',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      hidden: true,
    }),
    defineField({
      name: 'prepTime',
      title: 'Prep Time',
      type: 'number',
      description: 'In minutes',
    }),
    defineField({
      name: 'cookTime',
      title: 'Cook Time',
      type: 'number',
      description: 'In minutes',
    }),
    defineField({
      name: 'ingredientGroups',
      title: 'Ingredient Groups',
      type: 'array',
      of: [{ type: 'ingredientGroup' }],
      options: { modal: { type: 'dialog', width: 'auto' } },
      description:
        'Subsets of ingredients for the recipe. For example, you might want one set of ingredients for the pork chop and another set for the mango chutney that goes on top.',
    }),
    defineField({
      name: 'instructions',
      title: 'Instructions',
      type: 'array',
      of: [{ type: 'instruction' }],
      options: { modal: { type: 'dialog', width: 'auto' } },
      description: 'All recipe steps. Drag to reorder. Top is the first step.',
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
