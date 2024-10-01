const Book = require('../models/book');

exports.getBooks = (req, res) => {
  const books = Book.getAll();
  res.json(books);
};

exports.getBookById = (req, res) => {
  const book = Book.getById(req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
};

exports.createBook = (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required' });
  }
  const newBook = Book.create(title, author);
  res.status(201).json(newBook);
};

exports.postWhatsapp = async (req, res, client) => {
  
  const { number, message } = req.body;

  try {

    const chatId = number.includes('@c.us') ? number : `${number}@c.us`;
    
    await client.sendMessage(chatId, message);
    res.status(200).json({ status: 'success', message: 'Message sent' });

} catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
}
  

}