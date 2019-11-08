// DEPENDENCIES
const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const { Chores } = require("../models/chores.js");

//ROUTES

//index
router.get("/", (req, res) => {
  //   console.log(req.session.currentUser.chores);
  User.findById(req.session.currentUser._id, (error, foundUser) => {
    if (error) {
      console.log(error);
    } else {
      res.render("chores/index.ejs", {
        currentUser: foundUser
      });
    }
  });
});
//new
router.get("/new/:user", (req, res) => {
  res.render("chores/new.ejs", { user: req.params.user });
});
//show
router.get("/user1chores/:id", (req, res) => {
  // console.log(req.params.id);
  const position = req.params.id;
  // console.log(req.session.currentUser.user1chores[position]);

  const chore = req.session.currentUser.user1chores[position];
  // console.log(chore._id);
  res.render("chores/showuser1.ejs", { chore: chore });
});
router.get("/user2chores/:id", (req, res) => {
  // console.log(req.params.id);
  const position = req.params.id;
  const chore = req.session.currentUser.user2chores[position];
  res.render("chores/showuser2.ejs", { chore: chore });
});
//create
router.post("/user1chores", (req, res) => {
  const id = req.session.currentUser._id;

  Chores.create(req.body, (error, createdChores) => {
    // console.log(req.session.currentUser);
    const chores = req.params.user;
    // console.log(chores);

    User.findByIdAndUpdate(
      req.session.currentUser._id,
      {
        $push: { user1chores: createdChores }
      },
      { new: true },
      (error, updatedUser) => {
        // console.log(createdChores);
        console.log("added chores to user");
        // console.log(updatedUser);
      }
    );

    if (error) {
      res.send(error);
    } else {
      res.redirect("/chores");
    }
  });
});
router.post("/user2chores", (req, res) => {
  const id = req.session.currentUser._id;

  Chores.create(req.body, (error, createdChores) => {
    // console.log(req.session.currentUser);
    const chores = req.params.user;
    // console.log(chores);

    User.findByIdAndUpdate(
      req.session.currentUser._id,
      {
        $push: { user2chores: createdChores }
      },
      { new: true },
      (error, updatedUser) => {
        // console.log(createdChores);
        console.log("added chores to user");
        // console.log(updatedUser);
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
router.get("/edit/user1chores/:id", (req, res) => {
  Chores.findById(req.params.id, (error, foundChore) => {
    if (error) {
      console.log(error);
    } else {
      // console.log(foundChore);
      res.render("chores/edit.ejs", { chore: foundChore });
    }
  });
});
router.get("/edit/user2chores/:id", (req, res) => {
  Chores.findById(req.params.id, (error, foundChore) => {
    if (error) {
      console.log(error);
    } else {
      // console.log(foundChore);
      res.render("chores/edit.ejs", { chore: foundChore });
    }
  });
});

//UPDATE
router.put("/update/user1chores/:id", (req, res) => {
  const choresArray = req.session.currentUser.user1chores.map(chore => {
    if (chore._id == req.params.id) {
      return {
        _id: req.params.id,
        name: req.body.name,
        assigned: req.body.assigned,
        __v: 0
      };
    } else {
      return chore;
    }
  });

  User.update(
    {
      _id: req.session.currentUser._id
    },
    {
      $set: { user1chores: choresArray }
    },
    { new: true },
    (error, updatedUser) => {
      if (error) {
        console.log(error);
      } else {
        console.log(updatedUser);
      }
    }
  );

  Chores.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedChore) => {
      if (error) {
        console.log(error);
      } else {
        // console.log(updatedChore);
        res.redirect("/chores");
      }
    }
  );
});
router.put("/update/user2chores/:id", (req, res) => {
  const choresArray = req.session.currentUser.user2chores.map(chore => {
    if (chore._id == req.params.id) {
      return {
        _id: req.params.id,
        name: req.body.name,
        assigned: req.body.assigned,
        __v: 0
      };
    } else {
      return chore;
    }
  });

  User.update(
    {
      _id: req.session.currentUser._id
    },
    {
      $set: { user2chores: choresArray }
    },
    { new: true },
    (error, updatedUser) => {
      if (error) {
        console.log(error);
      } else {
        console.log(updatedUser);
      }
    }
  );

  Chores.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedChore) => {
      if (error) {
        console.log(error);
      } else {
        // console.log(updatedChore);
        res.redirect("/chores");
      }
    }
  );
});
//DELETE
router.delete("/delete/user1chores/:id", (req, res) => {
  const choresArray = req.session.currentUser.user1chores.filter(chore => {
    if (chore._id == req.params.id) {
      console.log("matched");
    } else {
      return chore;
    }
  });
  console.log(choresArray);
  User.update(
    {
      _id: req.session.currentUser._id
    },
    {
      $set: { user1chores: choresArray }
    },
    { new: true },
    (error, updatedUser) => {
      if (error) {
        console.log(error);
      } else {
        console.log(updatedUser);
      }
    }
  );
  Chores.findByIdAndRemove(req.params.id, (error, deletedChore) => {
    if (error) {
      console.log(error);
    } else {
      console.log(deletedChore);
      res.redirect("/chores");
    }
  });
});
router.delete("/delete/user2chores/:id", (req, res) => {
  const choresArray = req.session.currentUser.user2chores.filter(chore => {
    if (chore._id == req.params.id) {
      console.log("matched");
    } else {
      return chore;
    }
  });
  console.log(choresArray);
  User.update(
    {
      _id: req.session.currentUser._id
    },
    {
      $set: { user2chores: choresArray }
    },
    { new: true },
    (error, updatedUser) => {
      if (error) {
        console.log(error);
      } else {
        console.log(updatedUser);
      }
    }
  );
  Chores.findByIdAndRemove(req.params.id, (error, deletedChore) => {
    if (error) {
      console.log(error);
    } else {
      console.log(deletedChore);
      res.redirect("/chores");
    }
  });
});
// EXPORT
module.exports = router;
