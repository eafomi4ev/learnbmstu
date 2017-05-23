let db = require('../instances/db');

beforeEach(function() {
	this.user = [{
		'id': 1,
		'name': 'Фомичев Егор Андреевич',
		'login': 'akbars',
		'password': '123',
		'group': 'ИУ1-123',
		'role': 'student',
		'mis': 5
	}];
});

describe('Get user info', function() {
	it('By ID', function() {
		// console.log(this);
		expect(db.getUserById(1)).toEqual(this.user);
	});
});
