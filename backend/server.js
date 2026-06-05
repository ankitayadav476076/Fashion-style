require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

// OpenAI Setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");
  })
  .catch((err) => {
    console.log("MongoDB Error ❌");
    console.log(err);
  });

// Passport Config
require("./passport");

// Routes
const authRoutes = require("./routes/auth");

// Middleware
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

// Session Setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});

// Auth Routes
app.use("/auth", authRoutes);

// ==========================
// AI CHATBOT ROUTE
// ==========================

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",

      messages: [
        {
          role: "system",
          content:
            "You are a luxury AI fashion stylist. Help users with outfits, styling, fashion trends, color combinations, accessories, and occasion-based looks.",
        },

        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    res.json({
      reply: response.choices[0].message.content,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});