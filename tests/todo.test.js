const app = require('../app');
const request = require('supertest');
const {sequelize} = require('../models');

const {queryInterface} = sequelize;
const BASE_URL = '/api/todos';

beforeAll(async () => {
  try {
    await queryInterface.bulkInsert('Todos', [
      {
        id: 1001,
        name: 'AAA',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1002,
        name: 'BBB',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1003,
        name: 'CCC',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1004,
        name: 'DDD',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  try {
    await queryInterface.bulkDelete('Todos', null);
  } catch (error) {
    console.log(error);
  }
});

describe('GET List todo /api/todos', ()=>{
  test('Get all data from list', (done) => {
    request(app)
        .get(BASE_URL)
        .expect(200)
        .then((response) => {
          expect(response.body.message).toBe('Success get all data');
          expect(response.body.totalData).toEqual(4);
          expect(response.body.currentPage).toBe(1);
          expect(response.body.nextPage).toBeNull();
          expect(response.body.prevPage).toBeNull();
          expect(response.body.totalPages).toEqual(1);
          done();
        })
        .catch((err)=>{
          done(err);
        });
  });
  test('Get all data with pagination', (done) => {
    request(app)
        .get(`${BASE_URL}?page=2&limit=2`)
        .expect(200)
        .then((response) => {
          expect(response.body.message).toBe('Success get all data');
          expect(response.body.totalData).toEqual(4);
          expect(response.body.currentPage).toBe(2);
          expect(response.body.nextPage).toBeNull();
          expect(response.body.prevPage).toEqual(1);
          expect(response.body.totalPages).toEqual(2);
          done();
        })
        .catch((err)=>{
          done(err);
        });
  });
});

describe('Get todo by id /api/todos/:id', () =>{
  test('Get todo by id', (done) => {
    request(app)
        .get('/api/todos/1001')
        .expect(200)
        .then((response) => {
          expect(response.body.message).toBe('Success todo by id');
          expect(response.body.data.id).toEqual(1001);
          expect(response.body.data.name).toBe('AAA');
          done();
        })
        .catch((err)=>{
          done(err);
        });
  });
  test('Get todo by id (case todo not found)', (done) => {
    request(app)
        .get('/api/todos/99999')
        .expect(404)
        .then((response) => {
          expect(response.body.message).toBe('Todo not found');
          done();
        })
        .catch((err)=>{
          done(err);
        });
  });
});

const createTodo = {
  name: 'create todo 1',
};

describe('Create todo /api/todos', () =>{
  test('POST todo', (done) => {
    request(app)
        .post('/api/todos')
        .send(createTodo)
        .expect(201)
        .then((response) => {
          expect(response.body.message).toBe('Success create todo');
          expect(response.body.data.name).toBe('create todo 1');
          done();
        })
        .catch((err)=>{
          done(err);
        });
  });
  test('POST todo (name not filled)', (done) => {
    request(app)
        .post('/api/todos')
        .expect(400)
        .then((response) => {
          expect(response.body.message).toBe('required field name');
          done();
        })
        .catch((err)=>{
          done(err);
        });
  });
});
const updateTodo = {
  name: 'new AAA',
  updatedAt: new Date(),
};
describe('Update todo by id /api/todos/:id', () =>{
  test('PUT todo', (done) => {
    request(app)
        .put('/api/todos/1001')
        .send(updateTodo)
        .expect(200)
        .then((response) => {
          expect(response.body.message).toBe('Success update todo');
          done();
        })
        .catch((err)=>{
          done(err);
        });
  });
  test('PUT todo (todo not found)', (done) => {
    request(app)
        .put('/api/todos/9999')
        .send(updateTodo)
        .expect(404)
        .then((response) => {
          expect(response.body.message).toBe('Todo Not Found');
          done();
        })
        .catch((err)=>{
          done(err);
        });
  });
  test('PUT todo (name not filled)', (done) => {
    request(app)
        .put('/api/todos/9999')
        .expect(404)
        .then((response) => {
          expect(response.body.message).toBe('Todo Not Found');
          done();
        })
        .catch((err)=>{
          done(err);
        });
  });
});

describe('Delete todo by id /api/todos/:id', () =>{
  test('delete todo', (done) => {
    request(app)
        .delete('/api/todos/1001')
        .expect(200)
        .then((response) => {
          expect(response.body.message).toBe('Success delete todo');
          done();
        })
        .catch((err)=>{
          done(err);
        });
  });
  test('DELETE todo (todo not found)', (done) => {
    request(app)
        .delete('/api/todos/9999')
        .expect(404)
        .then((response) => {
          expect(response.body.message).toBe('Todo Not Found');
          done();
        })
        .catch((err)=>{
          done(err);
        });
  });
});
