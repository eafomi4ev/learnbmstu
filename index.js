'use strict';

const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const expressVue = require('express-vue');

const app = express();

const lectures = require('./routers/lectures');
const subjects = require('./routers/subjects');
const users = require('./routers/users');
const tests = require('./routers/tests');

app.use(function (req, res, next) { //middleware для настроки CORS запросов
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  next();
});
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: 'Shh, its a secret!'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());
// use statinc должен идти после кода app.get('/', ...)
// app.use(express.static(__dirname + '/public'));

// app.set('views', __dirname + '/views');
// app.set('vue', {
//     // ComponentsDir is optional if you are storing your components in a
//     // Cdifferent directory than your views
//     componentsDir: __dirname + '/components',
//     // Default layout is optional it's a file and relative to the views path,
//     // Dit does not require a .vue extension.
//     // If you want a custom layout set this to the location of your layout.vue file.
//     defaultLayout: 'layout',
// });

// app.engine('vue', expressVue);
// app.set('view engine', 'vue');


app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '/dist/index.html'));

	// if(req.session.page_views) {
  //     req.session.page_views++;
  //     res.send('You visited this page ' + req.session.page_views + ' times');
  //  }else{
  //     req.session.page_views = 1;
  //     res.send('Welcome to this page for the first time!');
  //  }
});

app.use('/lectures', lectures);
app.use('/subjects', subjects);
app.use('/users', users);
app.use('/tests', tests);

app.listen(8080);
