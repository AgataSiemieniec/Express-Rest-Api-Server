const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

const message = { message: 'Ok'};

// get all concerts
router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
    res.json(db.concerts[`${req.params.id}`-1]);
});

router.route('/concerts').post((req, res) => {
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

router.route('/concerts/:id').put((req, res) => {
    const { performer, genre, price, day, image } = req.body;
    const updatedRecord = db.concerts.find(item => item.id == `${req.params.id}`);
    updatedRecord.performer = req.body.performer;
    updatedRecord.genre = req.body.genre;
    updatedRecord.price = req.body.price;
    updatedRecord.day = req.body.day;
    updatedRecord.image = req.body.image;
    res.json(message);
});

router.route('/concerts/:id').delete((req, res) => {
    db.concerts.splice(`${req.params.id}`-1, 1);
    res.json(message);
});

module.exports = router;