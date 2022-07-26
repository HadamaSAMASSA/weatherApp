var express = require('express');
var router = express.Router();
var request = require('sync-request');
var cityModel = require('../models/citiesModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/weather', async function(req, res, next){
  if(req.session.user == null) {
    res.redirect('/login')
  } else {
    var cityList = await cityModel.find();
  
    res.render('weather', {cityList});
  }

});

router.post('/add-city', async function(req, res, next){
// console.log('la bonne route')
  var data = request('GET', `https://api.openweathermap.org/data/2.5/weather?q=${req.body.newcity}&lang=fr&units=metric&appid=8f76990c5368a70c6f05107b08f17125`)
  var dataApi = JSON.parse(data.body);

  var alreadyExist = await cityModel.findOne({
    name: req.body.newcity.toLowerCase()
  });

  if(alreadyExist == null && dataApi.name){
    var newCity = new cityModel({
      name: req.body.newcity,
      desc: dataApi.weather[0].description,
      img: "http://openweathermap.org/img/wn/"+dataApi.weather[0].icon+".png",
      temp_min: dataApi.main.temp_min,
      temp_max: dataApi.main.temp_max,
      lon: dataApi.coord.lon,
      lat: dataApi.coord.lat,
      // notorious: dataApi.

    // cityList.push({
    //   name: req.body.newcity,
    //   desc: dataApi.weather[0].description,
    //   img: "http://openweathermap.org/img/wn/"+dataApi.weather[0].icon+".png",
    // })
    });

    await newCity.save();
  };
  
  cityList = await cityModel.find();

  res.render('weather', {cityList});
});

router.get('/delete-city', async function(req, res, next){

  await cityModel.deleteOne({
    _id: req.query.id
  });

  var cityList = await cityModel.find();

  res.render('weather', {cityList})
});

router.get('/update-cities', async function(req, res, next) {
  var cityList = await cityModel.find();

  for(var i = 0; i < cityList.length; i++) {
    var data = request('GET', `https://api.openweathermap.org/data/2.5/weather?q=${cityList[i].name}&lang=fr&units=metric&appid=8f76990c5368a70c6f05107b08f17125`)
    var dataApi = JSON.parse(data.body);

    await cityModel.updateOne({
      _id: cityList[i].id
    },{
        name: cityList[i].name,
        desc: dataApi.weather[0].description,
        img: "http://openweathermap.org/img/wn/"+dataApi.weather[0].icon+".png",
        temp_min: dataApi.main.temp_min,
        temp_max: dataApi.main.temp_max
      },
    )
  };

  var cityList = await cityModel.find();

  res.render('weather', {cityList});
});

module.exports = router;
