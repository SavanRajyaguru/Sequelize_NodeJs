const { sequelize } = require('../database/connectDb')
const Sequelize = require('sequelize') 

const ProductReview = sequelize.define('product_review', {
    productId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    review: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, { timestamps: false })
ProductReview.sync()

module.exports = ProductReview