function showResults() {
	var type = $('#search_type').val();
	var searchQuery = $('#search_query').val();
	console.log(type+" "+query);
	$('#feed').empty();

	var query = {
		type: type,
		query: searchQuery
	}

	$.get('/getResults', query, function (results) {
		if (results != null) {
			console.log(results);
			createResults(results, type);
		}
		else {
			console.log(results);
			createResults(results, type);
		}
	});
}

function createResults(results, type) {
	var sessionname = $('#hiddenUsername').val();
	console.log(results.length);
	var numResults = results.length;
	numResults--;
	console.log(numResults);

	if (results.length == 0 || results == null) {
		var div = document.createElement("div");
		var text = document.createElement("h1");
		var container = document.getElementById("feed");

		$(text).text("No Results found!");
		text.id = "errormsg";
		div.style.margin = "auto";
		div.id = "errormsg_div";

		div.append(text);
		container.append(div);
	}
	else if (type == 'post') {
		for (var i = numResults; i >= 0; i--) {
			var post = document.createElement("div");
			var feedbreak = document.createElement("div");
			var container = document.getElementById("feed");
			var content = document.createElement("div");
			var img = document.createElement("img");
			var namediv = document.createElement("div");
			var divider = document.createElement("div");
			var description = document.createElement("div");
			var namelink = document.createElement("a");
			var likeicon = document.createElement("img");
			var footerdivider = document.createElement("div");
			var footer = document.createElement("div");
			var likes = document.createElement("p");
			var commentlink = document.createElement("a");
			var commentButton = document.createElement("button");
			var video = document.createElement("video");
			var audio = document.createElement("audio");
			var deleteButton = document.createElement("button");

			// Assigning IDs
			likes.id = "likes-num"+i;
			likes.className = "likes-num";
			post.id = "post";
			$(post).attr('name', results[i].postID);
			$(footer).attr('name', results[i].postID);
			feedbreak.id = "feed-break";
			content.id = "post-content";
			img.id = "post-image";
			namediv.id = "post-user";
			img.src = results[i].contentPath;
			divider.id = "divider";
			description.id = "post-desc";
			footer.id = "footer";
			footerdivider.id = "divider";
			likeicon.id = "like-icon";
			commentButton.id = "comment-button";
			video.id = "post-video";
			video.src = results[i].contentPath;
			audio.id = "post-audio";
			audio.src = results[i].contentPath;
			deleteButton.id = "delete-button";

			// Assigning Attributes
			namelink.href = "/profile/"+results[i].username;
			commentlink.href = "/comment/"+results[i].postID;
			likeicon.src = "../images/like-icon24.png";
			$(namelink).text(results[i].username);

			$(likes).text(results[i].likes.length);
			$(likes).attr('value', results[i].likes.length);
			$(commentButton).text("Comment...");
			$(deleteButton).text("Delete");
			$(video).attr('controls', true);
			$(audio).attr('controls', true);

			// Append Post Divs
			$(container).append(post);
			$(container).append(feedbreak);
			$(post).append(content);
			$(post).append(namediv);
			$(post).append(divider);
			$(post).append(description);
			$(post).append(footerdivider);
			$(post).append(footer);

			//Append Actual Content
			if (results[i].type == 'image') {
				$(content).append(img);
			}
			else if (results[i].type == 'video') {
				$(content).append(video);
			}
			else if (results[i].type == 'audio') {
				$(content).append(audio);
			}

			$(namediv).append(namelink);
			$(description).append(results[i].description);
			$(footer).append(likeicon);
			$(footer).append(likes);
			$(footer).append(commentlink);

			if (sessionname == results[i].username) 
				$(footer).append(deleteButton);

			$(commentlink).append(commentButton);

			//Create Function for Like
			createOnClickEvent(likeicon, results[i].postID, i);

			if (sessionname == results[i].username)
				createDeleteEvent(deleteButton, results[i].postID);
		}
	}
	else if (type == 'user') {
		for (var x = 0; x <= numResults; x++) {
			var userContainer = document.createElement("div");
			var userAvatar = document.createElement("div");
			var userImg = document.createElement("img");
			var userDisplay = document.createElement("div");
			var userFullname = document.createElement("div");
			var userLink = document.createElement("a");
			var userDivider = document.createElement("div");
			var userFooter = document.createElement("div");
			var userPosts = document.createElement("div");
			var userFollowers = document.createElement("div");

			userContainer.id = "user-block";
			userAvatar.id = "avatar";
			userDisplay.id = "user-username";
			userFullname.id = "user-fullname";
			userImg.id = "avatar-img";
			userDivider.id = "divider";
			userFooter.id = "user-footer";
			userPosts.id = "user-posts";
			userFollowers.id = "user-followers";

			userImg.src = results[x].avatar;
			userLink.href = "/profile/"+results[x].username;
			$(userLink).text(results[x].username);
			$(userFullname).text(results[x].firstName+" "+results[x].lastName);
			$(userPosts).text("Posts: "+results[x].numPosts);
			$(userFollowers).text("Followers: "+results[x].followers);

			$(feed).append(userContainer);
			$(userContainer).append(userAvatar);
			$(userAvatar).append(userImg);
			$(userContainer).append(userDivider);
			$(userContainer).append(userDisplay);
			$(userDisplay).append(userLink);
			$(userDisplay).append(userFullname);
			$(userContainer).append(userDivider);
			$(userContainer).append(userFooter);
			$(userFooter).append(userPosts);
			$(userFooter).append(userFollowers);

		}
	}
	else if (type == 'comment') {
		for (var x = numResults; x >= 0; x--) {
			var commentContainer = document.createElement("div");
			var commentName = document.createElement("div");
			var commentDivider = document.createElement("div");
			var commentContent = document.createElement("div");
			var commenterLink = document.createElement("a");
			var postLink = document.createElement("a");

			commentContainer.id = "comment-block";
			commentDivider.id = "divider";
			commentName.id = "commentName";
			commentContent.id = "commentContent";
			postLink.id = "postLink";
			$(commenterLink).text(results[x].username);
			$(postLink).text(results[x].postID);
			commenterLink.href = "/profile/"+results[x].username;
			postLink.href = "/comment/"+results[x].postID;

			$(feed).append(commentContainer);
			$(commentContainer).append(commentName);
			$(commentName).append(commenterLink);
			$(commentName).append(postLink);
			$(commentContainer).append(commentDivider);
			$(commentContainer).append(commentContent);
			$(commentContent).append(results[x].content);
		}
	}
	else if (type == 'tabs') {
		for (var i = numResults; i >= 0; i--) {
			var container = document.getElementById("feed");
			var feedbreak = document.createElement("div");
			var tabs_block = document.createElement("div");
			var tabs_name = document.createElement("a");
			var tabs_instrument = document.createElement("div");
			var divider = document.createElement("div");

			// Assigning IDs
			tabs_block.id = "tabs_block";
			tabs_name.id = "tabs_name";
			tabs_instrument.id = "tabs_instrument";
			divider.id = "divider";
			feedbreak.id = "feed-break";

			tabs_name.href = "/tabs/"+results[i].URL;

			$(tabs_name).text(results[i].tabsName);
			$(tabs_instrument).text(results[i].tabsInstrument);

			// Append Post Divs
			$(container).append(tabs_block);
			$(container).append(feedbreak);
			$(tabs_block).append(tabs_name);
			$(tabs_block).append(divider);
			$(tabs_block).append(tabs_instrument);
		}
	}
}


function createOnClickEvent(icon, postID, index) {
	icon.onclick = function() {
		$.post('/postLike/'+postID, function (result) {
			var numLikes = $('#likes-num'+index).text();
			if (result) {
				numLikes++;
				icon.src = "../images/liked-icon24.png";
				$('#likes-num'+index).text(numLikes);
			}
			else {
				icon.src = "../images/liked-icon24.png";
				$('#likes-num'+index).text(numLikes);
			}
		});
	}
}

function createDeleteEvent(button, postID) {
	button.onclick = function() {
		if (confirm("Are you sure you want to delete your post?")) {
			$.post('/deletePost/'+postID, function (result) {
				if (result) {
					alert('Post successfully deleted.');
					window.location.href = window.location.href;
				}
				else {
					alert('Post was unable to be deleted.');
					window.location.href = window.location.href;
				}
			});
		}
	}
}