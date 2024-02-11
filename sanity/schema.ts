import blockContent from './schemas/blockContent'
import author from './schemas/blog/author'
import post from './schemas/blog/post'
// import category from './schemas/category'
import recipe from './schemas/recipe/recipe'
// import recipeCategory from './schemas/recipe/recipe-category'
// import recipeTag from './schemas/recipe/recipe-tag'
import testimonial from './schemas/testimonial'
import { type SchemaTypeDefinition } from 'sanity'
import ingredient from 'sanity-studio/schemas/recipe/ingredient'
import ingredientGroup from 'sanity-studio/schemas/recipe/ingredient-group'
import ingredientMeasurement from 'sanity-studio/schemas/recipe/ingredient-measurement'
import instruction from 'sanity-studio/schemas/recipe/instruction'

const schema: SchemaTypeDefinition[] = [
  post,
  author,
  // category,
  blockContent,
  testimonial,
  recipe,
  // recipeCategory,
  // recipeTag,
  ingredient,
  ingredientGroup,
  instruction,
  ingredientMeasurement,
]

export default schema
