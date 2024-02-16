import blockContent from './schemas/blockContent'
import author from './schemas/blog/author'
import post from './schemas/blog/post'
import recipe from './schemas/recipe/recipe'
import testimonial from './schemas/testimonial'
import { type SchemaTypeDefinition } from 'sanity'
import general from 'sanity-studio/schemas/general'
import ingredient from 'sanity-studio/schemas/recipe/ingredient'
import ingredientGroup from 'sanity-studio/schemas/recipe/ingredient-group'
import ingredientMeasurement from 'sanity-studio/schemas/recipe/ingredient-measurement'
import instruction from 'sanity-studio/schemas/recipe/instruction'

const schema: SchemaTypeDefinition[] = [
  post,
  author,
  blockContent,
  testimonial,
  recipe,
  ingredient,
  ingredientGroup,
  instruction,
  ingredientMeasurement,
  general,
]

export default schema
