import { useState } from 'react'

export default function CartDrawer({ open, onClose, cart, addToCart, removeFromCart, clearCart, totalPrice, onOrderSuccess }) {
  const [tableNo, setTableNo] = useState('')
  const [remark, setRemark] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (cart.length === 0) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map(i => ({ id: i.id, quantity: i.quantity })),
          tableNo,
          remark,
        }),
      })
      const order = await res.json()
      if (order.id) {
        setTableNo('')
        setRemark('')
        onOrderSuccess(order.id)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  if (!open) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed bottom-0 left-0 right-0 z-50 max-w-lg mx-auto">
        <div className="bg-white rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800">购物车</h2>
            <div className="flex items-center gap-3">
              {cart.length > 0 && (
                <button onClick={clearCart} className="text-sm text-gray-400 hover:text-red-400 transition-colors">
                  清空
                </button>
              )}
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-5 py-3">
            {cart.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <p className="text-4xl mb-2">🛒</p>
                <p>购物车是空的</p>
                <p className="text-sm mt-1">快去挑选美味菜品吧~</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-2xl">{item.image}</span>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-800 text-sm truncate">{item.name}</p>
                        <p className="text-orange-500 text-sm font-bold">¥{item.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-7 h-7 rounded-full border border-gray-300 text-gray-400 flex items-center justify-center text-sm hover:border-orange-400 hover:text-orange-400 transition-colors"
                      >
                        −
                      </button>
                      <span className="w-6 text-center font-bold text-gray-700">{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm hover:bg-orange-600 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cart.length > 0 && (
              <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">
                <div>
                  <label className="text-sm text-gray-500 block mb-1">桌号</label>
                  <input
                    type="text"
                    placeholder="请输入桌号（如: A3）"
                    value={tableNo}
                    onChange={e => setTableNo(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500 block mb-1">备注</label>
                  <input
                    type="text"
                    placeholder="如：少辣、不要香菜..."
                    value={remark}
                    onChange={e => setRemark(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-gray-100 px-5 py-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-500 text-sm">合计</span>
                <span className="text-orange-500 text-xl font-bold">¥{totalPrice}</span>
              </div>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-bold text-base hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-60 shadow-lg shadow-orange-200"
              >
                {submitting ? '提交中...' : '确认下单'}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
