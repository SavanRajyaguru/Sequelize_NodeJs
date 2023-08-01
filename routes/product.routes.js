const productController = require('../controller/product.controller')
const { isAuthorizedUser } = require('../utils/checkauthorize.utils')
const { authToken } = require('../utils/checktoken.utils')

const router = require('express').Router()

router
    .post('/add-product', authToken, isAuthorizedUser, productController.addProduct)
    .get('/get-product', productController.getProduct)
    .delete('/delete-product', productController.deleteProduct)

module.exports = router