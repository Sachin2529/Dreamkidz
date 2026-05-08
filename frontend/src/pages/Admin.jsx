import { useEffect, useState } from "react";
import axios from "axios";

const PASSWORD = "1234"; // change this

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pwd, setPwd] = useState("");
  const [enquiries, setEnquiries] = useState([]);

  const login = () => {
    if (pwd === PASSWORD) setAuthed(true);
    else alert("Wrong password");
  };

  useEffect(() => {
    if (authed) {
      axios.get(`${import.meta.env.VITE_API_URL}/api/enquiry`).then((r) => setEnquiries(r.data));
    }
  }, [authed]);

  const markReplied = async (id) => {
    axios.patch(`${import.meta.env.VITE_API_URL}/api/enquiry/${id}`, { status: "replied" });
    setEnquiries((prev) =>
      prev.map((e) => (e._id === id ? { ...e, status: "replied" } : e))
    );
  };

  if (!authed) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow text-center w-72">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Admin Login</h2>
          <input
            type="password"
            placeholder="Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <button
            onClick={login}
            className="w-full bg-pink-500 text-white py-2 rounded-xl text-sm font-medium hover:bg-pink-600 transition"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Admin Panel — Enquiries ({enquiries.length})
      </h1>
      <div className="space-y-4">
        {enquiries.map((e) => (
          <div
            key={e._id}
            className={`bg-white rounded-2xl border p-5 ${
              e.status === "new" ? "border-pink-200" : "border-gray-100"
            }`}
          >
            <div className="flex justify-between items-start flex-wrap gap-3">
              <div>
                <p className="font-semibold text-gray-800">{e.name} · {e.mobile}</p>
                <p className="text-sm text-gray-500">
                  {e.productName} ({e.styleNumber}) — Qty: {e.quantity}
                </p>
                {e.comments && (
                  <p className="text-sm text-gray-400 mt-1">"{e.comments}"</p>
                )}
                <p className="text-xs text-gray-300 mt-1">
                  {new Date(e.createdAt).toLocaleString("en-IN")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    e.status === "new"
                      ? "bg-pink-100 text-pink-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {e.status === "new" ? "New" : "Replied"}
                </span>
                {e.status === "new" && (
                  <button
                    onClick={() => markReplied(e._id)}
                    className="text-xs text-gray-500 underline hover:text-gray-800"
                  >
                    Mark as replied
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}