const express = require('express')
const exphbs = require('express-handlebars')

const mongoose = require('mongoose')

const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const Todo = require('./models/todo')

const routes = require('./routes')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}// 僅在非正式環境時, 使用 dotenv



const app = express()

const port = 3000

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)


app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})