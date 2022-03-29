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

//SEARCH
router.get('/userslist/:id', function (req, res) {
    let user_id = req.params.id;

    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user id.' });
    }

    db.query('SELECT * FROM users where id=?', user_id, function (error, results) {
    if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'User retrieved' });
    });
});

router.get('/movieslist/:id', function (req, res) {
    let movie_id = req.params.id;

    if (!movie_id) {
        return res.status(400).send({ error: true, message: 'Please provide movie id.' });
    }

    db.query('SELECT * FROM content where id=?', movie_id, function (error, results) {
    if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Movies retrieved' });
    });
});

//VIEW
router.get('/userslist',function(req,res){
    db.query("SELECT * FROM users",function (error,results){
        if (error)
            return res.send({
                error : true,
                message: "List of users is not found"
            });
        return res.send({error: false,data: results, message: "Users list."});
    })
});

router.get('/movieslist',function(req,res){
    db.query("SELECT * FROM content",function (error,results){
        if (error)
            return res.send({
                error : true,
                message: "List of movies is not found"
            });
        return res.send({error: false,data: results, message: "Movies list."});
    })
});

//INSERT
/*
{
    "users_info" : {
        "id": 2,
        "name": "Nitit",
        "email": "Nitit.Ngam@hotmail.com",
        "password": "1101587"
    }
}
{
    "movies_info" : {
        "id": 44,
        "name": "avatar",
        "year": 2008,
        "image": "https://i.imgur.com/K8mgJYG.jpg",
        "genre": "drama crime thriller",
        "series": 0,
        "movie": 1,
        "watch": 0,
        "link" : null
    }
}
*/
router.post('/userslist', function (req, res) {

    let users_info = req.body.users_info;
    console.log(users_info);
    
    if (!users_info) {
        return res.status(400).send({ error: true, message: 'Please provide users information' });
    }
    db.query("INSERT INTO users SET ? ", users_info, function (error, results) {
    if (error) throw error;
    return res.send({error: false, data: results.affectedRows, message: 'New users has been created successfully.'
        });
    })
});

router.post('/movieslist', function (req, res) {

    let movies_info = req.body.movies_info;
    console.log(movies_info);
    
    if (!movies_info) {
        return res.status(400).send({ error: true, message: 'Please provide movie information' });
    }
    db.query("INSERT INTO content SET ? ", movies_info, function (error, results) {
    if (error) throw error;
    return res.send({error: false, data: results.affectedRows, message: 'New movies has been created successfully.'
        });
    })
});

//UPDATE
/*
{
    "users_info" : {
        "id": 2,
        "name": "Warat",
        "email": "Nitit.Ngam@hotmail.com",
        "password": "1101588"
    }
}
{
    "movies_info" : {
        "id": 44,
        "name": "Fishman",
        "year": 2009,
        "image": "https://i.imgur.com/K8mgJYG.jpg",
        "genre": "drama crime thriller",
        "series": 0,
        "movie": 1,
        "watch": 0,
        "link" : null
    }
}
*/
router.put('/userslist/', function (req, res) {
    let userID = req.body.users_info.id;
    let users_info = req.body.users_info;
    
    if (!userID || !users_info) {
        return res.status(400).send({ error: users_info, message: 'Please provide user information' });
    }
    db.query("UPDATE users SET ? WHERE id = ?", [users_info, userID], function (error,results) {
    if (error) throw error;
        return res.send({error: false, data: results.affectedRows, message: 'User has been updated successfully.'})
    });
});
router.put('/movieslist/', function (req, res) {
    let movieID = req.body.movies_info.id;
    let movies_info = req.body.movies_info;
    
    if (!movieID || !movies_info) {
        return res.status(400).send({ error: movies_info, message: 'Please provide movie information' });
    }
    db.query("UPDATE content SET ? WHERE id = ?", [movies_info, movieID], function (error,results) {
    if (error) throw error;
        return res.send({error: false, data: results.affectedRows, message: 'Movie has been updated successfully.'})
    });
});

//DELETE
/*
{
    "userID": 2
}
{
    "movieID": 44
}
*/
router.delete('/userslist/', function (req, res) {
    let userID = req.body.userID;

    if (!userID) {
        return res.status(400).send({ error: true, message: 'Please provide user_ID' });
    }

    db.query('DELETE FROM users WHERE id = ?', [userID], function (error, results){
    if (error) throw error;
        return res.send({ error: false, data: results.affectedRows, message: 'Users has been deleted successfully.' });
    });
});
router.delete('/movieslist/', function (req, res) {
    let movieID = req.body.movieID;

    if (!movieID) {
        return res.status(400).send({ error: true, message: 'Please provide movieID' });
    }

    db.query('DELETE FROM content WHERE id = ?', [movieID], function (error, results){
    if (error) throw error;
        return res.send({ error: false, data: results.affectedRows, message: 'Content has been deleted successfully.' });
    });
});

module.exports = router;