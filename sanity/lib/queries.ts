import { groq } from 'next-sanity'

// POST
export const POSTS_QUERY = groq`*[_type == "post" && defined(slug)]{ ..., author->, mainImage{ ..., asset-> } }`
export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug]{ ..., author-> }[0]`

// AUTHOR
export const AUTHORS_QUERY = groq`*[_type == "author"]`
export const AUTHOR_QUERY = groq`*[_type == "author" && _id == $id][0]`

// TESTIMONIAL
export const TESTIMONIALS_QUERY = groq`*[_type == "testimonial"]`
