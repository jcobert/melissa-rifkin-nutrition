import React, { FC } from 'react'
import { Post } from 'sanity-studio/types'

import PostCard from '@/app/blog/(post)/post-card'

type Props = {
  data: Post[]
}

const Posts: FC<Props> = ({ data }) => {
  //
  return (
    <div>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
        {data?.map((post) => <PostCard key={post?._id} post={post} />)}
      </div>
    </div>
  )
}

export default Posts
