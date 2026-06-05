const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/User");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "dummy-id";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "dummy-secret";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google profile received:", profile.id);
        const email = profile.emails?.[0]?.value;
        const name = profile.displayName || profile.name?.givenName || "Google User";
        const googleId = profile.id;

        if (!email) {
          return done(new Error("No email associated with this Google account."), null);
        }

        // Check if user already exists
        let user = await User.findOne({ $or: [{ googleId }, { email }] });

        if (!user) {
          // Create new database user record
          user = new User({
            name,
            email,
            googleId,
          });
          await user.save();
          console.log("New Google user created in DB:", email);
        } else if (!user.googleId) {
          // Link Google ID to existing email account
          user.googleId = googleId;
          await user.save();
          console.log("Linked Google ID to existing email account:", email);
        }

        return done(null, user);
      } catch (error) {
        console.error("Google Strategy DB Error:", error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});