const { createConnection } = require('mysql2');

const con = createConnection({
    host: 'localhost',
    user: 'flxwer_moderation',
    database: 'flxwer_moderation',
    password: '123'
});

module.exports = con