let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// Flight Model
let flightSchema = require('../models/FlgihtsSchema');

router.route('/userAllFlights').get((req, res) => {
    flightSchema.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })