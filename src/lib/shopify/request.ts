import { GraphQLClient, gql } from 'graphql-request'

import {
  SHOPIFY_STOREFRONT_ENDPOINT,
  shopifyConfig,
} from '@/lib/shopify/config'

const graphQLClient = new GraphQLClient(SHOPIFY_STOREFRONT_ENDPOINT, {
  headers: {
    'X-Shopify-Storefront-Access-Token': shopifyConfig?.apiKey as string,
  },
})

export const getProducts = async () => {
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
