const bookModel = require('../models/books');
const Joi = require('joi');

function getAllBooks(req, res) {
  const books = bookModel.getAllBooks();
  res.json(books);
}

function getBookById(req, res) {
  const { id } = req.params;
  const book = bookModel.getBookById(parseInt(id));
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
}

function addBook(req, res) {
  const { error } = validateBook(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const newBook = bookModel.addBook(req.body);
  res.status(201).json(newBook);
}

function updateBook(req, res) {
  const { id } = req.params;
  const { error } = validateBook(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const updatedBook = bookModel.updateBook(parseInt(id), req.body);
  if (updatedBook) {
    res.json(updatedBook);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
}

function deleteBook(req, res) {
  const { id } = req.params;
  bookModel.deleteBook(parseInt(id));
  res.sendStatus(204);
}

// Input validation using Joi
function validateBook(book) {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    author: Joi.string().min(3).required(),
  });

  return schema.validate(book);
}

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
};
