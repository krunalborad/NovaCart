import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getDiscountPercent, getMrp } from "../utils/pricing.js";
import { getDescription } from "../utils/descriptions.js";

/* ===================== PRODUCT DETAIL PAGE ("/product/:id") ===================== */
export default function ProductDetail({ allProducts, addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const product = allProducts.find((p) => String(p.id) === String(id));

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-lg text-gray-600 mb-3">Product not found.</p>
        <Link to="/" className="text-[#007185] hover:underline text-sm">
          Back to shop
        </Link>
      </div>
    );
  }

  const discount = getDiscountPercent(product.id);
  const mrp = getMrp(product.price, product.id);
  const { paragraph, bullets } = getDescription(product);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
  };

  const buyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="text-xs text-gray-500 mb-4">
        <Link to="/" className="hover:text-[#c45500] hover:underline">
          Home
        </Link>{" "}
        › <span className="text-[#0f1111]">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr_280px] gap-6 items-start">
        {/* Image */}
        <div className="bg-white rounded-md p-6 flex items-center justify-center">
          <img src={product.image} alt={product.name} className="max-h-80 object-contain" />
        </div>

        {/* Main info */}
        <div className="bg-white rounded-md p-5">
          <h1 className="text-xl font-semibold text-[#0f1111] mb-1">{product.name}</h1>

          <div className="flex items-center gap-1 mb-2 text-[#ffa41c]">
            {"★★★★".split("").map((s, i) => (
              <span key={i} className="text-sm">
                {s}
              </span>
            ))}
            <span className="text-sm text-gray-300">★</span>
            <span className="text-sm text-[#007185] ml-1">24 ratings</span>
          </div>

          <div className="border-t border-gray-100 pt-3 mb-4">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-[#cc0c39] text-lg font-semibold">-{discount}%</span>
              <span className="text-2xl font-bold text-[#0f1111]">
                <span className="text-sm align-top mr-0.5">₹</span>
                {product.price}
              </span>
            </div>
            <p className="text-sm text-gray-400 line-through">M.R.P: ₹{mrp}</p>
            <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
          </div>

          <h2 className="font-semibold text-[#0f1111] mb-2">About this item</h2>
          <ul className="space-y-1.5 text-sm text-[#0f1111] mb-4 list-disc list-inside">
            {bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>

          <h2 className="font-semibold text-[#0f1111] mb-2">Product Description</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{paragraph}</p>
        </div>

        {/* Buy box */}
        <div className="bg-white rounded-md p-4 h-fit space-y-3">
          <p className="text-2xl font-bold text-[#0f1111]">
            <span className="text-sm align-top mr-0.5">₹</span>
            {product.price}
          </p>
          <p className="text-emerald-700 text-sm">In Stock</p>
          <p className="text-xs text-gray-500">Free delivery by tomorrow</p>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Qty:</label>
            <select
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600]"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-[#ffd814] hover:bg-[#f7ca00] border border-[#fcd200] rounded-full py-2 text-sm font-medium text-[#0f1111]"
          >
            Add to Cart
          </button>
          <button
            onClick={buyNow}
            className="w-full bg-[#ffa41c] hover:bg-[#fa8900] border border-[#ff8f00] rounded-full py-2 text-sm font-medium text-[#0f1111]"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
