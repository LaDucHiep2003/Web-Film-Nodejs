
const homeRouters = require('./home.route')
const showRouters = require('./show.route')

module.exports = (app) =>{
    app.use('/', homeRouters)
    app.use('/phim',showRouters)
}