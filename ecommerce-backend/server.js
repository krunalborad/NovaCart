// server.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ====== USERS ======
let users = []; // store users in memory

// POST: Sign up
app.post("/api/signup", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const newUser = { id: users.length + 1, username, password };
  users.push(newUser);

  res.json({ message: "Signup successful" });
});

// POST: Login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    user => user.username === username && user.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  res.json({ message: "Login successful", userId: user.id });
});

// ====== PRODUCTS ======
const products = [
  { id: 1, name: "Wireless Headphones", price: 2999, image: "/images/headphones.png" },
  { id: 2, name: "Smart Watch", price: 4999, image: "/images/watch.png" },
  { id: 3, name: "Bluetooth Speaker", price: 1999, image: "/images/speaker.png" },
  { id: 4, name: "Smart Mobile Phone", price: 15999, image: "/images/mobile.png" },
  { id: 5, name: "Running Shoes", price: 3499, image: "/images/shoes.png" },
  { id: 6, name: "Casual Shirt", price: 1499, image: "/images/shirt.png" },
  { id: 7, name: "T-Shirt", price: 999, image: "/images/tshirt.png" },
  { id: 8, name: "School Bag", price: 2499, image: "/images/bag.png" },
  { id: 9, name: "Laptop", price: 55999, image: "/images/laptop.png" },
  { id: 10, name: "Tablet", price: 22999, image: "/images/tablet.png" },
  { id: 11, name: "Wired Earphones", price: 799, image: "/images/earphones.png" },
  { id: 12, name: "Bracelet", price: 499, image: "/images/bracelet.png" },
];

// GET all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// ====== ORDERS ======
let orders = []; // store orders in memory

// POST a new order ✅ FIXED
app.post("/api/orders", (req, res) => {
  const {
    cartItems,
    address,
    total,
    paymentMethod,
    paymentStatus,
  } = req.body;

  if (!cartItems || !address || !total) {
    return res.status(400).json({ message: "Invalid order data" });
  }

  const newOrder = {
    id: orders.length + 1,
    cartItems,
    address,
    total,
    paymentMethod,      // ✅ saved correctly
    paymentStatus,      // ✅ saved correctly
    date: new Date(),
  };

  orders.push(newOrder);

  res.json(newOrder);
});

// DELETE an order by ID
app.delete("/api/orders/:id", (req, res) => {
  const orderId = parseInt(req.params.id);
  const index = orders.findIndex(order => order.id === orderId);

  if (index === -1) {
    return res.status(404).json({ message: "Order not found" });
  }

  orders.splice(index, 1);
  res.json({ message: "Order deleted successfully" });
});

// GET all orders (for testing)
app.get("/api/orders", (req, res) => {
  res.json(orders);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});