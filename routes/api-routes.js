// Requiring our models and passport as we've configured it
const db = require('../models');
const passport = require('../config/passport');
const moment = require('moment');

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post('/api/login', passport.authenticate('local'), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  app.post('/api/movie', (req, res) => {
    db.Movie.create({
      title: req.body.title,
      streamService: req.body.streaming,
      rating: req.body.rating,
      writeUp: req.body.writeUp,
      recommend: req.body.recommend,
      UserId: req.user.id
    }).then(() => {
      res.status(200).end();
    });
  });

  app.post('/api/show', (req, res) => {
    db.TvShow.create({
      title: req.body.title,
      streamService: req.body.streaming,
      rating: req.body.rating,
      minEpisodes: req.body.minEpisodes,
      writeUp: req.body.writeUp,
      recommend: req.body.recommend,
      UserId: req.user.id
    }).then(() => {
      res.status(200).end();
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post('/api/signup', (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      userName: req.body.userName
    })
      .then(() => {
        res.redirect(307, '/api/login');
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  });

  app.get('/404', (req, res) => {
    res.render('404');
  });

  app.delete('/api/shows/:id', (req, res) => {
    db.TvShow.destroy({
      where: { id: req.params.id }
    }).then((data) => {
      res.json(data);
    });
  });

  app.delete('/api/movie/:id', (req, res) => {
    db.Movie.destroy({
      where: { id: req.params.id }
    }).then((data) => {
      res.json(data);
    });
  });

  app.get('/users=:id', (req, res) => {
    let moviesReviewed = [];
    let showsReviewed = [];
    let currentUser = false;
    if (req.user.id === parseInt(req.params.id)) {
      currentUser = true;
    }
    db.Movie.findAll({
      where: { UserId: req.params.id }
    }).then((data) => {
      moviesReviewed = data.map((item) => item.dataValues);
    }).then(() => {
      db.TvShow.findAll({
        where: { UserId: req.params.id }
      }).then((data) => {
        showsReviewed = data.map((item) => item.dataValues);
      }).then(() => {
        res.render('index', { movies: moviesReviewed, shows: showsReviewed, currentUser: currentUser });
      });
    });
  });

  app.get('/api/userid/:userName', (req, res) => {
    db.User.findOne({
      where: { userName: req.params.userName }
    }).then((data) => {
      if (!data) {
        res.json('404');
      } else {
        res.json(data.id);
      }
    });
  });

  app.get('/movies=:title', (req, res) => {
    db.Movie.findAll({
      where: { title: req.params.title },
      include: [db.User]
    }).then((data) => {
      const filtered = data.map((item) => {
        return {
          userName: item.User.userName,
          rating: item.rating,
          writeUp: item.writeUp,
          recommend: item.recommend,
          streamService: item.streamService,
          createdAt: moment(item.createdAt).format('MMMM Do YYYY h:mm:ss a')
        };
      });
      res.render('movie-search', { title: req.params.title, reviews: filtered });
    });
  });

  app.get('/shows=:title', (req, res) => {
    db.TvShow.findAll({
      where: { title: req.params.title },
      include: [db.User]
    }).then((data) => {
      const filtered = data.map((item) => {
        return {
          userName: item.User.userName,
          rating: item.rating,
          writeUp: item.writeUp,
          recommend: item.recommend,
          minEpisodes: item.minEpisodes,
          streamService: item.streamService,
          createdAt: moment(item.createdAt).format('MMMM Do YYYY h:mm:ss a')
        };
      });
      res.render('show-search', { title: req.params.title, reviews: filtered });
    });
  });

  app.get('/movies', (req, res) => {
    let moviesReviewed = [];
    let showsReviewed = [];
    db.Movie.findAll({
      where: { UserId: req.user.id }
    }).then((data) => {
      moviesReviewed = data.map((item) => item.dataValues);
    }).then(() => {
      db.TvShow.findAll({
        where: { UserId: req.user.id }
      }).then((data) => {
        showsReviewed = data.map((item) => item.dataValues);
      }).then(() => {
        res.render('index', { movies: moviesReviewed, shows: showsReviewed, currentUser: true });
      });
    });
  });

  // Route for logging user out
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  // Route for getting some data about our user to be used client side
  app.get('/api/user_data', (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        userName: req.user.userName
      });
    }
  });
};
