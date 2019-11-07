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
router.get("/new/:user", (req, res) => {
  res.render("chores/new.ejs", { user: req.params.user });
});
//show

//create
router.post("/user1chores", (req, res) => {
  const id = req.session.currentUser._id;

  Chores.create(req.body, (error, createdChores) => {
    console.log(req.session.currentUser);
    const chores = req.params.user;
    console.log(chores);

    User.findByIdAndUpdate(
      req.session.currentUser._id,
      {
        $push: { user1chores: createdChores }
      },
      { new: true },
      (error, updatedUser) => {
        console.log(createdChores);
        console.log("added chores to user");
        console.log(updatedUser);
      }
    );

    if (error) {
      res.send(error);
    } else {
      res.redirect("http://localhost:3000/chores");
    }
  });
});
router.post("/user2chores", (req, res) => {
  const id = req.session.currentUser._id;

  Chores.create(req.body, (error, createdChores) => {
    console.log(req.session.currentUser);
    const chores = req.params.user;
    console.log(chores);

    User.findByIdAndUpdate(
      req.session.currentUser._id,
      {
        $push: { user2chores: createdChores }
      },
      { new: true },
      (error, updatedUser) => {
        console.log(createdChores);
        console.log("added chores to user");
        console.log(updatedUser);
      }
    );

    if (error) {
      res.send(error);
    } else {
      res.redirect("http://localhost:3000/chores");
    }
  });
});

// EXPORT
module.exports = router;
