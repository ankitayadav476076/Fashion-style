const express = require("express");

const session = require("express-session");

const passport = require("passport");

const dotenv = require("dotenv");

const cors = require("cors");

dotenv.config();

require("./passport");

const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());

app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());

app.use(passport.session());

app.use("/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});