var express = require('express');
var router = express.Router();
var add = require('./add');
var validator = require('validator');
var Comment = require('../models/comments');

// Installing sanatizer for mongoDB objects
// I want users to input more than just letters and numbers
// But not so much they can perform inejction attacks
var sanitiser = require('mongo-sanitize');

router.get('/add', function(req, res, next) {
	var sum = add(2, 2);
	res.status(200).send("The sum is " + sum);
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Club Cool' });
});


/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('aboutUs');
});

router.get('/feed', function(req, res, next){
  res.render('feed');
});


/*
 *
 * ASSIGNMENT 3
 * FOUND BELOW
 *
 *
*/


//Assignment 3 - API requests - writes function
// Returs json data with version item
router.get('/version', function(req, res, next){
	res.json({'Version': '0.4.2b'});
});



//Assignmnet 4 - API requests - for commment data
router.post('/send_comment', function(req, res, next){
	// Im taking all these values from the comment section function I created earlier
	// We will be able to get the other bits of info from the comment section
	var comment_name = req.body.handle;
	var comment_body = req.body.comment;
	var validator_status = 'Error occured, comment data not valid.'
	// If both values input by the user are alphanumeric, then change status to Successful
	if((validator.isAlphanumeric(comment_name)) && (validator.isAlphanumeric(comment_body))){
		// Could also use boolean values
		validator_status = 'Successful'
	}
	
	// Return the json data 
	res.json({
		'Status': validator_status,
		'comment_name': validator.isAlphanumeric(comment_name),
		'comment_body': validator.isAlphanumeric(comment_body),
		'name': comment_name,
		'body': comment_body
	});
});

/*
 *
 * Assignmnet 4
 * Attempt Below
 *
 */


// API Post request for adding a comment
router.post('/addComment', function(req, res, next){
	// Sanatising inputs
	var comment_name = req.body.user_name;
	console.log(comment_name);
	var comment_body = sanitiser(req.body.comment.toString());
	console.log(comment_body);
	var validator_status = false;

	console.log(validator.isAlphanumeric(comment_name));
	console.log(validator.isAscii(comment_body));
	
	// I'm showing off two different types
	// AlphaNumeric for the name
	// And Ascii for the body
	// I won't want special characters in the comment
	// But more than just letters and numbers
	if((validator.isAscii(comment_name)) && (validator.isAscii(comment_body))){
		// Could also use boolean values
		validator_status = true;
	}
	
	// Extract the request body which contains the comments
	comment = new Comment(req.body);
	// Create a save function
	// If the inputs are valid
	if(validator_status){
		comment.save(function (err, savedComment){
			// Throw an error back if it occurs
			if(err)
				throw err;
			// Otherwise, we can safely return json data
			res.json({
				"comment_body": savedComment.comment,
				"id": savedComment._id
			});
		});
	}else{
		// Return an error 
		res.json({
			"Error": "Comment handle or body has invalid data"
		});
	};
});


// API Get request for retrieving comments
// Limit comments to 10
// Sort by date descending, most recent first (1)
router.get('/getComments', function(req, res, next){
	Comment.find({}, function (err, comments){
		if (err)
			res.send(err);
		res.json(comments);
	}).sort({"date_created": -1}).limit(10);
});

// API Put request for updating a given comment, given id
router.put('/updateComment/:id', function(req, res, next){
	// get id from request parameters
	var comment_id = req.params.id;
	var updated_comment_body = req.body.comment;
	// Find the comment by its id
	Comment.findById(comment_id, function(err, c){
		if (!c)
			// Return that comment doesn't exist
			res.json({"Status": "Comment not found"});
		else{
			// Otherwise set comment as updated body
			c.comment = updated_comment_body;
			// Save the updated comment
			c.save(function(err){
				if (err)
					res.send(err);
				res.json({"Status": "Updated"});
			});
		}
	});
});

// API Delete request 
router.delete('/deleteComment/:id', function(req, res, next){

	// get id from request parameters
	var comment_id = req.params.id;
	// Find the comment by its id
	Comment.findById(comment_id, function(err, c){
		if (!c)
			// Return that comment doesn't exist
			res.json({"Status": "Comment not found"});
		else{
			// Removes the comment from the database
			c.remove(function(err){
				// Error handling
				if (err)
					res.send(err);
				res.json({"Status": "Removed"});
			});
		}
	});
});

router.put('/upvoteComment/:id',  function(req, res, next){
	comment_id = req.params.id;
	Comment.findById(comment_id, function(err, c){
		if (!c)
			res.json({"Status": "Comment not found"});
		else{
			c.up_votes += 1;
			c.save(function(err){
				if (err)
					res.send(err);		
				res.json({"Status": "Updated"});
			});
		}
	});
});

//  For returning json data - in class example
router.get('/vehicles', function(req, res, next) {
	console.log(req.query.name);
	var name = req.query.name;
	console.log(name);
	john_cars = {
		"Car1": {
			"Make": "Ford",
			"Model": "Fiesta",
			"Year": 2006
		},
		"Car2:": {
			"Make": "Subaru",
			"Model": "Car",
			"Year": 2008
		}

	};
	mary_cars = {
		"Car1":{
			"Make": "Tesla",
			"Model": "X",
			"Year": 2018
		},
		"Car2":{
			"Make": "Honda",
			"Model": "B",
			"Year": 2014
		},
		"Car3":{
			"Make": "Mazda",
			"Model": "Hydra",
			"Year": 2009
		}
	};
	if(name=="mary"){
		res.json({
			"Requestee": "Mary",
			"Data": mary_cars,
			"Date": new Date().toLocaleDateString("en-US")
		});
	}
	if(name=="john"){
		res.json({
			"Requestee": "John",
			"Data": john_cars,
			"Date": new Date().toLocaleDateString("en-US")
		});
	}
	else{
		res.json({"Error": "Unknown requestee"});
	}
});

// For posting json data to 
router.post('/post_vehicle', function(req, res, next) {
	console.log(req.query.name);
	var name = req.body.name;
	console.log(name);
	res.json({
		"Requestee": name,
		"Data": "None",
		"Date": new Date().toLocaleDateString("en-US")
	});
});

// For checking validity of input 
router.post('/checker', function(req, res, next){
	var email = req.body.email;
	console.log(email);
	//res.status(200).send(validator.isEmail(req.body.email));
	res.json({"status": validator.isEmail(req.body.email)});
});

module.exports = router;
