const express = require('express')

const DonnorsController = require('./controllers/DonnorsController')

const routes = express.Router()

routes.get('/donnors', DonnorsController.index)
routes.post('/donnors', DonnorsController.create)


module.exports = routes