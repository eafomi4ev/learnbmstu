'use strict';

var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
	// получение всех лекций
});
// define the about route
router.get('/:id', function(req, res) {
	// получение лекции по id
});

module.exports = router;
