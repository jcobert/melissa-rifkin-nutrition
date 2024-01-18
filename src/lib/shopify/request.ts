// import shopifyApi from '@shopify/shopify-api'
import { GraphQLClient, gql } from 'graphql-request'

import { shopifyConfig } from '@/lib/shopify/config'
import { SHOPIFY_STOREFRONT_ENDPOINT } from '@/lib/shopify/utils'

// const shopify = shopifyApi.shopifyApi({
//   ...shopifyConfig,
// })

// const storefront = new shopify.clients.Storefront({
//   apiVersion: shopifyConfig.apiVersion,
//   session: {}
// })

const graphQLClient = new GraphQLClient(SHOPIFY_STOREFRONT_ENDPOINT, {
  headers: {
    'X-Shopify-Storefront-Access-Token': shopifyConfig?.apiKey as string,
  },
})

export async function getProducts() {
  const getAllProductsQuery = gql`
    {
      products(first: 50) {
        edges {
          node {
            id
            title
            description
            availableForSale
          }
        }
      }
    }
  `
  try {
    return await graphQLClient.request(getAllProductsQuery)
  } catch (error) {
    throw new Error(`\n${error}\n\n Query: ${getAllProductsQuery}\n`)
  }
}
