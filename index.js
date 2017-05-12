// const server = require('./server');

let express = require('express');
const fileUpload = require('express-fileupload');
let path = require('path');
let fs = require('fs');
let mime = require('mime');
let dataBaseService = require('./service/db');
let bodyParser = require('body-parser');

let db = new dataBaseService.DataBaseService();

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(fileUpload());

app.get('/', function(request, response) {
	sendFile('public/index.html', response);
});
// use statinc должен идти после кода app.get('/', ...)
app.use(express.static(__dirname + '/public'));

app.get('/subjectsandlectures', function(request, response) {
	db.getSubjectsAndLectures(response);
});

app.post('/subjectsandlectures/create', function(request, response) {
	// console.log(typeof(request.body));
	// console.log(req.files.my_profile_pic.name);
	// console.log(req.files.my_pet.name);
	// console.log(req.files.my_cover_photo.name);
	// console.log(request.files['file1'].name);
	for (let key in request.files) {
		request.files[key].mv(path.join(__dirname, `/public/lectures/${request.files[key].name}`), function(err) {
			if (err)
				return res.status(500).send(err);

			response.send('Files uploaded!');
		});
	}
	// db.insertSubjectAndLectures(response, request.body);
});

// Переделать, чтобы id доставался из сессии
app.get('/user/:id', function(request, response) {
	db.getUserById(response, +request.params.id);
});

app.post('/user/signup', function(request, response) {
	let user = request.body;
	for (let key in Object.keys(user)) {
		if (!user[key] || user[key] === '') {
			return response.status(400).json({
				message: 'Не все поля заполнены.',
			});
			return response.end();
		}
	}
	db.insertUser(response, request.body);
});


app.post('/upload', function(request, response) {
	// Uploaded files:
	console.log(request.files.my_profile_pic.name);
	console.log(request.files.my_pet.name);
	console.log(request.files.my_cover_photo.name);
});

app.listen(3000);

/**
 * [sendFile description]
 * @param  {string} filepath [description]
 * @param  {object} res      [description]
 */
function sendFile(filepath, res) {
	let fileStream = fs.createReadStream(filepath);
	fileStream.pipe(res);

	fileStream.on('error', (err) => {
		if (err.code === 'ENOENT') {
			res.statusCode = 404;
			res.end('Not found');
		} else {
			console.error(err);
			if (!res.headersSent) {
				res.statusCode = 500;
				res.end('Internal error');
			} else {
				res.end();
			}
		}
	}).on('open', () => {
		res.setHeader('Content-Type', mime.lookup(filepath));
	});

	res.on('close', () => {
		fileStream.destroy();
	});
	// break;
}
