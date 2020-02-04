
// Comment section
// Name: Taidgh Murray
// ID: 15315901
// In the html, onClick sends request to comment function
// Adds comment to comment array
// Comments need to be held as array of objects
//

// Creating array to hold comment objects
// I assume you don't want us messing around with the mongoDB to store the comments properly yet

var comment_array = [];

// global totalLikes button 

var total_likes = 0;

var comments_since_refresh=0;


// Commenter ID, increment each time function is called
var comment_id = 0;

// Function for calculating time difference between timestamp recorded and current time
function time_difference(timestamp){
	// Get current time
	var current_time = Date.now();
	// Get difference between two times
	// We divide by 1000 to convert miliseconds to seconds
	// Math.round is for a nice printout
	var diff = Math.round((current_time/1000) - (timestamp/1000));
	// Change this value to the proper string
	var time_post;
	var diff_min;
	var diff_hr;
	// If the difference is 60 seconds or smaller
	if(diff <= 60 ){
		// The time post will be seconds in differencme
		time_post = `(${diff}s ago)`;
	}
	// The time post will be minutes in difference
	else if(diff > 60 && diff <= 3600){
		// Divide diff (which is in seconds)
		// Into minutes and return value
		var diff_min = Math.round(diff/60);
		time_post = `(${diff_min}m ago)`;
	}
	// Time post will be hours in difference
	else if(diff > 3600){
		var diff_hr = Math.round(diff/3600);
		time_post = `(${diff_hr}h ago)`;
	}
	// Catch all in case something goes wrong
	else{
		time_post = `>1 Day ago`;
	}
	return time_post + "</h6><br>";
}

// Shows all the comments in the array
function show_comment(){
	// If user requests to see empty comment section
	// Tess user no comments have been found
	
	var comment_len = comment_array.length;

	// Empty list means no comments
	if(comment_len == 0){
		document.getElementById('no-comments').innerHTML = "No comments found. Uncool :(";
	}
	else{
		// Clear out any elements
		document.getElementById('no-comments').innerHTML = "";
		document.getElementById('update-text').innerHTML = "";
		comments_since_refresh = 0;
		document.getElementById('comments').innerHTML = "";
		// Initialise values
		var comment_handle;
		var format_date;
		var current_timestamp;
		var comment_likes;
		var like_button;
		var comment_id;
		var id;
		// For each item in the array
		for(var i=0; i < comment_array.length; i++){
			//
			// All the values use backtick strings to format the data
			id = comment_array[i].id
			comment_id = `<h6>#${id + 1}</h6><br>`;
			
			console.log(comment_array[i].handle);
			// Set comment handle as a string with h4 tag
			comment_handle = `<h5>Posted by: <strong>${comment_array[i].handle}</strong></h5><br>`;

			// Body has h5 tag
			console.log(comment_array[i].comment);
			comment_body = `<h5>${comment_array[i].comment}</h6><br>`;
			
			console.log(comment_array[i].datetime);
			// Format the date to be human readable
			format_date = new Date(comment_array[i].datetime).toString();
			// Have both post time and time since comment was posted
			comment_timestamp = `<h6>Posted on ${format_date} ` + time_difference(comment_array[i].datetime);
			
			// Show current likes on this comment
			console.log(comment_array[i].likes);
			comment_likes = `<h6>Likes: <strong id='likes_for_comment_${id}'>${comment_array[i].likes}</strong></h6><br>`;
			
			// Add a button that calls the increment like function
			
			like_button = `<button type='button' class='btn btn-dark' onClick='like_incrementer(${id})'>Like</button><br>`

			console.log(Date(comment_array[i].datetime).toString());

			// Create the post string
			// Create it as a div with a bootstrap container
			post = "<div class='container float-left'><hr>" + comment_id + comment_handle + comment_body + comment_timestamp + comment_likes + like_button + "</div>";
			
			document.getElementById('comments').innerHTML += post;
		};
	}
}

// Turns handle and body into an object
// We get the username and body by
// document.GetElementById([input_id])
// We could also design a restful webservice and create a form 
// Then turn this into a POST request
function add_comment(username, body){
	

	// Creating comment data objec
	// stores username, comment body, and post time
	// Initialise likes for each comment
	comment_data = {
		id: comment_id,
		handle: username, 
		comment: body, 
		datetime: Date.now(), 
		likes: 0
	};
	comment_id++;
	
	// push comment data to comment array
	// We want to have the oldest comment at the bottom of the lis
	// And the newest comment at the start
	// So we insert the item at the start of the list instead 
	comment_array.unshift(comment_data);

	comments_since_refresh++;
	// let user know that there is a new comment available
	document.getElementById('no-comments').innerHTML = '';
	document.getElementById('update-text').innerHTML= `${comments_since_refresh} new comment(s)!`;

	// Clearing current document elements for new comment
	document.getElementById('comment-handle').value= "";
	document.getElementById('comment-body').value= "";	
}


function like_incrementer(comment_number){
	
	//console.log(comment_array[i].likes);
	//comment_likes = `<h6>Likes: <strong id='likes_for_comment_${i}'>${comment_array[i].likes}</strong></h6><br>`;

	// We need to find the comment in the array with the correct ID like so
	var liked_comment = comment_array.find(comment => comment.id == comment_number);

	// Increment it
	liked_comment.likes += 1;

	// Show the incrmeent
	document.getElementById(`likes_for_comment_${comment_number}`).innerHTML = liked_comment.likes;	
	// Increment likes by one globally
	total_likes++;
	alert(`Total likes, globally: ${total_likes}`);

}
