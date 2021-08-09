const {
    createpool
} = require('mysql');

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "jobs",
    connectionLimit: 10
})

pool.query('select * from jobs', (err, resuluts, fields))=> {
    if (err) {
        return console.log(err);

    }
    return console.log(result);
}