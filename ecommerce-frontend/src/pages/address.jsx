import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  formatCardNumber,
  formatExpiry,
  isCardValid,
  isUpiValid,
  cardLast4,
  BANKS,
} from "../utils/payment.js";

const PAYMENT_METHODS = [
  { id: "CARD", label: "Credit / Debit Card", icon: "💳" },
  { id: "UPI", label: "UPI", icon: "📱" },
  { id: "NETBANKING", label: "Net Banking", icon: "🏦" },
  { id: "COD", label: "Cash on Delivery", icon: "💵" },
];

/* ===================== ADDRESS / CHECKOUT PAGE ===================== */
export default function Address({ cartItems, total, clearCart }) {
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("CARD");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [upiId, setUpiId] = useState("");
  const [bank, setBank] = useState("");
  const [placing, setPlacing] = useState(false);

  const isAddressValid = Object.values(address).every((v) => v.trim() !== "");

  const isPaymentValid =
    paymentMethod === "COD" ||
    (paymentMethod === "CARD" && isCardValid(card)) ||
    (paymentMethod === "UPI" && isUpiValid(upiId)) ||
    (paymentMethod === "NETBANKING" && bank !== "");

  const canPlaceOrder = isAddressValid && isPaymentValid && !placing;

  const placeOrder = () => {
    setPlacing(true);

    // Only send what's safe/needed — never the full card number or CVV.
    const paymentDetails =
      paymentMethod === "CARD"
        ? { cardLast4: cardLast4(card.number), cardHolder: card.name }
        : paymentMethod === "UPI"
        ? { upiId }
        : paymentMethod === "NETBANKING"
        ? { bank }
        : {};

    const orderData = {
      cartItems,
      address,
      total,
      paymentMethod,
      paymentDetails,
      paymentStatus: paymentMethod === "COD" ? "PENDING" : "PAID",
    };

    fetch("https://full-stack-e-commerce-gkn4.onrender.com/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then(() => {
        clearCart();
        navigate("/success", { state: orderData });
      })
      .catch((err) => {
        console.error("Error placing order:", err);
        setPlacing(false);
      });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-medium mb-4">Checkout</h2>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 items-start">
        <div className="space-y-4">
          {/* Order items */}
          <div className="bg-white rounded-md p-4">
            <h3 className="font-bold mb-3">Order Items</h3>
            {cartItems.length === 0 && <p className="text-gray-500 text-sm">Cart is empty</p>}
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                <img src={item.image} alt={item.name} className="w-12 h-12 object-contain" />
                <div className="flex-1 text-sm">
                  <p className="text-[#0f1111]">
                    {item.name} × {item.quantity}
                  </p>
                </div>
                <span className="text-sm font-semibold">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          {/* Shipping address */}
          <div className="bg-white rounded-md p-4">
            <h3 className="font-bold mb-3">Shipping Address</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                placeholder="Full Name"
                value={address.name}
                onChange={(e) => setAddress({ ...address, name: e.target.value })}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600] sm:col-span-2"
              />
              <input
                placeholder="Phone"
                value={address.phone}
                onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600]"
              />
              <input
                placeholder="Pincode"
                value={address.pincode}
                onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600]"
              />
              <input
                placeholder="Address"
                value={address.address}
                onChange={(e) => setAddress({ ...address, address: e.target.value })}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600] sm:col-span-2"
              />
              <input
                placeholder="City"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600] sm:col-span-2"
              />
            </div>
          </div>

          {/* Payment method */}
          <div className="bg-white rounded-md p-4">
            <h3 className="font-bold mb-3">Payment Method</h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              {PAYMENT_METHODS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id)}
                  className={`flex flex-col items-center gap-1 rounded-md border p-3 text-xs font-medium transition-colors ${
                    paymentMethod === m.id
                      ? "border-[#e77600] bg-[#fff3e0] text-[#0f1111]"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <span className="text-lg">{m.icon}</span>
                  {m.label}
                </button>
              ))}
            </div>

            {paymentMethod === "CARD" && (
              <div className="space-y-3 border-t border-gray-100 pt-4">
                <input
                  placeholder="Name on card"
                  value={card.name}
                  onChange={(e) => setCard({ ...card, name: e.target.value })}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600] w-full"
                />
                <input
                  placeholder="1234 5678 9012 3456"
                  value={card.number}
                  onChange={(e) => setCard({ ...card, number: formatCardNumber(e.target.value) })}
                  inputMode="numeric"
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600] w-full"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    placeholder="MM/YY"
                    value={card.expiry}
                    onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
                    inputMode="numeric"
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600]"
                  />
                  <input
                    placeholder="CVV"
                    type="password"
                    value={card.cvv}
                    onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                    inputMode="numeric"
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600]"
                  />
                </div>
                <p className="text-xs text-gray-400">Visa, Mastercard & RuPay accepted</p>
              </div>
            )}

            {paymentMethod === "UPI" && (
              <div className="space-y-2 border-t border-gray-100 pt-4">
                <input
                  placeholder="yourname@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600] w-full"
                />
                <p className="text-xs text-gray-500">
                  You'll receive a payment request on your UPI app to approve.
                </p>
              </div>
            )}

            {paymentMethod === "NETBANKING" && (
              <div className="space-y-2 border-t border-gray-100 pt-4">
                <select
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600] w-full"
                >
                  <option value="">Select your bank</option>
                  {BANKS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500">You'll be redirected to your bank's secure login page.</p>
              </div>
            )}

            {paymentMethod === "COD" && (
              <div className="border-t border-gray-100 pt-4">
                <p className="text-sm text-gray-600">Pay with cash when your order is delivered.</p>
              </div>
            )}

            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
              <span className="flex items-center gap-1">🔒 Secure encrypted payment</span>
              <span className="flex items-center gap-1">✅ Buyer protection</span>
            </div>
          </div>
        </div>

        {/* Order summary sidebar */}
        <div className="bg-white rounded-md p-4">
          <h3 className="font-bold mb-3">Order Summary</h3>
          <div className="flex justify-between text-sm mb-1">
            <span>Items:</span>
            <span>₹{total}</span>
          </div>
          <div className="flex justify-between text-sm mb-3 text-gray-500">
            <span>Delivery:</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2 mb-4">
            <span>Order Total:</span>
            <span>₹{total}</span>
          </div>

          <button
            disabled={!canPlaceOrder}
            onClick={placeOrder}
            className="w-full bg-[#ffd814] hover:bg-[#f7ca00] border border-[#fcd200] rounded-full py-2.5 text-sm font-medium text-[#0f1111] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed mb-2"
          >
            {placing ? "Placing Order..." : "Place Order"}
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="w-full bg-white hover:bg-gray-50 border border-gray-300 rounded-full py-2.5 text-sm font-medium text-[#0f1111]"
          >
            Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
