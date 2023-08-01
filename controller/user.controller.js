const createHash = require('../utils/createhash.utils')
const { statuscode, messages } = require('../utils/messages.utils')
const { messaging } = require('../utils/messaging.utils')
const { Op } = require('sequelize')
const {User} = require('../model')
const createJwt = require('../utils/create_jwt.utils')
const ProductReview = require('../model/product_review')
const db = require('../models/index')
const axios = require('axios')

class UserController { 
    async signUpUser(req, res) { 
        try {
                if (!req.body.sUsername) { 
                    return messaging(res, statuscode.statusSuccess, 'Enter valid username') 
                }
                if (!req.body.sPassword) { 
                    return messaging(res, statuscode.statusSuccess, 'Enter valid password') 
                }

                //* if user exists
                const isUserExist = await User.findOne({ where: { sUsername: req.body.sUsername } })
                console.log(isUserExist)
                if (isUserExist) { 
                    return messaging(res, statuscode.statusSuccess, messages.alreadyRegisteredUser) 
                }
                req.body.sPassword = createHash(req.body.sPassword)
                const isUser = await User.create(req.body)
                console.log('>>>>>', isUser)

            return messaging(res, statuscode.statusSuccess, isUser)
        } catch (error) {
            return messaging(res, statuscode.statusNotFound, error.message)
        }
    }

    //========== demo code =========//
    ifArray(arr, key) { 
        let ans = []
        for (let i = 0; i < arr.length; i++) { 
            ans.push(arr[i][key])
        }
        return ans;
    }

    async deadLock(req, res) { 
        try {
            const { data } = req.query 
            console.log(data)
            console.log('step1>> ', new Date())
            const result = await axios.get('https://dummyjson.com/cart')

            const arr = data.split('.')
            console.log(arr)

            let deepLevelData = result.data;
            // console.log('TRUE>>>>', deepLevelData.hasOwnProperty('carts'))
            // deepLevelData = deepLevelData['carts']
            // console.log(deepLevelData)
            // console.log('TRUE1>>>', deepLevelData[0].hasOwnProperty('id'))
            for (const key of arr) {
                if (typeof deepLevelData === 'object' && deepLevelData.hasOwnProperty(key) === false) {
                    console.log('HEEE')
                    const getArray = module.exports.ifArray(deepLevelData, key)
                    console.log(getArray)
                    console.log('KEY1>>>>', key)
                }
                if (deepLevelData.hasOwnProperty(key)) {
                    console.log('KEY>>>>', key)
                    deepLevelData = deepLevelData[key];
                    // console.log('LEVEL>>> ',deepLevelData)
                }
                // else {
                //     console.log('ERROR')
                //     deepLevelData = null;
                //     break;
                // }
            }
            console.log('LAST>>>>>',deepLevelData)
            return res.status(200).json({ msg: 'Success!' })
        } catch (error) {
            return res.status(404).json({ msg: error.message })
        }
    }

    async signInUser(req, res){ 
        try {
            if (!req.body.sUsername) { 
                return messaging(res, statuscode.statusSuccess, 'Enter valid username') 
            }
            if (!req.body.sPassword) { 
                return messaging(res, statuscode.statusSuccess, 'Enter valid password') 
            }
            //* if user exists
            const isUserExist = await User.findOne({
                where: {
                    [Op.and]: [ 
                        { sUsername: req.body.sUsername },
                        { sPassword: createHash(req.body.sUsername) }
                    ]  
                }
            })
            if (!isUserExist) { 
                return messaging(res, statuscode.statusSuccess, 'User or password not match') 
            }
            console.log(isUserExist.getDataValue())
            const data = {
                id: isUserExist.id,
                role: isUserExist.eRole
            }
            const token = createJwt(data)
            console.log(token)   
            return messaging(res, statuscode.statusSuccess, token) 
        } catch (error) {
            return messaging(res, statuscode.statusNotFound, error.message)
        }
    }

    async addProductReview(req, res) { 
        try {
            const { sReview, iUserId, iProductId } = req.body
            const result = await ProductReview.create({
                productId: iProductId,
                userId: iUserId,
                review: sReview
            })
            console.log(result.dataValues)
            return messaging(res, statuscode.statusSuccess, 'Review Add Successfully')
        } catch (error) {
            return messaging(res, statuscode.statusNotFound, error.message)
        }
    }

    async storageProcedure(req, res) { 
        try {
            // console.log(`CALL ${db.sequelize.config.database}.find_name(:name);`)
            const result = await db.sequelize.query(`CALL new_procedure(:name, @count1);`, {
                replacements: {
                    name: req.query.name,
                } 
            })
            // console.log(db.sequelize.models.Actors)
            // console.log('>>>>>>.')
            // const result = await db.Actors.findAll()
            console.log(result)
            return messaging(res, statuscode.statusSuccess, result)
        } catch (error) {
            return messaging(res, statuscode.statusNotFound, error.message)
        }
    }
}

module.exports = new UserController()