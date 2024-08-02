const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    default: null,
  },
  gender: {
    type: String,
    default: "",
  },
  likes: {
    type: [String],
    default: [],
  },
  dislikes:{
    type: [String],
    default: [],
  }
});

userSchema.pre("save", function () {
  console.log(this.password);
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
