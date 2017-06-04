'use strict';

const config = require('config');
const monitor = require('pg-monitor');

const pgp = require('pg-promise')(config.get('db').options);
monitor.setTheme('dimmed');
monitor.attach(config.get('db').options);
const connectionString = config.get('db').connection + config.get('db').name;
const db = pgp(connectionString);

module.exports = db;
