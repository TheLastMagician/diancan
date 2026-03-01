export default function MenuItem({ item, quantity, onAdd, onRemove }) {
  return (
    <div className="bg-white rounded-2xl p-3 flex gap-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-16 h-16 bg-orange-50 rounded-xl flex items-center justify-center text-3xl shrink-0">
        {item.image}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-bold text-gray-800 text-sm">{item.name}</h3>
            <p className="text-xs text-gray-400 mt-0.5 truncate">{item.description}</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-baseline gap-1">
            <span className="text-orange-500 text-xs font-medium">¥</span>
            <span className="text-orange-500 text-lg font-bold">{item.price}</span>
            <span className="text-gray-300 text-xs ml-1">月售{item.sales}</span>
          </div>
          <div className="flex items-center gap-2">
            {quantity > 0 && (
              <>
                <button
                  onClick={onRemove}
                  className="w-6 h-6 rounded-full border border-orange-400 text-orange-400 flex items-center justify-center text-sm font-bold hover:bg-orange-50 transition-colors"
                >
                  −
                </button>
                <span className="w-5 text-center text-sm font-bold text-gray-700">{quantity}</span>
              </>
            )}
            <button
              onClick={onAdd}
              className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold hover:bg-orange-600 transition-colors shadow-sm shadow-orange-200"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
