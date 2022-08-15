const OrderModel = require('./orderModel')

const getOrders = async (req, res) => {


    try {
        const data = await OrderModel.find()
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

const createOrder = async (req, res) => {
    console.log(req.body)
    if (!req.body.name || !req.body.price || !req.body.description || !req.body.address) {
        let response = {
            status: 201,
            message: "params are required",
        };
        res.json(response);
        return;
    }

    // logic createPost
    const newOrder = {
        name: req.body.name,
        price: req.body.price,
        address: req.body.address,
        status: 'Order Placed',
        description: req.body.description,
        createdAt: new Date(),
    };

    const product = new OrderModel(newOrder);

    try {
        await product.save();
        let response = {
            status: 200,
            message: "successfully Placed",
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
const removeOrder = async (req, res) => {
    // logic createPost
    console.log("id",req.query.id);
    try {
      await OrderModel.deleteOne({ _id: req.query.id });
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

  const updateOrder = async (req, res) => {
    // logic createPost
    if (!req.body.name || !req.body.price || !req.body.description) {
      let response = {
        status: 401,
        message: "params are required",
      };
      res.json(response);
    }

    // logic createPost
    const updateOrder = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      createdAt: new Date(),
    };
    console.log(updateOrder)
    console.log("req.params.id",req.params.id);
  
    try {
      await OrderModel.updateOne({ _id: req.params.id }, updateOrder);
      let response = {
        status: 200,
        message: "successfully updated",
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
    getOrders,
    createOrder,
    removeOrder,
    updateOrder
}