'use strict';

var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/testing';
var db = pgp(connectionString);

// function getSubjectLectures() {
//   db.any(`SELECT question_text, a2.answer_text correct_Answer, a.answer_text answer FROM questions q
// JOIN questions_answers qa ON q.id = qa.questionid
// JOIN answers a ON a.id = qa.answerid
// JOIN answers a2 on q.answerid = a2.id;`)
//   .then(function(data) {
//     // res.status(200).json({
//     //   status: 'success',
//     //   data: data,
//     //   message: 'Retrieved ALL puppies',
//     // });
//     console.log(JSON.stringify(data, null, 2));
//
//     let subjects = {}
//
//
//   }).catch(function(err) {
//     console.error(err);
//   });
// }
//
// getSubjectLectures();

function getSubjectsAndLectures() {
  db.any('\n    SELECT s.id as subject_id, s.name as subject_name, \n           l.id as lecture_id, l.name as lecture_name \n    FROM subjects s\n    JOIN lectures l ON s.id = l.subjectid;').then(function (data) {
    // res.status(200).json({
    //   status: 'success',
    //   data: data,
    //   message: 'Retrieved ALL puppies',
    // });
    // console.log(JSON.stringify(data, null, 2));

    var subjects = makeTreeViewSubjectsAndLectures(data);
    // console.log(JSON.stringify(subjects, null, 2));
  }).catch(function (err) {
    console.error(err);
  });
}

getSubjectsAndLectures();

function makeTreeViewSubjectsAndLectures(data) {
  var currentSubjectId = -1;
  if (data.length !== 0) {
    currentSubjectId = data[0].subject_id;
  } else {
    return [];
  }

  var subjects = [];
  var subject = getEmptySubject();

  for (var i in data) {
    var lecture = {};
    if (currentSubjectId !== data[i].subject_id) {
      subjects.push(subject);

      subject = getEmptySubject();
      currentSubjectId = data[i].subject_id;
    }
    subject.subject_id = data[i].subject_id;
    subject.subject_name = data[i].subject_name;

    lecture = {
      lecture_id: data[i].lecture_id,
      lecture_name: data[i].lecture_name
    };

    subject.lectures.push(lecture);
  }
  subjects.push(subject);
  return subjects;
}

function getEmptySubject() {
  return {
    subject_id: -1,
    subject_name: '',
    lectures: []
  };
}

// const pg = require('pg');
// const connectionString = process.env.DATABASE_URL ||
//     'postgres://localhost:5432/testing';
//
// const client = new pg.Client(connectionString);
// client.connect();
// let query = client.query(`INSERT INTO \"user\" VALUES (DEFAULT, 'Фомичев Егор Андреевич', 'ИУ1-123');`);
// query.on('end', () => {
//     client.end();
// });
//# sourceMappingURL=bd.js.map