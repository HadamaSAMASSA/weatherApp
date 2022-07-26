var express = require('express');
var router = express.Router();
var userModel = require('../models/usersModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/sign-up', async function(req, res, next) {
  var searchUser = await userModel.findOne({
    email: req.body.emailFromFront
  }) 
  if(!searchUser) {
    var newUser = new userModel({
    username: req.body.usernameFromFront,
    email: req.body.emailFromFront,
    password: req.body.passwordFromFront
    });

    var newUserSave = await newUser.save();

    req.session.user = {
    name: newUserSave.username,
    _id: newUserSave.id
    }
    console.log(req.session.user)
    res.redirect('/weather');
  } else {
    console.log(`Email ${searchUser} already exist`)
    res.redirect('/');
  }
});

router.post('/sign-in', async function(req, res, next) {
  var searchUser = await userModel.findOne({
    email: req.body.emailFromFront,
    password: req.body.passwordFromFront
  });

  if(searchUser != null) {
    req.session.user = {
      name: searchUser.username,
      _id: searchUser.id
    }
    res.redirect('/weather');
  } else {
    res.render('/login');
  }
  res.redirect('/weather');
});

router.get('/logout', function(req, res, next) {
  req.session.user = null;
  res.redirect('/');
});

module.exports = router;
