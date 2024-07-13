const router = require("express").Router();
const passport = require("passport");

router.get("/login", (req, res) => {
    res.render("login", { user: req.user });
});

router.get("/logout", (req, res) => {
    req.logout(() => {
        console.log("Logged out");
    });
    res.redirect("/");
});

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile"],
    })
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    res.redirect("/profile/");
});

module.exports = router;
