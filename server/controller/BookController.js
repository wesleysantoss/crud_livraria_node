const repository = require('../repository/BookRepository');

const BookController = {
    list(request, response, next) {
        let query = {};

        if(request.query.title){
            query.title = new RegExp(`^${request.query.title}i`)
        }

        repository
        .findAsync(query)
        .then(data => response.json(data) )
        .catch(next);
    },
    getById(request, response, next) {
        repository
        .findByIdAsync(request.params.id)
        .then(data => response.json(data))
        .catch(next);
    },
    create(request, response, next) {
        const data = request.body;
        repository.createAsync(data)
        .then(data => {
            response.status(201);
            response.json(data);
        })
        .catch(next);
    },
    update(request, response, next) {
        const _id  = request.params.id,
              body = request.body;

        repository
        .updateAsync(_id, body)
        .then(data => response.json(data))
        .catch(next);
    },
    delete(request, response, next) {
        const _id = request.params.id;

        repository
        .deleteAsync(_id)
        .then(data => response.sendStatus(204))
        .catch(next);
    }
}

module.exports = BookController;