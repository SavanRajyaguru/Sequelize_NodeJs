const { sequelize } = require('../database/connectDb')
const Sequelize = require('sequelize') 

const ProductSeller = sequelize.define('product_seller', {
    productId: {
        type: Sequelize.INTEGER,
    },
    userId: {
        type: Sequelize.INTEGER,
    }
}, { timestamps: false })
ProductSeller.sync()

module.exports = ProductSeller