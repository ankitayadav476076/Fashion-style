import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur-lg">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        {/* Brand Name */}
        <h1 className="text-3xl font-serif text-white tracking-wide cursor-pointer">

          Maison<span className="text-yellow-500">AI</span>

        </h1>

        {/* Navigation */}
        <nav className="flex items-center gap-8 text-gray-300">

          <a
            href="#"
            className="hover:text-yellow-500 transition"
          >
            Analyze
          </a>

          <a
           onClick={() => navigate("/stylist")}
            href="#"
            className="hover:text-yellow-500 transition"
          >
            Stylist
          </a>

          <a
            href="#"
            className="hover:text-yellow-500 transition"
          >
            Wardrobe
          </a>

         <button
      onClick={() => navigate("/dashboard")}
      className="px-2 py-0.5 border border-zinc-700 text-white font-semibold rounded-md hover:border-zinc-500 transition"
    >
      Dashboard
    </button>
          <a
            href="#"
            className="text-sm hover:text-yellow-500 transition"
          >
            Sign out
          </a>

        </nav>

      </div>

    </header>
  );
}

export default Navbar;