import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        {/* Brand Name */}
        <h1
          
          className="text-3xl font-serif text-white tracking-wide cursor-pointer"
        >
          Maison<span className="text-yellow-500">AI</span>
        </h1>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-gray-300">

          {/* Home */}
          <button
            onClick={() => navigate("/")}
            className="hover:text-yellow-500 transition cursor-pointer"
          >
            Home
          </button>

          {/* Analyze */}
          <button
            onClick={() => navigate("/analyze")}
            className="hover:text-yellow-500 transition cursor-pointer"
          >
            Analyze
          </button>

          {/* Stylist */}
          <button
            onClick={() => navigate("/stylist")}
            className="hover:text-yellow-500 transition cursor-pointer"
          >
            Stylist
          </button>

          {/* Wardrobe */}
          <button
            onClick={() => navigate("/wardrobe")}
            className="hover:text-yellow-500 transition cursor-pointer"
          >
            Wardrobe
          </button>

          {/* Dashboard */}
          <button
            onClick={() => navigate("/dashboard")}
            className="px-2 py-0.5 border border-zinc-700 text-white font-semibold rounded-md hover:border-zinc-500 transition"
          >
            Dashboard
          </button>

          {/* Sign Out */}
          <button
            onClick={() => navigate("/login")}
            className="text-sm hover:text-yellow-500 transition"
          >
            Sign out
          </button>

        </nav>

      </div>
    </header>
  );
}

export default Navbar;