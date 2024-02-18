import { Path, SanityDocument } from 'sanity'

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

  console.log('ParentsParents')
  return obj
}
