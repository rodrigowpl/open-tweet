const express = require('express')

const routes = express.Router()

const TweetControler = require('./controllers/TweetController')
const LikeController = require('./controllers/LikeController')

routes.get('/tweets', TweetControler.index)
routes.post('/tweets', TweetControler.store)

routes.post('/likes/:id', LikeController.store)

module.exports = routes