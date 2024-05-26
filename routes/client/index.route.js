
const homeRouters = require('./home.route')
const showRouters = require('./show.route')
const myAccountRouters = require('./my-account.route')
const middleWare = require("../../middlewares/client/login.middleware")

module.exports = (app) =>{
    app.use('/',middleWare.requireAuth, homeRouters)
    app.use('/phim',showRouters)
    app.use('/my-account',middleWare.requireAuth, myAccountRouters)
}