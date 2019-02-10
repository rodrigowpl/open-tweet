const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const { MONGO_CONNECT_URL, DATA_BASE_NAME, PORT } = require('../settings')

mongoose.connect(
  MONGO_CONNECT_URL,
  {
    useNewUrlParser: true,
    dbName: DATA_BASE_NAME
  }
)

const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use((req, _, next) => {
  req.io = io

  return next()
})

app.use(cors())
app.use(express.json())
app.use(require('./routes'))

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
