const Joi = require('joi');

let books = [
  { id: 1, title: 'Book 1', author: 'Author 1' },
  { id: 2, title: 'Book 2', author: 'Author 2' },
  { id: 3, title: 'Book 3', author: 'Author 3' },
];

function getAllBooks() {
  return books;
}

function getBookById(id) {
  return books.find((book) => book.id === id);
}

function addBook(newBook) {
  const book = {
    id: books.length + 1,
    ...newBook,
  };
  books.push(book);
  return book;
}

function updateBook(id, updatedBook) {
  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books[index] = { ...books[index], ...updatedBook };
    return books[index];
  }
  return null;
}

function deleteBook(id) {
  books = books.filter((book) => book.id !== id);
}

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
};