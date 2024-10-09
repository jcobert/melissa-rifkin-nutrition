import { NextResponse } from 'next/server'
import { client } from 'sanity-studio/lib/client'
import { writeToken } from 'sanity-studio/lib/write-token'
import { UserCommentPayload } from 'sanity-studio/types'
import { idToSanityReference } from 'sanity-studio/utils'

import { emptyKeys, someValuesEmpty } from '@/utils/general'

import { CommentFormData } from '@/components/features/user-generated/comment-form'

export const POST = async (req: Request) => {
  const data = (await req.json()) as Partial<CommentFormData>
  const { name, email, comment, postType, postId } = data

  const isMissingField = someValuesEmpty(data)

  if (isMissingField) {
    return NextResponse.json(
      {
        message: 'Missing required field.',
        missingFields: emptyKeys(data),
      },
      { status: 400 },
    )
  }

  try {
    const postRef = idToSanityReference(postId)
    await client
      .withConfig({ token: writeToken })
      .create<Partial<UserCommentPayload>>({
        _type: 'userComment',
        name,
        email,
        comment,
        postType,
        sourceBlogPost: postType === 'blog' ? postRef : undefined,
        sourceRecipe: postType === 'recipe' ? postRef : undefined,
      })
    return NextResponse.json(
      { message: 'Comment created successfully.' },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to create comment.',
        error,
      },
      { status: 500 },
    )
  }
}
