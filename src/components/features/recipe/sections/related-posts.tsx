import { FC } from 'react'
import { Post, Recipe } from 'sanity-studio/types'

import { cn } from '@/utils/style'

import BlogPostOverview from '@/components/features/blog/blog-post-overview'
import RecipeCard from '@/components/features/recipe/recipe-card'

type Props = {
  // recipes?: Recipe[]
  posts?: (Recipe | Post)[]
  className?: string
}

const RelatedPosts: FC<Props> = ({ posts, className }) => {
  if (!posts?.length) return null

  const isRecipe = posts?.[0]?._type === 'recipe'

  return (
    <div className={cn('flex items-start flex-wrap gap-8', className)}>
      {posts?.map((post) =>
        isRecipe ? (
          <RecipeCard key={post?._id} recipe={post as Recipe} layout='sm' />
        ) : (
          <BlogPostOverview
            key={post?._id}
            post={post as Post}
            className='w-full'
          />
        ),
      )}
    </div>
  )
}

export default RelatedPosts
