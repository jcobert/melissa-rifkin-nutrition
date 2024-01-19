import {
  ApiVersion,
  ConfigParams,
  LATEST_API_VERSION,
} from '@shopify/shopify-api'

export const getApiVersion = (version?: string) => {
  const versions = Object.keys(ApiVersion) || []
  const versionKey =
    versions?.find((key) => ApiVersion[key] === version) || LATEST_API_VERSION
  return ApiVersion[versionKey]
}

export const SHOPIFY_STOREFRONT_ENDPOINT = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/${getApiVersion(process.env.SHOPIFY_STOREFRONT_API_VERSION)}/graphql.json`

export const shopifyConfig: ConfigParams = {
  apiKey: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN as string,
  apiSecretKey: process.env.SHOPIFY_STOREFRONT_SECRET as string,
  apiVersion: getApiVersion(process.env.SHOPIFY_STOREFRONT_API_VERSION),
  hostName: 'localhost',
  hostScheme: 'http',
  isEmbeddedApp: false,
}
