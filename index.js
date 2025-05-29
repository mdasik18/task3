const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = 3000;

let books = [
  { id: 1, title: "The White Tiger", author: "Aravind Adiga" },
];

// GET all books
app.get("/books", (_, res) => {
  res.status(200).json(books);
});

// POST: Add a new book
app.post("/books", (req, res) => {
  const { id, title, author } = req.body;

  if (!id || !title || !author) {
    return res.status(400).json({ message: "id, title, and author are required" });
  }

  const newBook = { id, title, author };
  books.push(newBook);
  res.status(201).json({ message: "Book added", book: newBook });
});

// PUT: Update an existing book by ID
app.put("/books/:id", (req, res) => {
  const bookId = Number(req.params.id);
  const { title, author } = req.body;

  if (bookId) {
    return res.status(400).json({ message: "Book ID is required" });
  }

  if (!title || !author) {
    return res.status(400).json({ message: "title and author are required" });
  }

  const book = books.find(b => b.id === bookId);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  book.title = title;
  book.author = author;
  res.status(200).json({ message: "Book updated", book });
});

// DELETE: Remove a book by ID
app.delete("/books/:id", (req, res) => {
  const bookId = Number(req.params.id);

  if (bookId) {
    return res.status(400).json({ message: "Book ID is required" });
  }

  const initialLength = books.length;
  books = books.filter(book => book.id !== bookId);

  if (books.length === initialLength) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.status(200).json({ message: "Book deleted" });
});

// Server Listener
app.listen(port, () => {
  console.log(`✅ App is listening on http://localhost:${port}`);
});
