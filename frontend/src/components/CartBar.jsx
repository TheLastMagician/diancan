export default function CartBar({ totalItems, totalPrice, onOpenCart }) {
  if (totalItems === 0) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      <div className="max-w-lg mx-auto px-4 pb-4">
        <div
          onClick={onOpenCart}
          className="bg-gray-800 rounded-2xl px-4 py-3 flex items-center justify-between cursor-pointer shadow-xl shadow-gray-400/30 hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="text-2xl">🛒</span>
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            </div>
            <div>
              <span className="text-white text-lg font-bold">¥{totalPrice}</span>
            </div>
          </div>
          <button className="bg-orange-500 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors">
            去结算
          </button>
        </div>
      </div>
    </div>
  )
}
