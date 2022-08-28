const router = require('express').Router()
const productsController = require("./productsController")

router.get('/getProducts', productsController.getProducts)
router.post('/createProduct', productsController.createProduct)
router.delete('/removeProduct',productsController.removeProduct )
router.put('/updateProduct/:id',productsController.updateProduct )
router.get('/searchProduct/:title',productsController.searchProduct )





module.exports = router