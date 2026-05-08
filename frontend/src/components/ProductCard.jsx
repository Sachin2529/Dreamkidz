export default function ProductCard({ product, onEnquiry }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover"
        />
        <span className="absolute top-3 left-3 bg-white text-xs text-gray-500 px-2 py-1 rounded-full font-mono">
          {product.styleNumber}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-800 mb-1">{product.name}</h3>
        <p className="text-xs text-gray-400 mb-3">{product.pack}</p>

        <div className="grid grid-cols-2 gap-y-2 text-xs mb-4">
          <div>
            <span className="text-gray-400">MRP</span>
            <p className="font-bold text-gray-800 text-sm">₹{product.price}</p>
          </div>
          <div>
            <span className="text-gray-400">Size Range</span>
            <p className="font-medium text-gray-700">{product.sizeRange}</p>
          </div>
          <div>
            <span className="text-gray-400">MOQ</span>
            <p className="font-medium text-gray-700">{product.moq}</p>
          </div>
        </div>

        <button
          onClick={() => onEnquiry(product)}
          className="w-full bg-pink-500 text-white text-sm py-2.5 rounded-xl hover:bg-pink-600 transition font-medium"
        >
          Click for Enquiry
        </button>
      </div>
    </div>
  );
}