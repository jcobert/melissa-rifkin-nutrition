import { apiVersion, dataset, projectId, useCdn } from '../env'
import { createClient } from '@sanity/client/stega'

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  // These settings will be overridden in
  // ./sanity/lib/store.ts when draftMode is enabled
  perspective: 'published',
  stega: {
    enabled: false,
    studioUrl: '/studio',
  },
})
