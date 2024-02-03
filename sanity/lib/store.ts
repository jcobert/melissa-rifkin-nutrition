import * as queryStore from '@sanity/react-loader'
import { client } from 'sanity-studio/lib/client'
import { token } from 'sanity-studio/lib/token'

queryStore.setServerClient(client.withConfig({ token }))

export const { loadQuery } = queryStore
