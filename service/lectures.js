const db = require('../instances/db');

const INSERT_LECTURES = `
  INSERT INTO lectures (id, name, path, subjectid) 
    VALUES (DEFAULT, $1, $2, $3)`;

function insertLectures(lectures, resolve, reject) {
  for (let i = 0; i < lectures.length; i++) {
    // console.log(lectures[i]);
    db.none(INSERT_LECTURES, [
      lectures[i].lecture_name, lectures[i].lecture_path,
      lectures[i].subject_id]).then(() => {
      resolve();
    }).catch((err) => reject(err));
  }
}

exports.insertLectures = insertLectures;
