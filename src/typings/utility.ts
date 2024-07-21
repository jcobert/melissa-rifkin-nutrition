import { ReactNode } from 'react'

export type LinkWithIcon<T = string> = {
  id: T
  text: string
  url: string
  icon: ReactNode
  ariaLabel?: string
}
