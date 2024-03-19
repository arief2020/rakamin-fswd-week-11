const app = require('../app');
const request = require('supertest');


test('Get all data from list', (done) => {
  request(app)
      .get('/api/todos/')
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe('Success get all data');
        done();
      })
      .catch((err)=>{
        if (err.status === 500) {
          done.fail('Internal Server Error occurred');
        } else {
          done.fail(err);
        }
      });
});

test('Get todo by id', (done) => {
  request(app)
      .get('/api/todos/3')
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe('Success todo by id');
        done();
      })
      .catch((err)=>{
        if (err.status === 500) {
          done.fail('Internal Server Error occurred');
        } else {
          done.fail(err);
        }
      });
});

test('Create Todo', (done) => {
  const todoData = {
    name: 'New Todo',
  };
  request(app)
      .post('/api/todos/')
      .send(todoData)
      .expect(201)
      .then((response) => {
        expect(response.body.message).toBe('Success create todo');
        done();
      })
      .catch((err)=>{
        if (err.status === 500) {
          done.fail('Internal Server Error occurred');
        } else {
          done.fail(err);
        }
      });
});

test('Update Todo', (done) => {
  const todoData = {
    name: 'Todo update v2',
  };
  request(app)
      .put('/api/todos/6')
      .send(todoData)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe('Success update todo');
        done();
      })
      .catch((err)=>{
        if (err.status === 500) {
          done.fail('Internal Server Error occurred');
        } else {
          done.fail(err);
        }
      });
});

test('Update Todo', (done) => {
  request(app)
      .delete('/api/todos/6')
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe('Success delete todo');
        done();
      })
      .catch((err)=>{
        if (err.status === 500) {
          done.fail('Internal Server Error occurred');
        } else {
          done.fail(err);
        }
      });
});
