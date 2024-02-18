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
      S.divider(),
      // Recipe
      S.documentTypeListItem('recipe' as DocumentType),
      S.documentTypeListItem('ingredient' as DocumentType),
      S.divider(),
      // Blog
      S.documentTypeListItem('post' as DocumentType),
      S.documentTypeListItem('author' as DocumentType),
      S.divider(),
      // Misc
      S.documentTypeListItem('testimonial' as DocumentType),
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
            ] as DocumentType[]
          ).includes(item.getId() as DocumentType),
      ),
    ])
