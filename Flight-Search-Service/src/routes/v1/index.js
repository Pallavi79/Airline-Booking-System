const express = require('express');
const router = express.Router();

const {InfoController} = require('../../controllers');
router.get('/info',InfoController.info);

//Airplane router
const airplaneRoutes = require('./airplane-routes');
router.use('/airplanes',airplaneRoutes);

//Cities router
const cityRoutes = require('./city-routes');
router.use('/cities',cityRoutes);

//Airport router
const airportRoutes = require('./airport-routes');
router.use('/airports', airportRoutes);

//Flights router
const flightRoutes = require('./flight-routes');
router.use('/flights', flightRoutes);

module.exports = router;