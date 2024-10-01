const express = require('express');
const router = express.Router();
const { getBooks, getBookById, createBook, postWhatsapp } = require('../../controllers/apiControllers');

router.get('/books', getBooks);
router.get('/books/:id', getBookById);
router.post('/books', createBook);

const initializeRoutes = (client) => {
    
    router.post('/send-mytext', (req, res) => postWhatsapp(req, res, client));
    
    return router;
};

module.exports = initializeRoutes;