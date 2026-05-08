import { useState } from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Newborn", category: "newborn" },
  { label: "Baby Boy", category: "baby-boy" },
  { label: "Baby Girl", category: "baby-girl" },
  { label: "Kid Girl", category: "kid-girl" },
  { label: "Kid Boy", category: "kid-boy" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-pink-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-pink-500 tracking-wide">
          Dream<span className="text-gray-700">Kidz</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.category}
              to={`/products?category=${link.category}`}
              className="text-sm font-medium text-gray-600 hover:text-pink-500 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/products"
            className="bg-pink-500 text-white text-sm px-4 py-2 rounded-full hover:bg-pink-600 transition"
          >
            Shop All
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-pink-50 px-4 py-3 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.category}
              to={`/products?category=${link.category}`}
              className="text-sm text-gray-600 hover:text-pink-500"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}