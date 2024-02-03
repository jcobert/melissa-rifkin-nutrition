import { QueryResponseInitial } from '@sanity/react-loader'
import { QueryParams, SanityDocument } from 'next-sanity'
import React, { FC } from 'react'
import { Post } from 'sanity-studio/types'

type Props = {
  initial: QueryResponseInitial<SanityDocument<Post>>
  params: QueryParams
}

const BlogPostPreview: FC<Props> = ({ initial, params }) => {
  //
  return <div></div>
}

export default BlogPostPreview
