// DEPENDENCIES
const express = require("express");
const router = express.Router();

const User = require("../models/users.js");
const bcrypt = require("bcrypt");

//ROUTES
//index
router.get("/new", (req, res) => {
  res.render("users/new.ejs");
});
//create
router.post("/", (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  User.create(req.body, (err, createdUser) => {
    console.log("created", createdUser);
    res.redirect("/");
  });
});
//edit
router.get("/edit/:id", (req, res) => {
  User.findById(req.params.id, (error, foundUser) => {
    if (error) {
      console.log(error);
    } else {
      res.render("users/edit.ejs", { user: foundUser });
      console.log(foundUser);
    }
  });
});
//UPDATE
router.put("/update/:id", (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/chores");
      }
      // res.send(updatedUser);
    }
  );
});
// EXPORT
module.exports = router;
