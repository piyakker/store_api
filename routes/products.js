const express = require('express')
const router = express.Router()

//引入controller
const { getAllProductStatic, getAllProduct } = require('../controller/products')

router.route('/').get(getAllProduct)
router.route('/static').get(getAllProductStatic)


module.exports = router