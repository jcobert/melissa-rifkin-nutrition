import blockContent from './schemas/blockContent'
import author from './schemas/blog/author'
import post from './schemas/blog/post'
import recipe from './schemas/recipe/recipe'
import testimonial from './schemas/testimonial'
import { type SchemaTypeDefinition } from 'sanity'
import aboutPage from 'sanity-studio/schemas/about/aboutPage'
import bio from 'sanity-studio/schemas/about/bio'
import contactInfo from 'sanity-studio/schemas/contactInfo'
import faq from 'sanity-studio/schemas/faq'
import featureFlags from 'sanity-studio/schemas/featureFlags'
import general from 'sanity-studio/schemas/general'
import ingredient from 'sanity-studio/schemas/recipe/ingredient'
import ingredientGroup from 'sanity-studio/schemas/recipe/ingredient-group'
import ingredientMeasurement from 'sanity-studio/schemas/recipe/ingredient-measurement'
import instruction from 'sanity-studio/schemas/recipe/instruction'
import nutrition from 'sanity-studio/schemas/recipe/nutrition'
import socialLinks from 'sanity-studio/schemas/socialLinks'
import video from 'sanity-studio/schemas/video'

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
  nutrition,
  general,
  bio,
  contactInfo,
  socialLinks,
  aboutPage,
  video,
  featureFlags,
  faq,
]

export default schema
