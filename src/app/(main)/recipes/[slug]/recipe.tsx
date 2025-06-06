'use client'

import imageUrlBuilder from '@sanity/image-url'
import { format } from 'date-fns'
import { omit, sortBy } from 'lodash'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { FC, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { dataset, projectId } from 'sanity-studio/env'
import {
  NutritionInformation,
  NutritionMetric,
  type Recipe,
} from 'sanity-studio/types'

import { getTags } from '@/utils/string'

import PageLayout from '@/components/common/layout/page-layout'
import Back from '@/components/common/links/back'
import Logo, { logos } from '@/components/common/logo'
import PortableBlockContent from '@/components/common/portable/portable-block-content'
import Tag from '@/components/common/tag'
import IngredientTooltip from '@/components/features/recipe/ingredient-tooltip'
import Measurement from '@/components/features/recipe/measurement'
import NutritionInfo from '@/components/features/recipe/nutrition-info'
import RecipeComments from '@/components/features/recipe/sections/comments-and-rating/recipe-comments'
import RecipeSection from '@/components/features/recipe/sections/recipe-section'
import RelatedPosts from '@/components/features/recipe/sections/related-posts'
import ShareBar from '@/components/share-bar'

const builder = imageUrlBuilder({ projectId, dataset })

type Props = {
  recipe: Recipe
}

const Recipe: FC<Props> = ({ recipe }) => {
  const {
    title,
    publishedAt,
    mainImage,
    ingredientGroups,
    instructions,
    filterTags,
  } = recipe || {}
  const printContentRef = useRef(null)
  const handlePrint = useReactToPrint({
    content: () => printContentRef.current,
  })
  const pathName = usePathname()
  const url = `${process.env.NEXT_PUBLIC_SITE_BASE_URL}${pathName}`

  const imgSrc = mainImage
    ? builder
        .image(mainImage)
        .width(600)
        .height(600)
        .fit('crop')
        .crop('focalpoint')
        .quality(80)
        .url()
    : ''

  const logo = logos?.full

  const tags = getTags(filterTags)

  const nutritionMetrics = omit(recipe?.nutritionInformation, [
    'info',
    '_type',
  ] satisfies (keyof (NutritionInformation & { _type: string }))[])

  return (
    <PageLayout className='flex flex-col items-center text-almost-black'>
      <Back href='/recipes' text='All Recipes' />

      <div
        ref={printContentRef}
        className='my-8 md:my-16 flex flex-col items-center gap-8 lg:gap-10 w-full print:layout print:my-2'
      >
        <div className='hidden print:block'>
          <img
            alt='logo'
            src={logo?.src}
            width={logo?.width}
            height={logo?.height}
          />
        </div>

        {/* Heading */}
        <section className='flex max-md:flex-col print:flex-row w-full items-center md:items-end print:items-end gap-y-4 gap-x-6 pb-4 md:self-start print:self-start md:px-8'>
          {mainImage ? (
            <Image
              priority
              src={imgSrc}
              alt={mainImage?.alt || ''}
              width={600}
              height={600}
              className='w-3/4 max-w-64 sm:w-64 object-cover rounded border-2'
            />
          ) : (
            <Logo
              variant='small'
              imageProps={{
                width: 200,
                height: 200,
                className:
                  'w-3/4 max-w-64 sm:w-64 object-cover rounded border-2 p-6',
              }}
            />
          )}
          <div className='max-md:text-center prose'>
            {/* Title */}
            {title ? (
              <h1 className='text-2xl__ sm:text-4xl max-w-prose font-semibold font-prata text-balance'>
                {title}
              </h1>
            ) : null}
            {/* Date */}
            {publishedAt ? (
              <p className='text-brand-gray-medium text-sm'>
                {format(publishedAt, 'MMM dd, yyyy')}
              </p>
            ) : null}
          </div>
        </section>

        <span
          aria-hidden
          className='h-px max-md:w-1/3 print:w-full w-full border-b mx-auto -my-4'
        />

        {/* Toolbar */}
        <ShareBar
          url={url}
          printHandler={handlePrint}
          mainImage={recipe?.mainImage}
        />

        {/* Introduction */}
        {recipe?.introduction ? (
          <RecipeSection content={{ body: recipe?.introduction }} />
        ) : null}

        {/* Ingredients */}
        {recipe?.ingredientGroups?.length ? (
          <RecipeSection
            content={{ heading: 'Ingredients' }}
            className='print:break-inside-avoid-page'
            hideDivider={!!recipe?.prepTime || !!recipe?.cookTime}
          >
            <>
              <div className='grid__ not-prose flex max-md:flex-col gap-x-4 gap-y-6 max-md:grid-cols-1 print:grid-cols-2__ md:grid-flow-col md:min-w-96 print:flex'>
                {ingredientGroups?.map((group) => (
                  <div
                    key={group?._key}
                    className='px-2 sm:px-4 flex-1 py-1 border rounded bg-almost-white print:bg-transparent print:flex-auto'
                  >
                    {ingredientGroups?.length > 1 && group?.title ? (
                      <h3 className='text-xl font-semibold mb-2 text-brand'>
                        {group?.title}
                      </h3>
                    ) : null}
                    <ul className='flex flex-col gap-4 divide-y-1'>
                      {group?.ingredients
                        ?.filter((ingredient) => ingredient?.ingredientName)
                        ?.map((ing, i) => (
                          <li
                            key={`${ing?.ingredientName}-${i}`}
                            className='flex flex-col__ -mb-3 pt-1 last-of-type:mb-0 items-center gap-1 flex-wrap text-brand-gray-dark'
                            aria-label={`${ing?.amount ?? ''} ${ing?.unit ?? ''} ${ing?.ingredientName ?? ''}${ing?.note ? `, ${ing?.note}` : ''}`}
                          >
                            <Measurement measurement={ing} aria-hidden />
                            <p
                              className='text-brand-gray-medium text-sm text-balance'
                              aria-hidden
                            >
                              {ing?.note}
                            </p>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          </RecipeSection>
        ) : null}

        {/* Time and Servings */}
        {recipe?.prepTime || recipe?.cookTime || !!recipe?.servings ? (
          <RecipeSection className='sm:-mt-8 -mt-4'>
            <div className='border rounded bg-gray-50 py-2 px-4 sm:w-fit'>
              {recipe?.prepTime ? (
                <>
                  <span className='sr-only'>{`Prep Time: ${recipe?.prepTime} min`}</span>
                  <div className='flex items-center gap-2' aria-hidden>
                    <span>Prep Time:</span>
                    <span className='text-lg_ leading-8__'>{`${recipe?.prepTime} min`}</span>
                  </div>
                </>
              ) : null}

              {recipe?.cookTime ? (
                <>
                  <span className='sr-only'>{`Cook Time: ${recipe?.cookTime} min`}</span>
                  <div className='flex items-center gap-2' aria-hidden>
                    <span>Cook Time:</span>
                    <span className='text-lg_ leading-8__'>{`${recipe?.cookTime} min`}</span>
                  </div>
                </>
              ) : null}

              {recipe?.prepTime || recipe?.cookTime ? (
                <>
                  <span className='sr-only'>{`Total Time: ${(recipe?.cookTime || 0) + (recipe?.prepTime || 0)} min`}</span>
                  <div className='flex items-center gap-2' aria-hidden>
                    <span>Total Time:</span>
                    <span className='text-lg_ leading-8__'>{`${(recipe?.cookTime || 0) + (recipe?.prepTime || 0)} min`}</span>
                  </div>
                </>
              ) : null}

              {recipe?.servings ? (
                <>
                  <span className='sr-only'>{`Yields: ${recipe?.servings?.quantity} ${recipe?.servings?.unit}`}</span>
                  <div className='flex items-center gap-2' aria-hidden>
                    <span>Yields:</span>
                    <span className='text-lg_ leading-8__'>{`${recipe?.servings?.quantity} ${recipe?.servings?.unit}`}</span>
                  </div>
                </>
              ) : null}
            </div>
          </RecipeSection>
        ) : null}

        {/* Instructions */}
        {recipe?.instructions?.length ? (
          <RecipeSection
            content={{ heading: 'Steps' }}
            className='print:break-inside-avoid-page'
          >
            <div className='flex flex-col gap-y-8 sm:gap-y-12 not-prose'>
              {instructions?.map((inst, step) => (
                <>
                  {/* Empty div added for step anchor links. */}
                  <div
                    id={`step${step + 1}`}
                    aria-hidden
                    // Margins and padding added to offset the gap from parent div.
                    className='invisible -mt-16 sm:-mt-24 pb-8 sm:pb-12'
                  />
                  <div
                    key={inst?._key}
                    className='px-2 sm:px-4 flex max-sm:flex-col sm:items-center gap-x-4 md:gap-x-10  gap-y-6 print:gap-x-10 print:break-inside-avoid-page'
                  >
                    {/* ingredient group */}
                    {inst?.ingredients?.length ? (
                      <div className='flex flex-col gap-2 border-y py-2'>
                        {inst?.title ||
                        (!inst?.title && !!inst?.ingredients?.length) ? (
                          inst?.title ? (
                            <h3 className='font-medium text-brand uppercase'>
                              {inst?.title}
                              {/* {inst?.title || (step === 0 ? 'First' : 'Next')} */}
                            </h3>
                          ) : null
                        ) : null}
                        <div className='flex flex-col'>
                          {inst?.ingredients?.map((ingredient) => {
                            return ingredient?.note ? (
                              <IngredientTooltip
                                key={ingredient?._key}
                                ingredient={ingredient}
                                triggerProps={{ className: 'w-fit' }}
                              />
                            ) : (
                              <Measurement
                                key={ingredient?._key}
                                measurement={ingredient}
                                ingredientClassName='font-normal'
                              />
                            )
                          })}
                        </div>
                      </div>
                    ) : null}
                    {/* directions */}
                    <div className='flex gap-6 sm:pl-16 print:pl-0'>
                      <h4 className='text-4xl font-bold text-brand'>
                        {step + 1}
                      </h4>
                      <p className='text-pretty max-w-prose'>
                        {inst?.description}
                      </p>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </RecipeSection>
        ) : null}

        {/* Post Content */}
        {recipe?.postContent ? (
          <RecipeSection
            content={{ body: recipe?.postContent }}
            className='-mt-16'
          />
        ) : null}

        {/* Tips */}
        {/* <RecipeSection content={recipe?.tipsAndTricks} /> */}

        {/* How to store */}
        {/* <RecipeSection content={recipe?.howToStore} /> */}

        {/* Nutrition Info */}
        {recipe?.nutritionInformation ? (
          <RecipeSection content={{ heading: 'Nutrition' }}>
            {Object.keys(nutritionMetrics)?.length ? (
              <dl className='flex flex-wrap sm:items-center max-sm:flex-col gap-x-6 gap-y-2 border rounded bg-gray-50 py-2 px-4 sm:w-fit'>
                {sortBy(Object.keys(nutritionMetrics), (metric) =>
                  Object.keys(NutritionMetric)?.findIndex((m) => m === metric),
                )?.map((metric, i) => (
                  <div key={metric} className='flex items-center gap-x-6'>
                    <NutritionInfo
                      nutritionInfo={recipe?.nutritionInformation || {}}
                      metric={metric as keyof typeof NutritionMetric}
                    />
                    {i < Object.keys(nutritionMetrics).length - 1 ? (
                      <span className='text-gray-300 max-sm:hidden' aria-hidden>
                        |
                      </span>
                    ) : null}
                  </div>
                ))}
              </dl>
            ) : null}

            {recipe?.nutritionInformation?.info ? (
              <div className='max-w-prose mx-auto'>
                <PortableBlockContent
                  value={recipe?.nutritionInformation?.info}
                />
              </div>
            ) : null}
          </RecipeSection>
        ) : null}

        {/** @TODO Look into expanding all accordion sections on print.  */}
        {/* FAQ */}
        {/* {recipe?.faqSet ? (
          <RecipeSection content={{ heading: 'FAQ' }} hideDivider>
            <div className='not-prose'>
              <RecipeFaq faqSet={recipe?.faqSet} />
            </div>
          </RecipeSection>
        ) : null} */}

        <div className='flex items-center p-4 mt-8 pb-16 gap-6'>
          <Logo
            variant='small'
            imageProps={{ className: 'size-16', 'aria-hidden': true }}
          />
          <span className='text-6xl text-brand font-bellota font-bold -rotate-3'>
            Enjoy!
          </span>
        </div>

        <ShareBar
          url={url}
          mainImage={recipe?.mainImage}
          iconClassName='sm:!text-5xl'
          className='md:justify-center sm:gap-16 md:gap-16'
        />

        <span
          aria-hidden
          className='h-px print:hidden w-full border-b-3 mx-auto mb-4 lg:px-16'
        />

        {/** @TODO Limit count - add view more or carousel. */}
        {/* Similar Recipes */}
        {recipe?.similarRecipes?.length ? (
          <RecipeSection
            content={{ heading: "Similar Recipes You'll Love" }}
            hideDivider
            className='print:hidden'
          >
            <RelatedPosts
              posts={recipe?.similarRecipes}
              className='not-prose'
            />
          </RecipeSection>
        ) : null}

        {/** @TODO Limit count - add view more or carousel. */}
        {/* Related Blog Posts */}
        {recipe?.relatedPosts?.length ? (
          <RecipeSection
            content={{ heading: 'Related Blog Posts' }}
            hideDivider
            className='print:hidden'
          >
            <RelatedPosts posts={recipe?.relatedPosts} className='not-prose' />
          </RecipeSection>
        ) : null}

        {/* User Comments */}
        <RecipeSection
          content={{ heading: 'Comments' }}
          className='print:hidden'
          hideDivider
        >
          <RecipeComments recipe={recipe} />
        </RecipeSection>
      </div>

      {/* Tags */}
      {tags?.length ? (
        <section className='p-4 mt-12 w-full border-t flex flex-col gap-4 print:hidden'>
          <span className='text-center text-brand-gray-dark'>Categories</span>
          <div className='flex items-center gap-4 flex-wrap justify-center max-sm:justify-between'>
            {tags?.map((tag) => (
              <Tag
                key={tag}
                tag={tag?.toLowerCase()}
                href={`/recipes?tag=${tag}`}
                className='max-sm:flex-1 max-sm:max-w-[calc(50%-16px)]'
              />
            ))}
          </div>
        </section>
      ) : null}

      <section className='text-brand-gray-dark text-sm flex flex-col gap-x-1 gap-y-4 mt-4 print:hidden'>
        <dl className='flex items-center gap-1 flex-wrap'>
          <dt>Originally posted: </dt>
          <dd>{format(recipe?._createdAt, 'MMM d, yyyy')}</dd>
        </dl>
        <dl className='flex items-center gap-1 flex-wrap'>
          <dt>Last updated: </dt>
          <dd>{format(recipe?._updatedAt, 'MMM d, yyyy')}</dd>
        </dl>
      </section>
    </PageLayout>
  )
}

export default Recipe
