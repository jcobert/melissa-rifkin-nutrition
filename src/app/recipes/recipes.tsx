'use client'

import { uniq } from 'lodash'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { FilterOptionOption } from 'react-select/dist/declarations/src/filters'
import { Recipe } from 'sanity-studio/types'

import { getRecipeIngredients } from '@/utils/recipe'
import { cn } from '@/utils/style'

import SelectInput, {
  SelectOption,
} from '@/components/common/inputs/select-input'
import LayoutToggle, { LayoutType } from '@/components/common/layout-toggle'
import NoResults from '@/components/common/no-results'
import RecipeCard from '@/components/features/recipe/recipe-card'
import RecipeOverview from '@/components/features/recipe/recipe-overview'

import { RecipesPageProps } from '@/app/recipes/page'

export enum RecipeCategories {
  breakfast = 'Breakfast',
  lunch = 'Lunch',
  dinner = 'Dinner',
  dessert = 'Desserts',
  side = 'Side Dishes',
  snack = 'Snacks',
}

type Props = {
  recipes: Recipe[]
  params?: RecipesPageProps['searchParams']
}

const Recipes: FC<Props> = ({ recipes, params }) => {
  const { category: categoryParam, tag: tagParam } = params || {}

  const allTags = uniq(
    recipes?.flatMap((rec) => (rec?.tags || [])?.map((t) => t)),
  )
  const tagFilterOptions: SelectOption[] = useMemo(
    () =>
      allTags?.map((tag) => ({
        value: tag,
        label: tag,
      })),
    [JSON.stringify(recipes)],
  )

  const categoryFilterOptions: SelectOption[] = Object.keys(
    RecipeCategories,
  )?.map((cat) => ({
    value: cat,
    label: RecipeCategories[cat],
  }))

  const recipeSearchOptions: SelectOption<Recipe>[] = useMemo(
    () =>
      recipes?.map((recipe) => ({
        value: recipe,
        label: (
          <div className='flex flex-col whitespace-pre-wrap gap-1 text-sm'>
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

  const [layout, setLayout] = useState<LayoutType>('grid')

  const [tagFilter, setTagFilter] = useState<string | undefined>(tagParam)
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(
    categoryParam,
  )
  const [searchFilter, setSearchFilter] = useState<string>()
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>()

  const filteredRecipes = useMemo(() => {
    if (!tagFilter && !searchFilter && !categoryFilter) return recipes
    if (tagFilter && !searchFilter && !categoryFilter) {
      return recipes?.filter((rec) => rec?.tags?.includes(tagFilter))
    }
    if (categoryFilter && !searchFilter && !tagFilter) {
      return recipes?.filter((rec) => rec?.category?.includes(categoryFilter))
    }
    if (categoryFilter && tagFilter && !searchFilter) {
      return recipes?.filter(
        (rec) =>
          rec?.category?.includes(categoryFilter) &&
          rec?.tags?.includes(tagFilter),
      )
    }
    if (searchFilter) {
      return recipes?.filter((rec) => {
        const ingredients = getRecipeIngredients(rec)
        const criteria = [rec?.title, rec?.tags?.join(), ingredients?.join()]
          ?.join()
          ?.toLowerCase()
          ?.trim()
        return criteria?.includes(searchFilter?.toLowerCase()?.trim())
      })
    }
  }, [tagFilter, categoryFilter, searchFilter, JSON.stringify(recipes)])

  const isFiltered = !!tagFilter || !!categoryFilter || !!searchFilter
  const foundCount = filteredRecipes?.length || 0
  const totalCount = recipes?.length || 0

  const resetAllFilters = () => {
    setSearchFilter(undefined)
    setTagFilter(undefined)
    setCategoryFilter(undefined)
    setSelectedRecipe(undefined)
  }

  // Update filter values on url param change.
  useEffect(() => {
    setCategoryFilter(categoryParam)
    setTagFilter(tagParam)
  }, [categoryParam, tagParam])

  return (
    <div className='flex flex-col gap-8 w-full items-center max-w-4xl'>
      {/* Filters */}
      <div className='flex max-sm:flex-col sm:justify-end sm:items-end w-full gap-4 '>
        <SelectInput
          placeholder={
            <span className='flex items-center gap-2'>
              <HiOutlineSearch />
              <span>Search...</span>
            </span>
          }
          inputValue={searchFilter}
          onInputChange={(val, { action }) => {
            if (action !== 'input-change') {
              setSearchFilter(searchFilter)
              return
            }
            setSearchFilter(val)
            setTagFilter(undefined)
            setCategoryFilter(undefined)
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
          labelClassName={cn([!!searchFilter && '!text-brand-blue'])}
          classNames={{
            container: () => 'md:max-w-48__ min-w-24',
            input: () => '[&>*]:!opacity-100',
            option: (props) =>
              cn([
                props.isSelected && '!bg-almost-white !text-almost-black',
                props.isFocused && '!bg-almost-white',
              ]),
            control: () => cn([!!searchFilter && '!border-brand-blue !border']),
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
          options={categoryFilterOptions}
          isClearable
          isSearchable={false}
          menuShouldScrollIntoView
          className='w-full sm:max-w-48'
          labelClassName={cn([!!categoryFilter && '!text-brand-blue'])}
          classNames={{
            container: () => 'md:max-w-48__ min-w-24',
            control: () =>
              cn([!!categoryFilter && '!border-brand-blue !border']),
          }}
          formatOptionLabel={(opt, _meta) => (
            <span className='capitalize'>{(opt as SelectOption)?.label}</span>
          )}
          value={
            categoryFilterOptions?.find(
              (opt) => opt?.value === categoryFilter,
            ) || ''
          }
          onChange={(opt) => {
            setCategoryFilter(opt?.value)
            setSearchFilter('')
          }}
          label='Meal'
        />

        <SelectInput
          options={tagFilterOptions}
          isClearable
          // isSearchable={false}
          menuShouldScrollIntoView
          className='w-full sm:max-w-48 lg:max-w-64__'
          labelClassName={cn([!!tagFilter && '!text-brand-blue'])}
          classNames={{
            container: () => 'md:max-w-48__ min-w-24',
            control: () => cn([!!tagFilter && '!border-brand-blue !border']),
          }}
          formatOptionLabel={(opt, _meta) => (
            <span className='capitalize'>{(opt as SelectOption)?.label}</span>
          )}
          value={
            tagFilterOptions?.find(
              (opt) => opt?.value?.toLowerCase() === tagFilter?.toLowerCase(),
            ) || ''
          }
          onChange={(opt) => {
            setTagFilter(opt?.value)
            setSearchFilter('')
          }}
          label='Category'
        />
        {/* Layout Toggle */}
        <div className='flex flex-col items-end justify-end gap-2'>
          <LayoutToggle layout={layout} setLayout={setLayout} />
        </div>
      </div>

      {/* Results Count */}
      <p
        className={cn([
          'text-brand-gray-dark text-sm px-2 max-md:-mb-2 md:-my-4 max-md:-mt-6 self-end',
          (!isFiltered || !foundCount) && 'sm:invisible max-sm:hidden',
        ])}
      >{`Found ${foundCount} of ${totalCount} recipe${totalCount === 1 ? '' : 's'}`}</p>

      {/* Recipes */}
      {filteredRecipes?.length ? (
        <div className='w-full'>
          {layout === 'grid' && (
            <div className='grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full justify-items-center'>
              {(filteredRecipes || [])?.map((recipe) => (
                <RecipeCard key={recipe?._id} recipe={recipe} />
              ))}
            </div>
          )}

          {layout === 'list' && (
            <div className='flex flex-col gap-10 sm:gap-8 w-full'>
              {(filteredRecipes || [])?.map((recipe) => (
                <>
                  <RecipeOverview key={recipe?._id} recipe={recipe} />
                  {/* <span
                    aria-hidden
                    className='h-px w-full max-sm:w-2/3 border-b mx-auto sm:hidden last:hidden'
                  /> */}
                </>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className='sm:my-8 flex flex-col items-center gap-6'>
          <NoResults
            title={`We couldn't find any${tagFilter ? ` ${tagFilter}` : ''}${categoryFilter ? ` ${categoryFilter}` : ''} recipes.`}
            description="But check back soon, as we're always adding new recipes!"
          />
          <button
            type='button'
            className='text-brand-blue bg-almost-white py-4 sm:py-2 w-full sm:w-fit px-4 hover:text-brand-blue-dark transition border rounded'
            onClick={() => resetAllFilters()}
          >
            Show all recipes
          </button>
        </div>
      )}
    </div>
  )
}

export default Recipes
