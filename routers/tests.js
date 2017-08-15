'use strict';

const express = require('express');
const router = express.Router();
const testsService = require('../service/tests');
const userService = require('../service/users');
const questionsService = require('../service/question');
const pdf = require('html-pdf');
const handlebars = require('handlebars');
const fs = require('fs');

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

router.post('/start', function(req, res) {
  let userId = +req.body.userId;
  let testId = +req.body.testId;
  let dateStart = new Date();
  testsService.insertTesting(testId, userId, dateStart, (data) => {
    console.log(data);
    res.end(JSON.stringify(data));
  }, (err) => {
    console.log(err);
    res.end(err);
  });
});

router.post('/set/answer', function(req, res) {
  testsService.insertUserAnswer(
      req.body.userTestingId,
      req.body.questionId,
      req.body.answerId,
      () => {
        res.statusCode = 200;
        res.end();
      },
      (err) => {
        console.log(err);
        res.statusCode = 400;
        res.end();
      }
  );
});

router.post('/finish', (req, res) => {
  testsService.finishTesting(
      new Date(),
      req.body.userTestingId,
      () => {
        res.statusCode = 200;
        res.end();
      },
      (err) => {
        console.log(err);
        res.statusCode = 400;
        res.end();
      });
});

router.get('/report/:id', (req, res) => {
  debugger;
  let html = fs.readFileSync('./easyhtml.html', 'utf8');
  let template = handlebars.compile(html);
  let data = {
    title: 'Загловок',
    fullName: 'Васичкин Петр Леонидович',
    group: 'ИУ10-53',
    subject: 'Нейронные сети',
    option: 4,
    date: '12/05/2017',
    answers: [
      {
        answer: 3,
        isCorrect: false,
      },
      {
        answer: 'Зеленого',
        isCorrect: true,
      },
    ],
  };
  let result = template(data);
  let options = {};
  // window.open
  let fileName = './reports/report_' + req.params.id + '_' + (+new Date()) +
      '.pdf';
  pdf.create(result, options).
      toFile(fileName, (err, file) => {
        res.json(file).end();
      });
});

router.get('/random/:subjectId', function(req, res) {
  let subjectId = +req.params.subjectId;

  testsService.getSubjectTestsId(subjectId, (testsId) => {
    let randomPosition = Math.floor(
        1 + Math.random() * (testsId.length + 1 - 1));
    testsService.getTestBySubjectId(subjectId,
        testsId[randomPosition - 1].testid,
        (data) => {
          let test = _makeTreeViewInTest(data);

          res.status(200).json(test);
          res.end();
        }, (err) => {
          console.log(err);
        });
  }, (err) => {
    console.log(err);
  });
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

function _makeTreeViewInTest(json) {
  let test = {
    testId: json[0].testid,
    testName: json[0].test_name,
    testDuration: json[0].duration,
    subjectName: json[0].subject_name,
    questions: [],
  };

  let questions = {};
  for (let i in json) {
    if (!questions.hasOwnProperty(json[i].question_text)) {
      questions[json[i].question_text] = {
        questionId: json[i].questionid,
        questionText: json[i].question_text,
        answers: [],
      };
    }
    questions[json[i].question_text].answers.push({
      answerId: json[i].answerid,
      answerText: json[i].answer_text,
      isCorrect: json[i].is_correct,
    });
  }
  for (let key in questions) {
    test.questions.push(questions[key]);
  }
  return test;
}
