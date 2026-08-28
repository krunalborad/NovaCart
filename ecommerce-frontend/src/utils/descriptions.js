/* ===================== DESCRIPTION GENERATOR ===================== */
// Your product objects only carry { id, name, price, image } — there's no
// description field from the backend or the admin "Add Product" form.
// This derives an Amazon-style description + "About this item" bullets
// client-side, based on keywords in the product name, so the detail page
// always has real content. Swap this out once your API/admin form
// actually stores a real description per product.

const TEMPLATES = [
  {
    keywords: ["headphone", "earbud"],
    paragraph:
      "Enjoy immersive sound wherever you go. Featuring rich bass, crisp highs, and a comfortable over-ear fit, these headphones are built for long listening sessions — whether you're commuting, working out, or relaxing at home.",
    bullets: [
      "High-fidelity sound with deep bass response",
      "Comfortable cushioned ear cups for extended wear",
      "Long-lasting battery with quick charge support",
      "Foldable, lightweight design for easy travel",
    ],
  },
  {
    keywords: ["watch"],
    paragraph:
      "Stay on top of your health and schedule with this smartwatch. Track your heart rate, steps, and workouts in real time, and get notifications right on your wrist — all wrapped in a sleek, everyday-wearable design.",
    bullets: [
      "Real-time heart rate & activity tracking",
      "Bright always-visible display",
      "Water & sweat resistant for workouts",
      "Multi-day battery life on a single charge",
    ],
  },
  {
    keywords: ["speaker"],
    paragraph:
      "Fill any room with rich, room-filling sound. This portable speaker pairs instantly over Bluetooth and is built tough enough for outdoor use, so the music doesn't have to stop when you step outside.",
    bullets: [
      "360° immersive sound output",
      "Durable, splash-resistant build",
      "Up to 12 hours playtime per charge",
      "Seamless Bluetooth pairing with any device",
    ],
  },
  {
    keywords: ["phone", "mobile"],
    paragraph:
      "A powerful everyday smartphone with a stunning display and all-day battery life. Capture sharp photos, multitask smoothly, and stay connected with a design that feels as good as it looks.",
    bullets: [
      "High-resolution display for sharp visuals",
      "Long-lasting battery with fast charging",
      "Powerful processor for smooth multitasking",
      "Advanced camera system for stunning photos",
    ],
  },
  {
    keywords: ["laptop"],
    paragraph:
      "Get work and play done without compromise. This laptop combines a fast processor, ample storage, and a crisp display in a slim, portable build — ideal for students, professionals, and creators alike.",
    bullets: [
      "Fast processor for smooth multitasking",
      "Ample storage for files, media & apps",
      "Full-HD display with slim bezels",
      "Lightweight design, great for travel",
    ],
  },
  {
    keywords: ["tablet"],
    paragraph:
      "A versatile tablet perfect for streaming, browsing, and getting things done on the go. The vivid display and all-day battery make it a great companion for work, study, or entertainment.",
    bullets: [
      "Vivid, crisp display for media & reading",
      "All-day battery life",
      "Lightweight and easy to carry",
      "Expandable storage support",
    ],
  },
  {
    keywords: ["shoe", "sneaker"],
    paragraph:
      "Designed for comfort and performance, these shoes feature a breathable upper and cushioned sole that support you through every step — whether you're running errands or going for a run.",
    bullets: [
      "Breathable, lightweight upper material",
      "Cushioned sole for all-day comfort",
      "Durable non-slip outsole",
      "Available in a true-to-size fit",
    ],
  },
  {
    keywords: ["shirt", "t-shirt", "jacket"],
    paragraph:
      "A wardrobe essential made from soft, breathable fabric that holds its shape wash after wash. Tailored for a comfortable everyday fit, it layers easily and pairs well with anything.",
    bullets: [
      "Soft, breathable, skin-friendly fabric",
      "Regular fit for everyday comfort",
      "Fade-resistant color after washing",
      "Easy to pair & style for any occasion",
    ],
  },
  {
    keywords: ["bag", "backpack"],
    paragraph:
      "Stay organized on the move with a spacious, durable bag built for everyday use. Multiple compartments keep your essentials in order, while padded straps keep it comfortable even when fully loaded.",
    bullets: [
      "Spacious main compartment with organizer pockets",
      "Padded, adjustable straps for comfort",
      "Durable, water-resistant material",
      "Fits laptops & everyday essentials",
    ],
  },
];

const FALLBACK = {
  paragraph:
    "A quality pick backed by dependable materials and everyday practicality. Designed to deliver reliable performance, it's a smart addition whether you're buying for yourself or as a gift.",
  bullets: [
    "Durable build for long-lasting use",
    "Great value for the price",
    "Backed by easy 7-day returns",
    "Fast, reliable delivery",
  ],
};

export function getDescription(product) {
  const name = (product?.name || "").toLowerCase();
  const match = TEMPLATES.find((t) => t.keywords.some((k) => name.includes(k)));
  return match || FALLBACK;
}
