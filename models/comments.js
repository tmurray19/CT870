var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./utils');


var commentSchema = new Schema ({
	user_name: {type: String},
	comment: {type: String},
	date_created: {type: Date, default: Date.now},
	up_votes: {type: Number, default: 0},
	down_votes: {type: Number, default: 0},
});

module.exports = mongoose.model('Comment', commentSchema);
