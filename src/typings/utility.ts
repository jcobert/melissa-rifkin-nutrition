import { ReactNode } from 'react'

export type LinkWithIcon<T = string, U = string> = {
  id: T
  name: U
  url: string
  icon: ReactNode
}
