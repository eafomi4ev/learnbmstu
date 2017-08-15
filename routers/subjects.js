'use strict';

const express = require('express');
const subjectsServise = require('../service/subjects');
const lecturesServise = require('../service/lectures');

const router = express.Router();

// api
router.get('/withlectures', function(req, res) {
	subjectsServise.getSubjectsAndLectures((data) => {
    let subjects = _makeTreeViewSubjectsAndLectures(data);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(subjects));
  }, (err) => {
    console.log(err);
    res.status(404).end();
  });
});

// // QUESTION: что должно возвращаться? Имя предмета или все его лекции?
// router.get('/:id', function(req, res) {
// 	// получение предмета по id
// });


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
  lecturesServise.insertLectures(lectures, () => {
    res.statusCode = 200;
    res.end();
  }, (err) => {
    console.log(err);
    res.status(400).json({
      message: JSON.stringify(err.detail),
    });
    res.end();
  });
});

router.post('/create', function(req, res) {
	// создание предмета, в ответ возвращается id созданного предмета
  let subject = req.body;
  subjectsServise.insertSubject(subject, (subjectId) => {
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

  // QUESTION: Функция в функции, норм?
  function _getEmptySubject() {
    return {
      subject_id: -1,
      subject_name: '',
      lectures: [],
    };
  }
};
