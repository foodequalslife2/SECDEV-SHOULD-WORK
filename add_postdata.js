const db = require ('./models/mysqldb.js');

async function addData() {
	var post = {
		postID: '10001',
		posterID: 1000,
		username: 'migsbb',
		type: 'image',
		contentPath: '../images/posts/10001.jpg',
		description: 'test',
		likes: 0,
		isDeleted: false
	};
	
	var query = "INSERT INTO `post` (postID, posterID, username, type, contentPath, description, likes, isDeleted) values ('" + post.postID + "', '" + post.posterID + "', '" + post.username + "', '" + post.type + "', '" + post.contentPath + "', '" + post.description + "', '" + post.likes + "', '" + "0" + "');";
		
	await db.query(query)
	
	var post = {
		postID: '10002',
		posterID: 1000,
		username: 'migsbb',
		type: 'image',
		contentPath: '../images/posts/10002.jpg',
		description: 'longer test',
		likes: 0,
		isDeleted: false
	};
	
	var query = "INSERT INTO `post` (postID, posterID, username, type, contentPath, description, likes, isDeleted) values ('" + post.postID + "', '" + post.posterID + "', '" + post.username + "', '" + post.type + "', '" + post.contentPath + "', '" + post.description + "', '" + post.likes + "', '" + "0" + "');";
		
	await db.query(query)
	
	var post = {
		postID: '10021',
		posterID: 1002,
		username: 'iceice',
		type: 'audio',
		contentPath: '../audio/posts/10021.mp3',
		description: 'much longer test',
		likes: 0,
		isDeleted: false
	};
	
	var query = "INSERT INTO `post` (postID, posterID, username, type, contentPath, description, likes, isDeleted) values ('" + post.postID + "', '" + post.posterID + "', '" + post.username + "', '" + post.type + "', '" + post.contentPath + "', '" + post.description + "', '" + post.likes + "', '" + "0" + "');";
		
	await db.query(query)
	
	var post = {
		postID: '10031',
		posterID: 1003,
		username: 'heyimia',
		type: 'video',
		contentPath: '../videos/posts/10031.mp4',
		description: 'much longer test',
		likes: 0,
		isDeleted: false
	};
	
	var query = "INSERT INTO `post` (postID, posterID, username, type, contentPath, description, likes, isDeleted) values ('" + post.postID + "', '" + post.posterID + "', '" + post.username + "', '" + post.type + "', '" + post.contentPath + "', '" + post.description + "', '" + post.likes + "', '" + "0" + "');";
		
	await db.query(query)
	
	var post = {
		postID: '10041',
		posterID: 1004,
		username: 'notgohan',
		type: 'video',
		contentPath: '../videos/posts/10041.mp4',
		description: 'much longerest test description for testing purposes',
		likes: 0,
		isDeleted: false
	};
	
	var query = "INSERT INTO `post` (postID, posterID, username, type, contentPath, description, likes, isDeleted) values ('" + post.postID + "', '" + post.posterID + "', '" + post.username + "', '" + post.type + "', '" + post.contentPath + "', '" + post.description + "', '" + post.likes + "', '" + "0" + "');";
		
	await db.query(query)
}

addData();