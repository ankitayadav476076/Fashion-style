import { useNavigate } from "react-router-dom";
function Hero() {
  const navigate = useNavigate();
  return (
    <section
      className="text-white min-h-screen flex flex-col justify-center items-center text-center px-6"
      style={{
        background:
          "radial-gradient(circle at center, rgba(120, 85, 20, 0.15) 0%, #090704 65%)",
      }}
    >

      {/* Small Tag */}
      <div className="border border-zinc-700 text-zinc-300 px-3 py-1 rounded-full mb-16 mt-10 tracking-[3px] text-xs">

        <p>✨ A NEW HOUSE OF STYLE</p>

      </div>

      {/* Main Heading */}
      <h1 className="font-['Cormorant_Garamond'] text-6xl leading-[1.05] tracking-tight md:text-7xl">

        Your personal{" "}

        <span className="bg-gradient-to-r from-[#f5d48f] to-[#c89b3c] bg-clip-text text-transparent italic font-extralight tracking-wide">

          atelier

        </span>

        , <br />

        powered by AI.

      </h1>

      {/* Description */}
      <p className="mx-auto mt-8 max-w-xl text-base text-zinc-400 md:text-lg leading-relaxed">

        Upload one photograph. Receive editorial outfit
        recommendations curated to your body, skin tone,
        mood, weather and occasion.

      </p>

      {/* Buttons */}
      <div className="flex items-center gap-8 mt-12 flex-wrap justify-center">

        <button 
        onClick={() => navigate("/login")}
        className="bg-[#f5d48f] text-black px-10 py-2 rounded-md text-base font-semibold hover:bg-[#e6c27a] transition duration-300">

          Begin With Session

        </button>

        <p 
        onClick={() => {
          document.getElementById("process")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="px-10 py-2 rounded-md text-lg text-gray-400 hover:bg-[#f5d48f] hover:text-black transition duration-300 cursor-pointer">

          See how it works

        </p>

      </div>

      {/* Features */}
      <div className="flex justify-center mt-24 mb-20 w-full">

        <div className="border border-zinc-900 rounded-sm px-10 py-6 flex flex-col md:flex-row gap-16 bg-black">

          {/* Card 1 */}
          <div className="max-w-[230px] text-left">

            <div className="text-[#d4a63c] text-xl mb-3">

              📸

            </div>

            <h2 className="font-['Cormorant_Garamond'] text-2xl mb-2">

              Vision Analysis

            </h2>

            <p className="text-zinc-500 text-sm leading-relaxed">

              Body type, skin tone and color season
              detected from one photo.

            </p>

          </div>

          {/* Card 2 */}
          <div className="max-w-[230px] text-left">

            <div className="text-[#d4a63c] text-xl mb-3">

              🎨

            </div>

            <h2 className="font-['Cormorant_Garamond'] text-2xl mb-2">

              Color Harmony

            </h2>

            <p className="text-zinc-500 text-sm leading-relaxed">

              Palettes selected to flatter your
              undertone — head to toe.

            </p>

          </div>

          {/* Card 3 */}
          <div className="max-w-[230px] text-left">

            <div className="text-[#d4a63c] text-xl mb-3">

              ☀️

            </div>

            <h2 className="font-['Cormorant_Garamond'] text-2xl mb-2">

              Context Aware

            </h2>

            <p className="text-zinc-500 text-sm leading-relaxed">

              Looks calibrated for occasion,
              mood and forecast.

            </p>

          </div>

        </div>

      </div>

      {/* Thin Line */}
      <div className="w-full flex justify-center">

        <div className="w-full h-px bg-zinc-900"></div>

      </div>

      {/* Process Section */}
      <div id="process" className="w-full px-8 md:px-20 py-24 text-white text-left">

        {/* Small Title */}
        <p className="text-[#d4a63c] tracking-[5px] text-xs mb-6">

          THE PROCESS

        </p>

        {/* Main Heading */}
        <h1 className="font-['Cormorant_Garamond'] text-3xl md:text-6xl leading-none mb-20">

          Three steps to dressed.

        </h1>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">

          {/* Card 1 */}
          <div className="border-l border-zinc-900 pl-8">

            <h2 className="font-['Cormorant_Garamond'] text-3xl mb-2">

              01

            </h2>

            <div className="text-[#d4a63c] text-xl mb-5">

              📸

            </div>

            <h3 className="font-['Cormorant_Garamond'] text-2xl mb-5">

              Upload

            </h3>

            <p className="text-[#fff6cc] text-lg leading-7 max-w-[250px]">

              A single photo — anywhere from the
              chest up works beautifully.

            </p>

          </div>

          {/* Card 2 */}
          <div className="border-l border-zinc-900 pl-8">

            <h2 className="font-['Cormorant_Garamond'] text-3xl mb-2">

              02

            </h2>

            <div className="text-[#d4a63c] text-xl mb-5">

              ✨

            </div>

            <h3 className="font-['Cormorant_Garamond'] text-2xl mb-5">

              Analyze

            </h3>

            <p className="text-[#fff6cc] text-lg leading-7 max-w-[250px]">

              Our AI reads your features and palette,
              then drafts looks.

            </p>

          </div>

          {/* Card 3 */}
          <div className="border-l border-zinc-900 pl-8">

            <h2 className="font-['Cormorant_Garamond'] text-3xl mb-2">

              03

            </h2>

            <div className="text-[#d4a63c] text-xl mb-5">

              💬

            </div>

            <h3 className="font-['Cormorant_Garamond'] text-2xl mb-5">

              Refine

            </h3>

            <p className="text-[#fff6cc] text-lg leading-7 max-w-[250px]">

              Chat with your stylist to adjust mood,
              occasion or weather.

            </p>

          </div>

        </div>

      </div>

      <div className="w-full h-px bg-zinc-900"></div>

      {/* Luxury CTA Section */}
      <section className="w-full bg-black py-32 px-6 flex justify-center items-center">

        <div
          className="w-full max-w-6xl rounded-[40px] border border-[#1a1a1a] overflow-hidden relative"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.72), rgba(0,0,0,0.72)), url('/images/fashion-banner.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "520px",
          }}
        >

          {/* Soft Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,166,60,0.12),transparent_70%)]"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-6 py-28">

            <h1 className="font-['Cormorant_Garamond'] text-3xl md:text-7xl text-[#f8f4ee] leading-tight">
              Dress with intent.
            </h1>

            <p className="mt-6 text-lg md:text-2xl text-[#d8cfc2]">
              No more guessing. Your stylist is in.
            </p>

            <button
  onClick={() => navigate("/login")}
  className="mt-12 bg-[#d4a63c] hover:bg-[#c9982f] transition-all duration-300 text-black px-5 py-2 rounded-md text-lg font-medium flex items-center gap-3 shadow-[0_0_40px_rgba(212,166,60,0.15)]"
>
  Open the atelier
  <span className="text-2xl">→</span>
</button>

          </div>
        </div>

      </section>


      {/* Copyright */}
<div className="w-full py-8 text-center border-t border-zinc-900">

  <p className="text-sm text-zinc-500 tracking-wide">

    © 2026 MaisonAI — Couture intelligence.

  </p>

</div>

    </section>
  );
}

export default Hero;