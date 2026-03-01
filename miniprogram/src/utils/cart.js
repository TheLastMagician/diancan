import Taro from '@tarojs/taro'

const CART_KEY = 'cart_items'

export function getCart() {
  try {
    const data = Taro.getStorageSync(CART_KEY)
    return data ? JSON.parse(data) : []
  } catch (e) {
    return []
  }
}

export function saveCart(cart) {
  try {
    Taro.setStorageSync(CART_KEY, JSON.stringify(cart))
  } catch (e) {
    console.error('Failed to save cart', e)
  }
}

export function addItem(cart, item) {
  const existing = cart.find(i => i.id === item.id)
  if (existing) {
    return cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
  }
  return [...cart, { ...item, quantity: 1 }]
}

export function removeItem(cart, itemId) {
  const existing = cart.find(i => i.id === itemId)
  if (existing && existing.quantity > 1) {
    return cart.map(i => i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i)
  }
  return cart.filter(i => i.id !== itemId)
}

export function getCartTotal(cart) {
  return {
    totalItems: cart.reduce((sum, i) => sum + i.quantity, 0),
    totalPrice: cart.reduce((sum, i) => sum + i.price * i.quantity, 0)
  }
}
