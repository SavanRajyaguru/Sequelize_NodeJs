const jwt = require('jsonwebtoken')
const config = require('../config/configDb')


function createJwt(data){
    const token = jwt.sign(data, config.app.secret_key, { expiresIn: config.app.expireIn })
    return token
}

module.exports = createJwt