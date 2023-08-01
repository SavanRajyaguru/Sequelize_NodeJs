const User = require('../model/user')
const Product = require('../model/product')
const ProductSeller = require('../model/product_seller')
const ProductReview = require('./product_review')
const Emp = require('./emp')
const Salary = require('./salary')

//* Many to Many
User.belongsToMany(Product, { through: 'product_seller' })
Product.belongsToMany(User, { through: 'product_seller' })

//* One to Many
User.hasMany(ProductReview, { foreignKey: 'userId', onDelete: 'CASCADE', as: 'reviews' })
ProductReview.belongsTo(User)

Product.hasMany(ProductReview, { foreignKey: 'productId', onDelete: 'CASCADE', as: 'reviews' })
ProductReview.belongsTo(Product)

//* one to one 
Emp.hasOne(Salary, { foreignKey: 'userId', sourceKey: 'id', onDelete: 'CASCADE' })
Salary.belongsTo(Emp, { foreignKey: 'id' })


module.exports = {
    User,
    Product,
    ProductSeller
}