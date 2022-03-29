const express = require('express');
const authController = require('../controllers/auth');
const mysql = require('mysql2');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({ path: './.env'});

const app = express();
app.use(cors())

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

const router = express.Router();

router.get('/', authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.redirect('/browse');
  }
  res.render('index', {
    user: req.user
  });
});

router.get('/browse', authController.isLoggedIn, (req, res) => {

  if( req.user ) {
    res.render('insidehomepage', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }
})

router.get('/register', authController.isLoggedIn, (req, res) => {
  if(req.user){
    res.redirect('/browse');
  }else{
  res.render('register');
  }
});

router.get('/login', authController.isLoggedIn, (req, res) => {
  if(req.user){
    res.redirect('/browse');
  }else{
    res.render('login');
  }
});

router.get('/profile', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('profile', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }
})

router.get('/movies', authController.isLoggedIn, (req, res) => {
  var sql = 'SELECT * FROM content WHERE type LIKE "%movie%"';
  if( req.user ) {
    db.query(sql, function (err,data,fields){
      if(err) throw err;
      res.render('movies',{title:'Movies',movies: data})
    });
  } else {
    res.redirect('/login');
  }
})

router.get('/series', authController.isLoggedIn, (req, res) => {
  var sql = 'SELECT * FROM content WHERE type LIKE "%series%"';
  if( req.user ) {
    db.query(sql, function (err,data,fields){
      if(err) throw err;
      res.render('series',{title:'Series',series: data})
    });
  } else {
    res.redirect('/login');
  }
})

router.get('/watch', authController.isLoggedIn, (req, res) => {
  var sql = 'SELECT * FROM content WHERE watch=1';
  if( req.user ) {
    db.query(sql, function (err,data,fields){
      if(err) throw err;
      res.render('watch',{title:'Watch',watch: data})
    });
  } else {
    res.redirect('/login');
  }
})

// Search Result
router.post('/result',function(req,res){
  var keyword = req.body.search;
  console.log(keyword);
  
  db.query(`SELECT * FROM content WHERE name LIKE "%${keyword}%" OR year LIKE "%${keyword}%" OR type LIKE "%${keyword}%" or genre LIKE "%${keyword}%"` ,function(err, data, fields) {
      if (err) throw err;
      console.log(data);
      res.render('searchresult',{title:'Result',result: data});
  });
});

//Movies
router.get('/rampage_2020', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('rampage', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }
})
router.get('/scream_2022', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('scream', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }
})
router.get('/eternal_2021', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('eternal', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }
})
router.get('/dontlookup_2021', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('dontlookup', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }
})
router.get('/spiderman_2021', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('spiderman', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }
})


module.exports = router;