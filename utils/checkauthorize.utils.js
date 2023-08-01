const { statuscode, messages } = require('./messages.utils')
const { messaging } = require('./messaging.utils')
const { User } = require('../model')


//============= Authorize Admin ===========//
const isAuthorizedAdmin = async (req, res, next) => {
    try {
        const admin = await User.findByPk(req.decoded.id)
    
        if (!admin) {
            return messaging(res, statuscode.unAuthorized, messages.unAuthorized)
        }
    
        return req.decoded.role === 'admin'
            ? next()
            : messaging(res, statuscode.unAuthorized, messages.unAuthorized)
        
    } catch (error) {
        return messaging(res, statuscode.unAuthorized, 'Some thing went wrong in Authorize')
    }

}


//=============== Authorize SELLER ==========//
const isAuthorizedUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.decoded.id)
        if (!user) {
            return messaging(res, statuscode.unAuthorized, messages.unAuthorized)
        }
    
        return req.decoded.role === 'SELLER'
            ? next()
            : messaging(res, statuscode.unAuthorized, messages.unAuthorized)
        
    } catch (error) {
        console.log(error)
        return messaging(res, statuscode.unAuthorized, 'Some thing went wrong in Authorize')
    }
}

module.exports = { isAuthorizedAdmin, isAuthorizedUser }