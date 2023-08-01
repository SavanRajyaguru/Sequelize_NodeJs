const Sequelize  = require('sequelize')
const config = require('../config/configDb')

const sequelize = new Sequelize(
    config.app.DB_Name,
    config.app.DB_Username,
    config.app.DB_Password,
    {
        host: config.app.DB_Host,
        dialect: 'mysql'
    }
)

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.')
}).catch((error) => {
    console.error('Unable to connect to the database: ', error)
})

//* for the export model 
// const db = require('../model/index')(sequelize, Sequelize)

module.exports = { sequelize }