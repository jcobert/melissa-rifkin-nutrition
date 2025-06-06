import { MetadataRoute } from 'next'
import { SanityDocument } from 'next-sanity'
import { POSTS_QUERY, RECIPES_QUERY } from 'sanity-studio/lib/queries'
import { loadQuery } from 'sanity-studio/lib/store'
import { Post, Recipe } from 'sanity-studio/types'

import { getCollectionProducts } from '@/lib/shopify'

export const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const BASE_URL = process.env.SITE_BASE_URL || ''

  // Generate Dynamic Blog Post Paths
  const postPaths: string[] = []
  const posts = await loadQuery<SanityDocument<Post>[]>(
    POSTS_QUERY,
    {},
    {
      perspective: 'published',
    },
  )
  posts?.data?.forEach((post) =>
    postPaths.push(`blog/${post?.slug?.current || ''}`),
  )
  const dynamicPosts = postPaths?.map(
    (path) =>
      ({
        url: `${BASE_URL}/${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.5,
      }) as MetadataRoute.Sitemap[number],
  )

  // Generate Dynamic Recipe Paths
  const recipePaths: string[] = []
  const recipes = await loadQuery<SanityDocument<Recipe>[]>(
    RECIPES_QUERY,
    {},
    {
      perspective: 'published',
    },
  )
  recipes?.data?.forEach((recipe) =>
    recipePaths.push(`recipes/${recipe?.slug?.current || ''}`),
  )
  const dynamicRecipes = recipePaths?.map(
    (path) =>
      ({
        url: `${BASE_URL}/${path}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      }) as MetadataRoute.Sitemap[number],
  )

  // Generate Dynamic Book Paths
  /**
   * @todo Remove once production store is in use.
   */
  const collection = process.env.NODE_ENV === 'production' ? 'books' : 'books-1'
  const books = await getCollectionProducts({
    collection,
  })

  const bookPaths: string[] = []
  books?.forEach((book) =>
    bookPaths.push(`resources/books/${book?.handle || ''}`),
  )
  const dynamicBooks = bookPaths?.map(
    (path) =>
      ({
        url: `${BASE_URL}/${path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      }) as MetadataRoute.Sitemap[number],
  )

  // Generate Dynamic Printable Paths
  const printables = await getCollectionProducts({
    collection: 'printables',
  })

  const printablePaths: string[] = []
  printables?.forEach((printable) =>
    printablePaths.push(`resources/printables/${printable?.handle || ''}`),
  )
  const dynamicPrintables = printablePaths?.map(
    (path) =>
      ({
        url: `${BASE_URL}/${path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      }) as MetadataRoute.Sitemap[number],
  )

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/about/partnerships`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/recipes`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/resources/printables`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/resources/books`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...dynamicPosts,
    ...dynamicRecipes,
    ...dynamicBooks,
    ...dynamicPrintables,
  ]
}

export default sitemap
