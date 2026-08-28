import { useState, useEffect } from "react";
import Products from "./products.jsx";
import ProductRow from "../components/ProductRow.jsx";
import { CATEGORIES, matchesCategory } from "../utils/pricing.js";

const SLIDES = [
  {
    tag: "Big Shopping Days",
    title: "Up to 40% off Electronics & Fashion",
    subtitle: "Free delivery on eligible orders. Limited time only.",
    from: "#232f3e",
    to: "#37475a",
    cta: "Shop Today's Deals",
    goTo: "Today's Deals",
  },
  {
    tag: "New Arrivals",
    title: "Upgrade your tech this season",
    subtitle: "Headphones, watches, laptops & more — all in one place.",
    from: "#0f4c81",
    to: "#1a6fb0",
    cta: "Shop Electronics",
    goTo: "Electronics",
  },
  {
    tag: "Wardrobe Refresh",
    title: "Fresh styles just landed",
    subtitle: "Shirts, tees & footwear for every occasion.",
    from: "#5a2a83",
    to: "#8b3fb8",
    cta: "Shop Fashion",
    goTo: "Fashion",
  },
];

/* ===================== HOME PAGE ("/") ===================== */
export default function Home({
  allProducts,
  products,
  loading,
  addToCart,
  category,
  setCategory,
  sortOrder,
  setSortOrder,
  search,
}) {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 4500);
    return () => clearInterval(id);
  }, []);

  if (loading) {
    return <p className="p-8 text-center text-gray-500">Loading products...</p>;
  }

  // Rich, scrolling "storefront" homepage — only when browsing freely
  // (no active search text and no category filter). The moment someone
  // searches or picks a category, we drop into a focused results view.
  const isBrowsingHome = category === "All" && search.trim() === "";

  const current = SLIDES[slide];

  const rows = [
    { title: "Today's Deals", items: allProducts.filter((p) => matchesCategory(p, "Today's Deals")) },
    { title: "Electronics for you", items: allProducts.filter((p) => matchesCategory(p, "Electronics")) },
    { title: "Fashion picks", items: allProducts.filter((p) => matchesCategory(p, "Fashion")) },
    { title: "Home essentials", items: allProducts.filter((p) => matchesCategory(p, "Home")) },
    { title: "Recommended for you", items: allProducts },
  ];

  return (
    <div>
      {/* Hero banner — rotating slides */}
      <div
        className="relative text-white overflow-hidden transition-colors duration-700"
        style={{ background: `linear-gradient(to right, ${current.from}, ${current.to})` }}
      >
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-14 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-[#febd69] font-semibold text-sm mb-1">{current.tag}</p>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 max-w-lg">{current.title}</h1>
            <p className="text-sm text-gray-200">{current.subtitle}</p>
          </div>
          <button
            onClick={() => setCategory(current.goTo)}
            className="bg-[#ffd814] hover:bg-[#f7ca00] border border-[#fcd200] rounded-full px-6 py-2.5 text-sm font-semibold text-[#0f1111] shrink-0"
          >
            {current.cta}
          </button>
        </div>

        {/* slide dots */}
        <div className="flex justify-center gap-1.5 pb-3">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === slide ? "w-6 bg-[#febd69]" : "w-1.5 bg-white/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {isBrowsingHome ? (
        // ===== Rich scrolling storefront =====
        <div className="max-w-7xl mx-auto px-4 py-6">
          {rows.map((row) => (
            <ProductRow
              key={row.title}
              title={row.title}
              products={row.items}
              addToCart={addToCart}
              onSeeMore={
                row.title !== "Recommended for you"
                  ? () => setCategory(row.title === "Today's Deals" ? "Today's Deals" : row.title.split(" ")[0])
                  : undefined
              }
            />
          ))}
        </div>
      ) : (
        // ===== Focused results view (search / category selected) =====
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-5">
            <aside className="bg-white rounded-md p-4 h-fit">
              <h3 className="font-bold text-sm mb-3">Category</h3>
              <div className="flex flex-col gap-2 mb-5">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`text-left text-sm px-2 py-1.5 rounded ${
                      category === c
                        ? "bg-[#f0f2f2] font-semibold text-[#c45500]"
                        : "text-[#0f1111] hover:text-[#c45500]"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <h3 className="font-bold text-sm mb-3">Sort By</h3>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600]"
              >
                <option value="relevance">Relevance</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
              </select>
            </aside>

            <div>
              <h2 className="text-xl font-bold mb-4 text-[#0f1111]">
                {search.trim() ? `Results for "${search}"` : category}{" "}
                <span className="text-sm font-normal text-gray-500">({products.length} products)</span>
              </h2>
              <Products products={products} addToCart={addToCart} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}