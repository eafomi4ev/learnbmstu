'use strict';

const express = require('express');
const router = express.Router();
const testsService = require('../service/tests');
const userService = require('../service/users');
const questionsService = require('../service/question');

/**
 * Создание теста
 * response id of test or err
 */
router.post('/create', function(req, res) {
  // создание теста
  if (!req.session.userLogin) {
    res.statusCode = 403;
    res.end();
  }
  userService.getUserByLogin(req.session.userLogin, (user) => {
    if (user.login === req.session.userLogin) {
      _addTestToDB(req, res);
    }
  }, (err) => {
    res.statusCode = 403;
    res.end();
  });
});

router.post('/:id/questions', function(req, res) {
  // создание лекций предмета
  let testId = +req.params.id;
  let questions = req.body;

  questionsServise.insertLectures(lectures, () => {
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

router.get('/start', function(req, res) {
  // начало нового тестирования
});

module.exports = router;

function _addTestToDB(req, res) {
  let test = {
    subjectId: req.body.subjectId,
    name: req.body.name,
    duration: req.body.duration,
  };
  testsService.insertTest(test, (testId) => {

    // При успешном добавлении теста, добавляем вопросы и ответы
    test.testId = testId;
    let questions = req.body.questions;
    for (let i = 0; i < questions.length; i++) {
      let question = {
        questionText: questions[i].questionText,
      };
      questionsService.insertQuestion(question, (questionId) => {
        question.questionId = questionId;
        let answers = question.answers;
        // for (let j=0;)
      }, (err) => {
      });
    }



    res.status(200).json(testId);
    res.end();
  }, (err) => {
    console.log(err);
    switch (+err.code) {
      case 22007:
        res.status(400).
            json({message: `Ошибка синтаксиса запроса при добавлении теста.`});
        break;
      case 23502:
        res.status(400).
            json({message: `Отсутствует часть данных о тесте.`});
        break;
      case 23505:
        res.status(400).
            json({message: `Такой тест у данного предмета уже есть.`});
        break;
      default:
        res.status(400).
            json(
                {message: `Ошибка при добавлении теста. Обратитесь к администратору.`});
    }
    res.end();
  });
}
