'use strict';

const express = require('express');
const lecturesServise = require('../service/lectures');

const router = express.Router();


router.get('/', function(req, res) {
	// получение всех лекций
});
// define the about route
router.get('/:id', function(req, res) {
	// получение лекции по id
});

router.post('/create', function(req, res) {
	// создание лекций у предмета. id предмета содержится в теле запроса.
});

module.exports = router;
