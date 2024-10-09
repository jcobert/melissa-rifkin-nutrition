import { UseMutationOptions, useMutation } from '@tanstack/react-query'

import { CommentFormData } from '@/components/features/user-generated/comment-form'

export type CreateCommentAPIResponse = Pick<Response, 'status' | 'ok'> & {
  message?: string
  error?: Error
}

export type UseCreateCommentProps = Required<
  Pick<CommentFormData, 'postId' | 'postType'>
> & {
  options?: UseMutationOptions<CreateCommentAPIResponse, Error, CommentFormData>
}

export const useCreateComment = (props: UseCreateCommentProps) => {
  const { postId, postType, options } = props
  const keyBase = `create ${postType ?? 'post'} comment`

  return useMutation<CreateCommentAPIResponse, Error, CommentFormData>({
    mutationKey: [keyBase, { id: postId }],
    mutationFn: async (payload) => {
      const res = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ ...payload, postType, postId }),
      })
      const resJson = await res.json()
      return {
        status: res?.status,
        ok: res?.ok,
        message: resJson?.message,
        error: resJson?.error,
      }
    },
    ...options,
  })
}
