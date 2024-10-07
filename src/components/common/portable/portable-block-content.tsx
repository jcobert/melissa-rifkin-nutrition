import { PortableText, PortableTextProps } from '@portabletext/react'
import { FC } from 'react'
import { BlockContent } from 'sanity-studio/types'

import { portableComponents } from '@/components/common/portable/portable-components'

type Props = PortableTextProps & {
  value: BlockContent
}

const PortableBlockContent: FC<Props> = (props) => {
  const { value, ...rest } = props

  return (
    <PortableText value={value} components={portableComponents} {...rest} />
  )
}

export default PortableBlockContent
