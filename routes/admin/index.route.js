const systemConfig = require('../../config/system')

const dashboardRouters = require('./dashboard.js')
const productRouters = require('./product.route.js')
const productCategoryRouters = require('./product-category.route.js')
const roleRouters = require("./role.route.js")
const accountRouters = require("./account.route.js")
const authRouters = require("./auth.route")
const authMiddleware = require("../../middlewares/admin/auth.middleware")


module.exports = (app) =>{
    const PATH_ADMIN = systemConfig.prefixAdmin

    app.use(PATH_ADMIN + '/dashboard',authMiddleware.requireAuth, dashboardRouters)
    app.use(PATH_ADMIN + '/products',authMiddleware.requireAuth,productRouters)
    app.use(PATH_ADMIN + '/products-category',authMiddleware.requireAuth,productCategoryRouters)
    app.use(PATH_ADMIN + '/roles',authMiddleware.requireAuth,roleRouters)
    app.use(PATH_ADMIN + '/accounts',authMiddleware.requireAuth, accountRouters)
    app.use(PATH_ADMIN + '/auth', authRouters)
}