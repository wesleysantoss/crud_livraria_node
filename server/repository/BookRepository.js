const db       = require('../config/mongo'),
      bluebird = require('bluebird');

const getQuery = (_id) => {
    return {_id: db.ObjectId(_id)}
}

const BookRepository = {
    find(query, callback){
        db.collection('books').find(query, callback)
    },
    findById(_id, callback){
        db.collection('books').findOne(getQuery(_id), callback);
    },
    create(data, callback){
        db.collection('books').insert(data, callback);
    },
    update(_id, data, callback){
        db.collection('books').update(getQuery(_id), {$set: data}, callback);
    },
    delete(_id, callback){      
        db.collection('books').remove(getQuery(_id), callback);
    }
}

module.exports = bluebird.promisifyAll(BookRepository); 