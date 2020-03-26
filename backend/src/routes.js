const express = require('express')
const routes = express.Router()// com isso desacoplaos a função de roteamento do express pois a unica coisa que queremos do express é esta função
const OngController = require('./controller/OrgController') // neste artigo esta contido todas as funções callback que seriam passadas dentro dos metodos http
const IncidentController = require('./controller/IncidentController')
const profileController = require('./controller/profileController')
const sessionController = require('./controller/sessionController')

routes.post('/session', sessionController.autenticar)

routes.get('/ongs', OngController.list)
routes.post('/ongs', OngController.create)

routes.get('/incidents', IncidentController.list)
routes.post('/incidents', IncidentController.create)
routes.delete('/incidents/:id', IncidentController.delete)

routes.get('/profile', profileController.index)

module.exports = routes
