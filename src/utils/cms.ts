import { Post } from 'sanity-studio/types'

export const getImageProps = (image: Post['mainImage']) => {
  const { asset, alt, ...img } = image || {}
  const { metadata, url, ...ass } = asset || {}
  const { dimensions, ...meta } = metadata || {}
  const { width, height, ...dim } = dimensions || {}
  return { alt, url, width, height, ...img, ...ass, ...meta, ...dim }
}
