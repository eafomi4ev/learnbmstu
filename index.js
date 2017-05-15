// const server = require('./server');

let express = require('express');
const fileUpload = require('express-fileupload');
let path = require('path');
let fs = require('fs');
let mime = require('mime');
let dataBaseService = require('./service/db');
let bodyParser = require('body-parser');
let config = require('config');

let db = new dataBaseService.DataBaseService();

let app = express();

let lectures = require('./routers/lectures');
let subjects = require('./routers/subjects');
let users = require('./routers/users');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true,
}));
app.use(fileUpload());

app.get('/', function(request, response) {
	response.sendFile(__dirname + '/public/index.html');
});
// use statinc должен идти после кода app.get('/', ...)
app.use(express.static(__dirname + '/public'));

app.use('/lectures', lectures);
app.use('/subjects', subjects);
app.use('/users', users);

// Переделать, чтобы id доставался из сессии

app.listen(3000);
