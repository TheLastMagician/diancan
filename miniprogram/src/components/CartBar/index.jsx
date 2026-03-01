import { View, Text } from '@tarojs/components'
import './index.css'

export default function CartBar({ totalItems, totalPrice, onOpenCart, onCheckout }) {
  if (totalItems === 0) return null

  return (
    <View className='cart-bar'>
      <View className='cart-bar__inner' onClick={onOpenCart}>
        <View className='cart-bar__left'>
          <View className='cart-bar__icon-wrap'>
            <Text className='cart-bar__icon'>🛒</Text>
            <View className='cart-bar__badge'>
              <Text className='cart-bar__badge-text'>{totalItems}</Text>
            </View>
          </View>
          <Text className='cart-bar__price'>¥{totalPrice}</Text>
        </View>
        <View className='cart-bar__btn' onClick={(e) => { e.stopPropagation(); onCheckout(); }}>
          <Text className='cart-bar__btn-text'>去结算</Text>
        </View>
      </View>
    </View>
  )
}
