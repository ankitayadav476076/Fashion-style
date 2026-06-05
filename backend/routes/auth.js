const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();
const verifyToken = require("../middleware/auth");
const authController = require("../controllers/authController");

const JWT_SECRET = process.env.SESSION_SECRET || "supersecretkeyformaisonai";

// ================= GOOGLE LOGIN =================

// Google Login Route
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google Callback Route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL || "http://localhost:5173"}/login`,
  }),
  (req, res) => {
    // Generate JWT for Google User
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email, name: req.user.name },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    // Redirect after successful Google login, passing token as query param
    res.redirect(`${process.env.CLIENT_URL || "http://localhost:5173"}/dashboard?token=${token}`);
  }
);

// ================= NORMAL SIGNUP =================
router.post("/signup", authController.signup);

// ================= NORMAL LOGIN =================
router.post("/login", authController.login);

// ================= GET USER PROFILE =================
router.get("/me", verifyToken, authController.getProfile);

module.exports = router;