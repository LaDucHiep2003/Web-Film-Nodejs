
const homeRouters = require('./home.route')
const showRouters = require('./show.route')
const middleWare = require("../../middlewares/client/login.middleware")

module.exports = (app) =>{
    app.use('/',middleWare.requireAuth, homeRouters)
    app.use('/phim',middleWare.requireAuth,showRouters)
}