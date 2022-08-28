const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: String,
  location: String,
  noOfBedRooms:String,
  noOfBathRooms:String,
  noOfKitchen:String,
  price:String,
  imgSrc: String,
  contactNo: String

  

});
const ProductModel = mongoose.model("Products", productSchema);
module.exports = ProductModel;