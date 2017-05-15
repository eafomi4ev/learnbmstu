const promise = require('bluebird');

module.exports = {
  publicRoot: `${process.cwd()}/public`,
  filesRoot: `${process.cwd()}/files`,
  limitFileSize: 10e6,
  db: {
    connection: 'postgres://localhost:5432/',
    name: 'testing',
    options: {
      // Initialization Options
      promiseLib: promise,
    },
  },
  lectureDir: '/public/lectures',
}
;
