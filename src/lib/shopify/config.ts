import { ConfigParams } from '@shopify/shopify-api'

import { getApiVersion } from '@/lib/shopify/utils'

export const shopifyConfig: ConfigParams = {
  apiKey: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN as string,
  apiSecretKey: process.env.SHOPIFY_STOREFRONT_SECRET as string,
  apiVersion: getApiVersion(process.env.SHOPIFY_STOREFRONT_API_VERSION),
  hostName: 'localhost',
  hostScheme: 'http',
  isEmbeddedApp: false,
}
