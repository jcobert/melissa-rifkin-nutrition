'use client'

import React, { FC, useMemo, useState } from 'react'
import { FilterOptionOption } from 'react-select/dist/declarations/src/filters'
import { Recipe } from 'sanity-studio/types'

import { getRecipeIngredients } from '@/utils/recipe'
import { cn } from '@/utils/style'

import SelectInput, {
  SelectOption,
} from '@/components/common/inputs/select-input'
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

  const recipeSearchOptions: SelectOption<Recipe>[] = useMemo(
    () =>
      recipes?.map((recipe) => ({
        value: recipe,
        label: (
          <div className='flex flex-col whitespace-pre-wrap gap-1 border-b__ pb-2'>
            <span>{recipe?.title}</span>
            <div className='flex items-center text-xs text-brand-gray-dark capitalize gap-1'>
              {recipe?.tags?.map((tag) => (
                <span
                  key={tag}
                  className='bg-brand-gray-light rounded-full border border-gray-300 px-1'
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className='text-xs text-brand-gray-medium truncate'>
              {getRecipeIngredients(recipe)?.join(', ')}
            </div>
          </div>
        ),
      })),
    [JSON.stringify(recipes)],
  )

  const [tagFilter, setTagFilter] = useState<string>()
  const [searchFilter, setSearchFilter] = useState<string>()
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>()

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
          ?.trim()
        return criteria?.includes(searchFilter?.toLowerCase()?.trim())
      })
    }
  }, [tagFilter, searchFilter, JSON.stringify(recipes)])

  return (
    <div className='flex flex-col gap-8 w-full items-center max-w-4xl'>
      {/* Filters */}
      <div className='flex max-sm:flex-col sm:justify-end sm:items-end w-full gap-4 '>
        <SelectInput
          placeholder='Search...'
          inputValue={searchFilter}
          onInputChange={(val, { action }) => {
            if (action !== 'input-change') {
              setSearchFilter(searchFilter)
              return
            }
            setSearchFilter(val)
            setTagFilter(undefined)
            setSelectedRecipe(undefined)
          }}
          onBlur={() => {
            if (searchFilter) setSelectedRecipe(recipes?.[0])
          }}
          defaultMenuIsOpen={false}
          openMenuOnClick={false}
          blurInputOnSelect
          isClearable
          controlShouldRenderValue={false}
          onChange={(opt: SelectOption<Recipe>) => {
            setSelectedRecipe(opt?.value)
            if (!opt) setSearchFilter('')
          }}
          value={recipeSearchOptions?.find(
            (opt) => opt?.value?._id === selectedRecipe?._id,
          )}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          options={recipeSearchOptions}
          className='w-full sm:max-w-64 lg:max-w-64__'
          classNames={{
            container: () => 'md:max-w-48__ min-w-24',
            input: () => '[&>*]:!opacity-100',
            option: (props) =>
              cn([
                props.isSelected && '!bg-almost-white !text-almost-black',
                props.isFocused && '!bg-almost-white',
              ]),
          }}
          filterOption={(option, input) => {
            const recipe = (option as FilterOptionOption<SelectOption<Recipe>>)
              ?.data?.value
            const ingredients = getRecipeIngredients(recipe)
            const criteria = [
              recipe?.title,
              recipe?.tags?.join(),
              ingredients?.join(),
            ]
              ?.join()
              ?.toLowerCase()
              ?.trim()
            return criteria?.includes(input?.toLowerCase()?.trim())
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
