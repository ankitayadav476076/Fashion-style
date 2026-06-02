const express = require("express");
const passport = require("passport");

const router = express.Router();


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
    failureRedirect: "http://localhost:5173/login",
  }),

  (req, res) => {

    // Redirect to Dashboard
    res.redirect("http://localhost:5173/dashboard");
  }
);

module.exports = router;