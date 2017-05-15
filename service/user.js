'use strict';

const db = require('./db');

const INSERT_USER = `
	INSERT INTO users
		(id, name, roleid, groupid, login, password) VALUES
		(DEFAULT , $1, $2, $3, $4, $5) RETURNING id;`
const GET_USER_BY_ID = `
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

/**
 * [insertUser description]
 * @param  {object} response node response
 * @param  {object} user user data
 */
function insertUser(response, user) {
	db.one(INSERT_USER,
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
 * Данные о юзере по его ID
 * @param {object} response - node response
 * @param {integer} userID
 */
function getUserById(response, userID) {
	db.one(GET_USER_BY_ID, [userID]).then((user) => {
		// console.log(JSON.stringify(data, null, 2));
		response.status(200, {'Content-Type': 'application/json'});
		response.end(JSON.stringify(user));
	}).catch(function(err) {
		console.error(err);
	});
}

exports.insertUser = insertUser;
exports.getUserById = getUserById;
