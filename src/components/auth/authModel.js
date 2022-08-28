const mongoose = require("mongoose");
const { Schema } = mongoose;

const authSchema = new Schema({
  email: String,
  password: String,
  firstName: String,
  LastName: String,
  phone: String,
  createdAt: { type: Date, default: Date.now },
});
const AuthModel = mongoose.model("Auth", authSchema);
module.exports = AuthModel;