const express = require('express');
const router = express.Router();
const books = require('./booksdb.js');

// Get all books
router.get('/books', (req, res) => {
  res.json(books);
});

// Get book by ISBN
router.get('/books/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  res.json(books[isbn]);
});

// Get books by author
router.get('/books/author/:author', (req, res) => {
  const author = req.params.author;
  let result = {};

  for (let key in books) {
    if (books[key].author === author) {
      result[key] = books[key];
    }
  }
  res.json(result);
});

// Get books by title
router.get('/books/title/:title', (req, res) => {
  const title = req.params.title;
  let result = {};

  for (let key in books) {
    if (books[key].title === title) {
      result[key] = books[key];
    }
  }
  res.json(result);
});

module.exports.general = router;
