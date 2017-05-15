'use strict';

// const promise = require('bluebird');
let config = require('config');

// const options = {
//   // Initialization Options
//   promiseLib: promise,
// };

class DataBaseService {
	constructor() {
		this.pgp = require('pg-promise')(config.get('db').options);
		this.connectionString = config.get('db').connection + config.get('db').name;
		this.db = this.pgp(this.connectionString);

		// инициализация соединения с БД
		// let pgp = require('pg-promise')(config.get('db').options);
		// let connectionString = config.get('db').connection + config.get('db').name;
		// let db = pgp(connectionString);

		// Запросы к БД

		this.GET_USER_BY_ID = `
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

		this.INSERT_USER = `INSERT INTO users
      (id, name, roleid, groupid, login, password) VALUES
      (DEFAULT , $1, $2, $3, $4, $5) RETURNING id;`

		this.GET_SUBJECTS_AND_LECTURES = `
      SELECT s.id as subject_id, s.name as Subject_Name,
        l.id as lecture_id, l.name as lecture_name, l.path as lecture_path
      FROM subjects s
      JOIN lectures l ON s.id = l.subjectid;`;

		this.INSERT_SUBJECT = `INSERT INTO subjects VALUES (DEFAULT, $1) RETURNING id;`;

		// Этот запрос дособирается в месте вызова
		this.INSERT_LECTURES = `INSERT INTO lectures (id, name, path, subjectid) VALUES`;

		this.DELETE_SUBJECT = `DELETE FROM subjects WHERE name=$1;`;

		this.UPDATE_SUBJECT = `UPDATE subjects SET name = $1 WHERE name = $2;`;
	}

	/**
	 * [insertUser description]
	 * @param  {object} response node response
	 * @param  {object} user user data
	 */
	insertUser(response, user) {
		this.db.one(this.INSERT_USER,
          [user.name, user.roleid, user.groupid, user.login, user.password])
			.then((user) => {
				response.status(200).json({
					id: user.id,
				});
				response.end();
			})
			.catch((err) => {
				if (err.code === '23505') {
          response.status(409).json({
            message: 'Пользователь с таким login уже существует.',
          });
				}
				console.error(err);
				response.status(500).end();
			});
	}

	/**
	 * Извлечение всех предметов и лекций по предметам
	 * @param  {object} response - node response
	 */
	getSubjectsAndLectures(response) {
		this.db.any(this.GET_SUBJECTS_AND_LECTURES)
			.then(function(data) {
				let subjects = _makeTreeViewSubjectsAndLectures(data);
				response.status(200).json({
					'subjects': subjects,
				});
				response.end();
				// return subjects;
			})
			.catch(function(err) {
				console.error(err);
			});
	}

	// getSubjectsAndLectures();

	/**
	 * Данные о юзере по его ID
	 * @param {object} response - node response
	 * @param {integer} userID
	 */
	getUserById(response, userID) {
		this.db.one(this.GET_USER_BY_ID, [userID]).then((user) => {
			// console.log(JSON.stringify(data, null, 2));
			response.status(200, {'Content-Type': 'application/json'});
			response.end(JSON.stringify(user));
		}).catch(function(err) {
			console.error(err);
		});
	}

	/**
	 * Добавить в БД предмет и его лекции
	 * @param  {object} response [description]
	 * @param  {object} subject  [description]
	 */
	insertSubjectAndLectures(response, subject) {
		// let subject = JSON.parse(dataString);
		// console.log(JSON.stringify(subject));
		this.db.one(this.INSERT_SUBJECT, [subject.subject_name]) // 1 or more return
			.then((data) => {
				// console.log(data.id); // print new subject id;
				// Конструирование запроса на вставку всех лекций
				let query = this.INSERT_LECTURES;
				for (let i = 0; i < subject.lectures.length; i++) {
					query += ` (DEFAULT,
            '${subject.lectures[i].lecture_name}',
            ${subject.lectures[i].lecture_path === '' ?
              null : `'${subject.lectures[i].lecture_path}'`},
            ${data.id}),`;
				}
				query = query.substring(0, query.length - 1);
				query += ` RETURNING id;`;
				// console.log(query);
				this.db.many(query)
					.then((data) => {
						// console.log('Отработало норм');
						response.status(200).json({
							status: 'OK'
						});
						response.end();
					})
					.catch((error) => {
						console.error(error);
						console.log('Не удалось вставить лекции');
						this.db.none(this.DELETE_SUBJECT, [subject.subject_name]);
					});
			})
			.catch((error) => {
				console.log('Не удалось вставить предмет');
				console.log('ERROR:', error); // print error;
			});
	}

	/**
	 * Обновить имя предмета
	 * @param  {[type]} subjectJSON    [description]
	 * @param  {[type]} newSubjectName [description]
	 */
	updateSubjectName(subjectJSON, newSubjectName) {
		console.log(JSON.stringify(subjectJSON, null, 2));
		this.db.result(
				this.UPDATE_SUBJECT, [newSubjectName, subjectJSON.subject_name])
			.then((result) => {
				console.log(`Record was updated:  ${result.rowCount}`);
			})
			.catch((err) => {
				console.log(err);
				console.log('Something was wrong!');
			});
	}
}; // end of DataBaseService

exports.DataBaseService = DataBaseService;

/**
 * Парсит извлеченные днные предметов и лекций в удобный вид для передачи
 * @param {object} data
 * @return {Array}
 */
function _makeTreeViewSubjectsAndLectures(data) {
	let currentSubjectId = -1;
	if (data.length !== 0) {
		currentSubjectId = data[0].subject_id;
	} else {
		return [];
	}

	let subjects = [];
	let subject = _getEmptySubject();

	for (let i in data) {
		let lecture = {};
		if (currentSubjectId !== data[i].subject_id) {
			subjects.push(subject);

			subject = _getEmptySubject();
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
};

function _getEmptySubject() {
	return {
		subject_id: -1,
		subject_name: '',
		lectures: [],
	};
}
