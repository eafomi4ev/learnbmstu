'use strict';

var express = require('express');
var router = express.Router();
let db = require('../service/db')

router.get('/:id', function(request, response) {
	db.getUserById(response, +request.params.id);
});

router.post('/signup', function(request, response) {
	let user = request.body;
	for (let key in Object.keys(user)) {
		if (!user[key] || user[key] === '') {
			return response.status(400).json({
				message: 'Не все поля заполнены.',
			});
			return response.end();
		}
	}
	db.insertUser(response, request.body);
});


module.exports = router;
