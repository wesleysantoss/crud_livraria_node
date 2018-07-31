const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static('assets'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('./route')); // Arquivo que organiza a ROTA da aplicação.

// Se chegar aqui é porque não achou a rota.
app.use((request, response, next) => {
      let err = new Error('Não econtrado');
      err.status = 404;
      next(err);
})

app.use((error, request, response, next) => {
      response.status(error.status || 500);
      response.send(error.message);
      console.error(error.stack);
})

module.exports = app;