const mongoose = require("mongoose");
const { Schema } = mongoose;

const authSchema = new Schema({
  email: String,
  password: String,
  age: String,
  name: String,
  createdAt: { type: Date, default: Date.now },
});
const AuthModel = mongoose.model("Users", authSchema);
module.exports = AuthModel;