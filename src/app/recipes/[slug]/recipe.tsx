import imageUrlBuilder from '@sanity/image-url'
import { format } from 'date-fns'
import Image from 'next/image'
import React, { FC } from 'react'
import { dataset, projectId } from 'sanity-studio/env'
import { type Recipe } from 'sanity-studio/types'

import { getIngredientDetails } from '@/utils/recipe'
import { formatFraction, formatUnit } from '@/utils/string'

import PageLayout from '@/components/common/layout/page-layout'
import Back from '@/components/common/links/back'
import Logo from '@/components/common/logo'
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
    category,
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

          {/* Tags */}
          <div className='flex items-center max-md:justify-around gap-1 flex-wrap mt-3'>
            {(tags || [])?.map((tag, i) => (
              <span
                key={`${tag}-${i}`}
                className='rounded-full px-4 py-px border border-gray-300 text-sm bg-gray-200 text-center capitalize font-medium'
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        <span
          aria-hidden
          className='h-px max-md:w-1/3 w-full border-b mx-auto -my-4 mb-2__'
        />

        {/* Ingredients */}
        <section className='flex flex-col gap-4 w-full'>
          <h2 className='text-2xl font-medium'>Ingredients</h2>
          <div className='grid gap-2 md:divide-x-1 max-md:grid-cols-1 md:grid-flow-col w-fit__'>
            {ingredientGroups?.map((group) => (
              <div key={group?._key} className='px-2 sm:px-4'>
                {ingredientGroups?.length > 1 && (
                  <h3 className='text-xl font-semibold mb-2'>{group?.title}</h3>
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
                    <h3 className='font-medium text-brand uppercase'>
                      {inst?.title}
                    </h3>
                    <div className='flex flex-col'>
                      {inst?.ingredients?.map((ing) => {
                        const measurement = getIngredientDetails(
                          ing,
                          ingredientGroups,
                        )
                        return (
                          <Measurement
                            key={ing?._id}
                            measurement={measurement}
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
    </PageLayout>
  )
}

export default Recipe
