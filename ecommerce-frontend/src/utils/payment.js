/* ===================== PAYMENT HELPERS ===================== */

// Formats raw digits into "1234 5678 9012 3456" as the user types.
export function formatCardNumber(value) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

// Formats raw digits into "MM/YY" as the user types.
export function formatExpiry(value) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function isCardValid({ number, name, expiry, cvv }) {
  const digitsOnly = number.replace(/\s/g, "");
  const expiryOk =
    /^\d{2}\/\d{2}$/.test(expiry) &&
    Number(expiry.slice(0, 2)) >= 1 &&
    Number(expiry.slice(0, 2)) <= 12;
  return digitsOnly.length === 16 && name.trim().length > 1 && expiryOk && /^\d{3,4}$/.test(cvv);
}

export function isUpiValid(upiId) {
  return /^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test(upiId.trim());
}

export const BANKS = ["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank", "Other"];

// Never send full card numbers or CVVs to the backend — only what's needed
// to show an order confirmation (method + last 4 digits).
export function cardLast4(number) {
  return number.replace(/\s/g, "").slice(-4);
}
