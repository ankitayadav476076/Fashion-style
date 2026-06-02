const express = require("express");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

require("./passport");

const authRoutes = require("./routes/auth");

const app = express();

// Allow frontend (important)
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// THIS fixes "Cannot GET /"
app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});

// Routes
app.use("/auth", authRoutes);

// IMPORTANT for Render
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});