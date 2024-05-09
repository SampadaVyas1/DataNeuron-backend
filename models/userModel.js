const mongoose = require("mongoose");

const userShema = new mongoose.Schema({
  name: String,
  email: String,
});

module.exports = mongoose.model("User", userShema);
