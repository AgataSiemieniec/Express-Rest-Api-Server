const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

const message = { message: 'Ok'};

// get all seats
router.route('/seats').get((req, res) => {
    res.json(db.seats);
});
  
router.route('/seats/:id').get((req, res) => {
    res.json(db.seats[`${req.params.id}`-1]);
});

router.route('/seats').post((req, res) => {
    const { id, day, seat, client, email } = req.body;

    const addRecord = {
        id: uuidv4(),
        day: req.body.day,
        seat: req.body.seat,
        client: req.body.client,
        email: req.body.email
    };

    const bookedSeat = db.seats.find(item => item.seat == req.body.seat);
    const bookedDay = db.seats.some(item => item.day == req.body.day);

    if (bookedDay && bookedSeat){
        res.status(404).json({ message: '404 Not Found!  The slot is already taken...'});
    } else {
        db.seats.push(addRecord);
        req.io.emit('seatsUpdated', (db.seats));
        res.json(message);
    }
});

router.route('/seats/:id').put((req, res) => {
    const { day, seat, client, email } = req.body;
    const updatedRecord = db.seats.find(item => item.id == `${req.params.id}`);
    updatedRecord.day = req.body.day;
    updatedRecord.seat = req.body.seat;
    updatedRecord.client = req.body.client;
    updatedRecord.email = req.body.email;
    res.json(message);
});

router.route('/seats/:id').delete((req, res) => {
    db.seats.splice(`${req.params.id}`-1, 1);
    res.json(message);
});

module.exports = router;