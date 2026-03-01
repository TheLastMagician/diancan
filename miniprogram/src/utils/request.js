import Taro from '@tarojs/taro'

const BASE_URL = process.env.TARO_ENV === 'h5' ? '' : 'http://localhost:3001'

export function request(options) {
  const { url, method = 'GET', data } = options
  return new Promise((resolve, reject) => {
    Taro.request({
      url: `${BASE_URL}${url}`,
      method,
      data,
      header: { 'Content-Type': 'application/json' },
      success: (res) => resolve(res.data),
      fail: (err) => reject(err)
    })
  })
}

export function getCategories() {
  return request({ url: '/api/categories' })
}

export function getMenu(category) {
  const query = category && category !== '全部' ? `?category=${encodeURIComponent(category)}` : ''
  return request({ url: `/api/menu${query}` })
}

export function getMenuDetail(id) {
  return request({ url: `/api/menu/${id}` })
}

export function createOrder(orderData) {
  return request({ url: '/api/orders', method: 'POST', data: orderData })
}

export function getOrders() {
  return request({ url: '/api/orders' })
}

export function getOrderDetail(id) {
  return request({ url: `/api/orders/${id}` })
}
