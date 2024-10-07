import { DocumentType } from 'sanity-studio/types'
import { StructureBuilder } from 'sanity/structure'

export const customStructure = (S: StructureBuilder) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      // General
      S.documentTypeListItem('general' as DocumentType).child(
        S.document()
          .schemaType('general' as DocumentType)
          .documentId('generalInfoAndSettings')
          .title('General Info and Settings'),
      ),
      // Feature Flags
      // S.documentTypeListItem('featureFlags' as DocumentType).child(
      //   S.document()
      //     .schemaType('featureFlags' as DocumentType)
      //     .documentId('featureFlags')
      //     .title('Features'),
      // ),
      S.divider(),

      // Recipe
      S.documentTypeListItem('recipe' as DocumentType).title('Recipes'),
      // S.documentTypeListItem('ingredient' as DocumentType).title('Ingredients'),
      // S.divider(),

      // Blog
      S.documentTypeListItem('post' as DocumentType).title('Blog Posts'),
      // S.documentTypeListItem('author' as DocumentType).title('Authors'),
      // S.divider(),

      // User Comments
      S.documentTypeListItem('userComment' as DocumentType).title(
        'User Comments',
      ),
      S.divider(),

      // Misc
      S.documentTypeListItem('bio' as DocumentType).title('Company Bios'),
      S.documentTypeListItem('testimonial' as DocumentType).title(
        'Client Testimonials',
      ),
      S.divider(),

      // Pages
      S.documentTypeListItem('aboutPage' as DocumentType).child(
        S.document()
          .schemaType('aboutPage' as DocumentType)
          .documentId('aboutPage')
          .title('About Page'),
      ),
      S.divider(),

      // Rest
      ...S.documentTypeListItems().filter(
        (item) =>
          !(
            [
              'post',
              'author',
              'recipe',
              'ingredient',
              'testimonial',
              'general',
              'aboutPage',
              'bio',
              'featureFlags',
              'userComment',
            ] as DocumentType[]
          ).includes(item.getId() as DocumentType),
      ),
    ])
