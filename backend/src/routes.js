const { Router } = require('express');
const DevControllers = require('./controllers/DevControllers')
const SearchControllers = require('./controllers/SearchControllers')

const routes = Router();
// Busca cadastros
routes.get('/devs', DevControllers.index)
// Cria rota para cadastro dos devs
routes.post('/devs', DevControllers.store)

routes.get('/search', SearchControllers.index)

module.exports = routes;