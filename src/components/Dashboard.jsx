import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-black text-white px-20 pt-24 pb-12">
        
        {/* Header */}
        <div className="mb-14">
          <p className="text-yellow-500 tracking-[0.3em] text-xs mb-6">
            THE ATELIER
          </p>

          <h1 className="text-5xl font-serif mb-3">
            Bonjour, Ankita.
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
            <div className="text-yellow-500 text-xl mb-4">
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
            <div className="text-yellow-500 text-xl mb-4">
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
            <div className="text-yellow-500 text-xl mb-4">
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