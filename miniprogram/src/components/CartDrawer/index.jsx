import { View, Text, Input } from '@tarojs/components'
import './index.css'

export default function CartDrawer({
  visible,
  cart,
  totalPrice,
  onClose,
  onAdd,
  onRemove,
  onClear,
  tableNo,
  remark,
  onTableNoChange,
  onRemarkChange,
  onSubmit,
  submitting
}) {
  if (!visible) return null

  return (
    <View className='cart-drawer'>
      <View className='cart-drawer__overlay' onClick={onClose} />
      <View className='cart-drawer__panel'>
        <View className='cart-drawer__header'>
          <Text className='cart-drawer__title'>购物车</Text>
          <View className='cart-drawer__header-right'>
            {cart.length > 0 && (
              <Text className='cart-drawer__clear' onClick={onClear}>清空</Text>
            )}
            <Text className='cart-drawer__close' onClick={onClose}>✕</Text>
          </View>
        </View>

        <View className='cart-drawer__body'>
          {cart.length === 0 ? (
            <View className='cart-drawer__empty'>
              <Text className='cart-drawer__empty-icon'>🛒</Text>
              <Text className='cart-drawer__empty-text'>购物车是空的</Text>
              <Text className='cart-drawer__empty-hint'>快去挑选美味菜品吧~</Text>
            </View>
          ) : (
            <View className='cart-drawer__list'>
              {cart.map(item => (
                <View key={item.id} className='cart-drawer__item'>
                  <View className='cart-drawer__item-left'>
                    <Text className='cart-drawer__item-icon'>{item.image}</Text>
                    <View className='cart-drawer__item-info'>
                      <Text className='cart-drawer__item-name'>{item.name}</Text>
                      <Text className='cart-drawer__item-price'>¥{item.price}</Text>
                    </View>
                  </View>
                  <View className='cart-drawer__item-actions'>
                    <View className='cart-drawer__qty-btn cart-drawer__qty-btn--minus' onClick={() => onRemove(item.id)}>
                      <Text>−</Text>
                    </View>
                    <Text className='cart-drawer__qty-num'>{item.quantity}</Text>
                    <View className='cart-drawer__qty-btn cart-drawer__qty-btn--plus' onClick={() => onAdd(item)}>
                      <Text>+</Text>
                    </View>
                  </View>
                </View>
              ))}

              <View className='cart-drawer__form'>
                <View className='cart-drawer__field'>
                  <Text className='cart-drawer__label'>桌号</Text>
                  <Input
                    className='cart-drawer__input'
                    placeholder='请输入桌号（如: A3）'
                    value={tableNo}
                    onInput={onTableNoChange}
                  />
                </View>
                <View className='cart-drawer__field'>
                  <Text className='cart-drawer__label'>备注</Text>
                  <Input
                    className='cart-drawer__input'
                    placeholder='如：少辣、不要香菜...'
                    value={remark}
                    onInput={onRemarkChange}
                  />
                </View>
              </View>
            </View>
          )}
        </View>

        {cart.length > 0 && (
          <View className='cart-drawer__footer'>
            <View className='cart-drawer__total-row'>
              <Text className='cart-drawer__total-label'>合计</Text>
              <Text className='cart-drawer__total-price'>¥{totalPrice}</Text>
            </View>
            <View
              className={`cart-drawer__submit ${submitting ? 'cart-drawer__submit--disabled' : ''}`}
              onClick={submitting ? undefined : onSubmit}
            >
              <Text className='cart-drawer__submit-text'>
                {submitting ? '提交中...' : '确认下单'}
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  )
}
