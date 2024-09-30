import { Metadata } from 'next'
import { QueryParams, SanityDocument } from 'next-sanity'
import { draftMode } from 'next/headers'
import React, { FC } from 'react'
import { client } from 'sanity-studio/lib/client'
import { RECIPES_QUERY, RECIPE_QUERY } from 'sanity-studio/lib/queries'
import { loadQuery } from 'sanity-studio/lib/store'
import { type Recipe } from 'sanity-studio/types'
import { Recipe as RecipeSchema, WithContext } from 'schema-dts'

import { getRecipeIngredients } from '@/utils/recipe'

import RecipeFull from '@/app/recipes/[slug]/recipe'
import RecipePreview from '@/app/recipes/[slug]/recipe-preview'
import { generatePageMeta } from '@/configuration/seo'
import { canonicalUrl } from '@/configuration/site'

export const dynamic = 'force-dynamic'
export const fetchCache = 'default-no-store'
export const revalidate = 10

export type PageProps = {
  params: { slug: string }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const slug = params?.slug
  const recipe = await client.fetch<SanityDocument<Recipe>>(RECIPE_QUERY, {
    slug,
  })

  const { title, category, mainImage, seoDescription } = recipe || {}

  return generatePageMeta({
    title,
    description: seoDescription || 'An easy and delicious recipe.',
    category: `${category?.join(', ')} recipe`,
    images: [
      {
        url: mainImage?.asset?.url || '',
        width: mainImage?.asset?.metadata?.dimensions?.width,
        height: mainImage?.asset?.metadata?.dimensions?.height,
        alt: mainImage?.alt,
      },
    ],
    url: canonicalUrl(`/recipes/${slug}`),
  })
}

export async function generateStaticParams() {
  const recipes = await client.fetch<SanityDocument<Recipe>[]>(RECIPES_QUERY)
  return recipes?.map((recipe) => ({
    slug: recipe?.slug?.current,
  }))
}

/** Dynamic route for a single recipe. */
const RecipePage: FC<{ params: QueryParams }> = async ({ params }) => {
  const initial = await loadQuery<SanityDocument<Recipe>>(
    RECIPE_QUERY,
    params,
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
      next: { revalidate: 10 },
      cache: 'no-store',
    },
  )

  const { title, category, instructions, mainImage } = initial?.data || {}

  const schemaInstructions: RecipeSchema['recipeInstructions'] =
    instructions?.map((inst, i) => {
      const stepNum = i + 1
      const stepText = inst?.description
      return {
        '@type': 'HowTo',
        step: {
          '@type': 'HowToStep',
          position: stepNum,
          itemListElement: [
            { '@type': 'HowToDirection', position: 1, text: stepText },
          ],
        },
      }
    })

  const schemaIngredients = getRecipeIngredients(initial?.data)?.map(
    (ing) => ing || '',
  )

  const jsonLd: WithContext<RecipeSchema> = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: title,
    image: {
      '@type': 'ImageObject',
      contentUrl: mainImage?.asset?.url,
      name: mainImage?.alt,
    },
    recipeCategory: category,
    recipeInstructions: schemaInstructions,
    recipeIngredient: schemaIngredients,
    // prepTime,
    // cookTime,
  }

  return draftMode().isEnabled ? (
    <RecipePreview initial={initial} params={params} />
  ) : (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RecipeFull recipe={initial?.data} />
    </>
  )
}

export default RecipePage
