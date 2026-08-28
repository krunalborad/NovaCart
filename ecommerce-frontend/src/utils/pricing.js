/* ===================== PRICING & CATEGORY HELPERS ===================== */
// Your backend product objects don't carry a "category" or "discount" field,
// so these helpers derive both client-side in a deterministic way (based on
// product id / name) so the UI has real Amazon-style badges & filters
// without needing a backend change. Swap these out once your API returns
// real category/discount data.

// Deterministic discount % (10 / 20 / 30 / 40) based on product id, so it
// doesn't flicker between renders like Math.random() would.
export function getDiscountPercent(id) {
  const options = [10, 20, 30, 40];
  return options[id % options.length];
}

// Original ("was") price, derived from the discount so the numbers stay
// consistent with the discount badge shown on the card.
export function getMrp(price, id) {
  const pct = getDiscountPercent(id);
  return Math.round(price / (1 - pct / 100));
}

export const CATEGORIES = ["All", "Today's Deals", "Electronics", "Fashion", "Home"];

const CATEGORY_KEYWORDS = {
  Electronics: ["headphone", "watch", "speaker", "phone", "laptop", "tablet", "earbud", "camera"],
  Fashion: ["shirt", "t-shirt", "jeans", "jacket", "shoe"],
  Home: ["bag", "backpack", "home", "kitchen"],
};

export function matchesCategory(product, category) {
  if (!category || category === "All") return true;
  if (category === "Today's Deals") return getDiscountPercent(product.id) >= 30;
  const keywords = CATEGORY_KEYWORDS[category] || [];
  return keywords.some((k) => product.name.toLowerCase().includes(k));
}

export function sortProducts(products, sortOrder) {
  const copy = [...products];
  if (sortOrder === "priceLow") return copy.sort((a, b) => a.price - b.price);
  if (sortOrder === "priceHigh") return copy.sort((a, b) => b.price - a.price);
  return copy; // "relevance" — original order
}
