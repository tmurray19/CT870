var mongoose = require('mongoose');
// The mongoDB credentials here should be changed, this is just for academic purpose, and the account has likely been deleted by now
var connection = mongoose.connect('mongodb://mongodb4983mt:ra(3-2)(pot)@danu(5+2).it.nuigalway.ie:(8717)/mongodb4983', {useNewUrlParser: true, useUnifiedTopology: true});

exports.connection = connection;
