let db = require('./service/db');

function subjectsandlectures(request, response) {
  response.statusCode = 200;
  let subjects = db.getSubjectsAndLectures(response);
  // response.end(subjects);
}

function upload() {
  console.log("Request handler 'upload' was called.");
}

exports.subjectsandlectures = subjectsandlectures;
exports.upload = upload;