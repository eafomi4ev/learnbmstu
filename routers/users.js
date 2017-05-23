'use strict';

let express = require('express');
let router = express.Router();
const usersServise = require('../service/users');

router.get('/:id', function(request, response) {
  // Достать user по id
  let id = +request.params.id;
  usersServise.getUserById(id, (user) =>{
    delete user.password;
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(user));
  }, (err) => {
    console.log(err);
    response.status(404).end();
  });
});

router.post('/login', function(request, response) {
  let user = request.body;

  if (!isAllfieldHasContent(user)) {
    response.status(400).json({
      message: 'Не все поля заполнены.',
    });
    return response.end();
  }

  usersServise.getUserByLogin(user.login,
      (userfromdb) => {
        console.log(userfromdb);
        if (userfromdb.password === user.password) {
          delete userfromdb.password;
          request.session.userLogin = userfromdb.login;
          response.status(201);
          response.setHeader('Content-Type', 'application/json');
          response.end(JSON.stringify(userfromdb));
        } else {
          response.status(404).json({
            message: 'Неправильный логин или пароль',
          });
          response.end();
        }
      },
      () => {
        response.status(404).json({
          message: 'Неправильный логин или пароль',
        });
        response.end();
      }
  );
});

router.post('/register', function(request, response) {
  let user = request.body;
  if (!isAllfieldHasContent(user)) {
    response.status(400).json({message: 'Не все поля заполнены.'});
    return response.end();
  }

  usersServise.insertUser(user, (profile) => {
    response.statusCode = 200;
    response.end(JSON.stringify(profile));
  }, (err) => {
    if(err.code === '23505') {
      // 23505 - Ошибка pg-promise. Такой логин уже существует
      response.statusCode = 400;
      response.json({
        message: 'Пользователь с таким логином уже существует.',
      });
    }
    response.end();
  });
});

module.exports = router;

function isAllfieldHasContent(user) {
  for (let key in user) {
    // user[key] - login, password, etc.
    // если user[key] is null или user[key] is пустая строка
    if (!user[key] || user[key] === '') {
      return false;
    }
  }
  return true;
}
