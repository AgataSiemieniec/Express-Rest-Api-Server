const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const message = { message: 'Ok'};

/* testmonials */

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
  db.testimonials.splice(`${req.params.id}`-1, 1);
  res.json(message);
});

/* concerts */

app.get('/concerts', (req, res) => {
  res.json(db.concerts);
});

app.get('/concerts/:id', (req, res) => {
  res.json(db.concerts[`${req.params.id}`-1]);
});

app.post('/concerts', (req, res) => {
  const { id, performer, genre, price, day, image } = req.body;
  const addRecord = {
  id: uuidv4(),
  performer: req.body.performer,
  genre: req.body.genre,
  price: req.body.price,
  day: req.body.day,
  image: req.body.image
  };
  db.concerts.push(addRecord);
  res.json(message);
});

app.put('/concerts/:id', (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const updatedRecord = db.concerts.find(item => item.id == `${req.params.id}`);
  updatedRecord.performer = req.body.performer;
  updatedRecord.genre = req.body.genre;
  updatedRecord.price = req.body.price;
  updatedRecord.day = req.body.day;
  updatedRecord.image = req.body.image;
  res.json(message);
});

app.delete('/concerts/:id', (req, res) => {
  db.concerts.splice(`${req.params.id}`-1, 1);
  res.json(message);
});

/* seats */

app.get('/seats', (req, res) => {
  res.json(db.seats);
});

app.get('/seats/:id', (req, res) => {
  res.json(db.seats[`${req.params.id}`-1]);
});

app.post('/seats', (req, res) => {
  const { id, day, seats, client, email } = req.body;
  const addRecord = {
  id: uuidv4(),
  day: req.body.day,
  seats: req.body.seats,
  client: req.body.client,
  email: req.body.email
  };
  db.seats.push(addRecord);
  res.json(message);
});

app.put('/seats/:id', (req, res) => {
  const { day, seats, client, email } = req.body;
  const updatedRecord = db.seats.find(item => item.id == `${req.params.id}`);
  updatedRecord.day = req.body.day;
  updatedRecord.seats = req.body.seats;
  updatedRecord.client = req.body.client;
  updatedRecord.email = req.body.email;
  res.json(message);
});

app.delete('/seats/:id', (req, res) => {
  db.seats.splice(`${req.params.id}`-1, 1);
  res.json(message);
});

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});