const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  name: String,
  description: String,
  status: String,
  address: String,
  price: Number,
  orderedAt: { type: Date, default: Date.now },
});
const OrderModel = mongoose.model("Orders", orderSchema);
module.exports = OrderModel;