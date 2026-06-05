const WardrobeItem = require("../models/WardrobeItem");

// Get all wardrobe items for the authenticated user
exports.getWardrobe = async (req, res) => {
  try {
    const items = await WardrobeItem.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, items });
  } catch (error) {
    console.error("Fetch wardrobe error:", error);
    res.status(500).json({ success: false, message: "Server error fetching wardrobe" });
  }
};

// Add a new wardrobe item
exports.addWardrobeItem = async (req, res) => {
  try {
    const { name, image, category } = req.body;
    if (!name || !image) {
      return res.status(400).json({ success: false, message: "Name and image are required" });
    }

    const newItem = new WardrobeItem({
      user: req.user.id,
      name,
      image,
      category: category || "Tops",
    });

    await newItem.save();
    res.json({ success: true, item: newItem });
  } catch (error) {
    console.error("Save wardrobe item error:", error);
    res.status(500).json({ success: false, message: "Server error saving item" });
  }
};
