import { Link, useNavigate } from "react-router-dom";
import OrderSummary from "./checkout.jsx";

/* ===================== CART PAGE ===================== */
export default function Cart({ cartItems, increaseQty, decreaseQty, removeFromCart, total }) {
  const navigate = useNavigate();
  const itemCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-md p-10 text-center">
          <h2 className="text-2xl font-medium mb-2">Your NovaCart is empty</h2>
          <Link to="/" className="text-[#007185] hover:underline text-sm">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 items-start">
        {/* Items list */}
        <div className="bg-white rounded-md p-4">
          <h2 className="text-xl font-medium border-b border-gray-200 pb-3 mb-2">Shopping Cart</h2>

          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 border-b border-gray-100 py-4 last:border-0">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-contain shrink-0" />
              <div className="flex-1">
                <h4 className="text-base text-[#0f1111] mb-1">{item.name}</h4>
                <p className="text-emerald-700 text-xs mb-2">In Stock</p>
                <p className="text-lg font-bold mb-2 sm:hidden">₹{item.price * item.quantity}</p>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-full overflow-hidden bg-gray-50">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="w-8 h-8 flex items-center justify-center text-lg hover:bg-gray-200"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="w-8 h-8 flex items-center justify-center text-lg hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                  <span className="w-px h-4 bg-gray-300" />
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[#007185] hover:underline hover:text-[#c45500] text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="hidden sm:block text-lg font-bold whitespace-nowrap">
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}

          <div className="text-right pt-2 text-lg">
            Subtotal ({itemCount} items): <span className="font-bold">₹{total}</span>
          </div>
        </div>

        {/* Order summary */}
        <OrderSummary
          itemCount={itemCount}
          total={total}
          buttonLabel="Proceed to Buy"
          onAction={() => navigate("/address")}
        />
      </div>
    </div>
  );
}
