import { useState, useEffect } from "react";

/* ===================== ADMIN PANEL ===================== */
// Note: this page wasn't in your original folder screenshot, so it's added
// here as pages/admin.jsx. Move it wherever fits your structure.
export default function AdminPanel() {
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    fetch("https://full-stack-e-commerce-gkn4.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));

    fetch("https://full-stack-e-commerce-gkn4.onrender.com/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  const deleteOrder = (id) => {
    fetch(`https://full-stack-e-commerce-gkn4.onrender.com/api/orders/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setOrders((prev) => prev.filter((o) => o.id !== id));
      });
  };

  const addProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      alert("Fill all product fields");
      return;
    }

    const product = {
      id: Date.now(),
      name: newProduct.name,
      price: Number(newProduct.price),
      image: newProduct.image,
    };

    setProducts((prev) => [...prev, product]);
    setNewProduct({ name: "", price: "", image: "" });
  };

  /* ================= ADMIN LOGIN ================= */
  if (!authorized) {
    return (
      <div className="max-w-sm mx-auto px-4 py-16">
        <div className="bg-white rounded-md p-6 border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600] mb-4"
          />
          <button
            onClick={() => {
              if (password === "admin") {
                setAuthorized(true);
              } else {
                alert("Wrong password");
              }
            }}
            className="w-full bg-[#ffd814] hover:bg-[#f7ca00] border border-[#fcd200] rounded-full py-2 text-sm font-medium text-[#0f1111]"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  /* ================= ADMIN PANEL ================= */
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
      <h2 className="text-2xl font-medium">Admin Panel</h2>

      {/* Add product */}
      <div className="bg-white rounded-md p-4">
        <h3 className="font-bold mb-3">Add Product</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
          <input
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600]"
          />
          <input
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600]"
          />
          <input
            placeholder="Image path"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600]"
          />
        </div>
        <button
          onClick={addProduct}
          className="bg-[#ffd814] hover:bg-[#f7ca00] border border-[#fcd200] rounded-full px-5 py-2 text-sm font-medium text-[#0f1111]"
        >
          Add Product
        </button>
      </div>

      {/* Products list */}
      <div className="bg-white rounded-md p-4">
        <h3 className="font-bold mb-3">Products</h3>
        <div className="divide-y divide-gray-100">
          {products.map((p) => (
            <p key={p.id} className="py-2 text-sm text-gray-700">
              #{p.id} — {p.name} — <span className="font-semibold">₹{p.price}</span>
            </p>
          ))}
        </div>
      </div>

      {/* Orders list */}
      <div className="bg-white rounded-md p-4">
        <h3 className="font-bold mb-3">Orders</h3>
        {orders.length === 0 && <p className="text-sm text-gray-500">No orders yet</p>}
        <div className="space-y-3">
          {orders.map((o) => (
            <div key={o.id} className="border border-gray-200 rounded-md p-3">
              <p className="text-sm font-bold mb-1">Order #{o.id}</p>
              <p className="text-sm mb-1">Total: ₹{o.total}</p>
              <p className="text-sm mb-1">
                Payment Method: <b>{o.paymentMethod ? o.paymentMethod : "COD"}</b>
              </p>
              <p className="text-sm mb-2">
                Payment Status:{" "}
                <b className={o.paymentStatus === "PAID" ? "text-emerald-700" : "text-amber-600"}>
                  {o.paymentStatus ? o.paymentStatus : "PENDING"}
                </b>
              </p>
              <button
                onClick={() => deleteOrder(o.id)}
                className="text-xs text-white bg-rose-500 hover:bg-rose-600 rounded-full px-3 py-1.5"
              >
                Delete Order
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
