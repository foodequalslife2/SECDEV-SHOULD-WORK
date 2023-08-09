const mongodb = require('mongodb');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Users = require('./UserModel.js');
const Posts = require('./PostModel.js');
const Comments = require('./CommentModel.js');
const Tabs = require('./TabsModel.js');
const client = mongodb.MongoClient;
const mysql = require('mysql2/promise')
const config = require('../models/conns')

const options = { 
    useUnifiedTopology: true,
    useNewUrlParser: true
};

async function query(sql, params) {
    const connection = await mysql.createConnection(config.db);
    const [results, ] = await connection.execute(sql, params);
  
    return results;
};

module.exports = {
    query
};
