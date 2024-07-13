const express = require("express");
const authRouter = require("./routes/auth-routes");
const profileRouter = require("./routes/profile-routes");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const session = require("express-session");
const passport = require("passport");

const app = express();

app.set("view engine", "ejs");

app.use(
    session({
        secret: "keys.session.cookieKey",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodb.dbURI);

app.use("/auth", authRouter);
app.use("/profile", profileRouter);

app.get("/", (req, res) => {
    res.render("home", { user: req.user });
});

app.listen(3000, () => {
    console.log("Now the app is listening to port 3000!");
});
