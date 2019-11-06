const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const choresSchema = new Schema({
  name: String,
  assigned: String
});

const Chores = mongoose.model("Chores", choresSchema);

module.exports = { choresSchema: choresSchema, Chores: Chores };
