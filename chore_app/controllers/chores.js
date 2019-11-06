// DEPENDENCIES
const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const { Chores } = require("../models/chores.js");

//ROUTES

//index
router.get("/", (req, res) => {
  console.log(req.session.currentUser.chores);
  res.render("chores/index.ejs", {
    currentUser: req.session.currentUser
  });
});
//new
router.get("/new", (req, res) => {
  res.render("chores/new.ejs");
});
//show

//create
router.post("/", (req, res) => {
  Chores.create(req.body, (error, createdChores) => {
    req.session.currentUser.chores.push(createdChores);
    console.log(req.session.currentUser);
    if (error) {
      res.send(error);
    } else {
      res.redirect("http://localhost:3000/chores");
    }
  });
});

// EXPORT
module.exports = router;
