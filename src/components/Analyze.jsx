import Navbar from "./Navbar";
import { useState } from "react";
import { FiCamera } from "react-icons/fi";

function Analyze() {

  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {

    const file = e.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
    }
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
            <div className="border border-[#222] p-5 rounded-lg min-h-[780px]">

              <p className="text-[#c8a45d] text-[10px] uppercase tracking-[2px] mb-3">
                Upload Photo
              </p>

              {/* Upload Box */}
              <label
                className="
                  border
                  border-[#222]
                  rounded-lg
                  h-[520px]
                  flex
                  flex-col
                  items-center
                  justify-center
                  cursor-pointer
                  overflow-hidden
                  hover:border-[#c8a45d]
                  transition
                "
              >

                {image ? (

                  <img
                    src={image}
                    alt="preview"
                    className="w-full h-full object-contain bg-black"
                  />

                ) : (

                  <>
                    <FiCamera
                      size={34}
                      className="text-[#c8a45d] mb-3"
                    />

                    <p className="text-sm text-gray-300">
                      Upload Image
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      JPG / PNG
                    </p>
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

                  <label className="text-sm block mb-1">
                    Occasion
                  </label>

                  <input
                    type="text"
                    placeholder="Wedding, Office..."
                    className="
                      w-full
                      bg-transparent
                      border
                      border-[#222]
                      rounded-md
                      px-3
                      py-3
                      text-sm
                      outline-none
                      focus:border-[#c8a45d]
                    "
                  />

                </div>

                <div>

                  <label className="text-sm block mb-1">
                    Mood
                  </label>

                  <input
                    type="text"
                    placeholder="Elegant, Casual..."
                    className="
                      w-full
                      bg-transparent
                      border
                      border-[#222]
                      rounded-md
                      px-3
                      py-3
                      text-sm
                      outline-none
                      focus:border-[#c8a45d]
                    "
                  />

                </div>

                <div>

                  <label className="text-sm block mb-1">
                    Weather
                  </label>

                  <input
                    type="text"
                    placeholder="Sunny, Rainy..."
                    className="
                      w-full
                      bg-transparent
                      border
                      border-[#222]
                      rounded-md
                      px-3
                      py-3
                      text-sm
                      outline-none
                      focus:border-[#c8a45d]
                    "
                  />

                </div>

                <button
                  className="
                    w-full
                    bg-[#c8a45d]
                    text-black
                    font-medium
                    py-3
                    rounded-md
                    hover:opacity-90
                    transition
                    text-sm
                  "
                >
                  Analyze
                </button>

              </div>

            </div>

            {/* Right Side */}
            <div
              className="
                border
                border-[#222]
                rounded-lg
                min-h-[780px]
                flex
                flex-col
                items-center
                justify-center
                text-center
                px-8
              "
            >

              <h2 className="text-4xl font-serif text-[#c8a45d] mb-4">
                Awaiting
              </h2>

              <p className="text-gray-400 text-sm max-w-sm leading-8">
                Upload your photo and provide occasion,
                mood, and weather details to receive a
                personalized styling recommendation.
              </p>

            </div>

          </div>

        </div>

      </section>

    </>
  );
}

export default Analyze;