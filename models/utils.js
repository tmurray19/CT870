var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://mongodb4983mt:ra1pot@danu7.it.nuigalway.ie:8717/mongodb4983', {useNewUrlParser: true, useUnifiedTopology: true});

exports.connection = connection;
