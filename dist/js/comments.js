function showPost() {
	var username = $('#hiddenUsername').val();
	var postID = $('#hiddenPostID').val();

	$.get('/getPost', {postID: postID}, function (result) {
		if (result != null) {
			console.log(result);
			document.title = result.username+"'s Post";
			createPost(result);
			showComments(result.postID);
		}
	});
}

function createPost(result) {
	var sessionname = $('#hiddenSessionname').val();
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
	var video = document.createElement("video");
	var audio = document.createElement("audio");
	var deleteButton = document.createElement("button");

	$(post).attr('name', result.postID);
	$(footer).attr('name', result.postID);
	likes.id = "likes-num";
	likes.className = "likes-num";
	post.id = "post";
	feedbreak.id = "feed-break";
	content.id = "post-content";
	img.id = "post-image";
	img.src = result.contentPath;
	namediv.id = "post-user";
	namelink.href = "/profile/"+result.username;
	$(namelink).text(result.username);
	divider.id = "divider";
	description.id = "post-desc";
	footer.id = "footer";
	footerdivider.id = "divider";
	likeicon.id = "like-icon";
	likeicon.src = "../images/like-icon24.png";
	$(likes).text(result.likes.length);
	deleteButton.id = "delete-button";
	$(deleteButton).text("Delete");
	video.id = "post-video";
	video.src = result.contentPath;
	audio.id = "post-audio";
	audio.src = result.contentPath;
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
	if (result.type == 'image') {
		$(content).append(img);
	}
	else if (result.type == 'video') {
		$(content).append(video);
	}
	else if (result.type == 'audio') {
		$(content).append(audio);
	}

	$(namediv).append(namelink);
	$(description).append(result.description);
	$(footer).append(likeicon);

	if (sessionname == result.username) 
		$(footer).append(deleteButton);

	$(footer).append(likes);

	//Create Function for Like
	createOnClickEvent(likeicon, result.postID);

	if (sessionname == result.username)
		createDeleteEvent(deleteButton, result.postID);
}

function showComments(postID) {
	$.get('/getPostComments', {postID: postID}, function (results) {
		console.log(results);
		createComments(results);
	});
}

function createComments(results) {
	var sessionname = $('#hiddenSessionname').val();
	for (var x = 0; x < results.length; x++) {
		var commentContainer = document.createElement("div");
		var commentName = document.createElement("div");
		var commentHeader = document.createElement("div");
		var commentDivider = document.createElement("div");
		var commentContent = document.createElement("div");
		var commenterLink = document.createElement("a");
		var commentDelete = document.createElement("button");

		commentContainer.id = "comment-block";
		commentHeader.id = "commentHeader";
		commentDivider.id = "divider";
		commentName.id = "commentName";
		commentContent.id = "commentContent";
		commentDelete.id = "commentDelete";
		$(commentDelete).text("X");
		$(commenterLink).text(results[x].username);
		commenterLink.href = "/profile/"+results[x].username;

		$(post).append(commentContainer);
		$(commentContainer).append(commentHeader);
		$(commentHeader).append(commentName);

		if (sessionname == results[x].username)
			$(commentHeader).append(commentDelete);

		$(commentName).append(commenterLink);
		$(commentContainer).append(commentDivider);
		$(commentContainer).append(commentContent);
		$(commentContent).append(results[x].content);

		if (sessionname == results[x].username)
			createDeleteCommentEvent(commentDelete, results[x].postID, results[x].commentID);
	}

	var postID = $('#hiddenPostID').val();
	
	$('#formPostID').attr('value', postID);
	$('#commentsNum').attr('value', results.length);
	$('#formPostID').attr('hidden', true);
	$('#commentsNum').attr('hidden', true);

	createCommentArea(postID, results.length);
}

function createCommentArea(postID, length) {
	var commentArea = document.createElement("div");
	var commentForm = document.createElement("form");
	var commentFormLabel = document.createElement("label");
	var commentTextArea = document.createElement("textarea");
	var commentSubmit = document.createElement("input");
	var formPostID = document.createElement("input");
	var commentsNum = document.createElement("input");

	commentArea.id = "commentArea";
	commentForm.id = "commentForm";
	commentFormLabel.id = "label";
	commentSubmit.id = "commentSubmit";
	formPostID.id = "formPostID";
	commentsNum.id = "commentsNum";
	formPostID.name = "formPostID";
	commentsNum.name = "commentsNum";

	commentSubmit.type = "submit";
	commentTextArea.name = "commentAreaContent";
	commentTextArea.placeholder = "Enter your comment";
	commentForm.method = "post";
	commentForm.action = "/postComment";

	$(commentFormLabel).text("Comment: ");
	$(commentFormLabel).attr("for", "commentAreaContent");
	$(commentTextArea).attr("rows", "5");
	$(commentTextArea).attr("cols", "55");

	$(post).append(commentArea);
	$(commentArea).append(commentForm);
	$(commentForm).append(commentFormLabel);
	$(commentForm).append(commentTextArea);
	$(commentForm).append(commentSubmit);
	$(commentForm).append(formPostID);
	$(commentForm).append(commentsNum);

	$(formPostID).attr('value', postID);
	$(commentsNum).attr('value', length);
	$(formPostID).attr('hidden', true);
	$(commentsNum).attr('hidden', true);
}

function createOnClickEvent(icon, postID) {
	icon.onclick = function() {
		$.post('//'+postID, function (result) {
			var numLikes = $('#likes-num').text();
			if (result) {
				numLikes++;
				icon.src = "../images/liked-icon24.png";
				$('#likes-num').text(numLikes);
			}
			else {
				icon.src = "../images/liked-icon24.png";
				$('#likes-num').text(numLikes);
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

function createDeleteCommentEvent(button, postID, commentID) {
	button.onclick = function() {
		if (confirm("Are you sure you want to delete your comment?")) {
			$.post('/deleteComment/'+postID+'/'+commentID, function (result) {
				if (result) {
					alert('Comment successfully deleted.');
					window.location.href = window.location.href;
				}
				else {
					alert('Comment was unable to be deleted.');
					window.location.href = window.location.href;
				}
			});
		}
	}
}