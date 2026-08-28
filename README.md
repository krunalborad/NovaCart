# 🛒 Full Stack E-Commerce Web Application

A production-style **full-stack e-commerce web application** built using **React, Node.js, and Express.js**.

The application simulates a real-world online shopping experience with features such as product browsing, cart management, checkout, order placement, payment method selection, and an admin order management system.

## 🚀 Key Features

### 👤 User Features

* 🛍️ Browse products with images, names, descriptions, and pricing
* ➕ Add products to cart
* ➖ Increase or decrease product quantity
* 🗑️ Remove products from cart
* 💾 Persistent cart using **LocalStorage**
* 📦 Checkout with shipping address
* 💳 Select payment method:

  * Cash on Delivery
  * Card Payment
* 🧾 Order confirmation with complete order summary
* 🔄 Seamless navigation using React Router

## 🛠️ Admin Features

* 🔐 Secure admin login
* 📋 View all placed orders
* 💳 View payment method and payment status
* 🗑️ Delete orders
* ➕ Add new products through the admin interface
* 📦 Manage product and order information

## ⚙️ Backend Capabilities

The backend is built using **Node.js and Express.js** and provides a RESTful API for communication with the React frontend.

* 🔌 RESTful API architecture
* 📦 Product management
* 🧾 Order management
* 💾 In-memory data storage
* 🌐 CORS enabled
* 🧩 Express middleware for JSON request handling
* 🔄 Frontend–backend API integration

## 🧰 Tech Stack

### Frontend

* ⚛️ React
* 🛣️ React Router DOM
* 🟨 JavaScript (ES6+)
* 🌐 HTML5
* 🎨 CSS
* 💾 LocalStorage

### Backend

* 🟢 Node.js
* 🚂 Express.js
* 🔗 CORS
* 📡 REST API

### Database

* 🟢 MongoDB

## 🔌 API Endpoints

### 📦 Products

| Method | Endpoint        | Description        |
| ------ | --------------- | ------------------ |
| `GET`  | `/api/products` | Fetch all products |

### 🧾 Orders

| Method   | Endpoint          | Description                |
| -------- | ----------------- | -------------------------- |
| `POST`   | `/api/orders`     | Place a new order          |
| `GET`    | `/api/orders`     | Fetch all orders for admin |
| `DELETE` | `/api/orders/:id` | Delete an order            |

---

## 🧪 Application Flow

```text
User visits homepage
        ↓
Browse products
        ↓
Add products to cart
        ↓
Review cart
        ↓
Proceed to checkout
        ↓
Enter shipping details
        ↓
Select payment method
        ↓
Place order
        ↓
Order stored on backend
        ↓
Order confirmation
        ↓
Admin manages orders
```

## ▶️ How to Run Locally

### 1️⃣ Clone the Repository

```bash
git clone <your-repository-url>
cd <project-folder>
```

### 2️⃣ Start the Backend

```bash
cd backend
npm install
node server.js
```

The backend will run at:

```text
http://localhost:5000
```

### 3️⃣ Start the Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

## 🔐 Admin Login

Use the following credentials to access the admin panel:

```text
Password: admin
```

> ⚠️ The current version uses a simple admin login for demonstration purposes. Production applications should implement secure authentication and authorization.

## 🧠 Learning Outcomes

This project demonstrates practical experience with:

* Full-stack application architecture
* React component development
* React state management
* Client-side routing
* REST API design
* Express.js backend development
* Frontend–backend integration
* Cart and checkout logic
* LocalStorage persistence
* CRUD operations
* Admin order management
* Handling asynchronous API requests
* Structuring a real-world web application

## 🚧 Future Improvements

The application can be further enhanced with:

* 🗄️ MongoDB or PostgreSQL database integration
* 🔐 JWT-based authentication and authorization
* 👤 User registration and login
* 💳 Real payment gateway integration using Stripe or Razorpay
* 📦 Order status tracking
* 🖼️ Product image upload functionality
* 🔍 Product search and filtering
* ⭐ Product reviews and ratings
* ❤️ Wishlist functionality
* 📱 Fully responsive UI
* ☁️ Cloud deployment
* 🔒 Environment variables and improved security
* 📊 Admin dashboard with sales analytics

## 💡 Conclusion

This **Full Stack E-Commerce Web Application** demonstrates the development of an end-to-end online shopping platform using **React, Node.js, and Express.js**.

The project covers essential e-commerce functionality including **product browsing, cart management, checkout, order placement, payment method selection, and administrative order management**.

It showcases practical knowledge of **frontend development, RESTful API design, backend development, state management, client-server communication, and real-world application architecture**.

Overall, this project reflects hands-on experience in building and integrating a complete full-stack web application while applying clean coding practices and problem-solving skills.

⭐ Live Deployment on Vercel
Vercel Link: https://novacart-five-liart.vercel.app
