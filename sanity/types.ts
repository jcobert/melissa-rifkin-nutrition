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
  categories?: Array<SanityKeyedReference<Category>>
  publishedAt?: string
  body?: BlockContent
}

export interface Recipe extends SanityDocument {
  _type: 'recipe'
  title?: string
  slug?: { _type: 'slug'; current: string }
  mainImage?: {
    _type: 'image'
    asset: SanityImageAsset
    crop?: SanityImageCrop
    hotspot?: SanityImageHotspot
    alt?: string
  }
  categories?: Array<SanityKeyedReference<Category>>
  publishedAt?: string
  body?: BlockContent
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
export interface Category extends SanityDocument {
  _type: 'category'
  title?: string
  description?: string
}

/** Testimonial */
export interface Testimonial extends SanityDocument {
  _type: 'testimonial'
  name?: string
  location?: string
  testimonial?: string
}

export type BlockContent = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<{
      _type: 'image'
      asset: SanityReference<SanityImageAsset>
      crop?: SanityImageCrop
      hotspot?: SanityImageHotspot
      alt?: string
    }>
>

export type Documents = Post | Author | Category | Testimonial
