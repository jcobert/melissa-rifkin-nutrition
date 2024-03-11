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

export type Slug = { _type: 'slug'; current: string }

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
}

/** Recipe */
export interface Recipe extends SanityDocument {
  _type: 'recipe'
  title?: string
  slug?: { _type: 'slug'; current: string }
  publishedAt?: string
  mainImage?: {
    _type: 'image'
    asset: SanityImageAsset
    crop?: SanityImageCrop
    hotspot?: SanityImageHotspot
    alt?: string
  }
  category?: Array<string>
  tags?: Array<string>
  prepTime?: number
  cookTime?: number
  ingredientGroups?: Array<
    SanityKeyedReference<IngredientGroup> & IngredientGroup
  >
  instructions?: Array<SanityKeyedReference<Instruction> & Instruction>
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

export type IngredientMeasurement = {
  ingredientName?: Ingredient
  // ingredientName?: SanityReference<Ingredient>
  // ingredientName?: SanityReference<Ingredient> & Ingredient
  amount?: number
  unit?: keyof typeof RecipeUnit
  note?: string
}

export type Instruction = {
  title?: string
  description?: string
  ingredients?: Array<Ingredient>
  // ingredients?: Array<SanityKeyedReference<Ingredient> & Ingredient>
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
} & ContactInfo

export enum SocialNetworks {
  instagram = 'Instagram',
  facebook = 'Facebook',
  twitter = 'Twitter',
  pinterest = 'Pinterest',
  // iherb = 'iHerb',
}

export type SocialLinks = { [x in keyof typeof SocialNetworks]?: string }

export type BlockContent = Array<SanityKeyed<SanityBlock> | SanityKeyed<Image>>

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

/** AboutPage */
export interface AboutPage extends SanityDocument {
  _type: 'aboutPage'
  bios?: Array<Bio & { _ref: string; _key: string }>
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

export type DocumentType = Documents['_type']
