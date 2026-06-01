import Navbar from "./Navbar";
import { IoPaperPlaneOutline } from "react-icons/io5";

function Stylist() {
  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-black text-white pt-14">
        <div className="max-w-4xl mx-auto px-6">

          {/* Header */}
          <p className="text-[#c8a34d] tracking-[0.35em] text-[13px] mb-2">
            CONCIERGE
          </p>

          <h1 className="font-serif text-[36px] font-light mb-8 leading-none">
            Your stylist
          </h1>

          {/* Chat Box */}
          <div className="border border-[#111] h-[260px] p-8 mb-5">

            {/* Welcome Card */}
            <div className="border border-[#111] w-[82%] p-4">
              <p className="text-[15px] leading-7 text-white">
                Welcome to the atelier. Tell me about the look you have in
                mind — occasion, mood, or a piece you already love.
              </p>
            </div>

          </div>

          {/* Input Section */}
          <div className="flex items-center gap-2">

            <input
              type="text"
              placeholder="Ask for an outfit, color advice, a brand..."
              className="
                flex-1
                h-[40px]
                bg-black
                border
                border-[#111]
                px-4
                text-[13px]
                text-white
                placeholder:text-zinc-500
                outline-none
              "
            />

            <button
              className="
                h-[40px]
                w-[50px]
                bg-[#a8893b]
                flex
                items-center
                justify-center
                hover:opacity-90
                transition
              "
            >
              <IoPaperPlaneOutline
                size={16}
                className="text-black"
              />
            </button>

          </div>

          {/* Footer */}
         

        </div>
      </section>
    </>
  );
}

export default Stylist;