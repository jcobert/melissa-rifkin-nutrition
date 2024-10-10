import { zodResolver } from '@hookform/resolvers/zod'
import { FC, ReactNode, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { IoInformationCircleOutline } from 'react-icons/io5'
import { UserComment } from 'sanity-studio/types'
import { z } from 'zod'

import { cn } from '@/utils/style'

import Button from '@/components/common/buttons/Button'
import TextAreaInput from '@/components/common/inputs/text-area-input'
import TextInput from '@/components/common/inputs/text-input'
import {
  CreateCommentAPIResponse,
  UseCreateCommentProps,
  useCreateComment,
} from '@/components/features/recipe/hooks/use-create-comment'

const schema = z.object({
  name: z.string().min(1, 'Name required'),
  email: z.string().min(1, 'Email required').email('Must be a valid email'),
  comment: z
    .string()
    .min(1, 'Comment required')
    .max(500, 'Must be 500 characters or less'),
})

export type CommentFormData = z.infer<typeof schema> &
  Pick<UserComment, 'postType'> & { postId?: string }

type Props = {
  displayOnSubmit?: (
    data?: CommentFormData,
    response?: CreateCommentAPIResponse,
  ) => ReactNode
  onCancel?: () => void
  initialData?: CommentFormData
} & Omit<UseCreateCommentProps, 'options'>

const CommentForm: FC<Props> = ({
  displayOnSubmit,
  onCancel,
  initialData,
  postType,
  postId,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CommentFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: initialData ?? {
      comment: '',
      email: '',
      name: '',
    },
    resolver: zodResolver(schema),
  })

  const { mutateAsync: createComment, isSuccess: requestComplete } =
    useCreateComment({
      postType,
      postId,
    })

  const [createSuccessful, setCreateSuccessful] = useState(false)
  const [resultBanner, setResultBanner] = useState<ReactNode>()

  const submitHandler: SubmitHandler<CommentFormData> = async (data) => {
    await createComment(data, {
      onSettled: (res) => {
        const banner = displayOnSubmit?.(data, res)
        setResultBanner(banner)
        setCreateSuccessful(!!res?.ok)
        if (res?.ok) {
          reset()
        }
      },
    })
  }

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className='flex flex-col gap-6 max-w-prose mx-auto'
    >
      {/* Success Banner */}
      {requestComplete && createSuccessful && resultBanner
        ? resultBanner
        : null}

      {/* Heading */}
      <div
        className={cn('flex flex-col gap-1', [
          requestComplete && createSuccessful && resultBanner && 'hidden',
        ])}
      >
        <h5>Tell us what you think!</h5>
        <div className='flex items-start gap-2'>
          <IoInformationCircleOutline
            aria-hidden
            className='text-xl font-medium flex-none'
          />
          {/* Disclaimer */}
          <p className='text-sm text-brand-gray-dark my-0 text-pretty'>
            Your comment will be public. Email is used for internal purposes and
            won't be shared.
          </p>
        </div>
      </div>

      <div
        className={cn('flex flex-col gap-2', [
          requestComplete && createSuccessful && resultBanner && 'hidden',
        ])}
      >
        <div className='flex sm:items-start gap-x-8 gap-y-2 max-sm:flex-col'>
          <Controller
            control={control}
            name='name'
            render={({ field, fieldState: { error } }) => (
              <TextInput
                {...field}
                label='Name'
                className='flex-1'
                required
                error={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name='email'
            render={({ field, fieldState: { error } }) => (
              <TextInput
                {...field}
                label='Email'
                className='flex-1'
                required
                error={error?.message}
              />
            )}
          />
        </div>
        <Controller
          control={control}
          name='comment'
          render={({ field, fieldState: { error } }) => (
            <TextAreaInput
              {...field}
              label='Comment'
              className='max-w-prose'
              required
              maxLength={500}
              error={error?.message}
            />
          )}
        />
      </div>

      {/* Error Banner */}
      {requestComplete && !createSuccessful && resultBanner
        ? resultBanner
        : null}

      <div
        className={cn('flex items-center justify-end gap-6 self-end w-full', [
          requestComplete && createSuccessful && resultBanner && 'hidden',
        ])}
      >
        <Button
          className='sm:w-fit self-end__ min-w-16 btn-outline'
          onClick={() => {
            onCancel?.()
          }}
        >
          Cancel
        </Button>
        <Button
          type='submit'
          className='sm:w-fit self-end__ min-w-16'
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </div>
    </form>
  )
}

export default CommentForm
