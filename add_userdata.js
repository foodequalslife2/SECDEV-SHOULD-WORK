const db = require ('./models/mysqldb.js');

async function addData() {
	var user = {
		userID: 1000,
		username: 'migsbb',
		password: '$2b$10$njYGXkKvD/L80GAOKl8Twuldugo5RYbh8Ij4yQz7R.XG05vJ.MLO2', // testpass
		email: 'miguelbaliog@gmail.com',
		firstName: 'Miguel',
		lastName: 'Baliog',
		phone: "123456789",
		numPosts: 2,
		avatar: "../images/avatar/migsbb.png",
		followers: 0,
		isDeleted: false 
	};
	
	var query = "INSERT INTO `user` (userID, username, password, email, firstName, lastName, phone, numPosts, followers, avatar, isDeleted) values ('" + user.userID + "', '" + user.username + "', '" + user.password + "', '" + user.email + "', '" + user.firstName + "', '" + user.lastName + "', '" + user.phone + "', '" + "0" + "', '" + "0" + "', '" + user.avatar + "', '" + "0" + "');";
		
	await db.query(query)
	
	var user = {
		userID: 1001,
		username: 'admin',
		password: '$2b$10$MHpKU8Nur.do1wPCyfrku.EXcOXUGGs22C0aB7Jkz9il5eMF6cEVS', // admin1234
		email: 'adminemail@mic.com',
		firstName: 'Mister',
		lastName: 'Administrator',
		phone: "123456789",
		numPosts: 0,
		avatar: "../images/avatar/default.png",
		followers: 0,
		isDeleted: false 
	};
	
	var query = "INSERT INTO `user` (userID, username, password, email, firstName, lastName, phone, numPosts, followers, avatar, isDeleted) values ('" + user.userID + "', '" + user.username + "', '" + user.password + "', '" + user.email + "', '" + user.firstName + "', '" + user.lastName + "', '" + user.phone + "', '" + "0" + "', '" + "0" + "', '" + user.avatar + "', '" + "0" + "');";
		
	await db.query(query)
	
	var user = {
		userID: 1002,
		username: 'iceice',
		password: '$2b$10$RITYIKJzc2arG.sjSy0gRuwGwNHVDG8K.OgwfwnLqQaNlGfAcDndq', // testpass
		email: 'isaiahmajarreis@gmail.com',
		firstName: 'Isaiah',
		lastName: 'Majarreis',
		phone: "09061355688",
		numPosts: 1,
		avatar: "../images/avatar/default.png",
		followers: 0,
		isDeleted: false 
	};
	
	var query = "INSERT INTO `user` (userID, username, password, email, firstName, lastName, phone, numPosts, followers, avatar, isDeleted) values ('" + user.userID + "', '" + user.username + "', '" + user.password + "', '" + user.email + "', '" + user.firstName + "', '" + user.lastName + "', '" + user.phone + "', '" + "0" + "', '" + "0" + "', '" + user.avatar + "', '" + "0" + "');";
		
	await db.query(query)
	
	var user = {
		userID: 1003,
		username: 'heyimia',
		password: '$2b$10$3EVwj/MNi/ntDWH6M18uLOgiNf9OO2z0tBtAi5LqthupMUlzL4VCa', // testpass
		email: 'francescalopez@gmail.com',
		firstName: 'Francesca',
		lastName: 'Lopez',
		phone: "09061357888",
		numPosts: 1,
		avatar: "../images/avatar/default.png",
		followers: 0,
		isDeleted: false 
	};
	
	var query = "INSERT INTO `user` (userID, username, password, email, firstName, lastName, phone, numPosts, followers, avatar, isDeleted) values ('" + user.userID + "', '" + user.username + "', '" + user.password + "', '" + user.email + "', '" + user.firstName + "', '" + user.lastName + "', '" + user.phone + "', '" + "0" + "', '" + "0" + "', '" + user.avatar + "', '" + "0" + "');";
		
	await db.query(query)
	
	var user = {
		userID: 1004,
		username: 'notgohan',
		password: '$2b$10$TPDjRI/DGdlJLeEqzc60j.UWFP9fXkA9682ynfvxAXzOrLFy5nr3O', // testpass
		email: 'kylehebert@gmail.com',
		firstName: 'Kyle',
		lastName: 'Hebert',
		phone: "09061231234",
		numPosts: 1,
		avatar: "../images/avatar/default.png",
		followers: 0,
		isDeleted: false
	};
	
	var query = "INSERT INTO `user` (userID, username, password, email, firstName, lastName, phone, numPosts, followers, avatar, isDeleted) values ('" + user.userID + "', '" + user.username + "', '" + user.password + "', '" + user.email + "', '" + user.firstName + "', '" + user.lastName + "', '" + user.phone + "', '" + "0" + "', '" + "0" + "', '" + user.avatar + "', '" + "0" + "');";
		
	await db.query(query)
	
	var user = {
		userID: 1005,
		username: 'dmitrilover',
		password: '$2b$10$DCCo7oVT1AFCljw/07tiqumQjyAfSQU3dSBdL/sRPO3c6xql5ViAG', // testpass
		email: 'ericalindbeck@gmail.com',
		firstName: 'Erica',
		lastName: 'Lindbeck',
		phone: "09061235099",
		numPosts: 0,
		avatar: "../images/avatar/dmitrilover.jpg",
		followers: 0, 
		isDeleted: false
	};
	
	var query = "INSERT INTO `user` (userID, username, password, email, firstName, lastName, phone, numPosts, followers, avatar, isDeleted) values ('" + user.userID + "', '" + user.username + "', '" + user.password + "', '" + user.email + "', '" + user.firstName + "', '" + user.lastName + "', '" + user.phone + "', '" + "0" + "', '" + "0" + "', '" + user.avatar + "', '" + "0" + "');";
		
	await db.query(query)
	
}

addData();