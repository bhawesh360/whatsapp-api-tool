const express = require('express');
const path = require('path');
const multer = require('multer');


const errorHandler = require('./src/middleware/errorHandler');


const { Client, LocalAuth,MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Initialize WhatsApp client
const client = new Client({
  authStrategy: new LocalAuth({
    dataPath:'./src/storage/auth'
  })

});


const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'src/public')));

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads/') // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) // Appending extension
  }
});

const upload = multer({ storage: storage });

const apiRoutes = require('./src/api/routes/apiRoutes')(client,upload);
const webRoutes = require('./src/web/routes/webRoutes');


app.use('/api', apiRoutes);
app.use('/', webRoutes);

app.use(errorHandler);





client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.initialize();








app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

