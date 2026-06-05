import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("token"));

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        {/* Brand Name */}
        <h1
          onClick={() => navigate("/")}
          className="text-3xl font-serif text-white tracking-wide cursor-pointer"
        >
          Maison<span className="text-[#c8a45d]">AI</span>
        </h1>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-gray-300 text-sm">

          {/* Home */}
          <button
            onClick={() => navigate("/")}
            className="hover:text-[#c8a45d] transition cursor-pointer"
          >
            Home
          </button>

          {isLoggedIn && (
            <>
              {/* Analyze */}
              <button
                onClick={() => navigate("/analyze")}
                className="hover:text-[#c8a45d] transition cursor-pointer"
              >
                Analyze
              </button>

              {/* Stylist */}
              <button
                onClick={() => navigate("/stylist")}
                className="hover:text-[#c8a45d] transition cursor-pointer"
              >
                Stylist
              </button>

              {/* Wardrobe */}
              <button
                onClick={() => navigate("/wardrobe")}
                className="hover:text-[#c8a45d] transition cursor-pointer"
              >
                Wardrobe
              </button>

              {/* Dashboard */}
              <button
                onClick={() => navigate("/dashboard")}
                className="px-2.5 py-1 border border-zinc-700 text-white font-semibold rounded hover:border-zinc-500 transition cursor-pointer"
              >
                Dashboard
              </button>
            </>
          )}

          {/* Sign Out / Sign In */}
          {isLoggedIn ? (
            <button
              onClick={handleSignOut}
              className="hover:text-[#c8a45d] transition cursor-pointer font-medium"
            >
              Sign out
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="hover:text-[#c8a45d] transition cursor-pointer font-medium"
            >
              Sign in
            </button>
          )}

        </nav>

      </div>
    </header>
  );
}

export default Navbar;