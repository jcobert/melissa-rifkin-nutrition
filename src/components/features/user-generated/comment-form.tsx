import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import Button from '@/components/common/buttons/Button'
import TextAreaInput from '@/components/common/inputs/text-area-input'
import TextInput from '@/components/common/inputs/text-input'

type Props = {
  onSubmit: SubmitHandler<FormData>
  onCancel?: () => void
}

const schema = z.object({
  name: z.string().min(1, 'Name required'),
  email: z.string().min(1, 'Email required').email('Must be a valid email'),
  comment: z
    .string()
    .min(1, 'Comment required')
    .max(500, 'Must be 500 characters or less'),
})

type FormData = z.infer<typeof schema>

const CommentForm: FC<Props> = ({ onSubmit, onCancel }) => {
  const { control, handleSubmit } = useForm<FormData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
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
      <h5>Leave a comment</h5>
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
