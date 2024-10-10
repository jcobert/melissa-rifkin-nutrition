import { BiSolidCommentDetail } from 'react-icons/bi'
import { FaCheckCircle, FaClock } from 'react-icons/fa'
import { IoCloseCircle } from 'react-icons/io5'
import { defineField, defineType } from 'sanity'
import { ApprovalField } from 'sanity-studio/components/approval-field'
import { UserComment } from 'sanity-studio/types'

export default defineType({
  name: 'userComment',
  type: 'document',
  title: 'User Comment',
  icon: BiSolidCommentDetail,
  preview: {
    select: {
      name: 'name',
      comment: 'comment',
      approved: 'approved',
      postType: 'postType',
      sourceRecipe: 'sourceRecipe.title',
      sourceBlogPost: 'sourceBlogPost.title',
    },
    prepare: (value) => {
      const {
        name,
        comment,
        approved,
        postType,
        sourceBlogPost,
        sourceRecipe,
      } = value as UserComment
      // let status = 'Pending Approval'
      let color: string | undefined
      let icon = <FaClock style={{ fontSize: '1.25rem' }} />
      if (approved) {
        // status = 'Approved'
        color = '#059669'
        icon = <FaCheckCircle style={{ color, fontSize: '1.25rem' }} />
      } else if (approved === false) {
        // status = 'Rejected'
        color = '#e11d48'
        icon = <IoCloseCircle style={{ color, fontSize: '1.5rem' }} />
      }
      return {
        title:
          typeof comment !== 'undefined'
            ? `${name || 'Unknown user'} on ${(postType === 'recipe' ? sourceRecipe : sourceBlogPost) || 'Unknown post'}`
            : 'Unknown Comment',
        // subtitle: status,
        subtitle: comment,
        media: <span>{icon}</span>,
      }
    },
  },
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      description: "User's name.",
      readOnly: true,
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email',
      description: "User's email.",
      readOnly: true,
    }),
    defineField({
      name: 'comment',
      type: 'text',
      title: 'Comment',
      description: "User's comment.",
      readOnly: true,
    }),
    defineField({
      name: 'approved',
      type: 'boolean',
      title: 'Approval Status',
      description: 'Approve comment to show it on the website.',
      // initialValue: false,
      validation: (rule) =>
        rule.custom((val) => {
          if (typeof val === 'undefined') {
            return 'Approval pending. Please mark as approved or rejected.'
          }
          return true
        }),
      components: { field: ApprovalField },
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
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: 'sourceRecipe',
      type: 'reference',
      to: [{ type: 'recipe' }],
      title: 'Recipe',
      description: 'The recipe this comment was left on.',
      options: { disableNew: true },
      hidden: (ctx) => ctx?.parent?.postType !== 'recipe',
      readOnly: true,
    }),
    defineField({
      name: 'sourceBlogPost',
      type: 'reference',
      to: [{ type: 'post' }],
      title: 'Blog Post',
      description: 'The blog post this comment was left on.',
      options: { disableNew: true },
      hidden: (ctx) => ctx?.parent?.postType !== 'blog',
      readOnly: true,
    }),
  ],
})
