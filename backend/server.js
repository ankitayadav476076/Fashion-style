require("dotenv").config({ override: true });
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

// OpenAI Setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "dummy-key",
});

// MongoDB Connection
console.log("----------------------------------------");
console.log("ENV DEBUG CHECK:");
console.log("PORT is:", process.env.PORT);
console.log("MONGO_URI is defined:", !!process.env.MONGO_URI);
console.log("GOOGLE_CLIENT_ID is defined:", !!process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_SECRET is defined:", !!process.env.GOOGLE_CLIENT_SECRET);
console.log("----------------------------------------");

mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/maisonai")
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
const wardrobeRoutes = require("./routes/wardrobe");

// Middleware
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// HTTP Request Logger
app.use((req, res, next) => {
  console.log(`[HTTP LOG] ${req.method} ${req.url}`);
  next();
});

// Increase JSON payload limit for base64 image uploads
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Session Setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecretkeyformaisonai",
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
app.use("/wardrobe", wardrobeRoutes);

// ==========================
// AI CHATBOT ROUTE
// ==========================
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!process.env.OPENAI_API_KEY) {
      // Mock Response for styling advice
      let reply = "Bonjour! I am your MaisonAI concierge. ";
      const msg = userMessage.toLowerCase();
      if (msg.includes("wedding")) {
        reply += "For a wedding, a tailored tuxedo in midnight blue or a silk slip dress with minimalist heels will make an unforgettable statement.";
      } else if (msg.includes("office") || msg.includes("work")) {
        reply += "For the office, structure is key. Try styling a high-waisted pleated trouser with a relaxed linen shirt and loafers.";
      } else if (msg.includes("casual")) {
        reply += "A high-quality knit sweater, dark-wash denim, and clean leather sneakers offer a relaxed yet elevated weekend aesthetic.";
      } else {
        reply += "To curate the perfect ensemble, tell me about your desired occasion (e.g. Wedding, Work, Dinner), the mood (e.g. Elegant, Bold, Casual), or colors you prefer.";
      }
      return res.json({ reply });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a luxury AI fashion stylist. Help users with outfits, styling, fashion trends, color combinations, accessories, and occasion-based looks. Format your output in concise, elegant markdown.",
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

// ==========================
// AI VISION ANALYZE ROUTE
// ==========================
app.post("/analyze", async (req, res) => {
  try {
    const { image, occasion, mood, weather } = req.body;

    if (!image) {
      return res.status(400).json({ success: false, message: "No image provided" });
    }

    if (!process.env.OPENAI_API_KEY) {
      // Mock Vision analysis for local demo
      return res.json({
        success: true,
        reply: `### ✨ MaisonAI Vision Analysis (Demo Mode)

**Detected Undertone & Color Palette:**
- **Undertone:** Warm Golden
- **Recommended Palette:** Muted olive greens, camel, warm cream, and gold accents.

**Styling Analysis for: ${occasion || "Any Occasion"}**
- **Mood:** ${mood || "Elegant"} | **Weather:** ${weather || "Pleasant"}
- **Fit Feedback:** The outfit silhouette is balanced. To enhance this look for a ${occasion || "special event"}, we recommend adding a structured blazer or a high-quality leather accessory (belt/shoes) to establish a clear focal point.
- **Color Harmony:** The uploaded clothing matches well with earthy neutrals. Consider incorporating one contrasting accent piece (like a silk scarf or subtle jewelry).

**Maison AI Rating:** **8.5/10** — A sophisticated base that can be easily elevated with curation.`
      });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a luxury AI fashion critic and stylist. Analyze the user's uploaded outfit image. Provide markdown-formatted feedback covering color coordination, detected undertones, alignment with the given occasion, mood, and weather, suggestions for improvement, and a style score out of 10.",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Please analyze this outfit. Occasion: ${occasion || "Not specified"}, Mood: ${mood || "Not specified"}, Weather: ${weather || "Not specified"}.`,
            },
            {
              type: "image_url",
              image_url: {
                url: image, // base64 URL
              },
            },
          ],
        },
      ],
      max_tokens: 600,
    });

    res.json({
      success: true,
      reply: response.choices[0].message.content,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to analyze image. Please make sure the file is valid.",
    });
  }
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});