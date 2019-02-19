const express = require('express');

const routes = express.Router();

const TransactionController = require('./controllers/TransactionController');

routes.get('/transactions', TransactionController.index);
routes.post('/transactions', TransactionController.store);
routes.delete('/transactions/:id', TransactionController.delete);

module.exports = routes;