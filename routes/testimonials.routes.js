const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

const message = { message: 'Ok'};

// get all testimonials
router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

router.route('/testimonials/:id').get((req, res) => {
    res.json(db.testimonials[`${req.params.id}`-1]);
});

router.route('/testimonials/random').get((req, res) => {
    const random = db.testimonials[Math.floor(Math.random() * db.testimonials.length)];
    res.json(random);
});

router.route('/testimonials/random').get((req, res) => {
    const randomItem = (max) => {
      return Math.floor(Math.random() * (max));
    };
    res.json(db.testimonials[randomItem(db.testimonials.length)]);
});

router.route('/testimonials').post((req, res) => {
    const { author, text, id } = req.body;
    const addRecord = {
        id: uuidv4(),
        author: req.body.author,
        text: req.body.text
    };
    db.testimonials.push(addRecord);
    res.json(message);
});

router.route('/testimonials/:id').put((req, res) => {
    const { author, text } = req.body;
    const updatedRecord = db.testimonials.find(item => item.id == `${req.params.id}`);
    updatedRecord.author = req.body.author;
    updatedRecord.text = req.body.text;
    res.json(message);
});

router.route('/testimonials/:id').delete((req, res) => {
    db.testimonials.splice(`${req.params.id}`-1, 1);
    res.json(message);
});

module.exports = router;