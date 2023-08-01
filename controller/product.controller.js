const { statuscode } = require('../utils/messages.utils')
const { messaging } = require('../utils/messaging.utils')
const {Product, User, ProductSeller} = require('../model')
const ProductReview = require('../model/product_review')
const Salary = require('../model/salary')
const Emp = require('../model/emp')
const { sequelize } = require('../database/connectDb')
// const { sequelize } = require('../database/connectDb')

class ProductController{ 
    async addProduct(req, res) { 
        try {
            if (!req.body) { 
                messaging(res, statuscode.statusSuccess, 'Enter valid input')
            }
            const isProduct = await Product.create(req.body)
            console.log(isProduct.dataValues)

            if (isProduct) await ProductSeller.create({
                productId: isProduct.getDataValue('id'),
                userId: req.decoded.id,
            })

            return messaging(res, statuscode.statusSuccess, isProduct)
        } catch (error) {
            console.log(error)
            return messaging(res, statuscode.statusNotFound, error.message)
        }
    }

    async getProduct(req, res) { 
        try {
            const products = await User.findAll({
                // logging: console.log,
                attributes: ['id', 'sUsername', 'eRole'],
                order: [
                    ['id', 'ASC'],
                    ['products', 'dPrice', 'DESC']
                ],
                include: [
                    {
                        model: ProductReview,
                        as: 'reviews',
                        // attributes: ['id', 'review']
                    },
                    {
                        model: Product,
                        attributes: ['id', 'sName', 'dPrice', 'sBrand'],
                        as: 'products',
                        // limit: 1,
                        //* If you don't want anything from the junction table
                        through: {
                            attributes: []
                        },
                        include: [
                            {
                                model: ProductReview,
                                as: 'reviews',
                                // attributes: ['id', 'review']
                            }
                        ],
                    },
                ],
            }) 


            const result = await Emp.findAll({ logging: console.log, include: { model: Salary, paranoid: false } }, {raw: true})
            for (let i = 0; i < result.length; i++) { 
                console.log('RESULT>>>>', result[i].dataValues)
            }

            const data = await sequelize.query('select * from employees', {
                logging: console.log,
                mapToModel: true,
                raw: true
            })
            console.log(data)
            return messaging(res, statuscode.statusSuccess, data)
        } catch (error) {
            console.log(error)
            return messaging(res, statuscode.statusNotFound, error.message)
        }
    }

    async deleteProduct(req, res) { 
        try {
            if (!req.query.id) 
                return messaging(res, statuscode.statusSuccess, 'Enter product id')
            
            await Salary.destroy({
                where: { id: req.query.id },
            })
            return messaging(res, statuscode.statusSuccess, 'Product deleted successfully')
        } catch (error) {
            return messaging(res, statuscode.statusNotFound, error.message)
        }
    }
}

module.exports = new ProductController()