import { FC } from 'react'
import { CgMenu, CgMenuGridO } from 'react-icons/cg'

import { cn } from '@/utils/style'

export type LayoutType = 'list' | 'grid'

type Props = {
  layout: LayoutType
  setLayout: (layout: LayoutType) => void
}

const LayoutToggle: FC<Props> = ({ layout, setLayout }) => {
  return (
    <div className='flex items-center gap-4 rounded p-2 text-xl w-fit self-end max-md:hidden'>
      <button
        type='button'
        className={cn([
          'border p-2 rounded',
          layout === 'list' && 'text-brand-blue',
        ])}
        aria-label='view items as list.'
        onClick={() => setLayout('list')}
      >
        <CgMenu />
      </button>
      <button
        type='button'
        className={cn([
          'border p-2 rounded',
          layout === 'grid' && 'text-brand-blue',
        ])}
        aria-label='view items as grid.'
        onClick={() => setLayout('grid')}
      >
        <CgMenuGridO />
      </button>
    </div>
  )
}

export default LayoutToggle
