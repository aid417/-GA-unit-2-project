const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const choresSchema = Schema({
  name: String,
  assigned: String
});

const Chores = mongoose.model("Chores", choresSchema);

module.exports = Chores;
