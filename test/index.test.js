var expect = require('chai').expect;
var request = require('supertest');
var app = require('../server');

// describe('App', function() {
//   it('should return a 200 response', function(done) {
//     request(app).get('/').expect(200, done);
//   });
// });

describe('POST / address/user_address', function() {
  it('should create and redirect to /profile after posting a valid user address', function(done) {
    request(app).post('/user_address')
    .type('form')
    .send({
      user_id: 1,
      name: 'whateves',
      street: 'street',
      city: 'street',
      state: 'NY',
      zip: '10027'
    })
    .expect('Location', '/profile')
    .expect(302, done);
  });
});