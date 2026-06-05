const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const wardrobeController = require("../controllers/wardrobeController");

// Get all wardrobe items for the authenticated user
router.get("/", verifyToken, wardrobeController.getWardrobe);

// Add a new wardrobe item
router.post("/", verifyToken, wardrobeController.addWardrobeItem);

module.exports = router;
