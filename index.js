// const server = require('./server');

let express = require('express');
let path = require('path');
let fs = require('fs');
let mime = require('mime');
let dataBaseService = require('./service/db');

let db = new dataBaseService.DataBaseService();

let app = express();

app.get('/', function(request, response) {
	sendFile('public/index.html', response);
});

app.get('/subjectsandlectures', function(request, response) {
	db.getSubjectsAndLectures(response);
});

app.use(express.static(__dirname + '/public'));

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
