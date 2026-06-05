const mongoose = require("mongoose");

const wardrobeItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Tops", "Bottoms", "Shoes", "Accessories", "Jackets"],
    default: "Tops",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("WardrobeItem", wardrobeItemSchema);
