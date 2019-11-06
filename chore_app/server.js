//DEPENDENCIES
const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const session = require("express-session");
const User = require("./models/users.js");
const Chores = require("./models/chores.js");
const methodOverride = require("method-override");
//MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//CONTROLLERS
app.use(
  session({
    secret: "feedmeseymour", //some random string
    resave: false,
    saveUninitialized: false
  })
);
const userController = require("./controllers/users.js");
app.use("/users", userController);
const sessionController = require("./controllers/sessions.js");
app.use("/sessions", sessionController);
const choresController = require("./controllers/chores.js");
app.use("/chores", choresController);
//ROUTES

//index:
app.get("/", (req, res) => {
  res.render("index.ejs", { currentUser: req.session.currentUser });
});
//LISTENER
app.listen(port, () => {
  console.log("listening to" + port);
});
mongoose.connect("mongodb://localhost:27017/chores");
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});
