const db = require('../instances/db');

const INSERT_LECTURES = `
  INSERT INTO lectures (id, name, path, subjectid) 
    VALUES (DEFAULT, $1, $2, $3)`;

function insertLecture(lecture, resolve, reject) {
  db.none(INSERT_LECTURES, [
    lecture.lectureName, lecture.lecturePath,
    lecture.subjectId])
  .then(() => {
    resolve();
  }).catch((err) => reject(err));
}

exports.insertLecture = insertLecture;
