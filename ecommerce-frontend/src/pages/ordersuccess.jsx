import { Link, useLocation } from "react-router-dom";

/* ===================== ORDER SUCCESS PAGE ===================== */
export default function OrderSuccess() {
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h3 className="text-lg text-gray-600">No order data found</h3>
        <Link to="/" className="text-[#007185] hover:underline text-sm">
          Go back to shop
        </Link>
      </div>
    );
  }

  const { cartItems, total, paymentMethod, paymentDetails, paymentStatus, address } = state;

  const methodLabels = { CARD: "Credit / Debit Card", UPI: "UPI", NETBANKING: "Net Banking", COD: "Cash on Delivery" };

  const paymentDetailLine = () => {
    if (!paymentDetails) return null;
    if (paymentMethod === "CARD" && paymentDetails.cardLast4) return `Card ending in ${paymentDetails.cardLast4}`;
    if (paymentMethod === "UPI" && paymentDetails.upiId) return paymentDetails.upiId;
    if (paymentMethod === "NETBANKING" && paymentDetails.bank) return paymentDetails.bank;
    return null;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="bg-white rounded-md p-6 text-center mb-4">
        <div className="mx-auto mb-3 h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-[#0f1111]">Order Placed Successfully</h2>
        <p className="text-sm text-gray-500">Thanks for shopping with NovaCart!</p>
      </div>

      <div className="bg-white rounded-md p-5 mb-4">
        <h3 className="font-bold mb-2">Order Summary</h3>
        <p className="text-sm mb-1">
          <b>Total:</b> ₹{total}
        </p>
        <p className="text-sm mb-1">
          <b>Payment Method:</b> {methodLabels[paymentMethod] || paymentMethod}
          {paymentDetailLine() && <span className="text-gray-500"> ({paymentDetailLine()})</span>}
        </p>
        <p className="text-sm">
          <b>Payment Status:</b>{" "}
          <span className={paymentStatus === "PAID" ? "text-emerald-700" : "text-amber-600"}>{paymentStatus}</span>
        </p>
      </div>

      <div className="bg-white rounded-md p-5 mb-4">
        <h3 className="font-bold mb-2">Shipping Address</h3>
        <p className="text-sm">{address.name}</p>
        <p className="text-sm text-gray-600">
          {address.address}, {address.city}
        </p>
        <p className="text-sm text-gray-600">{address.pincode}</p>
      </div>

      <div className="bg-white rounded-md p-5 mb-4">
        <h3 className="font-bold mb-2">Items</h3>
        {cartItems.map((item, i) => (
          <p key={i} className="text-sm text-gray-700">
            {item.name} × {item.quantity}
          </p>
        ))}
      </div>

      <Link to="/">
        <button className="w-full bg-[#ffd814] hover:bg-[#f7ca00] border border-[#fcd200] rounded-full py-2.5 text-sm font-medium text-[#0f1111]">
          Continue Shopping
        </button>
      </Link>
    </div>
  );
}
