import { experimental_taintUniqueValue } from 'react'
import 'server-only'

export const writeToken = process.env.SANITY_API_WRITE_TOKEN

if (!writeToken) {
  throw new Error('Missing SANITY_API_WRITE_TOKEN')
}

experimental_taintUniqueValue(
  'Do not pass the sanity API write token to the client.',
  process,
  writeToken,
)
