import imageUrlBuilder from '@sanity/image-url'
import { format } from 'date-fns'
import { pick, uniqBy } from 'lodash'
import Image from 'next/image'
import React, { FC } from 'react'
import { dataset, projectId } from 'sanity-studio/env'
import { IngredientMeasurement, type Recipe } from 'sanity-studio/types'

import { getIngredientDetails } from '@/utils/recipe'

import PageLayout from '@/components/common/layout/page-layout'
import Back from '@/components/common/links/back'
import Logo from '@/components/common/logo'
import Tag from '@/components/common/tag'
import IngredientTooltip from '@/components/features/recipe/ingredient-tooltip'
import Measurement from '@/components/features/recipe/measurement'

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
    tags,
  } = recipe || {}

  return (
    <PageLayout className='flex flex-col items-center text-almost-black'>
      <Back href='/recipes' text='All Recipes' />
      <div className='my-8 md:my-16 flex flex-col items-center gap-8 w-full'>
        {/* Heading */}
        <section className='flex max-md:flex-col w-full items-center md:items-end gap-y-4 gap-x-6 pb-4 md:self-start md:px-8'>
          {/* Image */}
          {mainImage ? (
            <Image
              src={builder
                .image(mainImage)
                .width(600)
                .height(600)
                .fit('crop')
                .crop('focalpoint')
                .quality(80)
                .url()}
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
              <h1 className='text-2xl sm:text-3xl max-w-2xl font-medium font-prata text-balance'>
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
          className='h-px max-md:w-1/3 w-full border-b mx-auto -my-4 mb-2__'
        />

        {/* Ingredients */}
        <section className='flex flex-col gap-4 w-full'>
          <h2 className='text-2xl font-medium'>Ingredients</h2>
          <div className='grid gap-x-2 gap-y-6 md:divide-x-1__ max-md:grid-cols-1 md:grid-flow-col md:w-fit__ md:min-w-96'>
            {ingredientGroups?.map((group) => (
              <div
                key={group?._key}
                className='px-2 sm:px-4 py-1 border rounded bg-almost-white'
              >
                {ingredientGroups?.length > 1 && (
                  <h3 className='text-xl font-semibold mb-2 text-brand'>
                    {group?.title}
                  </h3>
                )}
                <ul className='flex flex-col gap-4 divide-y-1'>
                  {group?.ingredients?.map((ing, i) => (
                    <li
                      key={`${ing?.ingredientName}-${i}`}
                      className='flex flex-col -mb-3 pt-1 last-of-type:mb-0 text-brand-gray-dark'
                    >
                      <Measurement measurement={ing} />
                      <p className='text-brand-gray-medium text-sm text-balance'>
                        {ing?.note}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Instructions */}
        <section className='flex flex-col gap-4 w-full'>
          <h2 className='text-2xl font-medium'>Steps</h2>
          <div className='flex flex-col gap-y-8 sm:gap-y-12'>
            {instructions?.map((inst, step) => (
              <div
                key={inst?._key}
                className='px-2 sm:px-4 flex max-sm:flex-col sm:items-center gap-x-16 gap-y-6'
              >
                {/* ingredient group */}
                {inst?.ingredients?.length ? (
                  <div className='flex flex-col gap-2 border-y py-2'>
                    {!!inst?.title && (
                      <h3 className='font-medium text-brand uppercase'>
                        {inst?.title}
                      </h3>
                    )}
                    <div className='flex flex-col'>
                      {inst?.ingredients?.map((ingredient) => {
                        const measurement = getIngredientDetails(
                          ingredient,
                          ingredientGroups,
                        )
                        if (
                          measurement?.length > 1 &&
                          uniqBy(measurement, (m) =>
                            JSON.stringify(
                              pick(m, [
                                'ingredientName',
                                'amount',
                                'unit',
                                'note',
                              ] as (keyof IngredientMeasurement)[]),
                            )?.toLowerCase(),
                          )?.length > 1
                        )
                          return (
                            <IngredientTooltip
                              key={ingredient?._id}
                              triggerProps={{ className: 'w-fit' }}
                              ingredient={ingredient}
                              ingredientGroups={ingredientGroups}
                              measurement={measurement}
                            />
                          )
                        return (
                          <Measurement
                            key={ingredient?._id}
                            measurement={measurement?.[0]}
                            ingredientClassName='font-normal'
                          />
                        )
                      })}
                    </div>
                  </div>
                ) : null}

                {/* directions */}
                <div className='flex gap-6 pl-16__'>
                  <h4 className='text-4xl font-bold text-brand'>{step + 1}</h4>
                  <p className='text-pretty max-w-prose'>{inst?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Tags */}
      {tags?.length ? (
        <div className='p-4 mt-16 w-full border-t flex flex-col gap-4'>
          <h5 className='text-center text-brand-gray-dark'>Categories</h5>
          <div className='flex items-center gap-4 flex-wrap justify-center max-sm:justify-between'>
            {tags?.map((tag) => (
              <Tag key={tag} tag={tag} href={`/recipes?tag=${tag}`} />
            ))}
          </div>
        </div>
      ) : null}
    </PageLayout>
  )
}

export default Recipe
