var express = require('express');

var router = express.Router();

// var movie = require('../models/movie.js');

router.get('/test', function (req, res) {
  res.render('index');
});

module.exports = router;
