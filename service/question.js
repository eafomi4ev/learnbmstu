'use strict';

const db = require('../instances/db');

const INSERT_QUESTION = `INSERT INTO tests 
  (id, subjectid, name, duration, count_answers_for_pass) VALUES
	(DEFAULT, $1, $2, $3::TIME, null) RETURNING id;`;

function insertQuestion(question, resolve, reject) {
  db.one(INSERT_TEST, [test.subject_id, test.name, test.duration])
  .then((id) => resolve(id))
  .catch((err) => reject(err));
}

exports.insertQuestion = insertQuestion;
