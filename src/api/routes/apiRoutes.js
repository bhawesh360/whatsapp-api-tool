const express = require('express');
const router = express.Router();
const { getBooks, getBookById, createBook, postWhatsapp,postImageFromUrl } = require('../../controllers/apiControllers');


router.get('/books', getBooks);
router.get('/books/:id', getBookById);
router.post('/books', createBook);
router.post('/send-pdf', postPdfMessage);


const initializeRoutes = (client) => {
    
    router.post('/send-mytext', (req, res) => postWhatsapp(req, res, client));
    router.post('/send-image-from-url', (req, res) => postImageFromUrl(req, res, client));

    
    return router;
};




module.exports = initializeRoutes;