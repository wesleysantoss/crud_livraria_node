const mongojs  = require('mongojs');
const NODE_ENV = process.env.NODE_ENV;
let mongoConnection = (NODE_ENV === 'test') ? 'localhost/livraria-test' : 'localhost/livraria';
const db = mongojs(mongoConnection);

db.on('error', err => console.log(err));
module.exports = db;