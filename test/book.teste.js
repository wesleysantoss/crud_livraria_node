const assert  = require('assert'),
      app     = require('../server/app'),
      request = require('supertest')(app),
      repository = require('../server/repository/BookRepository');

describe('Book CRUD', () => {
    let id;
    beforeEach(done => {
        const book = {title: "O Senhor dos Anéis"};
        repository.create(book, (err, data) => {
            id = String(data._id);
            done();
        })
    })
    
    afterEach(done => repository.delete(id, done))

    it('GET /api/books should list', () => {
        return request.get('/api/books')
        .then(result => {
            assert.equal(result.status, 200);
            assert.ok(result.body.length);
        })
    })

    it('GET /api/books should list one', () => {
        return request.get(`/api/books/${id}`)
        .then(result => {
            assert.equal(200, result.status);
            assert.equal(result.body.title, 'O Senhor dos Anéis');
        })
    })

    it('POST /api/books should create a new book', () => {
        const book = {title: 'A história sem fim'};
        return request
        .post('/api/books')
        .send(book)
        .then(result => {
            assert.equal(result.status, 201);
            assert.equal(result.body.title, 'A história sem fim');
        })
    })

    it('PUT /api/books should update book', () => {
        const book = {pages: 55};
        return request
        .put(`/api/books/${id}`)
        .send(book)
        .then((result) => {
            assert.equal(200, result.status);
            return repository.findByIdAsync(id);
        })
        .then(result => {
            assert.equal(55, result.pages);
            assert.equal('O Senhor dos Anéis', result.title);
        })
    })

    it('DELETE /api/books/:id', () => {
        return request.delete(`/api/books/${id}`)
        .then(result => {
            assert.equal(result.status, 204)
        })
    })

})