function Features() {
  const features = [
    "AI Outfit Recommendation",
    "Skin Tone Analysis",
    "Weather Based Fashion",
    "Occasion Styling",
    "Virtual Try-On",
    "Fashion Chatbot",
  ];

  return (
    <section className="bg-black text-white py-20 px-10">
      
      <h1 className="text-4xl font-bold text-center mb-12">
        Smart AI Features
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        {features.map((item, index) => (
          <div
            key={index}
            className="bg-zinc-900 p-8 rounded-2xl hover:scale-105 transition duration-300"
          >
            <h2 className="text-2xl font-semibold text-pink-400">
              {item}
            </h2>

            <p className="text-gray-400 mt-4">
              AI powered fashion recommendation system for modern styling.
            </p>
          </div>
        ))}

      </div>

    </section>
  );
}

export default Features;