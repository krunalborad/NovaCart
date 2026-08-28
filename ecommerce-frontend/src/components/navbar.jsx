import { Link, useNavigate } from "react-router-dom";
import { CATEGORIES } from "../utils/pricing.js";

/* ===================== NAVBAR ===================== */
export default function Navbar({ search, setSearch, totalItems, cartHighlight, category, setCategory }) {
  const navigate = useNavigate();

  const goToCategory = (c) => {
    setCategory(c);
    navigate("/"); // category links always take you back to the product grid
  };

  return (
    <header className="bg-[#131921] text-white">
      <div className="flex items-center gap-3 px-3 py-2 sm:px-4">
        <Link
          to="/"
          onClick={() => setCategory("All")}
          className="flex items-center gap-1 shrink-0 px-2 py-1"
        >
          <span className="text-xl sm:text-2xl font-bold tracking-tight">
            Nova<span className="text-[#febd69]">Cart</span>
          </span>
        </Link>

        {/* Search bar */}
        <div className="flex flex-1 max-w-3xl mx-auto rounded-md overflow-hidden">
          <input
            type="text"
            placeholder="Search NovaCart products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white text-[#0f1111] placeholder-gray-500 outline-none"
          />
          <button
            type="button"
            className="bg-[#febd69] hover:bg-[#f3a847] px-4 flex items-center justify-center transition-colors"
            aria-label="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-[#131921]"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Right nav links */}
        <Link
          to="/admin"
          className="hidden sm:flex flex-col leading-tight px-2 py-1 rounded hover:border hover:border-white text-xs"
        >
          <span className="text-[11px] text-gray-300">Manage</span>
          <span className="font-bold">Admin</span>
        </Link>

        <Link
          to="/cart"
          className={`relative flex items-end gap-1 px-2 py-1 rounded transition-colors ${
            cartHighlight ? "bg-[#febd69] text-[#131921]" : "hover:border hover:border-white"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13L5.4 5M7 13l-2 4h13M9 21a1 1 0 100-2 1 1 0 000 2zM18 21a1 1 0 100-2 1 1 0 000 2z"
            />
          </svg>
          <span className="hidden sm:inline font-bold text-sm">Cart</span>
          {totalItems > 0 && (
            <span className="absolute -top-1 left-4 bg-[#f08804] text-white text-[11px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </div>

      {/* Sub category strip — now real, clickable, functional filters */}
      <div className="hidden sm:flex items-center gap-5 bg-[#232f3e] px-4 py-1.5 text-sm">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => goToCategory(c)}
            className={`px-1.5 py-0.5 rounded border transition-colors ${
              category === c
                ? "border-white bg-white/10 font-semibold"
                : "border-transparent hover:border-white"
            }`}
          >
            {c}
          </button>
        ))}
        <Link to="/cart" className="ml-auto cursor-pointer hover:border hover:border-white px-1 py-0.5 rounded border border-transparent">
          Your Cart
        </Link>
      </div>
    </header>
  );
}