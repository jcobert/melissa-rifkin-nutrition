import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faq',
  type: 'object',
  title: 'FAQ',
  fields: [
    defineField({ name: 'question', type: 'string', title: 'Question' }),
    defineField({ name: 'answer', type: 'blockContent', title: 'Answer' }),
  ],
})
