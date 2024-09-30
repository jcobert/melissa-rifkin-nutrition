import { SlugValue } from '@sanity/types'
import {
  DocumentActionComponent,
  DocumentActionDescription,
  DocumentActionProps,
  useDocumentOperation,
} from 'sanity'
import speakingurl from 'speakingurl'

export const slugOnPublish = (
  originalPublishAction: DocumentActionComponent,
) => {
  const BetterAction = (
    props: DocumentActionProps,
  ): DocumentActionDescription => {
    // use the hook to get access to the patch function with the current document
    const { patch } = useDocumentOperation(props?.id, props?.type)
    const patchSlug = (slugValue: string) => {
      patch.execute([
        {
          set: {
            slug: { current: slugValue, _type: 'slug' } satisfies SlugValue,
          },
        },
      ])
    }
    const originalResult = originalPublishAction(props)
    return {
      ...originalResult,
      label: originalResult?.label || '',
      onHandle: async () => {
        if (!props?.draft || !['post', 'recipe']?.includes(props?.type)) {
          return originalResult?.onHandle?.()
        }
        // check for a title and existing slug
        if (
          props.draft.title &&
          !(props.published?.slug as SlugValue)?.current
        ) {
          // use the generator package used in sanity core with default values
          const generatedSlug = props?.draft?.title
            ? defaultSlugify(props?.draft?.title as string)
            : null
          // double check we've got a slug and patch it in
          if (generatedSlug) {
            patchSlug(generatedSlug)
          }
        }
        // then delegate to original handler
        originalResult?.onHandle?.()
      },
    }
  }
  return BetterAction
}

const defaultSlugify = (value: string) => {
  const slugifyOpts = { truncate: 200, symbols: true }
  return value ? speakingurl(value, slugifyOpts) : ''
}
