var mongoose = require('mongoose');

var citySchema = new mongoose.Schema({
    name: String,
    desc: String,
    img: String,
    temp_min: Number,
    temp_max: Number,
    lon: Number,
    lat: Number,
    // notorious: String
})

var cityModel = mongoose.model('cities', citySchema)

module.exports = cityModel;