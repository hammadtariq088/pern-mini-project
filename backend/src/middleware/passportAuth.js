const passport = require("passport");
const LocalStrategy = require("passport-local");
const db = require("../../db/models");
const { User } = db;
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({
          where: {
            email: email,
          },
        });
        if (!user) {
          return done(null, false, "Invalid email or password");
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
          return done(null, false, "Invalid email or password");
        }
      

        return done(null, user);
      } catch (error) {
        done(null, false, error);
      }
    }
  )
);
