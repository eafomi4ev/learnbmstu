'use strict';

const config = require('config');

const pgp = require('pg-promise')(config.get('db').options);
const connectionString = config.get('db').connection + config.get('db').name;
const db = pgp(connectionString);

module.exports = db;
