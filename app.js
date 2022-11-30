const express = require("express")
const cors = require('cors')
const bodyParser = require("body-parser")
const morgan = require("morgan")

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('tiny'))

app.use('/api/book', require("@/src/book/routes"))
app.use('/api/category', require("@/src/category/routes"))

module.exports = app