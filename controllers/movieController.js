var express = require('express');
// const db = require('../models');

var router = express.Router();

var movie = require('../models/movie.js');
const db = require('../models');
module.exports = function(app){

  // router.post('/api/movie', (req, res) => {
  
//   db.Movie.create({
//     title: req.body.title,
//     streamService: req.body.streaming,
//     rating: req.body.rating,
//     writeUp: req.body.writeUp,
//     recommend: req.body.recommend,
//     // need to figure out how to get the session user ID
//     userId: 1
//   });
// });
}


module.exports = router;
