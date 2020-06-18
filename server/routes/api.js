const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const db = "mongodb+srv://Austin:austinpw@cluster0.p2ese.mongodb.net/moviedb?retryWrites=true&w=majority";
const bcrypt = require ('bcrypt');

mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true }, err => {
    if (err) {
        console.log('Error!' + err);
    } else {
        console.log('connected to mongodb');
    }
});

function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }

router.get('/', (req, res) => {
    res.send('this is the api route');
});

router.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
        let userData = req.body;
        let user = new User(userData);
        user.password = hash;
        user.save((error, registeredUser) => {
            if (error) {
                console.log(error);
            } else {
                let payload = {subject: registeredUser._id};
                let token = jwt.sign(payload, 'secretKey');
                res.status(200).send({token});
            }
        });
    });
});

router.post('/login', (req, res) => {
    let userData = req.body;

    User.findOne({email: userData.email}, (error, user) => {
        if (error) {
            console.log(error);
        } else {
            if(!user) {
                res.status(401).send('Invalid Email');
            } else {
                bcrypt.compare(req.body.password, user.password, function (err, result) {
                    if (result == false) {
                        res.status(401).send('Invalid Password');
                    } else {
                        let payload = {subject: user._id};
                        let token = jwt.sign(payload, 'secretKey');
                        res.status(200).send({token});
                    }
                });
            }
        }
    });
});

router.get('/movies', (req, res) => {
    let movies = [
        {
            "_id": "1",
            "name": "Iron Man",
            "description": "A superhero movie",
            "date": "05-15-2020"
        },
        {
            "_id": "2",
            "name": "Iron Man",
            "description": "A superhero movie",
            "date": "05-15-2020"
        },
        {
            "_id": "3",
            "name": "Iron Man",
            "description": "A superhero movie",
            "date": "05-15-2020"
        },
        {
            "_id": "4",
            "name": "Iron Man",
            "description": "A superhero movie",
            "date": "05-15-2020"
        },
        {
            "_id": "5",
            "name": "Iron Man",
            "description": "A superhero movie",
            "date": "05-15-2020"
        },
        {
            "_id": "6",
            "name": "Iron Man",
            "description": "A superhero movie",
            "date": "05-15-2020"
        }
    ];
    res.json(movies);
});

router.get('/paidmovies', verifyToken, (req, res) => {
    let movies = [
        {
            "_id": "1",
            "name": "Iron Man",
            "description": "A superhero movie",
            "date": "05-15-2020"
        },
        {
            "_id": "2",
            "name": "Spiderman",
            "description": "A superhero movie",
            "date": "05-15-2020"
        },
        {
            "_id": "3",
            "name": "Captain America",
            "description": "A superhero movie",
            "date": "05-15-2020"
        },
        {
            "_id": "4",
            "name": "Thor",
            "description": "A superhero movie",
            "date": "05-15-2020"
        },
        {
            "_id": "5",
            "name": "The Avengers",
            "description": "A superhero movie",
            "date": "05-15-2020"
        },
        {
            "_id": "6",
            "name": "Batman",
            "description": "A superhero movie",
            "date": "05-15-2020"
        }
    ];
    res.json(movies);
});

module.exports = router;