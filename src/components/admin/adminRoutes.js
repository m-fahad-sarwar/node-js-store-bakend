
const router = require('express').Router()
const adminController = require("./adminController")

router.post('/login', adminController.login)
router.post('/signup', adminController.signup)


module.exports = router;


