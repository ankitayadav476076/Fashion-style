import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { FiCamera } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Analyze() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [occasion, setOccasion] = useState("");
  const [mood, setMood] = useState("");
  const [weather, setWeather] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Route Guarding
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      
      // Convert to Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result);
      };
      reader.readAsDataURL(file);
      setResult(null); // Reset result on new upload
    }
  };

  const handleAnalyze = async () => {
    if (!base64Image) {
      alert("Please upload an image first.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const API = import.meta.env.VITE_API_URL || "http://localhost:5001";
      const res = await fetch(`${API}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          image: base64Image,
          occasion,
          mood,
          weather,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setResult(data.reply);
      } else {
        alert(data.message || "Failed to analyze image.");
      }
    } catch (error) {
      console.error("Analysis request error:", error);
      alert("Error connecting to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderResponse = (text) => {
    if (!text) return null;
    return text.split("\n").map((line, i) => {
      if (line.startsWith("### ")) {
        return <h3 key={i} className="text-lg font-serif text-[#c8a45d] mt-6 mb-3 border-b border-zinc-800 pb-1.5">{line.replace("### ", "")}</h3>;
      }
      if (line.startsWith("**") && line.endsWith("**")) {
        return <h4 key={i} className="text-sm font-semibold text-zinc-300 mt-4 mb-2">{line.replace(/\*\*/g, "")}</h4>;
      }
      if (line.startsWith("- **")) {
        const match = line.match(/- \*\*(.*?)\*\*(.*)/);
        if (match) {
          return (
            <p key={i} className="text-sm text-gray-300 ml-2 mb-2.5 leading-relaxed">
              <span className="text-[#c8a45d] font-semibold">{match[1]}:</span>{match[2]}
            </p>
          );
        }
      }
      if (line.trim() === "") return <div key={i} className="h-3" />;
      return <p key={i} className="text-sm text-gray-400 mb-2 leading-relaxed">{line}</p>;
    });
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-black text-white px-4 py-6">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-6 w-[82%] mx-auto">
            <p className="text-[#c8a45d] uppercase tracking-[3px] text-[10px] mb-2">
              Session 01
            </p>
            <h1 className="text-3xl font-serif">
              New Analysis
            </h1>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-6 w-[82%] mx-auto">

            {/* Left Side */}
            <div className="border border-[#222] p-5 rounded-lg min-h-[780px] flex flex-col justify-between bg-[#030303]">
              <div>
                <p className="text-[#c8a45d] text-[10px] uppercase tracking-[2px] mb-3">
                  Upload Photo
                </p>

                {/* Upload Box */}
                <label className="border border-[#222] rounded-lg h-[460px] flex flex-col items-center justify-center cursor-pointer overflow-hidden hover:border-[#c8a45d] transition bg-black relative">
                  {image ? (
                    <img
                      src={image}
                      alt="preview"
                      className="w-full h-full object-contain bg-black"
                    />
                  ) : (
                    <>
                      <FiCamera size={34} className="text-[#c8a45d] mb-3" />
                      <p className="text-sm text-gray-300">Upload Image</p>
                      <p className="text-xs text-gray-500 mt-1">JPG / PNG</p>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                {/* Inputs */}
                <div className="mt-5 space-y-4">
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Occasion</label>
                    <input
                      type="text"
                      placeholder="e.g. Wedding, Office, Gala, Date Night..."
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="w-full bg-transparent border border-[#222] rounded-md px-3 py-2.5 text-sm outline-none text-white focus:border-[#c8a45d] transition"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Mood</label>
                    <input
                      type="text"
                      placeholder="e.g. Elegant, Casual, Bold, Minimalist..."
                      value={mood}
                      onChange={(e) => setMood(e.target.value)}
                      className="w-full bg-transparent border border-[#222] rounded-md px-3 py-2.5 text-sm outline-none text-white focus:border-[#c8a45d] transition"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Weather</label>
                    <input
                      type="text"
                      placeholder="e.g. Sunny/Warm, Rainy/Cold, Autumn Breeze..."
                      value={weather}
                      onChange={(e) => setWeather(e.target.value)}
                      className="w-full bg-transparent border border-[#222] rounded-md px-3 py-2.5 text-sm outline-none text-white focus:border-[#c8a45d] transition"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={loading}
                className={`w-full bg-[#c8a45d] text-black font-semibold py-3 rounded-md hover:bg-[#b08e48] transition text-sm mt-5 cursor-pointer ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Analyzing..." : "Analyze"}
              </button>
            </div>

            {/* Right Side */}
            <div className="border border-[#222] rounded-lg min-h-[780px] bg-[#070707] p-8 flex flex-col justify-start">
              {loading ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center animate-pulse">
                  <span className="text-4xl mb-4">✨</span>
                  <h2 className="text-xl font-serif text-[#c8a45d] mb-2">Analyzing Silhouette & Palette</h2>
                  <p className="text-gray-500 text-xs tracking-widest uppercase">MaisonAI Curation Engine</p>
                </div>
              ) : result ? (
                <div className="flex-1 overflow-y-auto pr-2 text-left">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
                    <p className="text-[#c8a45d] uppercase tracking-[3px] text-[11px] font-semibold">Couture Analysis</p>
                    <span className="text-xs text-zinc-500">{new Date().toLocaleDateString()}</span>
                  </div>
                  {renderResponse(result)}
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                  <h2 className="text-3xl font-serif text-[#c8a45d] mb-4">Awaiting</h2>
                  <p className="text-gray-400 text-sm max-w-sm leading-8 font-light">
                    Upload your photo and provide occasion, mood, and weather details to receive a personalized styling recommendation.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default Analyze;