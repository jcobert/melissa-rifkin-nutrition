import * as queryStore from '@sanity/react-loader'
import { client } from 'cms/lib/client'
import { token } from 'cms/lib/token'

queryStore.setServerClient(client.withConfig({ token }))

export const { loadQuery } = queryStore
