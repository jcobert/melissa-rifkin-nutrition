import { AnchorHTMLAttributes } from 'react'
import { Path, SanityDocument } from 'sanity'
import { BlockLink } from 'sanity-studio/types'

type FindParentsParentOptions = {
  parentPath: Path
  document: SanityDocument
  level?: number
}

export const findParentsParent = ({
  parentPath,
  document,
  level = 1,
}: FindParentsParentOptions) => {
  if (level > parentPath.length) throw new Error('Level is too high')

  const obj = parentPath
    .slice(0, parentPath.length - level)
    .reduce((doc, path) => {
      if (typeof path === 'object') {
        const t =
          Object.entries(path).length > 0 ? Object.entries(path)[0] : null
        if (!t) return doc
        const [property, value] = t
        return (doc as any).find((d: any) => d[property] === value)
      } else {
        return doc[path]
      }
    }, document)

  return obj
}

type LinkRelAttribute = 'nofollow' | 'sponsored' | 'noreferrer' | 'noopener'

type LinkAttributes = Pick<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'rel' | 'target'
>

export const getBlockLinkAttributes = (link?: BlockLink): LinkAttributes => {
  if (!link) {
    return { rel: undefined, target: undefined }
  }

  let relAttrs: LinkRelAttribute[] = []
  if (link?.external) {
    relAttrs = relAttrs?.concat('nofollow')
  }
  if (link?.sponsored) {
    relAttrs = relAttrs?.concat('sponsored')
  }
  if (link?.newTab) {
    relAttrs = relAttrs?.concat(['noreferrer', 'noopener'])
  }

  return {
    rel: relAttrs?.join(' '),
    target: link?.newTab ? '_blank' : undefined,
  }
}
