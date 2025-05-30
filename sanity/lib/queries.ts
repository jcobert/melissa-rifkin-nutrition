import { groq } from 'next-sanity'

// POST
export const POSTS_QUERY = groq`*[_type == "post" && defined(slug)]{ ..., author->, mainImage{ ..., asset->, content[]{ ..., _type == "image" => { ..., asset-> } } }, body[]{ ..., _type == "videoEmbed" => { ..., file{ ..., asset-> } } } }`
export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug]{ ..., author->, mainImage{ ..., asset->, content[]{ ..., _type == "image" => { ..., asset-> } } }, body[]{ ..., _type == "videoEmbed" => { ..., file{ ..., asset-> } } } }[0]`

// BIO
export const BIOS_QUERY = groq`*[_type == "bio"]`
export const BIO_QUERY = groq`*[_type == "bio" && _id == $id][0]`

// RECIPE
const RECIPE_PART = groq`{ ..., mainImage{ ..., asset->, content[]{ ..., _type == "image" => { ..., asset-> } } }, additionalImages{ ..., asset->, content[]{ ..., _type == "image" => { ..., asset-> } } }[], introduction[]{ ..., _type == "videoEmbed" => { ..., file{ ..., asset-> } } }, postContent[]{ ..., _type == "videoEmbed" => { ..., file{ ..., asset-> } } }, nutritionInformation{ ..., info[]{ ..., _type == "videoEmbed" => { ..., file{ ..., asset-> } } } }, similarRecipes[]->, relatedPosts[]->, "comments": *[_type == "userComment" && references(^._id) && approved == true]}`
export const RECIPES_QUERY = groq`*[_type == "recipe" && defined(slug)]{ ..., mainImage{ ..., asset->, content[]{ ..., _type == "image" => { ..., asset-> } } }}`
export const RECIPES_QUERY_FULL =
  groq`*[_type == "recipe" && defined(slug)]`.concat(RECIPE_PART)
export const RECIPE_QUERY =
  groq`*[_type == "recipe" && slug.current == $slug]`.concat(RECIPE_PART, '[0]')
// export const RECIPE_QUERY = groq`*[_type == "recipe" && slug.current == $slug]{ ..., mainImage{ ..., asset->, content[]{ ..., _type == "image" => { ..., asset-> } } }, additionalImages{ ..., asset->, content[]{ ..., _type == "image" => { ..., asset-> } } }[], introduction[]{ ..., _type == "videoEmbed" => { ..., file{ ..., asset-> } } }, postContent[]{ ..., _type == "videoEmbed" => { ..., file{ ..., asset-> } } }, nutritionInformation{ ..., info[]{ ..., _type == "videoEmbed" => { ..., file{ ..., asset-> } } } }, similarRecipes[]->, relatedPosts[]->, "comments": *[_type == "userComment" && references(^._id) && approved == true]}[0]`

// USER COMMENT
export const USER_COMMENTS_QUERY = groq`*[_type == "userComment"]`

// TESTIMONIAL
export const TESTIMONIALS_QUERY = groq`*[_type == "testimonial"]`
export const TESTIMONIALS_BY_RELATIONSHIP_QUERY = groq`*[_type == "testimonial" && relationship == $relationship]`

// GENERAL
export const GENERAL_QUERY = groq`*[_type == "general"][0]`

// ABOUT PAGE
export const ABOUT_PAGE_QUERY = groq`*[_type == "aboutPage"]{ ..., bios[]{ ..., photo{ ..., asset-> }}-> }[0]`
