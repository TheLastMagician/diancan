import { View, Text } from '@tarojs/components'
import './index.css'

export default function MenuItem({ item, quantity, onAdd, onRemove }) {
  return (
    <View className='menu-item'>
      <View className='menu-item__icon'>
        <Text className='menu-item__emoji'>{item.image}</Text>
      </View>
      <View className='menu-item__content'>
        <View className='menu-item__header'>
          <Text className='menu-item__name'>{item.name}</Text>
          <Text className='menu-item__desc'>{item.description}</Text>
        </View>
        <View className='menu-item__footer'>
          <View className='menu-item__price-row'>
            <Text className='menu-item__currency'>¥</Text>
            <Text className='menu-item__price'>{item.price}</Text>
            <Text className='menu-item__sales'>月售{item.sales}</Text>
          </View>
          <View className='menu-item__actions'>
            {quantity > 0 && (
              <View className='menu-item__qty-group'>
                <View className='menu-item__btn menu-item__btn--minus' onClick={onRemove}>
                  <Text>−</Text>
                </View>
                <Text className='menu-item__qty'>{quantity}</Text>
              </View>
            )}
            <View className='menu-item__btn menu-item__btn--plus' onClick={onAdd}>
              <Text>+</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
