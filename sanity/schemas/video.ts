import { PlayIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'video',
  type: 'object',
  title: 'Video',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'file',
      type: 'file',
      title: 'File',
    }),
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Video Description',
      description:
        'Used for people who cannot see the video and for Google search. E.g. "A man chopping vegetables"',
    }),
  ],
  preview: {
    select: { title: 'alt', file: 'file' },
    prepare: ({ title }) => {
      return { title: `Video${title ? ` - ${title}` : ''}` }
    },
  },
  // components: {
  //   preview: (props) => {
  //     return <SanityVideoPreview {...props} />
  //   },
  // },
})
