import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { IoInformationCircleOutline } from 'react-icons/io5'
import { z } from 'zod'

import Button from '@/components/common/buttons/Button'
import TextAreaInput from '@/components/common/inputs/text-area-input'
import TextInput from '@/components/common/inputs/text-input'

const schema = z.object({
  name: z.string().min(1, 'Name required'),
  email: z.string().min(1, 'Email required').email('Must be a valid email'),
  comment: z
    .string()
    .min(1, 'Comment required')
    .max(500, 'Must be 500 characters or less'),
})

export type CommentFormData = z.infer<typeof schema>

type Props = {
  onSubmit: SubmitHandler<CommentFormData>
  onCancel?: () => void
  initialData?: CommentFormData
}

const CommentForm: FC<Props> = ({ onSubmit, onCancel, initialData }) => {
  const { control, handleSubmit } = useForm<CommentFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: initialData ?? {
      comment: '',
      email: '',
      name: '',
    },
    resolver: zodResolver(schema),
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-6 max-w-prose mx-auto'
    >
      {/* Heading */}
      <div className='flex flex-col gap-1'>
        <h5>Tell us what you think!</h5>
        <div className='flex items-start gap-2'>
          <IoInformationCircleOutline
            aria-hidden
            className='text-xl font-medium'
          />
          <p className='text-sm text-brand-gray-dark my-0 text-pretty'>
            Your comment will be public. Email is only used for internal
            purposes and won't be shared.
          </p>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
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

      <div className='flex items-center justify-end gap-6 self-end w-full'>
        <Button
          className='sm:w-fit self-end__ min-w-16 btn-outline'
          onClick={() => {
            onCancel?.()
          }}
        >
          Cancel
        </Button>
        <Button type='submit' className='sm:w-fit self-end__ min-w-16'>
          Submit
        </Button>
      </div>
    </form>
  )
}

export default CommentForm
