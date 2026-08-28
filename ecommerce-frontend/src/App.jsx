import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar.jsx";
import Home from "./pages/home.jsx";
import Cart from "./pages/cart.jsx";
import Address from "./pages/address.jsx";
import OrderSuccess from "./pages/ordersuccess.jsx";
import AdminPanel from "./pages/admin.jsx";
import ProductDetail from "./pages/productdetail.jsx";
import { matchesCategory, sortProducts } from "./utils/pricing.js";

/* ===================== APP ===================== */
export default function App() {
  return (
    <BrowserRouter>
      <Shop />
    </BrowserRouter>
  );
}

/* ===================== SHOP ===================== */
// Owns all shared state (products, cart, search, category, sort) and the
// handler functions. Everything below is passed down as props to the
// split-out page components.
function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("relevance");

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [cartHighlight, setCartHighlight] = useState(false);

  // Fetch products from backend
  useEffect(() => {
    fetch("https://full-stack-e-commerce-gkn4.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const found = prev.find((i) => i.id === product.id);
      return found
        ? prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i))
        : [...prev, { ...product, quantity: 1 }];
    });

    setCartHighlight(true);
    setTimeout(() => setCartHighlight(false), 400);
  };

  const increaseQty = (id) => {
    setCartItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)));
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i)).filter((i) => i.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // Search-only list — used to build the homepage's horizontal shelves,
  // so a category pick elsewhere doesn't hide products from those rows.
  const searchFilteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Search + category + sort — used by the focused "results" view.
  const visibleProducts = sortProducts(
    searchFilteredProducts.filter((p) => matchesCategory(p, category)),
    sortOrder
  );

  return (
    <div className="min-h-screen bg-[#eaeded] font-sans text-[#0f1111]">
      <Navbar
        search={search}
        setSearch={setSearch}
        totalItems={totalItems}
        cartHighlight={cartHighlight}
        category={category}
        setCategory={setCategory}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              allProducts={searchFilteredProducts}
              products={visibleProducts}
              loading={loading}
              addToCart={addToCart}
              category={category}
              setCategory={setCategory}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              search={search}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
              removeFromCart={removeFromCart}
              total={total}
            />
          }
        />

        <Route path="/address" element={<Address cartItems={cartItems} total={total} clearCart={clearCart} />} />

        <Route path="/product/:id" element={<ProductDetail allProducts={products} addToCart={addToCart} />} />

        <Route path="/success" element={<OrderSuccess />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </div>
  );
}
