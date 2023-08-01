const { sequelize } = require('../database/connectDb')
const Sequelize = require('sequelize')

const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sUsername: {
        type: Sequelize.STRING,
        allowNull: false,
    }, 
    sPassword: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    eRole: {
        type: Sequelize.ENUM('USER', 'SELLER'),
        defaultValue: 'USER'
    }
})
User.sync()

module.exports = User