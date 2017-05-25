'use strict';

const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const expressVue = require('express-vue');

const app = express();

const index = require('./routers/index');
const lectures = require('./routers/lectures');
const subjects = require('./routers/subjects');
const users = require('./routers/users');
const tests = require('./routers/tests');

app.use(function(req, res, next) { // middleware для настроки CORS запросов
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept');

  next();
});


app.use(fileUpload());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'Shh, its a secret!',
  saveUninitialized: true,
  resave: true,
}));
app.use(bodyParser.urlencoded({extended: true}));
// use statinc должен идти после кода app.get('/', ...)
app.use('/pdf', express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', index);
app.use('/lectures', lectures);
app.use('/subjects', subjects);
app.use('/users', users);
app.use('/tests', tests);
app.use('/upload', function(req, res) {
  console.log(req.files);
});
app.get('/app.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/app.js'));
});

//
// app.use(function(err, req, res, next) {
//   console.log(err, req, res);
//   if (err.status >= 200 && err.status < 300) {
//     res.sendFile(path.join(__dirname, '/dist/index.html'));
//     return;
//   }
//   err.status = 500;
//   res.json({
//     message: 'Ошибка url',
//   });
//   res.end();
// });

app.listen(3000);
