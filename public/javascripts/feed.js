$(document).ready(function(){
	var totalChars = 280;
	$("#inputPost").keyup(function (event) {
		var inputText = event.target.value;
		$("#charRemaining").html(totalChars - inputText.length);
	});


	function getComments(){
		$.ajax({
			url:'/getComments/',
			type: 'GET',
			success: function(results) {
				var posts = "";
				results.forEach(function(item){	
					//posts += ("<br>" + item.user_name + "<br>" + item.comment + "<br>" + item.date_created + "<br>" + item.up_votes + "<hr>");
					posts += "<div class='row justify-content-md-center pt-4'> <div class='card col-md-6'> <div class='row'> <div class='col-md-9'> By: "+ item.user_name + "<br>" + item.comment + "<br>Up votes: " + item.up_votes+ "</div> <div class='col-md-3'> <button type='button' id='del' name='delete " + item._id + "' class='btn btn-danger'>Delete</button><button type ='button' id='like' name='like " + item._id + "' class = 'btn btn-danger'>Like</button></div></div></div></div>";
				});
				$("#feedPosts").html(posts);
			}
		});
	}

	setInterval(getComments, 5000);

	$("#postBtn").click(function (event){
		$.ajax({
			url: '/addComment/',
			type: 'POST',
			data: {user_name:$('#inputName').val(), comment:$('#inputPost').val()},
			success: function(data) {
				getComments();
			}
		});
	});

	$("#feedPosts").click(function (event){
		var targetArray = event.target.name.split(" ");
		console.log(event.target.name);
		if (targetArray[0] == "delete"){
			// Call delete API on comment
			var id = targetArray[1];
			$.ajax({
				url:'/deleteComment/' + id,
				type: 'DELETE',
				success: function(data){
					getComments();
				}
			});
		}
		else if(targetArray[0] == "like"){
			var id = targetArray[1];
			$.ajax({
				url:'/upvoteComment/' + id,
				type: 'PUT',
				success: function(data){
					getComments();
				}
			});
		}
	});

});

