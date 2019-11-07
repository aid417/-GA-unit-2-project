// DEPENDENCIES
const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const Chores = require("../models/chores");
const bcrypt = require("bcrypt");

//ROUTES
router.post("/", (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      console.log("found", foundUser);
      req.session.currentUser = foundUser;
      res.redirect("/");
    } else {
      res.send("wrong password");
    }
  });
});

router.get("/new", (req, res) => {
  res.render("sessions/new.ejs");
});

router.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

// EXPORT
module.exports = router;
