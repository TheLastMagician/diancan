import { useState, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { getOrderDetail } from '../../utils/request'
import './index.css'

export default function OrderDetailPage() {
  const router = useRouter()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const id = router.params.id
    if (id) {
      loadOrder(id)
    }
  }, [router.params.id])

  const loadOrder = async (id) => {
    try {
      const data = await getOrderDetail(id)
      setOrder(data)
    } catch (err) {
      Taro.showToast({ title: '加载失败', icon: 'none' })
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (iso) => {
    const d = new Date(iso)
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  }

  const statusSteps = ['已下单', '制作中', '已完成']

  const getCurrentStep = (status) => {
    const idx = statusSteps.indexOf(status)
    return idx >= 0 ? idx : 0
  }

  const goBackToMenu = () => {
    Taro.switchTab({ url: '/pages/menu/index' })
  }

  if (loading) {
    return (
      <View className='detail-page__loading'>
        <Text>加载中...</Text>
      </View>
    )
  }

  if (!order) {
    return (
      <View className='detail-page__error'>
        <Text className='detail-page__error-icon'>😵</Text>
        <Text className='detail-page__error-text'>订单不存在</Text>
        <View className='detail-page__error-btn' onClick={goBackToMenu}>
          <Text className='detail-page__error-btn-text'>返回首页</Text>
        </View>
      </View>
    )
  }

  const currentStep = getCurrentStep(order.status)

  return (
    <View className='detail-page'>
      {/* Success Banner */}
      <View className='detail-page__banner'>
        <Text className='detail-page__banner-icon'>✅</Text>
        <Text className='detail-page__banner-title'>下单成功</Text>
        <Text className='detail-page__banner-id'>订单号 #{order.id}</Text>
      </View>

      {/* Status Progress */}
      <View className='detail-page__progress'>
        {statusSteps.map((step, idx) => (
          <View key={step} className='detail-page__step'>
            <View className={`detail-page__step-dot ${idx <= currentStep ? 'detail-page__step-dot--active' : ''}`}>
              <Text className='detail-page__step-dot-text'>{idx < currentStep ? '✓' : idx + 1}</Text>
            </View>
            <Text className={`detail-page__step-label ${idx <= currentStep ? 'detail-page__step-label--active' : ''}`}>
              {step}
            </Text>
            {idx < statusSteps.length - 1 && (
              <View className={`detail-page__step-line ${idx < currentStep ? 'detail-page__step-line--active' : ''}`} />
            )}
          </View>
        ))}
      </View>

      {/* Order Info */}
      <View className='detail-page__card'>
        <Text className='detail-page__card-title'>订单信息</Text>
        <View className='detail-page__info-row'>
          <Text className='detail-page__info-label'>桌号</Text>
          <Text className='detail-page__info-value'>{order.tableNo}</Text>
        </View>
        <View className='detail-page__info-row'>
          <Text className='detail-page__info-label'>下单时间</Text>
          <Text className='detail-page__info-value'>{formatTime(order.createdAt)}</Text>
        </View>
        <View className='detail-page__info-row'>
          <Text className='detail-page__info-label'>状态</Text>
          <Text className='detail-page__info-value detail-page__info-value--highlight'>{order.status}</Text>
        </View>
        {order.remark && (
          <View className='detail-page__info-row'>
            <Text className='detail-page__info-label'>备注</Text>
            <Text className='detail-page__info-value'>{order.remark}</Text>
          </View>
        )}
      </View>

      {/* Items */}
      <View className='detail-page__card'>
        <Text className='detail-page__card-title'>菜品明细</Text>
        {order.items.map(item => (
          <View key={item.id} className='detail-page__dish'>
            <View className='detail-page__dish-left'>
              <Text className='detail-page__dish-icon'>{item.image}</Text>
              <View className='detail-page__dish-info'>
                <Text className='detail-page__dish-name'>{item.name}</Text>
                <Text className='detail-page__dish-spec'>¥{item.price} × {item.quantity}</Text>
              </View>
            </View>
            <Text className='detail-page__dish-price'>¥{item.price * item.quantity}</Text>
          </View>
        ))}
        <View className='detail-page__total-row'>
          <Text className='detail-page__total-count'>
            共 {order.items.reduce((s, i) => s + i.quantity, 0)} 件
          </Text>
          <View className='detail-page__total-right'>
            <Text className='detail-page__total-label'>合计 </Text>
            <Text className='detail-page__total-price'>¥{order.total}</Text>
          </View>
        </View>
      </View>

      {/* Bottom Button */}
      <View className='detail-page__bottom'>
        <View className='detail-page__btn' onClick={goBackToMenu}>
          <Text className='detail-page__btn-text'>继续点餐</Text>
        </View>
      </View>
    </View>
  )
}
