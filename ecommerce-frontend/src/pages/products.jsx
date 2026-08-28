import ProductCard from "../components/ProductCard.jsx";

/* ===================== PRODUCTS GRID ===================== */
// Pure presentational component: renders a grid of product cards.
// Used for the search/category "results" listing view.
export default function Products({ products, addToCart }) {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-md p-10 text-center text-gray-500">
        No products found. Try a different search or category.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} addToCart={addToCart} />
      ))}
    </div>
  );
}
