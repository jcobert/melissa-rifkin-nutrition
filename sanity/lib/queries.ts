import { groq } from 'next-sanity'

// POST
export const POSTS_QUERY = groq`*[_type == "post" && defined(slug)]{ ..., author->, mainImage{ ..., asset-> } }`
export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug]{ ..., author->, mainImage{ ..., asset->, content[]{ ..., _type == "image" => { ..., asset-> } } } }[0]`

// BIO
export const BIOS_QUERY = groq`*[_type == "bio"]`
export const BIO_QUERY = groq`*[_type == "bio" && _id == $id][0]`

// RECIPE
export const RECIPES_QUERY = groq`*[_type == "recipe" && defined(slug)]{ ..., mainImage{ ..., asset->, content[]{ ..., _type == "image" => { ..., asset-> } } }, ingredientGroups[]{ ..., ingredients[]{ ..., ingredientName-> } }, instructions[]{ ..., ingredients[]-> } }`
export const RECIPE_QUERY = groq`*[_type == "recipe" && slug.current == $slug]{ ..., mainImage{ ..., asset->, content[]{ ..., _type == "image" => { ..., asset-> } } }, ingredientGroups[]{ ..., ingredients[]{ ..., ingredientName-> } }, instructions[]{ ..., ingredients[]-> } }[0]`

// TESTIMONIAL
export const TESTIMONIALS_QUERY = groq`*[_type == "testimonial"]`

// GENERAL
export const GENERAL_QUERY = groq`*[_type == "general"][0]`

// ABOUT PAGE
export const ABOUT_PAGE_QUERY = groq`*[_type == "aboutPage"]{ ..., bios[]{ ..., photo{ ..., asset-> }}-> }[0]`
