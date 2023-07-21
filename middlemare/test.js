const request = require('supertest');
const server = require('../server');

describe('Book API', () => {
  let bookId;

  it('should return all books', async () => {
    const res = await request(server).get('/api/books');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(3); // Adjust this value based on your test data
  });

  it('should return a specific book by its ID', async () => {
    const res = await request(server).get('/api/books/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Book 1');
    bookId = res.body.id;
  });

  it('should return 404 for a non-existing book', async () => {
    const res = await request(server).get('/api/books/9999');
    expect(res.statusCode).toEqual(404);
  });

  it('should add a new book', async () => {
    const newBook = { title: 'New Book', author: 'New Author' };
    const res = await request(server).post('/api/books').send(newBook);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    bookId = res.body.id;
  });

  it('should update an existing book', async () => {
    const updatedBook = { title: 'Updated Book' };
    const res = await request(server).put(`/api/books/${bookId}`).send(updatedBook);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Updated Book');
  });

  it('should return 404 for updating a non-existing book', async () => {
    const updatedBook = { title: 'Updated Book' };
    const res = await request(server).put('/api/books/9999').send(updatedBook);
    expect(res.statusCode).toEqual(404);
  });

  it('should delete a book', async () => {
    const res = await request(server).delete(`/api/books/${bookId}`);
    expect(res.statusCode).toEqual(204);
  });

  it('should return 404 for deleting a non-existing book', async () => {
    const res = await request(server).delete('/api/books/9999');
    expect(res.statusCode).toEqual(404);
  });
});