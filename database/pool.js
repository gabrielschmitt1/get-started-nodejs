const { Pool } = require('pg');

const pool = new Pool({
    user: 'admin',
    host: '127.0.0.1',
    database: 'register',
    password: 'admin',
    port: 5432,
});

module.exports = pool;
