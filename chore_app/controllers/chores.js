// DEPENDENCIES
const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const { Chores } = require("../models/chores.js");

//ROUTES

//index
router.get("/", (req, res) => {
  //   console.log(req.session.currentUser.chores);
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
  const id = req.session.currentUser._id;

  // User.update(
  //   { _id: id },
  //   { $push: { chores: { name: req.body.name, assigned: req.body.assigned } } }
  // );
  const thisUser = User.findById(id);

  //   console.log(req.session.currentUser);
  //   req.session.currentUser.chores.push(req.body);
  //   req.session.currentUser.save();
  Chores.create(req.body, (error, createdChores) => {
    // console.log(req.session.currentUser);
    // console.log(thisUser);
    // thisUser.chores.push({ chores: createdChores });
    // thisUser.save();
    // User.findByIdAndUpdate(
    //   { _id: id },
    //   {
    //     $push: { chores: createdChores }
    //   }
    // );
    // User.update({ _id: id }, { $push: { chores: createdChores._id } });
    // console.log(createdChores._id);
    if (error) {
      res.send(error);
    } else {
      res.redirect("http://localhost:3000/chores");
    }
  });
});

// EXPORT
module.exports = router;
