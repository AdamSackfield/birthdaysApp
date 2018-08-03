// Dependencies
require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// Server and Port Setup
const PORT = process.env.PORT || 8080
const Server = express()
const dev = Server.get('env') !== 'production';

// Database Setup
const DB = process.env.DB_HOST
mongoose
  .connect(DB, { useNewUrlParser: true })
  .then(() => console.log(`Connect to mLab`))
  .catch(error => console.log(`Failed to connect to mLab: ${error}`))

// Middleware
if(dev) {
  Server.use(logger('dev'))
  Server.use(cors())
}
if(!dev) {
  Server.use(loggser('common'))
}
Server.use(bodyParser.json())

// Start the Server
Server.listen(PORT, () => {
  console.log(`Server running at localhost:${PORT}`)
})