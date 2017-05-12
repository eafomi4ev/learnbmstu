// import DataBaseService from './db';

let dataBaseService = require('./db');

let db = new dataBaseService.DataBaseService();

console.log(db.getUserById(1));

// // Testing insertSubjectAndLectures
// let data = {
// 	'subject_id': -1,
// 	'subject_name': 'Механика полета',
// 	'lectures': [{
// 			'lecture_id': -1,
// 			'lecture_name': 'Введение',
// 			'lecture_path': null,
// 		},
// 		{
// 			'lecture_id': -1,
// 			'lecture_name': 'Восстание машин',
// 			'lecture_path': null,
// 		},
// 	],
// };
// // insertSubjectAndLectures(JSON.stringify(data));
//
// // Testing updateSubjectName
// let subjectInfo = {
// 	'subject_id': 32,
// 	'subject_name': 'Механика полета',
// 	'lectures': [{
// 			'lecture_id': 36,
// 			'lecture_name': 'Введение',
// 			'lecture_path': null,
// 		},
// 		{
// 			'lecture_id': 37,
// 			'lecture_name': 'Восстание машин',
// 			'lecture_path': null,
// 		},
// 	],
// };
// // updateSubjectName(subjectInfo, 'Механика недоперелета');
