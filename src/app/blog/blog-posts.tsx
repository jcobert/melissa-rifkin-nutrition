import React, { FC } from 'react'
import { Post } from 'sanity-studio/types'

import BlogPostCard from '@/components/features/blog/blog-post-card'

type Props = {
  posts: Post[]
}

const BlogPosts: FC<Props> = ({ posts }) => {
  //
  return (
    <div>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
        {posts?.map((post) => <BlogPostCard key={post?._id} post={post} />)}
      </div>
    </div>
  )
}

export default BlogPosts
