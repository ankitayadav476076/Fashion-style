const express = require("express");
const passport = require("passport");

const router = express.Router();

const User = require("../models/User");


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
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),

  (req, res) => {

    // Redirect after successful Google login
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);

  }
);


// ================= NORMAL SIGNUP =================

router.post("/signup", async (req, res) => {

  try {

    console.log("Signup API hit");

    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.json({
        success: false,
        message: "User already exists",
      });

    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password,
    });

    // Save user in MongoDB
    await newUser.save();

    res.json({
      success: true,
      message: "Account created successfully",
      user: {
        name,
        email,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });

  }

});


// ================= NORMAL LOGIN =================

router.post("/login", async (req, res) => {

  try {

    console.log("Login API hit");

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    // Check user
    if (!user) {

      return res.json({
        success: false,
        message: "User not found",
      });

    }

    // Check password
    if (user.password !== password) {

      return res.json({
        success: false,
        message: "Invalid password",
      });

    }

    // Login success
    res.json({
      success: true,
      message: "Login successful",
      token: "abc123",

      user: {
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });

  }

});


module.exports = router;