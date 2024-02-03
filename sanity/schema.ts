import author from './schemas/author'
import blockContent from './schemas/blockContent'
import category from './schemas/category'
import post from './schemas/post'
import testimonial from './schemas/testimonial'
import { type SchemaTypeDefinition } from 'sanity'

const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author, category, blockContent, testimonial],
}
// const schema: SchemaTypeDefinition[] = [
//   post,
//   author,
//   category,
//   blockContent,
//   testimonial,
// ]

export default schema
