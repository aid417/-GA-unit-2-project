const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { choresSchema } = require("./chores.js");

const userSchema = new Schema({
  username: String,
  password: String,
  household: String,
  chores: [choresSchema]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
