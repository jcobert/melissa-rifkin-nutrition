import React, { FC } from 'react'
import { BlockDecoratorProps } from 'sanity'

export const Divider: FC<BlockDecoratorProps> = (props) => {
  return (
    <>
      <span>
        {props.renderDefault(props)}
        <hr className='h-px w-full border-b' />
      </span>
    </>
  )
}

export const DividerIcon: FC = () => {
  return <span>--</span>
}
