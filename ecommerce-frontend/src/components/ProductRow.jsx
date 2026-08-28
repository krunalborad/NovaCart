import { useRef } from "react";
import ProductCard from "./ProductCard.jsx";

/* ===================== PRODUCT ROW (horizontal scroll shelf) ===================== */
// Renders a titled shelf of products you scroll through sideways — the
// "Deals for you" / "Best Sellers in Electronics" style rows on Amazon's
// actual homepage.
export default function ProductRow({ title, products, addToCart, onSeeMore }) {
  const scrollRef = useRef(null);

  if (!products || products.length === 0) return null;

  const scrollBy = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section className="bg-white rounded-md p-4 mb-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-[#0f1111]">{title}</h2>
        {onSeeMore && (
          <button onClick={onSeeMore} className="text-sm text-[#007185] hover:underline hover:text-[#c45500]">
            See more
          </button>
        )}
      </div>

      <div className="relative">
        {/* left/right scroll buttons (desktop) */}
        <button
          onClick={() => scrollBy(-1)}
          className="hidden sm:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10 h-9 w-9 items-center justify-center rounded-full bg-white shadow-md border border-gray-200 hover:bg-gray-50"
          aria-label="Scroll left"
        >
          ‹
        </button>
        <button
          onClick={() => scrollBy(1)}
          className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 h-9 w-9 items-center justify-center rounded-full bg-white shadow-md border border-gray-200 hover:bg-gray-50"
          aria-label="Scroll right"
        >
          ›
        </button>

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-1 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full"
        >
          {products.map((p) => (
            <ProductCard key={p.id} product={p} addToCart={addToCart} className="w-40 sm:w-48 shrink-0 snap-start" />
          ))}
        </div>
      </div>
    </section>
  );
}
