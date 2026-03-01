import { useState, useEffect } from 'react'

export default function OrderPage({ onBack, onViewDetail }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/orders')
      .then(r => r.json())
      .then(data => { setOrders(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const formatTime = (iso) => {
    const d = new Date(iso)
    return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-white px-4 pt-10 pb-4 flex items-center gap-3 shadow-sm">
        <button onClick={onBack} className="text-gray-600 text-lg hover:text-gray-800">←</button>
        <h1 className="text-lg font-bold text-gray-800">我的订单</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {loading ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-xl">加载中...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-2">📋</p>
            <p>暂无订单</p>
            <button onClick={onBack} className="mt-4 text-orange-500 text-sm font-medium">去点餐 →</button>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map(order => (
              <div
                key={order.id}
                onClick={() => onViewDetail(order.id)}
                className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-gray-700">订单 #{order.id}</span>
                  <span className="text-xs text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full font-medium">
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {order.items.slice(0, 4).map(item => (
                    <span key={item.id} className="text-lg">{item.image}</span>
                  ))}
                  {order.items.length > 4 && (
                    <span className="text-xs text-gray-400">+{order.items.length - 4}</span>
                  )}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">{formatTime(order.createdAt)} · 桌号 {order.tableNo}</span>
                  <span className="font-bold text-gray-700">¥{order.total}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
