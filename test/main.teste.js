const assert  = require('assert'),
      app     = require('../server/app'),
      request = require('supertest')(app);

// mocha
describe('Teste principais', () => {
    it('GET / should responds 200', done => {
        request.get('/')
        .then(result => {
            assert.equal(200, result.status);
            done();
        })
    })
    it('GET / notFound should responds 404', done => {
        request.get('/')
        .then(result => {
            assert.equal(404, result.status);
            done();
        })
    })
});


