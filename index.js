const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');

require('dotenv').config();
const app = express();

const userRouter = require('./routes/userRoute');
app.use(cors());
app.listen(4000);
app.use(express.json());
app.get('/test', (req, res) => {
  res.json('backend running here');
});

/* Mongodb */
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('mongodb is ready');
});

app.use('/user', userRouter);
