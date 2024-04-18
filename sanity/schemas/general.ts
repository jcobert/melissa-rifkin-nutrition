import { BsGearFill } from 'react-icons/bs'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'general',
  title: 'General',
  type: 'document',
  icon: BsGearFill,
  groups: [{ name: 'companyInfo', title: 'Company Info' }],
  fieldsets: [
    {
      name: 'contact',
      title: 'Contact Info',
      description: 'Primary contact info for the company.',
    },
  ],
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      fieldset: 'contact',
      group: 'companyInfo',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      fieldset: 'contact',
      group: 'companyInfo',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      description: 'Links to associated profiles.',
      type: 'socialLinks',
      group: 'companyInfo',
      options: { collapsible: true },
    }),
  ],
})
