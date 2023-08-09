const db = require ('./models/mysqldb.js');

async function addData() {
	var comment = {
		commentID: '1000100411',
		commenterID: 1000,
		postID: '10041',
		username: 'migsbb',
		content: 'lol', 
		isDeleted: 0
	};
	
	var query = "INSERT INTO `comment` (commentID, commenterID, postID, username, content, isDeleted) values ('" +  comment.commentID + "', '" +  comment.commenterID + "', '" +  comment.postID + "', '" +  comment.username + "', '" +  comment.content + "', '" +  comment.isDeleted + "');";
		
	await db.query(query)
	
	var comment = {
		commentID: '1002100311',
		commenterID: 1002,
		postID: '10031',
		username: 'iceice',
		content: 'hey thats pretty nice', 
		isDeleted: 0
	};
	
	var query = "INSERT INTO `comment` (commentID, commenterID, postID, username, content, isDeleted) values ('" +  comment.commentID + "', '" +  comment.commenterID + "', '" +  comment.postID + "', '" +  comment.username + "', '" +  comment.content + "', '" +  comment.isDeleted + "');";
		
	await db.query(query)
	
	var comment = {
		commentID: '1005100411',
		commenterID: 1005,
		postID: '10041',
		username: 'dmitrilover',
		content: 'Looks like Dmitri', 
		isDeleted: 0
	};
	
	var query = "INSERT INTO `comment` (commentID, commenterID, postID, username, content, isDeleted) values ('" +  comment.commentID + "', '" +  comment.commenterID + "', '" +  comment.postID + "', '" +  comment.username + "', '" +  comment.content + "', '" +  comment.isDeleted + "');";
		
	await db.query(query)
	
	var comment = {
		commentID: '1005100412',
		commenterID: 1005,
		postID: '10041',
		username: 'dmitrilover',
		content: 'Wait no', 
		isDeleted: 0
	};
	
	var query = "INSERT INTO `comment` (commentID, commenterID, postID, username, content, isDeleted) values ('" +  comment.commentID + "', '" +  comment.commenterID + "', '" +  comment.postID + "', '" +  comment.username + "', '" +  comment.content + "', '" +  comment.isDeleted + "');";
		
	await db.query(query)
	
	var comment = {
		commentID: '1005100413',
		commenterID: 1005,
		postID: '10041',
		username: 'dmitrilover',
		content: 'But maybe', 
		isDeleted: 0
	};
	
	var query = "INSERT INTO `comment` (commentID, commenterID, postID, username, content, isDeleted) values ('" +  comment.commentID + "', '" +  comment.commenterID + "', '" +  comment.postID + "', '" +  comment.username + "', '" +  comment.content + "', '" +  comment.isDeleted + "');";
		
	await db.query(query)
}

addData();