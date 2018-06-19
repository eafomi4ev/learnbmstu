const promise = require('bluebird');

module.exports = {
  root: `${process.cwd()}`,
  filesRoot: `${process.cwd()}/files`,
  lecturesRoot: `${process.cwd()}/public/lectures`,
  limitFileSize: 10e6,
  db: {
    server: 'postgres',
    userName: 'egor',
    password: 'egor',
    host: 'localhost',
    port: '5432',
    dbName: 'meclever',
    get connectionString() {
      return `${this.server}://${this.userName}:${this.password}@${this.host}:${this.port}/${this.dbName}`;
    },
    options: {
      // Initialization Options
      promiseLib: promise,
    },
  },
  serverURL: 'http://localhost:3000',
};
debugger;
