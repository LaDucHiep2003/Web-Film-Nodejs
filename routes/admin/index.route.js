const systemConfig = require('../../config/system')

const dashboardRouters = require('./dashboard.js')
const productRouters = require('./product.route.js')
const productCategoryRouters = require('./product-category.route.js')
const roleRouters = require("./role.route.js")
const accountRouters = require("./account.route.js")
const authRouters = require("./auth.route")

module.exports = (app) =>{
    const PATH_ADMIN = systemConfig.prefixAdmin

    app.use(PATH_ADMIN + '/dashboard', dashboardRouters)
    app.use(PATH_ADMIN + '/products',productRouters)
    app.use(PATH_ADMIN + '/products-category',productCategoryRouters)
    app.use(PATH_ADMIN + '/roles',roleRouters)
    app.use(PATH_ADMIN + '/accounts', accountRouters)
    app.use(PATH_ADMIN + '/auth', authRouters)
}