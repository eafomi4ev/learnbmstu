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
  for (let fileName in req.files) {
    let file = req.files[fileName];
    let newFileName = `${req.body[fileName]}.pdf`;
    let filePath = path.join(config.get('lecturesRoot'),
        `${req.body['subjectName']}`, `${newFileName}`);
    let lecture = {
      lecture_name: req.body[fileName],
      lecture_path: filePath.substr(filePath.indexOf('/public')),
    };
    let subject = {
      subject_name: req.body['subjectName'],
    };

    fs.ensureDirSync(
        path.join(config.get('lecturesRoot'), `${req.body['subjectName']}`));

    file.mv(filePath, (err) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        return res.end();
      }
      console.log('Загрузка норм прошла');
      // лекции загрузились, можно создавать предмет и лекции в БД
      eventEmitter.emit('lecturesUploaded', req, res, subject, lecture);
    });
  }
});

router.put('/:id/update', function(req, res) {
  // Изменить лекцию
});

module.exports = router;
