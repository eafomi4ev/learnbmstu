'use strict';

// const promise = require('bluebird');
const config = require('config');

// const options = {
//   // Initialization Options
//   promiseLib: promise,
// };

let pgp = require('pg-promise')(config.get('db').options);
let connectionString = config.get('db').connection + config.get('db').name;
let db = pgp(connectionString);

let GET_SUBJECTS_AND_LECTURES = `
  SELECT s.id as subject_id, s.name as Subject_Name,
    l.id as lecture_id, l.name as lecture_name, l.path as lecture_path
  FROM subjects s
  JOIN lectures l ON s.id = l.subjectid;`;

let GET_USER_BY_ID = `
  SELECT
    u.id as id,
    u.name as name,
    u.login as login,
    u.password as password,
    g.name as "group",
    r.name as role
  FROM users as u
  JOIN roles as r ON u.roleid = r.id
  JOIN groups as g ON u.groupid = g.id
  WHERE u.id = $1`;

let INSERT_SUBJECT = `INSERT INTO subjects VALUES (DEFAULT, $1) RETURNING id;`;

let INSERT_LECTURES = `INSERT INTO lectures (id, name, path, subjectid) VALUES`;

let DELETE_SUBJECT = `DELETE FROM subjects WHERE name=$1;`;

let UPDATE_SUBJECT = `UPDATE subjects SET name = $1 WHERE name = $2;`;

/**
 * Извлечение всех предметов и лекций по предметам
 */
function getSubjectsAndLectures() {
	db.any(GET_SUBJECTS_AND_LECTURES).then(function(data) {
		// res.status(200).json({
		//   status: 'success',
		//   data: data,
		//   message: 'Retrieved ALL puppies',
		// });
		// console.log(JSON.stringify(data, null, 2));

		// console.log(JSON.stringify(subjects, null, 2));
		let subjects = JSON.stringify(makeTreeViewSubjectsAndLectures(data), null,
			2);
		console.log(subjects);
		// response.end(subjects);
		return subjects;
	}).catch(function(err) {
		console.error(err);
	});
}

// getSubjectsAndLectures();
/**
 * Парсит извлеченные днные предметов и лекций в удобный вид для передачи
 * @param {object} data
 * @return {Array}
 */
function makeTreeViewSubjectsAndLectures(data) {
	let currentSubjectId = -1;
	if (data.length !== 0) {
		currentSubjectId = data[0].subject_id;
	} else {
		return [];
	}

	let subjects = [];
	let subject = getEmptySubject();

	for (let i in data) {
		let lecture = {};
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
			lecture_path: data[i].lecture_path,
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
		lectures: [],
	};
}

/**
 * Данные о юзере по его ID
 * @param {integer} userID
 */
function getUserById(userID) {
	db.any(GET_USER_BY_ID, [userID.toString()]).then(function(data) {
		console.log(JSON.stringify(data, null, 2));
	}).catch(function(err) {
		console.error(err);
	});
}

/**
 * Добавить в БД предмет и его лекции
 * @param {string} dataString
 */
function insertSubjectAndLectures(dataString) {
	let subject = JSON.parse(dataString);
	db.one(INSERT_SUBJECT, [subject.subject_name]) // 1 or more return
		.then((data) => {
			console.log(data.id); // print new subject id;
			for (let i = 0; i < subject.lectures.length; i++) {
				INSERT_LECTURES += ` (DEFAULT,
            '${subject.lectures[i].lecture_name}',
            ${subject.lectures[i].lecture_path === null ?
              null : `'${subject.lectures[i].lecture_path}'`},
            ${data.id}),`;
			}
			INSERT_LECTURES = INSERT_LECTURES.substring(0, INSERT_LECTURES.length - 1);
			INSERT_LECTURES += ` RETURNING id;`;
			console.log(INSERT_LECTURES);
			db.many(INSERT_LECTURES).then((data) => {
				console.log('Отработало норм');
			}).catch((error) => {
				console.error(error);
				console.log('Не удалось вставить лекции');
				db.none(DELETE_SUBJECT, [subject.subject_name]);
			});
		}).catch((error) => {
			console.log('ERROR:', error); // print error;
		});
}
// let data = {
// 	'subject_id': -1,
// 	'subject_name': 'Механика полета',
// 	'lectures': [{
// 			'lecture_id': -1,
// 			'lecture_name': 'Введение',
// 			'lecture_path': null,
// 		},
// 		{
// 			'lecture_id': -1,
// 			'lecture_name': 'Восстание машин',
// 			'lecture_path': null,
// 		},
// 	],
// };
// insertSubjectAndLectures(JSON.stringify(data));

function updateSubjectName(subjectJSON, newSubjectName) {
	db.one(UPDATE_SUBJECT, ['Механика полета', newSubjectName])
		.then((data) => {
			console.log('Record was updated');
		})
    .catch((data)=> {
      console.log('Something was wrong!');
    });
}

let subjectInfo = {
	'subject_id': 32,
	'subject_name': 'Механика недолета',
	'lectures': [{
			'lecture_id': 36,
			'lecture_name': 'Введение',
			'lecture_path': null,
		},
		{
			'lecture_id': 37,
			'lecture_name': 'Восстание машин',
			'lecture_path': null,
		},
	],
};

updateSubjectName(subjectInfo, 'Механика недоперелета');
