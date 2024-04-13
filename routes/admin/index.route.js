const dashboardRouters = require('./dashboard.js')
const productRouters = require('./product.route.js')

module.exports = (app) =>{
    app.use('/admin/dashboard', dashboardRouters)
    app.use('/admin/products',productRouters)
}