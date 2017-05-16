'use strict';

const express = require('express');
const subjectsServise = require('../service/subjects');

const router = express.Router();

router.get('/', function(req, res) {
	// получение всех предметов
	subjectsServise.getSubjectsAndLectures(res);

});

// QUESTION: что должно возвращаться? Имя предмета или все его лекции?
router.get('/:id', function(req, res) {
	// получение предмета по id
});

router.get('/:id', function(req, res) {
	// получение предмета по id
});

router.post('/create', function(req, res) {
	// создание предмета, в ответ возвращается id созданного предмета
});

router.put('/:id/update', function(req, res) {
	// Изменить имя предмета
});

module.exports = router;
