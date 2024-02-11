'use client'

import React, { FC, useMemo, useState } from 'react'
import { Recipe } from 'sanity-studio/types'

import { getRecipeIngredients } from '@/utils/recipe'

import SelectInput, {
  SelectOption,
} from '@/components/common/inputs/select-input'
import TextInput from '@/components/common/inputs/text-input'
import RecipeCard from '@/components/features/recipe/recipe-card'

type Props = {
  recipes: Recipe[]
}

const Recipes: FC<Props> = ({ recipes }) => {
  const allTags = recipes?.flatMap((rec) => (rec?.tags || [])?.map((t) => t))
  const tagFilterOptions: SelectOption[] = useMemo(
    () =>
      allTags?.map((tag) => ({
        value: tag,
        label: tag,
      })),
    [JSON.stringify(recipes)],
  )

  const [tagFilter, setTagFilter] = useState<string>()
  const [searchFilter, setSearchFilter] = useState<string>()

  const filteredRecipes = useMemo(() => {
    if (!tagFilter && !searchFilter) return recipes
    if (tagFilter && !searchFilter) {
      return recipes?.filter((rec) => rec?.tags?.includes(tagFilter))
    }
    if (searchFilter && !tagFilter) {
      return recipes?.filter((rec) => {
        const ingredients = getRecipeIngredients(rec)
        const criteria = [rec?.title, rec?.tags?.join(), ingredients?.join()]
          ?.join()
          ?.toLowerCase()
        return criteria?.includes(searchFilter?.toLowerCase())
      })
    }
  }, [tagFilter, searchFilter, JSON.stringify(recipes)])

  return (
    <div className='flex flex-col gap-8 w-full items-center max-w-4xl'>
      {/* Filters */}
      <div className='flex max-sm:flex-col sm:justify-end sm:items-end w-full gap-4 '>
        <TextInput
          placeholder='Search..'
          value={searchFilter}
          onChange={(e) => {
            setSearchFilter(e?.target?.value)
            setTagFilter(undefined)
          }}
        />
        <SelectInput
          options={tagFilterOptions}
          isClearable
          isSearchable={false}
          menuShouldScrollIntoView
          className='w-full sm:max-w-48 lg:max-w-64__'
          classNames={{ container: () => 'md:max-w-48__ min-w-24' }}
          formatOptionLabel={(opt, _meta) => (
            <span className='capitalize'>{(opt as SelectOption)?.label}</span>
          )}
          value={
            tagFilterOptions?.find((opt) => opt?.value === tagFilter) || ''
          }
          onChange={(opt) => {
            setTagFilter(opt?.value)
            setSearchFilter('')
          }}
          label='Filter'
        />
      </div>

      <div className='grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full justify-items-center'>
        {(filteredRecipes || [])?.map((recipe) => (
          <RecipeCard key={recipe?._id} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}

export default Recipes
