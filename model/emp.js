const { sequelize } = require('../database/connectDb')
const Sequelize = require('sequelize')

const Emp = sequelize.define('employee', {
    sName: {
        type: Sequelize.STRING,
        require: true,
        allowNull: false
    },
    sLastName: {
        type: Sequelize.STRING,
    }
}, {
    indexes: [
        {
            name: 'full_name_index',
            // unique: false,
            // order: 'DESC',
            fields: ['sName', 'sLastName']
        },
    ]
},{ paranoid: true })
Emp.sync()

module.exports = Emp