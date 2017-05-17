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

router.get('/:id/lectures', function(req, res) {
  // получение лекций предмета
});

router.post('/:id/lectures', function(req, res) {
  // создание лекций предмета
  let subjectId = +req.params.id;
  let lectures = req.body;
  lectures.forEach((lecture, i, lectures) => {
    lecture.subject_id = subjectId;
  });
  subjectsServise.insertLectures(lectures, resolve, reject);
  res.end();
});

router.post('/create', function(req, res) {
	// создание предмета, в ответ возвращается id созданного предмета
  subjectsServise.insertSubject(req.body, (subjectId) => {
    res.status(200).json({id: subjectId});
    res.end();
  }, (err) => {
    console.log(err);
  });
});

router.put('/:id/update', function(req, res) {
	// Изменить имя предмета
});

module.exports = router;
