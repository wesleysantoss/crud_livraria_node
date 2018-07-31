const repository = require('../repository/BookRepository');

const mainController = {
    getHome(request, response, next){
        response.render('index');
    },
    getBooks(request, response, next){
        repository.findAsync({})
        .then(result => {
            const arr_nomes = result.map(e => e.title).sort();
            response.render('books', {books: arr_nomes});  
        })
    }
};

module.exports = mainController;