import { useState } from "react";
import axios from "axios";

export default function EnquiryModal({ product, onClose }) {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    quantity: "",
    comments: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    if (!form.name.trim()) return "Name is required";
    if (!/^[6-9]\d{9}$/.test(form.mobile)) return "Enter a valid 10-digit Indian mobile number";
    if (!form.quantity || form.quantity < 1) return "Quantity must be at least 1";
    return null;
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) { setError(err); return; }
    setLoading(true);
    setError("");
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/enquiry`, {
        ...form,
        productName: product.name,
        styleNumber: product.styleNumber,
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
        >✕</button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Enquiry Sent!</h3>
            <p className="text-gray-500 text-sm">
              We'll get back to you within 24 hours on your mobile number.
            </p>
            <button
              onClick={onClose}
              className="mt-6 bg-pink-500 text-white px-6 py-2 rounded-full text-sm hover:bg-pink-600 transition"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-bold text-gray-800 mb-1">Send Enquiry</h2>
            <p className="text-xs text-gray-400 mb-5">
              {product.name} · {product.styleNumber}
            </p>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
              <input
                type="tel"
                placeholder="Mobile Number (10 digits) *"
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
              <input
                type="number"
                placeholder="Quantity Required *"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                min="1"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
              <textarea
                placeholder="Additional comments (optional)"
                value={form.comments}
                onChange={(e) => setForm({ ...form, comments: e.target.value })}
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs mt-3">{error}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-5 w-full bg-pink-500 text-white py-3 rounded-xl font-medium hover:bg-pink-600 transition disabled:opacity-60"
            >
              {loading ? "Sending..." : "Submit Enquiry"}
            </button>

            {/* WhatsApp alternate */}
            <a
              href={`https://wa.me/918838641411?text=Hi! I'm interested in ${product.name} (${product.styleNumber}). Qty: ${form.quantity || "TBD"}`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 w-full flex items-center justify-center gap-2 border border-green-400 text-green-600 py-2.5 rounded-xl text-sm font-medium hover:bg-green-50 transition"
            >
              💬 Enquire via WhatsApp instead
            </a>
          </>
        )}
      </div>
    </div>
  );
}