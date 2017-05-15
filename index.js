'use strict';

const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const lectures = require('./routers/lectures');
const subjects = require('./routers/subjects');
const users = require('./routers/users');
const tests = require('./routers/tests');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());
// use statinc должен идти после кода app.get('/', ...)
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname, '/public/index.html'));
});

app.use('/lectures', lectures);
app.use('/subjects', subjects);
app.use('/users', users);
app.use('/tests', tests);

// Переделать, чтобы id доставался из сессии

app.listen(3000);
