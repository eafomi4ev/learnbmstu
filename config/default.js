const promise = require('bluebird');

module.exports = {
  root: `${process.cwd()}`,
  filesRoot: `${process.cwd()}/files`,
  lecturesRoot: `${process.cwd()}/public/lectures`,
  limitFileSize: 10e6,
  db: {
    connection: 'postgres://localhost:5432/',
    name: 'newtesting',
    options: {
      // Initialization Options
      promiseLib: promise,
    },
  },
  serverURL: 'http://localhost:3000',
}
;
