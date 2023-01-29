const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.listen(4000);
app.use(express.json());
app.get('/test', (req, res) => {
  res.json('backend running here');
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  res.json({ name, email });
});
