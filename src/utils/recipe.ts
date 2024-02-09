import { Ingredient, IngredientMeasurement, Recipe } from 'sanity-studio/types'

export const getIngredientDetails = (
  ingredient: Ingredient,
  ingredientGroups: Recipe['ingredientGroups'],
): IngredientMeasurement | undefined => {
  const allIngredients = ingredientGroups?.flatMap(
    (group) => group?.ingredients,
  )
  return allIngredients?.find(
    (ing) => ing?.ingredientName?._id === ingredient?._id,
  )
}
