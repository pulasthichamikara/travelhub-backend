const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const imageDownloader = require('image-downloader');

require('dotenv').config();
const app = express();

const userRouter = require('./routes/userRoute');
const locationRouter = require('./routes/locationRouter');
app.use(cors());
app.listen(4000);
app.use(express.json());

/* Mongodb */
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('mongodb is ready');
});

app.post('/uploaded-by-link', async (req, res) => {
  try {
    const { photosUrl } = req.body;
    const newName = 'image-' + Date.now() + '.jpg';
    await imageDownloader.image({
      url: photosUrl,
      dest: __dirname + '/uploads/' + newName,
    });
    res.json(newName);
  } catch (err) {
    res.status(500).json({ message: 'something went wrong' });
  }
});

app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/user', userRouter);
app.use('/location', locationRouter);
