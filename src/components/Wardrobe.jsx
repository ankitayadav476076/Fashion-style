import Navbar from "./Navbar";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";

function Wardrobe() {

  const [items, setItems] = useState([]);

  const handleImageUpload = (e) => {

    const file = e.target.files[0];

    if (file) {

      const newItem = {
        image: URL.createObjectURL(file),
        name: file.name,
      };

      setItems((prev) => [...prev, newItem]);
    }
  };

  return (
    <>

      <Navbar />

      <section className="min-h-screen bg-black text-white px-4 py-6">

        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-8">

            <p className="text-[#c8a45d] uppercase tracking-[3px] text-[10px] mb-2">
              DIGITAL CLOSET
            </p>

            <h1 className="text-4xl font-serif">
              Your Wardrobe
            </h1>

          </div>

          {/* Upload Section */}
          <div className="border border-[#222] rounded-xl p-5 mb-8">

            <div className="flex items-center justify-between mb-4">

              <div>
                <h2 className="text-xl font-serif">
                  Add Clothing Item
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                  Upload outfits, shoes, jackets, accessories and more.
                </p>
              </div>

              <label className="
                bg-[#c8a45d]
                text-black
                px-4
                py-2
                rounded-md
                cursor-pointer
                flex
                items-center
                gap-2
                hover:opacity-90
                transition
              ">

                <FiPlus size={18} />

                Add Item

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

              </label>

            </div>

          </div>

          {/* Categories */}
          <div className="flex gap-3 flex-wrap mb-8">

            {["All", "Tops", "Bottoms", "Shoes", "Accessories", "Jackets"].map((category, index) => (

              <button
                key={index}
                className="
                  border
                  border-[#222]
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  hover:border-[#c8a45d]
                  hover:text-[#c8a45d]
                  transition
                "
              >
                {category}
              </button>

            ))}

          </div>

          {/* Wardrobe Grid */}
          {items.length > 0 ? (

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

              {items.map((item, index) => (

                <div
                  key={index}
                  className="
                    border
                    border-[#222]
                    rounded-xl
                    overflow-hidden
                    bg-[#0a0a0a]
                    hover:border-[#c8a45d]
                    transition
                  "
                >

                  <div className="h-[320px] bg-black">

                    <img
                      src={item.image}
                      alt="wardrobe"
                      className="w-full h-full object-cover"
                    />

                  </div>

                  <div className="p-4">

                    <h3 className="text-sm font-medium truncate">
                      {item.name}
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                      Luxury Collection
                    </p>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <div className="
              border
              border-[#222]
              rounded-xl
              h-[350px]
              flex
              flex-col
              items-center
              justify-center
              text-center
            ">

              <h2 className="text-3xl font-serif text-[#c8a45d] mb-3">
                Your wardrobe is empty
              </h2>

              <p className="text-gray-400 text-sm max-w-sm leading-7">
                Start building your digital luxury wardrobe by uploading your favorite fashion pieces.
              </p>

            </div>

          )}

        </div>

      </section>

    </>
  );
}

export default Wardrobe;