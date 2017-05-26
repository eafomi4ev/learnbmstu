'use strict';

const express = require('express');
const lecturesServise = require('../service/lectures');
const path = require('path');
const config = require('config');
const eventEmit = require('../instances/eventEmitter');
const router = express.Router();
const eventEmitter = eventEmit.eventEmitter;
const fs = require('fs-extra');

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

router.post('/upload', function(req, res) {
  let file = req.files.file;
  let newFileName = `${req.body.lectureName}.pdf`;
  let filePath = path.join(config.get('lecturesRoot'),
      `${req.body.subjectName}`, `${newFileName}`);
  let lecture = {
    lectureName: req.body.lectureName,
    lecturePath: filePath.substr(filePath.indexOf('/public')),
    subjectId: req.body.subjectId,
  };

  fs.ensureDirSync(
      path.join(config.get('lecturesRoot'), `${req.body['subjectName']}`));

  file.mv(filePath, (err) => {
    if (err) {
      console.error(err);
      res.statusCode = 500;
      return res.end();
    }
    console.log('Загрузилась лекция ', lecture.lecture_path);
  });
  lecturesServise.insertLecture(lecture, () => {
    res.status(200).json({message: `Лекция ${req.body.lectureName} создана`});
    res.end();
  }, (err) => {
    console.log(err);
  });
  // лекции загрузились, можно создавать предмет и лекции в БД
  // eventEmitter.emit('lecturesUploaded', req, res, subject, lectures);

});

router.put('/:id/update', function(req, res) {
  // Изменить лекцию
});

module.exports = router;
