'use strict';

let express = require('express');
let router = express.Router();
let dataBaseService = require('../service/db');

let db = new dataBaseService.DataBaseService();


router.get('/', function(req, res) {
	// получение всех предметов
	db.getSubjectsAndLectures(res);
});

router.get('/:id', function(req, res) {
	// получение предмета по id
});

module.exports = router;
