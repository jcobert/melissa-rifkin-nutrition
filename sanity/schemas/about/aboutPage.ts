import { RiPagesFill } from 'react-icons/ri'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: RiPagesFill,
  // groups: [{ name: 'companyInfo', title: 'Company Info' }],
  // fieldsets: [
  //   {
  //     name: 'contact',
  //     title: 'Contact Info',
  //     description: 'Primary contact info for the company.',
  //   },
  // ],
  fields: [
    defineField({
      name: 'bios',
      title: 'Bios',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: { type: 'bio', name: 'bio' },
        }),
      ],
    }),
  ],
})
