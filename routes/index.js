const product = require('./product.routes')
const user = require('./user.routes')
const db = require('../models')
const router = require('express').Router()

router
    .use('/product', product)
    .use('/user', user)
    // .post('/data', storageProcedure)

module.exports = router