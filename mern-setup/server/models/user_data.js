const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true },
    question1: { type: String, required: true },
    answer1: { type: String, required: true },
    question2: { type: String, required: true },
    answer2: { type: String, required: true },
    location: {type: String}
  },
  { collection: "user-data" }
);

module.exports = mongoose.model("UserData", User);
