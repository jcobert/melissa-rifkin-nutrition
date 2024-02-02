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

/**
 * Post
 */
export interface Post extends SanityDocument {
  _type: 'post'

  /**
   * Title — `string`
   */
  title?: string

  /**
   * Slug — `slug`
   */
  slug?: { _type: 'slug'; current: string }

  /**
   * Author — `reference`
   */
  author?: Author

  /**
   * Main image — `image`
   */
  mainImage?: {
    _type: 'image'
    asset: SanityImageAsset
    crop?: SanityImageCrop
    hotspot?: SanityImageHotspot

    /**
     * Alternative Text — `string`
     */
    alt?: string
  }

  /**
   * Categories — `array`
   */
  categories?: Array<SanityKeyedReference<Category>>

  /**
   * Published at — `datetime`
   */
  publishedAt?: string

  /**
   * Body — `blockContent`
   */
  body?: BlockContent
}

/**
 * Author
 */
export interface Author extends SanityDocument {
  _type: 'author'

  /**
   * Name — `string`
   */
  name?: string

  /**
   * Slug — `slug`
   */
  slug?: { _type: 'slug'; current: string }

  /**
   * Image — `image`
   */
  image?: {
    _type: 'image'
    asset: SanityReference<SanityImageAsset>
    crop?: SanityImageCrop
    hotspot?: SanityImageHotspot

    /**
     * Alternative Text — `string`
     */
    alt?: string
  }

  /**
   * Bio — `array`
   */
  bio?: Array<SanityKeyed<SanityBlock>>
}

/**
 * Category
 */
export interface Category extends SanityDocument {
  _type: 'category'

  /**
   * Title — `string`
   */
  title?: string

  /**
   * Description — `text`
   */
  description?: string
}

/**
 * Testimonial
 */
export interface Testimonial extends SanityDocument {
  _type: 'testimonial'

  /**
   * Name — `string`
   */
  name?: string

  /**
   * Location — `string`
   */
  location?: string

  /**
   * Testimonial — `text`
   */
  testimonial?: string
}

export type BlockContent = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<{
      _type: 'image'
      asset: SanityReference<SanityImageAsset>
      crop?: SanityImageCrop
      hotspot?: SanityImageHotspot

      /**
       * Alternative Text — `string`
       */
      alt?: string
    }>
>

export type Documents = Post | Author | Category | Testimonial
