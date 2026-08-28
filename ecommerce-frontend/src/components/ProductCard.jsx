import { Link } from "react-router-dom";
import { getDiscountPercent, getMrp } from "../utils/pricing.js";

/* ===================== PRODUCT CARD ===================== */
// Single card UI, shared by the grid view (pages/products.jsx) and the
// horizontal-scrolling homepage rows (components/ProductRow.jsx).
// Image + title are clickable and route to the product detail page, where
// the full Amazon-style description lives. The Add to Cart button stays a
// plain button (not inside the Link) so it doesn't trigger navigation.
export default function ProductCard({ product: p, addToCart, className = "" }) {
  const discount = getDiscountPercent(p.id);
  const mrp = getMrp(p.price, p.id);

  return (
    <div
      className={`relative bg-white border border-gray-200 rounded-md p-3 flex flex-col hover:shadow-lg transition-shadow ${className}`}
    >
      {discount >= 30 && (
        <span className="absolute top-2 left-2 bg-[#cc0c39] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
          DEAL
        </span>
      )}

      <Link to={`/product/${p.id}`} className="block">
        <div className="h-36 flex items-center justify-center mb-3">
          <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" />
        </div>

        <h3 className="text-sm text-[#0f1111] line-clamp-2 mb-1 min-h-[2.5rem] hover:text-[#c45500]">{p.name}</h3>
      </Link>

      {/* fake star rating for that Amazon look */}
      <div className="flex items-center gap-1 mb-1 text-[#ffa41c]">
        {"★★★★".split("").map((s, i) => (
          <span key={i} className="text-xs">
            {s}
          </span>
        ))}
        <span className="text-xs text-gray-300">★</span>
        <span className="text-xs text-[#007185] ml-1">(24)</span>
      </div>

      <div className="mb-0.5 flex items-baseline gap-1.5 flex-wrap">
        <span className="text-[13px] text-[#cc0c39] font-semibold">-{discount}%</span>
        <p className="text-lg font-bold text-[#0f1111]">
          <span className="text-xs align-top mr-0.5">₹</span>
          {p.price}
        </p>
      </div>
      <p className="text-xs text-gray-400 line-through mb-1">M.R.P: ₹{mrp}</p>
      <p className="text-xs text-emerald-700 mb-2">Free Delivery by tomorrow</p>

      <button
        onClick={() => addToCart(p)}
        className="mt-auto bg-[#ffd814] hover:bg-[#f7ca00] border border-[#fcd200] rounded-full py-1.5 text-sm font-medium text-[#0f1111] shadow-sm active:scale-[0.98] transition-transform"
      >
        Add to Cart
      </button>
    </div>
  );
}
