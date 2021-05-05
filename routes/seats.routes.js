const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seat.controller');

router.get('/seats', SeatController.getAll);

router.get('/seats/random', SeatController.getRandom);

router.get('/seats/:id', SeatController.getId);

router.post('/seats', SeatController.post);

router.put('/seats/:id', SeatController.putId);

router.delete('/seats/:id', SeatController.deleteId);

module.exports = router;