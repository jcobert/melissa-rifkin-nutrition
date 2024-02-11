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
          description: 'Used for people who cannot see the image.',
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
    }),
    defineField({
      name: 'instructions',
      title: 'Instructions',
      type: 'array',
      of: [{ type: 'instruction' }],
      options: { modal: { type: 'dialog', width: 'auto' } },
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
