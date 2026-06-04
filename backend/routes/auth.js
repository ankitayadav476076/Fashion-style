const express = require("express");
const passport = require("passport");

const router = express.Router();


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

router.post("/signup", (req, res) => {

  console.log("Signup API hit");

  const { name, email, password } = req.body;

  // Temporary signup check
  if (name && email && password) {

    return res.json({
      success: true,
      token: "abc123",
      user: {
        name,
        email,
      },
    });

  }

  res.json({
    success: false,
    message: "Signup failed",
  });

});


// ================= NORMAL LOGIN =================

router.post("/login", (req, res) => {

  console.log("Login API hit");

  const { email, password } = req.body;

  // Temporary login check
  if (email && password) {

    return res.json({
      success: true,
      token: "abc123",
      user: {
        email,
      },
    });

  }

  res.json({
    success: false,
    message: "Invalid credentials",
  });

});


module.exports = router;