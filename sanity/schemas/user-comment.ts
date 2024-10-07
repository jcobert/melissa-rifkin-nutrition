import { BiSolidCommentDetail } from 'react-icons/bi'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'userComment',
  type: 'document',
  title: 'User Comment',
  icon: BiSolidCommentDetail,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      description: "User's name.",
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email',
      description: "User's email.",
    }),
    defineField({
      name: 'comment',
      type: 'text',
      title: 'Comment',
      description: "User's comment.",
    }),
    defineField({
      name: 'approved',
      type: 'boolean',
      title: 'Approved',
      description: 'Approve comment to show it on the website.',
      initialValue: false,
    }),
    defineField({
      name: 'postType',
      type: 'string',
      title: 'Post Type',
      description: 'What type of post this comment was left on.',
      options: {
        list: [
          { value: 'recipe', title: 'Recipe' },
          { value: 'blog', title: 'Blog Post' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'sourceRecipe',
      type: 'reference',
      to: [{ type: 'recipe' }],
      title: 'Recipe',
      description: 'The recipe this comment was left on.',
      options: { disableNew: true },
      hidden: (ctx) => ctx?.parent?.postType !== 'recipe',
    }),
    defineField({
      name: 'sourceBlogPost',
      type: 'reference',
      to: [{ type: 'post' }],
      title: 'Blog Post',
      description: 'The blog post this comment was left on.',
      options: { disableNew: true },
      hidden: (ctx) => ctx?.parent?.postType !== 'blog',
    }),
  ],
})
