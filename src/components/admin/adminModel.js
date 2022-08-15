const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminSchema = new Schema({
  email: String,
  password: String,
  name: String,
  createdAt: { type: Date, default: Date.now },
});
const AdminModel = mongoose.model("Admin", adminSchema);
module.exports = AdminModel;