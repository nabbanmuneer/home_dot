const express = require("express");
const router = express.Router();
const homeController = require('../controllers/homeControllers');

router.get('/api/books', homeController.getAllBooks);

router.get('/api/books/:id', homeController.getBookById);

router.post('/api/books', homeController.addBook);

router.put('/api/books/:id', homeController.updateBook);

router.delete('/api/books/:id', homeController.deleteBook);

module.exports = router;