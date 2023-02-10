const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');

require('dotenv').config();
const app = express();

const userRouter = require('./routes/userRoute');
const locationRouter = require('./routes/locationRouter');
const bookingRouter = require('./routes/bookingRoute');
const { uploadByUrl, deleteImage } = require('./controllers/imageController');
app.use(cors());
app.listen(4000);
app.use(express.json());

/* Mongodb */
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('mongodb is ready');
});

app.use('/uploads', express.static(__dirname + '/uploads'));
app.post('/img-uploaded-by-link', uploadByUrl);
app.post('/img-delete-by-name', deleteImage);

app.use('/user', userRouter);
app.use('/location', locationRouter);
app.use('/booking', bookingRouter);
