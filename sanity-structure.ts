import { StructureBuilder } from 'sanity/structure'

export const customStructure = (S: StructureBuilder) =>
  S.list()
    .id('root')
    .title('Content')
    .items([...S.documentTypeListItems()])
