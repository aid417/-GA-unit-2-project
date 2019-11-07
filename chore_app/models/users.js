const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { choresSchema } = require("./chores.js");

const userSchema = new Schema({
  username: String,
  password: String,
  household: String,
  user1: String,
  user2: String,
  user1completed: [String],
  user2completed: [String],
  totalchores: [String],
  user1chores: [choresSchema],
  user2chores: [choresSchema]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
