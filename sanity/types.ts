import { SanityFileAsset } from '@sanity/asset-utils'
import type {
  SanityAsset,
  SanityBlock,
  SanityDocument,
  SanityFile,
  SanityGeoPoint,
  SanityImage,
  SanityImageAsset,
  SanityImageCrop,
  SanityImageDimensions,
  SanityImageHotspot,
  SanityImageMetadata,
  SanityImagePalette,
  SanityImagePaletteSwatch,
  SanityKeyed,
  SanityKeyedReference,
  SanityReference,
} from 'sanity-codegen'

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
}

export type Image = {
  _type: 'image'
  asset: SanityImageAsset
  crop?: SanityImageCrop
  hotspot?: SanityImageHotspot
  alt?: string
}

export type VideoEmbed = {
  _type: 'videoEmbed'
  file: { _type: string; asset: SanityFileAsset }
  alt?: string
}

export type BlockLink = {
  _type: 'blockLink'
  _key: string
  url: string
  external?: boolean
  noFollow?: boolean
  sponsored?: boolean
  newTab?: boolean
}

export type Tag = { label: string; value: string }

export type Slug = { _type: 'file'; current: string }

/** Post */
export interface Post extends SanityDocument {
  _type: 'post'
  title?: string
  slug?: { _type: 'slug'; current: string }
  author?: Author
  mainImage?: {
    _type: 'image'
    asset: SanityImageAsset
    crop?: SanityImageCrop
    hotspot?: SanityImageHotspot
    alt?: string
  }
  tags?: Array<string>
  // categories?: Array<SanityKeyedReference<Category>>
  publishedAt?: string
  body?: BlockContent
  external?: boolean
  externalUrl?: string
  seoDescription?: string
}

/** Recipe */
export interface Recipe extends SanityDocument {
  _type: 'recipe'
  title?: string
  seoDescription?: string
  slug?: { _type: 'slug'; current: string }
  publishedAt?: string
  mainImage?: Image
  additionalImages?: Image[]
  category?: Array<string>
  filterTags?: Tag[]
  seoTags?: Array<string>
  cuisines?: Tag[]
  prepTime?: number
  cookTime?: number
  servings?: { quantity?: number; unit?: string }
  layout?: 'advanced' | 'basic'
  body?: BlockContent
  ingredientGroups?: Array<
    SanityKeyedReference<IngredientGroup> & IngredientGroup
  >
  instructions?: Array<SanityKeyedReference<Instruction> & Instruction>
  nutritionInformation?: NutritionInformation
  introduction?: BlockContent
  postContent?: BlockContent
  // howToStore?: BlockWithHeading
  // tipsAndTricks?: BlockWithHeading
  // faqSet?: FaqSet[]
  similarRecipes?: Recipe[]
  relatedPosts?: Post[]
  comments?: UserComment[]
}

export type FaqSet = SanityKeyed<{
  question?: string
  answer?: BlockContent
}>

export type BlockWithHeading = {
  heading?: string
  body?: BlockContent
}

export interface Ingredient extends SanityDocument {
  _type: 'ingredient'
  name?: string
  alternativeNames?: Array<string>
}

export type IngredientGroup = {
  title?: string
  ingredients?: Array<IngredientMeasurement>
}

export type IngredientMeasurement = SanityKeyed<{
  ingredientName?: string
  // ingredientName?: Ingredient
  // ingredientName?: SanityReference<Ingredient>
  // ingredientName?: SanityReference<Ingredient> & Ingredient
  amount?: number
  unit?: keyof typeof RecipeUnit
  note?: string
  _type?: 'ingredientMeasurement'
}>

export type Instruction = {
  title?: string
  description?: string
  ingredients?: Array<IngredientMeasurement>
  // ingredients?: Array<SanityKeyedReference<Ingredient> & Ingredient>
}

export type NutritionInformation = {
  info?: BlockContent
  servingSize?: string
  calories?: number
  carbohydrates?: number
  /** mg */
  sodium?: number
  sugar?: number
  protein?: number
  fat?: number
  saturatedFat?: number
  unsaturatedFat?: number
  transFat?: number
  /** mg */
  cholesterol?: number
  fiber?: number
}

