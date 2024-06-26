const express = require('express')
const app = express()
require('dotenv').config()

const systemConfig = require('./config/system')
const route = require('./routes/client/index.route')
const routeAdmin = require('./routes/admin/index.route')
const database = require('./config/database')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('express-flash')
const moment = require('moment')
const cors = require('cors')
const cookieParser = require("cookie-parser")
const session = require("express-session")
const path = require('path');

const port = process.env.port

database.connect()

app.use(express.static(`${__dirname}/public`))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')
app.use(methodOverride('_method'))
app.use(cors())
// Flag
app.use(cookieParser('namamn'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

// App Local
app.locals.prefixAdmin = systemConfig.prefixAdmin
app.locals.moment = moment
  
// TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// End TinyMce


route(app)
routeAdmin(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})