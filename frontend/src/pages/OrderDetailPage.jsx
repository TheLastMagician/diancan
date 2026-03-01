import { useState, useEffect } from 'react'

export default function OrderDetailPage({ orderId, onBack, onBackToMenu }) {
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/orders/${orderId}`)
      .then(r => r.json())
      .then(data => { setOrder(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [orderId])

  const formatTime = (iso) => {
    const d = new Date(iso)
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        加载中...
      </div>
    )
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-400">
        <p className="text-4xl mb-2">😵</p>
        <p>订单不存在</p>
        <button onClick={onBackToMenu} className="mt-4 text-orange-500 font-medium">返回首页</button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 pt-10 pb-6 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="text-white/80 text-lg hover:text-white">←</button>
          <h1 className="text-lg font-bold">订单详情</h1>
        </div>
        <div className="text-center">
          <p className="text-4xl mb-2">✅</p>
          <p className="text-xl font-bold">下单成功</p>
          <p className="text-orange-100 text-sm mt-1">订单号 #{order.id}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Order Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-gray-700 mb-3 text-sm">订单信息</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">桌号</span>
              <span className="text-gray-700 font-medium">{order.tableNo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">下单时间</span>
              <span className="text-gray-700">{formatTime(order.createdAt)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">状态</span>
              <span className="text-orange-500 font-medium">{order.status}</span>
            </div>
            {order.remark && (
              <div className="flex justify-between">
                <span className="text-gray-400">备注</span>
                <span className="text-gray-700">{order.remark}</span>
              </div>
            )}
          </div>
        </div>

        {/* Items */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-gray-700 mb-3 text-sm">菜品明细</h3>
          <div className="space-y-3">
            {order.items.map(item => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{item.image}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-700">{item.name}</p>
                    <p className="text-xs text-gray-400">¥{item.price} × {item.quantity}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-700">¥{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between items-center">
            <span className="text-gray-500 text-sm">共 {order.items.reduce((s, i) => s + i.quantity, 0)} 件</span>
            <div>
              <span className="text-gray-500 text-sm">合计 </span>
              <span className="text-orange-500 text-xl font-bold">¥{order.total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="px-4 py-4">
        <button
          onClick={onBackToMenu}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg shadow-orange-200"
        >
          继续点餐
        </button>
      </div>
    </div>
  )
}
