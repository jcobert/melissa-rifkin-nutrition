import author from './schemas/author'
import blockContent from './schemas/blockContent'
import category from './schemas/category'
import post from './schemas/post'
import recipe from './schemas/recipe/recipe'
import recipeCategory from './schemas/recipe/recipe-category'
import recipeTag from './schemas/recipe/recipe-tag'
import testimonial from './schemas/testimonial'
import { type SchemaTypeDefinition } from 'sanity'

const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post,
    author,
    category,
    blockContent,
    testimonial,
    recipe,
    recipeCategory,
    recipeTag,
  ],
}
// const schema: SchemaTypeDefinition[] = [
//   post,
//   author,
//   category,
//   blockContent,
//   testimonial,
// ]

export default schema
