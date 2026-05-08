import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-brand-cream min-h-screen">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-50 to-rose-50 py-20 px-4 text-center">
        <p className="text-sm text-pink-400 font-medium uppercase tracking-widest mb-3">
           Wholesale Collections
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Dress them in <span className="text-pink-500">dreams</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto mb-8">
          Premium baby &amp; kids clothing for retailers. Browse our collection and send us an enquiry — we'll respond within 24 hours.
        </p>
        <Link
          to="/products"
          className="inline-block bg-pink-500 text-white px-8 py-3 rounded-full text-base font-medium hover:bg-pink-600 transition shadow-md"
        >
          Browse Collection
        </Link>
      </section>

      {/* Category Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Newborn", emoji: "👶", cat: "newborn", color: "bg-yellow-50" },
            { label: "Baby Boy", emoji: "🐣", cat: "baby-boy", color: "bg-blue-50" },
            { label: "Baby Girl", emoji: "🌸", cat: "baby-girl", color: "bg-pink-50" },
            { label: "Kid Girl", emoji: "🎀", cat: "kid-girl", color: "bg-purple-50" },
            { label: "Kid Boy", emoji: "⚽", cat: "kid-boy", color: "bg-green-50" },
          ].map((c) => (
            <Link
              key={c.cat}
              to={`/products?category=${c.cat}`}
              className={`${c.color} rounded-2xl p-6 text-center hover:shadow-md transition-shadow`}
            >
              <div className="text-4xl mb-2">{c.emoji}</div>
              <p className="text-sm font-semibold text-gray-700">{c.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Enquiry CTA Banner */}
      <section className="bg-pink-500 text-white py-14 px-4 text-center">
        <h2 className="text-3xl font-bold mb-3">Ready to stock DreamKidz?</h2>
        <p className="text-pink-100 mb-6 text-lg">
          Contact us for pricing, bulk discounts &amp; catalogue PDF
        </p>
        <a
          href="https://wa.me/918838641411?text=Hi, I'm interested in DreamKidz wholesale products"
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-white text-pink-500 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition"
        >
          💬 WhatsApp Us Now
        </a>
      </section>

      {/* Why DreamKidz */}
      <section className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-8 text-center">
        {[
          { icon: "🧵", title: "Premium Quality", desc: "100% certified fabrics, skin-safe dyes" },
          { icon: "📦", title: "Flexible MOQ", desc: "Low minimum orders for small retailers" },
          { icon: "🚚", title: "Pan-India Shipping", desc: "Fast dispatch across all states" },
        ].map((item) => (
          <div key={item.title} className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
            <p className="text-gray-500 text-sm">{item.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}