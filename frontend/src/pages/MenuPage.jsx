import { useState, useEffect, useRef } from 'react'
import MenuItem from '../components/MenuItem'
import CartBar from '../components/CartBar'

export default function MenuPage({ cart, addToCart, removeFromCart, onOpenCart, totalItems, totalPrice, onViewOrders }) {
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('全部')
  const [menuItems, setMenuItems] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const scrollRef = useRef(null)

  useEffect(() => {
    fetch('/api/categories').then(r => r.json()).then(setCategories)
    fetch('/api/menu').then(r => r.json()).then(setMenuItems)
  }, [])

  const filteredItems = menuItems.filter(item => {
    const matchCategory = activeCategory === '全部' || item.category === activeCategory
    const matchSearch = !searchQuery || item.name.includes(searchQuery) || item.description.includes(searchQuery)
    return matchCategory && matchSearch
  })

  const getCartQuantity = (itemId) => {
    const found = cart.find(i => i.id === itemId)
    return found ? found.quantity : 0
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 pt-10 pb-4 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h1 className="text-xl font-bold">美味餐厅</h1>
            <p className="text-orange-100 text-xs mt-0.5">精选美食 · 新鲜直达</p>
          </div>
          <button
            onClick={onViewOrders}
            className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium hover:bg-white/30 transition-colors"
          >
            📋 我的订单
          </button>
        </div>
        {/* Search */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="搜索菜品..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-full bg-white text-gray-700 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar" ref={scrollRef}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all shrink-0
              ${activeCategory === cat
                ? 'bg-orange-500 text-white shadow-md shadow-orange-200'
                : 'bg-white text-gray-600 hover:bg-orange-50'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-2">🍽️</p>
            <p>没有找到相关菜品</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredItems.map(item => (
              <MenuItem
                key={item.id}
                item={item}
                quantity={getCartQuantity(item.id)}
                onAdd={() => addToCart(item)}
                onRemove={() => removeFromCart(item.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Cart Bar */}
      <CartBar
        totalItems={totalItems}
        totalPrice={totalPrice}
        onOpenCart={onOpenCart}
      />
    </div>
  )
}
