const express          = require('express'),
      route            = express.Router(),
      MainController   = require('../controller/MainController'),
      BookController   = require('../controller/BookController');

// MainController
route.get('/', MainController.getHome);
route.get('/books', MainController.getBooks);

// BookController
route.get('/api/books', BookController.list);
route.get('/api/books/:id', BookController.getById);
route.post('/api/books', BookController.create);
route.put('/api/books/:id', BookController.update);
route.delete('/api/books/:id', BookController.delete);

module.exports = route;