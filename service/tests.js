'use strict';

const db = require('../instances/db');

const INSERT_TEST = `INSERT INTO tests 
  (id, subjectid, name, duration, count_answers_for_pass) VALUES
	(DEFAULT, $1, $2, '$3'::TIME, null) RETURNING id;`;

const GET_SUBJECT_TESTS = `SELECT DISTINCT testid FROM test_content WHERE subjectid=$1;`;

const GET_SUBJECT_TEST = `SELECT * FROM test_content WHERE subjectid=$1 AND testid=$2;`;

const INSERT_TESTING = `INSERT INTO user_testings (id, testid, userid, date_start) VALUES
(DEFAULT, $1, $2, $3) RETURNING id;`;

const INSERT_USER_ANSWER = `INSERT INTO user_testing_results 
  (id, user_testingsid, questionid, user_answerid, correct_answerid) VALUES
  (DEFAULT, $1, $2, $3, (SELECT DISTINCT answerid
                       FROM tests_content
                       WHERE testid = (SELECT testid
                                       FROM user_testings
                                       WHERE id = $1) AND 
                                       questionid = $2 AND is_correct = TRUE));`;

const FINISH_TESTING = `UPDATE user_testings SET date_finish=$1  WHERE id=$2;`;

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

function insertTesting(testId, userId, dateStart, resolve, reject) {
  db.one(INSERT_TESTING, [testId, userId, dateStart]).
      then((data) => resolve(data)).
      catch((err) => reject(err));
}

function insertUserAnswer(
    userTestingId, answerId, questionId, resolve, reject) {
  db.none(INSERT_USER_ANSWER, [userTestingId, answerId, questionId]).
      then(() => resolve()).
      catch((err) => reject(err));
}

function finishTesting(dateFinish, userTestingId, resolve, reject) {
  db.none(FINISH_TESTING, [dateFinish, userTestingId]).
      then(() => resolve()).
      catch((err) => reject(err));
}

exports.insertTest = insertTest;
exports.getTestBySubjectId = getTestBySubjectId;
exports.getSubjectTestsId = getSubjectTestsId;
exports.insertTesting = insertTesting;
exports.insertUserAnswer = insertUserAnswer;
exports.finishTesting = finishTesting;