export enum NutritionMetric {
  servingSize = 'Serving Size',
  calories = 'Calories',
  carbohydrates = 'Carbohydrates',
  sodium = 'Sodium',
  sugar = 'Sugar',
  protein = 'Protein',
  fat = 'Fat',
  saturatedFat = 'Saturated Fat',
  unsaturatedFat = 'Unsaturated Fat',
  transFat = 'Trans Fat',
  cholesterol = 'Cholesterol',
  fiber = 'Fiber',
}

export enum RecipeUnit {
  tsp = 'tsp',
  tbsp = 'tbsp',
  cup = 'cup',
  pound = 'lb',
  ounce = 'oz',
  pinch = 'pinch',
}

export enum RecipeCategory {
  breakfast = 'Breakfast',
  lunch = 'Lunch',
  dinner = 'Dinner',
  dessert = 'Dessert',
  side = 'Side Dish',
  snack = 'Snack',
}

/** Author */
export interface Author extends SanityDocument {
  _type: 'author'
  name?: string
  slug?: { _type: 'slug'; current: string }
  image?: {
    _type: 'image'
    asset: SanityReference<SanityImageAsset>
    crop?: SanityImageCrop
    hotspot?: SanityImageHotspot
    alt?: string
  }
  bio?: Array<SanityKeyed<SanityBlock>>
}

export type UserCommentBase = {
  _type: 'userComment'
  name?: string
  email?: string
  comment?: string
  approved?: boolean
  postType?: 'blog' | 'recipe'
  sourceBlogPost?: SanityReference<Post>
  sourceRecipe?: SanityReference<Recipe>
}

/** User Comment */
export type UserComment = SanityDocument & UserCommentBase

export type UserCommentPayload = Omit<
  UserCommentBase,
  'sourceBlogPost' | 'sourceRecipe'
> & {
  sourceBlogPost?: SanityReference<Post>
  sourceRecipe?: SanityReference<Recipe>
}

/** Category */
// export interface Category extends SanityDocument {
//   _type: 'category'
//   title?: string
//   description?: string
// }

/** Testimonial */
export interface Testimonial extends SanityDocument {
  _type: 'testimonial'
  name?: string
  location?: string
  testimonial?: string
  relationship?: 'client' | 'partner'
  company?: string
  position?: string
}

/** General Info/Settings */
export type General = SanityDocument & {
  _type: 'general'
  title?: string
  socialLinks?: SocialLinks
  privacyPolicy?: BlockContent
  termsAndConditions?: BlockContent
  accessibility?: BlockContent
} & ContactInfo

export enum SocialNetworks {
  instagram = 'Instagram',
  facebook = 'Facebook',
  twitter = 'Twitter',
  pinterest = 'Pinterest',
  tiktok = 'TikTok',
  // iherb = 'iHerb',
}

export type SocialLinks = { [x in keyof typeof SocialNetworks]?: string }

export type BlockContent = Array<
  SanityKeyed<SanityBlock> | SanityKeyed<Image> | SanityKeyed<VideoEmbed>
>

export type ContactInfo = {
  email?: string
  phone?: string
}

/** Bio */
export interface Bio extends SanityDocument {
  _type: 'bio'
  name?: string
  slug?: Slug
  photo?: Image
  background?: BlockContent
  contactInfo?: ContactInfo
  socialLinks?: SocialLinks
}

/** About Page */
export interface AboutPage extends SanityDocument {
  _type: 'aboutPage'
  bios?: Array<Bio & { _ref: string; _key: string }>
}

export type FeatureFlagKey = 'meal-plans'

export type FeatureFlag = {
  title: string
  key: FeatureFlagKey
  description: string
  status: boolean
}

/** Feature Flags */
export interface FeatureFlags extends SanityDocument {
  _type: 'featureFlags'
  flags?: Array<FeatureFlag>
}

export type Documents =
  | Post
  | Author
  | Testimonial
  | Recipe
  | Ingredient
  | General
  | Bio
  | AboutPage
  | FeatureFlags
  | UserComment

export type DocumentType = Documents['_type']
