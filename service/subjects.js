'use strict';

const db = require('../instances/db');
const eventEmit = require('../instances/eventEmitter');
const lecturesServise = require('../service/lectures');

const eventEmitter = eventEmit.eventEmitter;

const GET_SUBJECTS_AND_LECTURES = `
	SELECT s.id as subject_id, s.name as Subject_Name,
		l.id as lecture_id, l.name as lecture_name, l.path as lecture_path
	FROM subjects s
	JOIN lectures l ON s.id = l.subjectid;`;

const INSERT_SUBJECT = `
  INSERT INTO subjects VALUES (DEFAULT, $1) RETURNING id;`;

const DELETE_SUBJECT = `
  DELETE FROM subjects WHERE name=$1;`;
const UPDATE_SUBJECT = `
  UPDATE subjects SET name = $1 WHERE name = $2;`;

/**
 * Извлечение всех предметов и лекций по предметам
 */
function getSubjectsAndLectures(resolve, reject) {
  db.any(GET_SUBJECTS_AND_LECTURES).then((data) => {
    resolve(data);
  }).catch((err) => {
    reject(err);
  });
}

function insertSubject(subject, resolve, reject) {
  db.one(INSERT_SUBJECT, [subject.subjectName]).then((data) => {
    resolve(data.id);
  }).catch((err) => {
    reject(err);
  });
}

/**
 * Добавить в БД предмет и его лекции
 * @param  {object} response [description]
 * @param  {object} subject  [description]
 */
function insertSubjectAndLectures(response, subject) {
  // let subject = JSON.parse(dataString);
  // console.log(JSON.stringify(subject));
  db.one(INSERT_SUBJECT, [subject.subject_name]) // 1 or more return
      .then((data) => {
        // console.log(data.id); // print new subject id;
        // Конструирование запроса на вставку всех лекций
        let query = INSERT_LECTURES;
        for (let i = 0; i < subject.lectures.length; i++) {
          query += ` (DEFAULT,
					'${subject.lectures[i].lecture_name}',
					${subject.lectures[i].lecture_path === ''
              ? null
              : `'${subject.lectures[i].lecture_path}'`},
					${data.id}),`;
        }
        query = query.substring(0, query.length - 1);
        query += ` RETURNING id;`;
        // console.log(query);
        db.many(query).then((data) => {
          // console.log('Отработало норм');
          response.status(200).json({
            status: 'OK',
          });
          response.end();
        }).catch((error) => {
          console.error(error);
          console.log('Не удалось вставить лекции');
          db.none(DELETE_SUBJECT, [subject.subject_name]);
        });
      }).catch((error) => {
    console.log('Не удалось вставить предмет');
    console.log('ERROR:', error); // print error;
  });
}

/**
 * Обновить имя предмета
 * @param  {[type]} subjectJSON    [description]
 * @param  {[type]} newSubjectName [description]
 */
function updateSubjectName(subjectJSON, newSubjectName) {
  console.log(JSON.stringify(subjectJSON, null, 2));
  db.result(
      UPDATE_SUBJECT, [newSubjectName, subjectJSON.subject_name]).
      then((result) => {
        console.log(`Record was updated:  ${result.rowCount}`);
      }).
      catch((err) => {
        console.log(err);
        console.log('Something was wrong!');
      });
}

exports.getSubjectsAndLectures = getSubjectsAndLectures;
exports.insertSubject = insertSubject;
exports.insertSubjectAndLectures = insertSubjectAndLectures;
exports.updateSubjectName = updateSubjectName;

// console.log(eventEmitter);

