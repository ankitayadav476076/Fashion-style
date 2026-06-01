import { useState } from "react";

function Upload() {

  const [image, setImage] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
      setShowResult(false);
    }
  };

  return (
    <section className="bg-black text-white py-20 px-10 flex flex-col items-center">

      <h1 className="text-5xl font-bold mb-10">
        Upload Your Photo
      </h1>

      {/* Upload Button */}
      <label className="bg-pink-500 px-8 py-4 rounded-full cursor-pointer hover:bg-pink-600 transition text-lg">

        Choose Image

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImage}
        />

      </label>

      {/* Image Preview */}
      {image && (
        <div className="mt-10 flex flex-col items-center">

          <img
            src={image}
            alt="Preview"
            className="w-72 rounded-2xl shadow-lg"
          />

          {/* Analyze Button */}
          <button
            onClick={() => setShowResult(true)}
            className="mt-8 bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-300 transition"
          >
            Analyze Fashion
          </button>

        </div>
      )}

      {/* AI Result */}
      {showResult && (
        <div className="mt-10 bg-zinc-900 p-8 rounded-2xl max-w-xl text-center">

          <h2 className="text-3xl font-bold text-pink-400">
            AI Fashion Result
          </h2>

          <p className="mt-4 text-gray-300">
            Recommended Outfit:
            Black Blazer + White Top + Jeans
          </p>

          <p className="mt-2 text-gray-300">
            Best Colors:
            Black, White, Beige
          </p>

          <p className="mt-2 text-gray-300">
            Occasion:
            Office / Casual Meeting
          </p>

          <p className="mt-2 text-gray-300">
            Style Rating:
            9/10
          </p>

        </div>
      )}

    </section>
  );
}

export default Upload;