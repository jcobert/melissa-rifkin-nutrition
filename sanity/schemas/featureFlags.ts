import { IoIosSwitch } from 'react-icons/io'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'featureFlags',
  title: 'Features',
  type: 'document',
  icon: IoIosSwitch,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      hidden: true,
    }),
    {
      title: 'Feature Flags',
      name: 'flags',
      description: 'Use feature flags to quickly enable or disable features.',
      type: 'array',
      of: [
        {
          title: 'Feature',
          name: 'feature',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Title',
            }),
            defineField({
              name: 'key',
              type: 'string',
              title: 'The key used to toggle features in the front-end.',
            }),
            defineField({
              name: 'description',
              type: 'text',
              title: 'Description',
              description: 'Description of the feature.',
            }),
            defineField({
              name: 'status',
              type: 'boolean',
              description: 'Toggle the feature on or off.',
              title: 'Enabled?',
            }),
          ],
        },
      ],
    },
  ],
})
