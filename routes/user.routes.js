const userController = require('../controller/user.controller')

const router = require('express').Router()

router
    .post('/sign-up', userController.signUpUser)
    .post('/sign-in', userController.deadLock)
    .post('/add-review', userController.addProductReview)
    .post('/get-name', userController.storageProcedure)

module.exports = router