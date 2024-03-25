import { forwardRef } from 'react'
import { Recipe } from 'sanity-studio/types'

type Props = {
  recipe?: Recipe
}

const RecipePrint = forwardRef<HTMLDivElement, Props>(({ recipe }, ref) => {
  return (
    <div ref={ref} className='hidden print:block'>
      <h1>{recipe?.title}</h1>
    </div>
  )
})

export default RecipePrint
