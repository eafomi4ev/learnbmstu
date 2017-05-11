// const server = require('./server');
//
//
//
// server.listen(3000, '127.0.0.1', () => console.log('http://127.0.0.1:3000/'));
//


let express = require("express");
let requestHandlers = require("./requestHandlers");
let fs = require('fs');
let mime = require('mime');

let app = express();

app.get("/", function(request, response) {
	sendFile('public/index.html', response);
});

app.get("/subjectsandlectures", function(request, response) {
	requestHandlers.subjectsandlectures(request, response);
});

app.use(express.static(__dirname + '/public'));

app.listen(3000);

/**
 * [sendFile description]
 * @param  {[type]} filepath [description]
 * @param  {[type]} res      [description]
 * @return {[type]}          [description]
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
