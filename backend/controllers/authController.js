const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const JWT_SECRET = process.env.SESSION_SECRET || "supersecretkeyformaisonai";

// Signup Handler
exports.signup = async (req, res) => {
  try {
    console.log("Signup Controller hit");
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Please enter all fields",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
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
    console.log("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Login Handler
exports.login = async (req, res) => {
  try {
    console.log("Login Controller hit");
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "Please enter email and password",
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Login success
    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get profile (/me) Handler
exports.getProfile = async (req, res) => {
  try {
    let user = null;

    if (mongoose.Types.ObjectId.isValid(req.user.id)) {
      user = await User.findById(req.user.id).select("-password");
    }

    if (!user) {
      // If user not in DB (e.g. Google auth user profile might not be saved in DB or just serialized), return req.user payload
      return res.json({
        success: true,
        user: {
          name: req.user.name,
          email: req.user.email,
        }
      });
    }
    res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
