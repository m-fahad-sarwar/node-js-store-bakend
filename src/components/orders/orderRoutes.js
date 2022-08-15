const router = require('express').Router()
const orderController = require("./orderController")

router.get('/getOrders',orderController.getOrders )
router.post('/createOrder',orderController.createOrder )
router.delete('/removeOrder',orderController.removeOrder )
router.put('/updateOrder/:id',orderController.updateOrder )





module.exports = router