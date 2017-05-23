'use strict';

const db = require('../instances/db');

const INSERT_USER = `
	INSERT INTO users 
	(id, name, login, password, groupid) VALUES
	(DEFAULT, $1, $2, $3, (SELECT id FROM groups WHERE name=$4)) RETURNING id;`;

const GET_USER_BY_ID = `
	SELECT * FROM userinfo WHERE id=$1;`;

const GET_USER_BY_LOGIN = `
	SELECT * FROM userinfo WHERE login=$1;`;


function insertUser(user, resolve, reject) {
	db.one(INSERT_USER,
				[user.name, user.login, user.password, user.group])
		.then((data) => {
			user = getUserById(data.id, resolve, reject);
		})
		.catch((err) => {
			reject(err);
		});
}


function getUserById(userID, resolve, reject) {
	db.one(GET_USER_BY_ID, [userID]).then((user) => {
		resolve(user);
	}).catch(function(err) {
		reject(err);
	});
}

function getUserByLogin(userLogin, resolve, reject) {
	db.one(GET_USER_BY_LOGIN, [userLogin]).then((user) => {
		resolve(user);
	}).catch(function(err) {
		reject();
	});
}

exports.insertUser = insertUser;
exports.getUserById = getUserById;
exports.getUserByLogin = getUserByLogin;
