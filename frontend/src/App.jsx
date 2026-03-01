import { useState } from 'react'
import MenuPage from './pages/MenuPage'
import CartDrawer from './components/CartDrawer'
import OrderPage from './pages/OrderPage'
import OrderDetailPage from './pages/OrderDetailPage'

export default function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [page, setPage] = useState('menu')
  const [currentOrderId, setCurrentOrderId] = useState(null)

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === itemId)
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i)
      }
      return prev.filter(i => i.id !== itemId)
    })
  }

  const clearCart = () => setCart([])

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0)

  const handleOrderSuccess = (orderId) => {
    clearCart()
    setCartOpen(false)
    setCurrentOrderId(orderId)
    setPage('orderDetail')
  }

  return (
    <div className="min-h-screen bg-gray-50 max-w-lg mx-auto relative">
      {page === 'menu' && (
        <MenuPage
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          onOpenCart={() => setCartOpen(true)}
          totalItems={totalItems}
          totalPrice={totalPrice}
          onViewOrders={() => setPage('orders')}
        />
      )}
      {page === 'orders' && (
        <OrderPage
          onBack={() => setPage('menu')}
          onViewDetail={(id) => { setCurrentOrderId(id); setPage('orderDetail') }}
        />
      )}
      {page === 'orderDetail' && (
        <OrderDetailPage
          orderId={currentOrderId}
          onBack={() => setPage('orders')}
          onBackToMenu={() => setPage('menu')}
        />
      )}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        totalPrice={totalPrice}
        onOrderSuccess={handleOrderSuccess}
      />
    </div>
  )
}
