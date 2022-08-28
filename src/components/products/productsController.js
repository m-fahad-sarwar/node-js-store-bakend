const ProductModel = require('./productsModel')


const getProducts = async (req, res) => {


  try {
    const data = await ProductModel.find()
    let response = {
      status: 200,
      message: "successfully fetched",
      data: data
    };
    res.json(response);
  } catch (error) {
    let response = {
      status: 401,
      message: error,
    };
    res.json(response);
  }
};

const createProduct = async (req, res) => {
  console.log(req.body)

  if (!req.body.title || !req.body.imgSrc || !req.body.price || !req.body.location || !req.body.noOfBedRooms || !req.body.noOfBathRooms || !req.body.noOfKitchen) {
    let response = {
      status: 201,
      message: "params are required",
    };
    res.json(response);
    return;
  }

  // logic createPost
  const newProduct = {
    title: req.body.title,
    location: req.body.location,
    type: req.body.type,
    area: req.body.area,
    noOfBedRooms: req.body.noOfBedRooms,
    noOfBathRooms: req.body.noOfBathRooms,
    noOfKitchen: req.body.noOfKitchen,
    price: req.body.price,
    imgSrc: req.body.imgSrc
  };

  const product = new ProductModel(newProduct);

  try {
    let result = await product.save();
    let response = {
      status: 200,
      message: "successfully Placed",
      data: result
    };
    res.json(response);
  } catch (error) {
    let response = {
      status: 400,
      message: error,
    };
    res.json(response);
  }
};
const removeProduct = async (req, res) => {
  // logic createPost
  console.log("id", req.query.id);
  try {
    await ProductModel.deleteOne({ _id: req.query.id });
    let response = {
      status: 200,
      message: "successfully deleted",
    };
    res.json(response);
  } catch (error) {
    let response = {
      status: 401,
      message: error,
    };
    res.json(response);
  }
};


const updateProduct = async (req, res) => {
  // logic createPost
  if (!req.body) {
    let response = {
      status: 401,
      message: "params are required",
    };
    res.json(response);
  }

  // logic createPost


  try {

    await ProductModel.updateOne({ _id: req.params.id }, req.body);
    let data = await ProductModel.findOne({ _id: req.params.id })
    let response = {
      status: 200,
      message: "successfully updated",
      data: data
    };
    res.json(response);
  } catch (error) {
    let response = {
      status: 401,
      message: error,
    };
    res.json(response);
  }
};
const searchProduct = async (req, res) => {


  try {
    var regex = new RegExp(req.params.title, "i")
    let data =  await ProductModel.find({ title: regex })
    let response = {
      status: 200,
      message: "successfully fetched",
      data: data
    };
    res.json(response);



  } catch (error) {
    let response = {
      status: 401,
      message: error,
    };
    res.json(response);
  }
};

module.exports = {
  getProducts,
  createProduct,
  removeProduct,
  updateProduct,
  searchProduct
}