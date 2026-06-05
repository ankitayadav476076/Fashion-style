import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Wardrobe() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  // Route Guarding
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch Wardrobe items from backend
  const fetchWardrobe = async () => {
    try {
      const API = import.meta.env.VITE_API_URL || "http://localhost:5001";
      const res = await fetch(`${API}/wardrobe`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setItems(data.items);
      } else {
        console.error("Failed to load wardrobe:", data.message);
      }
    } catch (error) {
      console.error("Error fetching wardrobe:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchWardrobe();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);

    // Prompt user for a name or use default clean name
    const defaultName = file.name.split(".")[0].replace(/[-_]/g, " ");
    const itemName = prompt("Enter a name for this clothing item:", defaultName) || defaultName;

    // Determine default category based on current filter, or ask user
    const suggestedCategory = categoryFilter !== "All" ? categoryFilter : "Tops";
    const itemCategory = prompt(
      "Enter category (Tops, Bottoms, Shoes, Accessories, Jackets):",
      suggestedCategory
    ) || suggestedCategory;

    // Convert to Base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result;

      try {
        const API = import.meta.env.VITE_API_URL || "http://localhost:5001";
        const res = await fetch(`${API}/wardrobe`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            name: itemName,
            image: base64Image,
            category: itemCategory,
          }),
        });

        const data = await res.json();
        if (data.success) {
          // Add to state and refetch or append
          setItems((prev) => [data.item, ...prev]);
        } else {
          alert(data.message || "Failed to upload item.");
        }
      } catch (error) {
        console.error("Upload error:", error);
        alert("Server error uploading item.");
      } finally {
        setIsUploading(false);
      }
    };
  };

  const filteredItems = items.filter((item) => {
    if (categoryFilter === "All") return true;
    return item.category?.toLowerCase() === categoryFilter.toLowerCase();
  });

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
          <div className="border border-zinc-900 rounded-xl p-5 mb-8 bg-[#030303]">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
              <div>
                <h2 className="text-xl font-serif text-[#c8a45d]">
                  Add Clothing Item
                </h2>
                <p className="text-zinc-500 text-sm mt-1">
                  Upload outfits, shoes, jackets, accessories and more.
                </p>
              </div>

              <label className={`
                bg-[#c8a45d]
                text-black
                px-5
                py-2.5
                rounded-md
                cursor-pointer
                flex
                items-center
                gap-2
                hover:bg-[#b08e48]
                transition
                font-semibold
                text-sm
                ${isUploading ? "opacity-50 cursor-not-allowed" : ""}
              `}>
                <FiPlus size={18} />
                {isUploading ? "Uploading..." : "Add Item"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
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
                onClick={() => setCategoryFilter(category)}
                className={`
                  border
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  transition
                  cursor-pointer
                  ${categoryFilter === category 
                    ? "border-[#c8a45d] text-[#c8a45d] bg-[#c8a45d]/10" 
                    : "border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white"
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Wardrobe Grid */}
          {loading ? (
            <div className="text-center py-20 animate-pulse font-serif text-lg text-[#c8a45d]">
              Loading digital closet...
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredItems.map((item, index) => (
                <div
                  key={item._id || index}
                  className="
                    border
                    border-zinc-900
                    rounded-xl
                    overflow-hidden
                    bg-[#050505]
                    hover:border-[#c8a45d]
                    transition
                  "
                >
                  <div className="h-[320px] bg-black relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm border border-zinc-800 text-zinc-400 text-[10px] tracking-wider uppercase px-2 py-0.5 rounded">
                      {item.category || "Tops"}
                    </span>
                  </div>

                  <div className="p-4">
                    <h3 className="text-sm font-medium truncate text-white">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#c8a45d] mt-1 font-light tracking-wide">
                      Luxury Collection
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="
              border
              border-zinc-900
              rounded-xl
              h-[350px]
              flex
              flex-col
              items-center
              justify-center
              text-center
              bg-[#030303]
            ">
              <h2 className="text-3xl font-serif text-[#c8a45d] mb-3">
                No items found
              </h2>
              <p className="text-gray-400 text-sm max-w-sm leading-7 font-light px-4">
                {categoryFilter === "All"
                  ? "Start building your digital luxury wardrobe by uploading your favorite fashion pieces."
                  : `You don't have any items in the "${categoryFilter}" category yet.`}
              </p>
            </div>
          )}

        </div>
      </section>
    </>
  );
}

export default Wardrobe;