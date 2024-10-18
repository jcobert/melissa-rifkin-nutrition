import { toPlainText } from '@portabletext/react'
import { format } from 'date-fns'
import { Metadata } from 'next'
import { QueryParams, SanityDocument } from 'next-sanity'
import { draftMode } from 'next/headers'
import React, { FC } from 'react'
import { client } from 'sanity-studio/lib/client'
import { RECIPES_QUERY, RECIPE_QUERY } from 'sanity-studio/lib/queries'
import { loadQuery } from 'sanity-studio/lib/store'
import { type Recipe } from 'sanity-studio/types'
import { ImageObject, Recipe as RecipeSchema, WithContext } from 'schema-dts'

import { exists } from '@/utils/general'
import { displayIngredient, formatCookTime } from '@/utils/recipe'
import { getTags } from '@/utils/string'

import RecipeFull from '@/app/(main)/recipes/[slug]/recipe'
import RecipePreview from '@/app/(main)/recipes/[slug]/recipe-preview'
import { generatePageMeta } from '@/configuration/seo'
import { canonicalUrl, siteConfig } from '@/configuration/site'

// export const dynamic = 'force-dynamic'
// export const fetchCache = 'default-no-store'
// export const revalidate = 60

export type PageProps = {
  params: { slug: string }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const slug = params?.slug
  const recipe = await client.fetch<SanityDocument<Recipe>>(
    RECIPE_QUERY,
    {
      slug,
    },
    {
      next: { revalidate: 60 },
      // cache: 'no-store'
    },
  )

  const { title, category, mainImage, seoDescription } = recipe || {}

  return generatePageMeta({
    title,
    description:
      seoDescription ||
      `An easy and delicious${title ? ` ${title}` : ''} recipe.`,
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
      next: { revalidate: 60 },
      // cache: 'no-store',
    },
  )

  const {
    slug,
    title,
    category,
    filterTags,
    instructions,
    ingredientGroups,
    mainImage,
    prepTime,
    cookTime,
    servings,
    seoDescription,
    cuisines,
    nutritionInformation,
    _createdAt,
    additionalImages,
    // seoTags,
  } = initial?.data || {}

  const schemaInstructions: RecipeSchema['recipeInstructions'] = instructions
    ? instructions?.map((inst, i) => {
        const stepNum = i + 1
        const stepText = inst?.description
        return {
          '@type': 'HowToStep',
          name: inst?.title,
          text: stepText,
          position: stepNum,
          url: canonicalUrl(`/recipes/${slug?.current}#step${stepNum}`),
          image: inst?.stepImage?.asset?.url || undefined,
        }
        // return {
        //   '@type': 'HowTo',
        //   step: {
        //     '@type': 'HowToStep',
        //     position: stepNum,
        //     name: inst?.title,
        //     itemListElement: [
        //       { '@type': 'HowToDirection', position: 1, text: stepText },
        //     ],
        //   },
        // }
      })
    : undefined

  const schemaIngredients = ingredientGroups
    ? initial?.data?.ingredientGroups
        ?.filter((group) => !!group?.ingredients?.length)
        ?.flatMap((group) =>
          (group?.ingredients || [])?.map((ing) => displayIngredient(ing)),
        )
    : undefined

  const schemaPrepTime = formatCookTime(prepTime)
  const schemaCookTime = formatCookTime(cookTime)
  const schemaTotalTime = formatCookTime((prepTime || 0) + (cookTime || 0))

  const keywords = filterTags ? getTags(filterTags) : undefined

  const schemaAdditionalImages =
    (additionalImages || [])?.map(
      (img) =>
        ({
          '@type': 'ImageObject',
          contentUrl: img?.asset?.url,
          url: img?.asset?.url,
          name: img?.alt || title,
        }) as ImageObject,
    ) || []

  const schemaImages = [
    {
      '@type': 'ImageObject',
      contentUrl: mainImage?.asset?.url,
      url: mainImage?.asset?.url,
      name: mainImage?.alt || title,
    } as ImageObject,
    ...schemaAdditionalImages,
  ]

  const jsonLd: WithContext<RecipeSchema> = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: title,
    author: { '@type': 'Person', name: siteConfig?.primaryContentAuthor },
    datePublished: format(_createdAt, 'yyy-MM-dd'),
    image: schemaImages,
    // image: {
    //   '@type': 'ImageObject',
    //   // contentUrl: mainImage?.asset?.url,
    //   url: mainImage?.asset?.url,
    //   name: mainImage?.alt || title,
    // },
    recipeCategory: category || undefined,
    recipeInstructions: schemaInstructions,
    recipeIngredient: schemaIngredients,
    prepTime: schemaPrepTime,
    cookTime: schemaCookTime,
    totalTime: schemaTotalTime,
    recipeYield: exists(servings?.quantity)
      ? `${servings?.quantity} ${servings?.unit}`
      : undefined,
    recipeCuisine: cuisines?.length
      ? getTags(cuisines, { titleCase: true })?.join(', ')
      : undefined,
    description:
      seoDescription ||
      `An easy and delicious${title ? ` ${title}` : ''} recipe.`,
    nutrition: {
      '@type': 'NutritionInformation',
      description: nutritionInformation?.info
        ? toPlainText(nutritionInformation?.info)
        : undefined,
      servingSize: nutritionInformation?.servingSize ?? undefined,
      calories: exists(nutritionInformation?.calories)
        ? `${nutritionInformation?.calories} calories`
        : undefined,
      carbohydrateContent: exists(nutritionInformation?.carbohydrates)
        ? `${nutritionInformation?.carbohydrates} g`
        : undefined,
      sodiumContent: exists(nutritionInformation?.sodium)
        ? `${nutritionInformation?.sodium} mg`
        : undefined,
      sugarContent: exists(nutritionInformation?.sugar)
        ? `${nutritionInformation?.sugar} g`
        : undefined,
      proteinContent: exists(nutritionInformation?.protein)
        ? `${nutritionInformation?.protein} g`
        : undefined,
      fatContent: exists(nutritionInformation?.fat)
        ? `${nutritionInformation?.fat} g`
        : undefined,
      saturatedFatContent: exists(nutritionInformation?.saturatedFat)
        ? `${nutritionInformation?.saturatedFat} g`
        : undefined,
      unsaturatedFatContent: exists(nutritionInformation?.unsaturatedFat)
        ? `${nutritionInformation?.unsaturatedFat} g`
        : undefined,
      transFatContent: exists(nutritionInformation?.transFat)
        ? `${nutritionInformation?.transFat} g`
        : undefined,
      cholesterolContent: exists(nutritionInformation?.cholesterol)
        ? `${nutritionInformation?.cholesterol} mg`
        : undefined,
      fiberContent: exists(nutritionInformation?.fiber)
        ? `${nutritionInformation?.fiber} g`
        : undefined,
    },
    keywords,
  }

  /** @TODO add a second schema for blog post? */

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
