const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const message = { message: 'Ok'};

/*testmonials*/

app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.testimonials[`${req.params.id}`-1]);
});

app.get('/testimonials/random', (req, res) => {
  const random = db.testimonials[Math.floor(Math.random() * db.testimonials.length)];
  res.json(random);
});

app.post('/testimonials', (req, res) => {
  const { author, text, id } = req.body;
  const addRecord = {
  id: uuidv4(),
  author: req.body.author,
  text: req.body.text
  };

  db.testimonials.push(addRecord);
  res.json(message);
});

app.put('/testimonials/:id', (req, res) => {
  const { author, text } = req.body;
  const updatedRecord = db.testimonials.find(item => item.id == `${req.params.id}`);
  updatedRecord.author = req.body.author;
  updatedRecord.text = req.body.text;
  res.json(message);
});

app.delete('/testimonials/:id', (req, res) => {
  db.splice(`${req.params.id}`-1, 1);
  res.json(message);
});

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});