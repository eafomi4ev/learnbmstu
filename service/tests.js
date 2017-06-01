'use strict';

const db = require('../instances/db');

const INSERT_TEST = `INSERT INTO tests 
  (id, subjectid, name, duration, count_answers_for_pass) VALUES
	(DEFAULT, $1, $2, '$3'::TIME, null) RETURNING id;`;

const GET_SUBJECT_TESTS = `SELECT DISTINCT testid FROM test_content WHERE subjectid=$1;`;

const GET_SUBJECT_TEST = `SELECT * FROM test_content WHERE subjectid=$1 AND testid=$2;`;

const INSERT_TESTING = `INSERT INTO user_testings (id, testid, userid, date_start) VALUES
(DEFAULT, $1, $2, $3) RETURNING id;`;

function insertTest(test, resolve, reject) {
  db.one(INSERT_TEST, [test.subjectId, test.name, test.duration]).
      then((id) => resolve(id)).
      catch((err) => reject(err));
}

function getTestBySubjectId(subjectId, testId, resolve, reject) {
  db.any(GET_SUBJECT_TEST, [subjectId, testId]).
      then((data) => resolve(data)).
      catch((err) => reject(err));
}

function getSubjectTestsId(subjectId, resolve, reject) {
  db.any(GET_SUBJECT_TESTS, [subjectId]).then((testsId) => {
    resolve(testsId);
  }).catch((err) => {
    reject(err);
  });
}

function insertTesting(userId, testId, dateStart, resolve, reject) {
  db.one(INSERT_TESTING, [userId, testId, dateStart]).
      then((data) => resolve(data)).
      catch((err) => reject(err));
}

exports.insertTest = insertTest;
exports.getTestBySubjectId = getTestBySubjectId;
exports.getSubjectTestsId = getSubjectTestsId;
exports.insertTesting = insertTesting;
