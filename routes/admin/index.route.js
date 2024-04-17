const dashboardRouters = require('./dashboard.js')
const productRouters = require('./product.route.js')
const productCategoryRouters = require('./product-category.route.js')
const roleRouters = require("./role.route.js")

module.exports = (app) =>{
    app.use('/admin/dashboard', dashboardRouters)
    app.use('/admin/products',productRouters)
    app.use('/admin/products-category',productCategoryRouters)
    app.use('/admin/roles',roleRouters)
}