import { useState, useEffect, useCallback } from 'react'
import { View, Text, Input, ScrollView } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import MenuItem from '../../components/MenuItem'
import CartBar from '../../components/CartBar'
import CartDrawer from '../../components/CartDrawer'
import { getCategories, getMenu, createOrder } from '../../utils/request'
import { getCart, saveCart, addItem, removeItem, getCartTotal } from '../../utils/cart'
import './index.css'

export default function MenuPage() {
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('全部')
  const [menuItems, setMenuItems] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [tableNo, setTableNo] = useState('')
  const [remark, setRemark] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  useDidShow(() => {
    setCart(getCart())
  })

  const loadData = async () => {
    try {
      const [cats, items] = await Promise.all([getCategories(), getMenu()])
      setCategories(cats)
      setMenuItems(items)
    } catch (err) {
      console.error('Failed to load data', err)
      Taro.showToast({ title: '加载失败', icon: 'none' })
    }
  }

  const filteredItems = menuItems.filter(item => {
    const matchCat = activeCategory === '全部' || item.category === activeCategory
    const matchSearch = !searchQuery || item.name.includes(searchQuery) || item.description.includes(searchQuery)
    return matchCat && matchSearch
  })

  const getQty = (itemId) => {
    const found = cart.find(i => i.id === itemId)
    return found ? found.quantity : 0
  }

  const handleAdd = useCallback((item) => {
    setCart(prev => {
      const next = addItem(prev, item)
      saveCart(next)
      return next
    })
  }, [])

  const handleRemove = useCallback((itemId) => {
    setCart(prev => {
      const next = removeItem(prev, itemId)
      saveCart(next)
      return next
    })
  }, [])

  const handleClear = () => {
    setCart([])
    saveCart([])
  }

  const handleSubmit = async () => {
    if (cart.length === 0) return
    setSubmitting(true)
    try {
      const order = await createOrder({
        items: cart.map(i => ({ id: i.id, quantity: i.quantity })),
        tableNo: tableNo || undefined,
        remark: remark || undefined
      })
      if (order.id) {
        setCart([])
        saveCart([])
        setCartOpen(false)
        setTableNo('')
        setRemark('')
        Taro.showToast({ title: '下单成功！', icon: 'success', duration: 1500 })
        setTimeout(() => {
          Taro.navigateTo({ url: `/pages/orderDetail/index?id=${order.id}` })
        }, 800)
      }
    } catch (err) {
      Taro.showToast({ title: '下单失败', icon: 'none' })
    } finally {
      setSubmitting(false)
    }
  }

  const { totalItems, totalPrice } = getCartTotal(cart)

  return (
    <View className='menu-page'>
      {/* Header */}
      <View className='menu-page__header'>
        <View className='menu-page__header-top'>
          <View>
            <Text className='menu-page__title'>美味餐厅</Text>
            <Text className='menu-page__subtitle'>精选美食 · 新鲜直达</Text>
          </View>
          <View className='menu-page__orders-btn' onClick={() => Taro.navigateTo({ url: '/pages/order/index' })}>
            <Text className='menu-page__orders-btn-text'>📋 我的订单</Text>
          </View>
        </View>
        <View className='menu-page__search'>
          <Text className='menu-page__search-icon'>🔍</Text>
          <Input
            className='menu-page__search-input'
            placeholder='搜索菜品...'
            value={searchQuery}
            onInput={(e) => setSearchQuery(e.detail.value)}
          />
        </View>
      </View>

      {/* Categories */}
      <ScrollView scrollX className='menu-page__categories'>
        {categories.map(cat => (
          <View
            key={cat}
            className={`menu-page__cat-item ${activeCategory === cat ? 'menu-page__cat-item--active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            <Text className='menu-page__cat-text'>{cat}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Menu Items */}
      <ScrollView scrollY className='menu-page__list'>
        {filteredItems.length === 0 ? (
          <View className='menu-page__empty'>
            <Text className='menu-page__empty-icon'>🍽️</Text>
            <Text className='menu-page__empty-text'>没有找到相关菜品</Text>
          </View>
        ) : (
          <View className='menu-page__items'>
            {filteredItems.map(item => (
              <MenuItem
                key={item.id}
                item={item}
                quantity={getQty(item.id)}
                onAdd={() => handleAdd(item)}
                onRemove={() => handleRemove(item.id)}
              />
            ))}
          </View>
        )}
        <View className='menu-page__bottom-space' />
      </ScrollView>

      {/* Cart Bar */}
      <CartBar
        totalItems={totalItems}
        totalPrice={totalPrice}
        onOpenCart={() => setCartOpen(true)}
        onCheckout={() => setCartOpen(true)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        visible={cartOpen}
        cart={cart}
        totalPrice={totalPrice}
        onClose={() => setCartOpen(false)}
        onAdd={handleAdd}
        onRemove={handleRemove}
        onClear={handleClear}
        tableNo={tableNo}
        remark={remark}
        onTableNoChange={(e) => setTableNo(e.detail.value)}
        onRemarkChange={(e) => setRemark(e.detail.value)}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </View>
  )
}
