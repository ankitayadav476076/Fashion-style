import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Guest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token in URL query (from Google OAuth callback)
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token");

    if (urlToken) {
      localStorage.setItem("token", urlToken);
      // Clean query parameter from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch user profile
    const API = import.meta.env.VITE_API_URL || "http://localhost:5001";
    fetch(`${API}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.user) {
          setUserName(data.user.name);
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          // If token invalid, clear storage and redirect
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error("Profile fetch error:", err);
        // Fallback to locally stored user
        const localUser = localStorage.getItem("user");
        if (localUser) {
          try {
            setUserName(JSON.parse(localUser).name);
          } catch {
            setUserName("Guest");
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-serif text-xl tracking-wider">
        ✨ Entering Maison AI...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-black text-white px-20 pt-24 pb-12">
        
        {/* Header */}
        <div className="mb-14">
          <p className="text-[#c8a45d] tracking-[0.3em] text-xs mb-6">
            THE ATELIER
          </p>

          <h1 className="text-5xl font-serif mb-3">
            Bonjour, {userName}.
          </h1>

          <p className="text-zinc-400 text-lg">
            Where would you like to begin today?
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* New Analysis */}
          <div
            onClick={() => navigate("/analyze")}
            className="border border-zinc-900 px-8 py-6 cursor-pointer hover:border-zinc-700 transition"
          >
            <div className="text-[#c8a45d] text-xl mb-4">
              📷
            </div>

            <h2 className="text-2xl font-serif mb-2">
              New analysis
            </h2>

            <p className="text-zinc-400 text-sm leading-6">
              Upload a photo and receive a curated look.
            </p>
          </div>

          {/* Ask Your Stylist */}
          <div
            onClick={() => navigate("/stylist")}
            className="border border-zinc-900 px-8 py-6 cursor-pointer hover:border-zinc-700 transition"
          >
            <div className="text-[#c8a45d] text-xl mb-4">
              💬
            </div>

            <h2 className="text-2xl font-serif mb-2">
              Ask your stylist
            </h2>

            <p className="text-zinc-400 text-sm leading-6">
              Refine outfits in conversation.
            </p>
          </div>

          {/* Wardrobe */}
          <div
            onClick={() => navigate("/wardrobe")}
            className="border border-zinc-900 px-8 py-6 cursor-pointer hover:border-zinc-700 transition"
          >
            <div className="text-[#c8a45d] text-xl mb-4">
              🕘
            </div>

            <h2 className="text-2xl font-serif mb-2">
              Wardrobe
            </h2>

            <p className="text-zinc-400 text-sm leading-6">
              Revisit every saved look.
            </p>
          </div>

        </div>

      </section>
    </>
  );
}

export default Dashboard;