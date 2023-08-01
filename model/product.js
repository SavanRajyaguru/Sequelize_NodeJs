const { sequelize } = require('../database/connectDb')
const Sequelize = require('sequelize')

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sName: {
        type: Sequelize.STRING,
        allowNull: false,
    }, 
    dPrice: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    sBrand: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})
Product.sync()

module.exports = Product