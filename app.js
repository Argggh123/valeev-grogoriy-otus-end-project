require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(express.json({ extended: true }));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/memes', require('./routes/memes'));

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'frontend', 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

async function start() {
  try {
    await mongoose.connect(process.env.DB_CONN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => console.log(`Server has been started on http://localhost:${PORT}`));
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
}

start();
