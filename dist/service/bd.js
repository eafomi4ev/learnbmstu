'use strict';

var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/testing';
var db = pgp(connectionString);

var GET_SUBJECTS_AND_LECTURES = 'SELECT s.id as subject_id, s.name as Subject_Name, \nl.id as lecture_id, l.name as lecture_name, l.path as lecture_path \nFROM subjects s\nJOIN lectures l ON s.id = l.subjectid;';

function getSubjectsAndLectures() {
  db.any(GET_SUBJECTS_AND_LECTURES).then(function(data) {
    // res.status(200).json({
    //   status: 'success',
    //   data: data,
    //   message: 'Retrieved ALL puppies',
    // });
    // console.log(JSON.stringify(data, null, 2));

    var subjects = makeTreeViewSubjectsAndLectures(data);
    console.log(JSON.stringify(subjects, null, 2));
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
      lecture_name: data[i].lecture_name,
      lecture_path: data[i].lecture_path
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
//# sourceMappingURL=db.js.map
