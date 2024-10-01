import { FaBook } from 'react-icons/fa6'
import { defineField, defineType } from 'sanity'
import {
  CustomTextField,
  CustomTextInput,
} from 'sanity-studio/components/text-input'

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
  ],
  groups: [{ name: 'seo', title: 'SEO (Google Optimization)' }],
  fields: [
    defineField({
      name: 'title',
      title: 'Recipe Name',
      type: 'string',
      validation: (rule) => rule.required(),
      components: {
        field: CustomTextField,
      },
    }),
    defineField({
      name: 'seoDescription',
      title: 'Recipe Description',
      description:
        'Provide a short description of this recipe (one or two sentences). This is important for Google search results.',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'seo',
      // fieldset: 'seo',
      components: {
        input: CustomTextInput,
        field: CustomTextField,
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
      title: 'Photo',
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
    defineField({
      name: 'category',
      title: 'Categories',
      description: 'Select any that apply.',
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
      description:
        'Keywords to help someone searching for a recipe. E.g. pasta, soup, instant pot, vegan',
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
      name: 'layout',
      title: 'Layout',
      type: 'string',
      description:
        '"Basic" will display the recipe as one block of text. "Advanced" uses a layout that groups ingredients per step (a little bit more work to set up here, but a more pleasant experience for the reader).',
      options: {
        list: [
          { value: 'basic', title: 'Basic' },
          { value: 'advanced', title: 'Advanced' },
        ],
        layout: 'radio',
      },
      initialValue: 'basic',
    }),
    defineField({
      name: 'body',
      title: 'Instructions',
      type: 'blockContent',
      description:
        'The full recipe content. Write/paste all steps and ingredients here.',
      hidden: (props) => props.parent.layout !== 'basic',
    }),
    defineField({
      name: 'ingredientGroups',
      title: 'Ingredient Groups',
      type: 'array',
      of: [{ type: 'ingredientGroup' }],
      options: { modal: { type: 'dialog', width: 'auto' } },
      description:
        'Subsets of ingredients for the recipe. For example, you might have one ingredient group for the pork chop and another for the mango chutney that goes on top.',
      hidden: (props) => props.parent.layout !== 'advanced',
    }),
    defineField({
      name: 'instructions',
      title: 'Instructions',
      type: 'array',
      of: [{ type: 'instruction' }],
      options: { modal: { type: 'dialog', width: 'auto' } },
      description: 'All recipe steps. Drag to reorder. Top is the first step.',
      hidden: (props) => props.parent.layout !== 'advanced',
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
