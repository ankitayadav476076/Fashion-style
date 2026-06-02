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
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),
  (req, res) => {
    // Redirect to Dashboard after successful login
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  }
);

module.exports = router;