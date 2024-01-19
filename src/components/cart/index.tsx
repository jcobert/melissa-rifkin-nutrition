import CartModal from './modal'
import { cookies } from 'next/headers'

import { getCart } from '@/lib/shopify'
import type { Cart } from '@/lib/shopify/types'

export default async function Cart() {
  const cartId = cookies().get('cartId')?.value
  let cart: Cart | undefined

  if (cartId) {
    cart = await getCart(cartId)
  }

  return <CartModal cart={cart} />
}
