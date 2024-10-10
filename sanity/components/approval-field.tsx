import { BooleanFieldProps } from 'sanity'

import { cn } from '@/utils/style'

export const RequiredIndicator = <span className='text-red-500'>*</span>

export const ApprovalField = (props: BooleanFieldProps) => {
  const approved = !!props?.value
  const pending = typeof props?.value === 'undefined'
  let status = 'Pending'
  let color = '#1f2023'
  if (approved) {
    status = 'Approved'
    color = '#059669'
  } else if (props?.value === false) {
    status = 'Rejected'
    color = '#e11d48'
  }
  return (
    <div className='flex gap-4 items-center'>
      <div className='flex-auto'>{props?.renderDefault(props)}</div>
      <span
        className='p-2 border rounded bg-gray-50 font-semibold'
        style={{ color, borderColor: color }}
      >{`${status}`}</span>
    </div>
  )
}
