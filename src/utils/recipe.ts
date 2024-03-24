import { intersectionBy, pick } from 'lodash'
import {
  Ingredient,
  IngredientGroup,
  IngredientMeasurement,
  Recipe,
} from 'sanity-studio/types'

export const getIngredientDetails = (
  ingredient: Ingredient,
  ingredientGroups: Recipe['ingredientGroups'],
): (IngredientMeasurement | undefined)[] => {
  const allIngredients = ingredientGroups?.flatMap(
    (group) => group?.ingredients,
  )
  return (
    allIngredients?.filter(
      (ing) => ing?.ingredientName?._id === ingredient?._id,
    ) || []
  )
}

export const ingredientNamesFromGroup = (ingredientGroup: IngredientGroup) => {
  if (!ingredientGroup?.ingredients?.length) return []
  return ingredientGroup?.ingredients?.map((ing) => ing?.ingredientName?.name)
}

export const getRecipeIngredients = (recipe: Recipe) => {
  return (recipe?.ingredientGroups || [])?.flatMap((group) =>
    ingredientNamesFromGroup(group),
  )
}

export const findIngredientGroupMatch = (
  group: IngredientGroup,
  ingredient?: (IngredientMeasurement | undefined)[],
) =>
  intersectionBy(group?.ingredients, ingredient, (ing) =>
    JSON.stringify(
      pick(ing, [
        'ingredientName',
        'amount',
        'unit',
        'note',
      ] as (keyof IngredientMeasurement)[]),
    )?.toLowerCase(),
  )?.[0]
