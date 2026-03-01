import { useState } from 'react'
import { View, Text } from '@tarojs/components'
import Taro, { useDidShow, usePullDownRefresh } from '@tarojs/taro'
import { getOrders } from '../../utils/request'
import './index.css'

export default function OrderPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useDidShow(() => {
    loadOrders()
  })

  usePullDownRefresh(() => {
    loadOrders().then(() => Taro.stopPullDownRefresh())
  })

  const loadOrders = async () => {
    setLoading(true)
    try {
      const data = await getOrders()
      setOrders(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (iso) => {
    const d = new Date(iso)
    return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  }

  const statusColorMap = {
    '已下单': '#ff9500',
    '制作中': '#007aff',
    '已完成': '#34c759',
    '已取消': '#999'
  }

  const viewDetail = (id) => {
    Taro.navigateTo({ url: `/pages/orderDetail/index?id=${id}` })
  }

  const goBack = () => {
    Taro.navigateBack({ delta: 1 }).catch(() => {
      Taro.redirectTo({ url: '/pages/menu/index' })
    })
  }

  return (
    <View className='order-page'>
      <View className='order-page__header' onClick={goBack}>
        <Text className='order-page__back'>←</Text>
        <Text className='order-page__header-title'>我的订单</Text>
      </View>
      {loading ? (
        <View className='order-page__loading'>
          <Text className='order-page__loading-text'>加载中...</Text>
        </View>
      ) : orders.length === 0 ? (
        <View className='order-page__empty'>
          <Text className='order-page__empty-icon'>📋</Text>
          <Text className='order-page__empty-text'>暂无订单</Text>
          <Text className='order-page__empty-hint'>快去点餐吧~</Text>
        </View>
      ) : (
        <View className='order-page__list'>
          {orders.map(order => (
            <View key={order.id} className='order-card' onClick={() => viewDetail(order.id)}>
              <View className='order-card__header'>
                <Text className='order-card__id'>订单 #{order.id}</Text>
                <View className='order-card__status' style={{ backgroundColor: `${statusColorMap[order.status] || '#999'}20`, }}>
                  <Text className='order-card__status-text' style={{ color: statusColorMap[order.status] || '#999' }}>
                    {order.status}
                  </Text>
                </View>
              </View>
              <View className='order-card__items'>
                {order.items.slice(0, 5).map(item => (
                  <View key={item.id} className='order-card__item-icon-wrap'>
                    <Text className='order-card__item-icon'>{item.image}</Text>
                  </View>
                ))}
                {order.items.length > 5 && (
                  <View className='order-card__item-more'>
                    <Text className='order-card__item-more-text'>+{order.items.length - 5}</Text>
                  </View>
                )}
              </View>
              <View className='order-card__footer'>
                <Text className='order-card__time'>{formatTime(order.createdAt)} · 桌号 {order.tableNo}</Text>
                <Text className='order-card__total'>¥{order.total}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  )
}
