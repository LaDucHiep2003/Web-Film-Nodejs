const express = require('express')
const app = express()
require('dotenv').config()

const route = require('./routes/client/index.route')
const routeAdmin = require('./routes/admin/index.route')
const database = require('./config/database')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('express-flash')
const cookieParser = require("cookie-parser")
const session = require("express-session")

const port = process.env.port

database.connect()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.set('views', './views')
app.set('view engine', 'pug')
app.use(methodOverride('_method'))
// Flag
app.use(cookieParser('namamn'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

route(app)
routeAdmin(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})