const { sequelize } = require('../database/connectDb')
const Sequelize = require('sequelize')

const Salary = sequelize.define('salary', {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // unique: true,
        references: {
            model: 'employees',
            key: 'id',
        }
    }, 
    dSalary: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
},{ paranoid: true })
Salary.sync()

module.exports = Salary