const express = require('express');
const fileUpload = require('express-fileupload');
const hbs = require('hbs');
const routes = require('./routes/routes.js');
const db = require('./models/mysqldb.js');
const dotenv = require('dotenv');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const fs = require('fs');

const app = express();

dotenv.config();
hostname = process.env.HOSTNAME;
port = process.env.PORT;
db_url = process.env.DB_URL;
secret = process.env.SECRET;
const uri = process.env.MONGODB_URI;

// Register partials
var partialsDir = __dirname + '/views/partials';

var filenames = fs.readdirSync(partialsDir);

filenames.forEach(function (filename) {
  var matches = /^([^.]+).hbs$/.exec(filename);
  if (!matches) {
    return;
  } 
  var name = matches[1];
  var template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
  hbs.registerPartial(name, template);
});

// set `hbs` as view engine
app.set('view engine', 'hbs');

app.use(express.urlencoded({extended: true}));

app.use(express.static('dist'));

app.use(fileUpload());


app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: secret,
  cookie: { maxAge: 300000 },
  rolling: false,
	store: MongoStore.create({
		mongoUrl: uri
	})
}));

app.use('/', routes);

app.use(function(req, res) {
    var details = {};

    if(req.session.username) {
        details.flag = true;
        details.username = req.session.username;
    }
    else {
        details.flag = false;
    }
    res.render('error', details);
});

// binds the server to a specific port
app.listen(port, function () {
    console.log('app listening at port ' + port);
    console.log('http://'+hostname+":"+port);
});