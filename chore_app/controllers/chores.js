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
router.get("/user1chores/:id", (req, res) => {
  console.log(req.params.id);
  const position = req.params.id;
  console.log(req.session.currentUser.user1chores[position]);
  const chore = req.session.currentUser.user1chores[position];
  res.render("chores/show.ejs", { chore: chore });
});
router.get("/user2chores/:id", (req, res) => {
  console.log(req.params.id);
  const position = req.params.id;
  const chore = req.session.currentUser.user2chores[position];
  res.render("chores/show.ejs", { chore: chore });
});
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
//EDIT
// router.get("/edit/:id", (req, res) => {
//   User.findById(req.params.id , (error, foundUser)=>{
//     if(error){
//       console.log(error)
//     }else{
//       res.render('')
//     }
//   })
// });

//DELETE
router.delete("/delete/:id", (req, res) => {
  console.log(req.params.id);
  User.findByIdAndRemove(req.params.id, (error, deletedUser) => {
    if (error) {
      console.log(error);
    } else {
      req.session.destroy(() => {
        res.redirect("/");
      });
    }
  });
});
// EXPORT
module.exports = router;
