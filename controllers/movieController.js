var express = require('express');
// const db = require('../models');

var router = express.Router();

var movie = require('../models/movie.js');
const db = require('../models');

router.post('/api/movie', (req, res) => {
  console.log(req);
  db.Movie.create({
    title: req.body.body.title,
    streamService: req.body.body.streaming,
    rating: req.body.body.rating,
    writeUp: req.body.body.writeUp,
    recommend: req.body.body.recommend,
    // need to figure out how to get the session user ID
    userId: 1
  });
});

module.exports = router;
