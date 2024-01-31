import author from './schemas/author'
import blockContent from './schemas/blockContent'
import category from './schemas/category'
import post from './schemas/post'
import testimonial from './schemas/testimonial'
import { type SchemaTypeDefinition } from 'sanity'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author, category, blockContent, testimonial],
}
