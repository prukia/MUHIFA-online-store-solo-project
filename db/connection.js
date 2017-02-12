var pg = require('pg');

var pool = new pg.Pool({
  database: 'Muhifa'
});

module.exports = pool;
