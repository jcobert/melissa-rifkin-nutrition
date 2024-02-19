import { BsChatQuoteFill } from 'react-icons/bs'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: BsChatQuoteFill,
  fieldsets: [{ name: 'personalInfo', title: 'Personal Info' }],
  fields: [
    defineField({
      name: 'relationship',
      title: 'Relationship',
      type: 'string',
      options: {
        list: [
          { title: 'Client', value: 'client' },
          { title: 'Partner', value: 'partner' },
        ],
        layout: 'radio',
      },
      initialValue: 'client',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      fieldset: 'personalInfo',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      fieldset: 'personalInfo',
      hidden: (props) => props.parent.relationship !== 'client',
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      fieldset: 'personalInfo',
      hidden: (props) => props.parent.relationship !== 'partner',
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      fieldset: 'personalInfo',
      hidden: (props) => props.parent.relationship !== 'partner',
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'text',
    }),
  ],
})
