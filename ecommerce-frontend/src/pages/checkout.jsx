/* ===================== ORDER SUMMARY ===================== */
// Small reusable "order summary" box shared between the Cart page and the
// Address/checkout page, so the subtotal + action button UI stays consistent
// in one place instead of being duplicated.
export default function OrderSummary({ itemCount, total, buttonLabel, onAction, disabled }) {
  return (
    <div className="bg-white rounded-md p-4">
      <p className="text-lg mb-3">
        Subtotal ({itemCount} items): <span className="font-bold">₹{total}</span>
      </p>
      <button
        onClick={onAction}
        disabled={disabled}
        className="w-full bg-[#ffd814] hover:bg-[#f7ca00] border border-[#fcd200] rounded-full py-2 text-sm font-medium text-[#0f1111] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {buttonLabel}
      </button>
    </div>
  );
}
