const db = require("../connection/database");

const getProblemsFromDB = (callback) => {
    db.query('SELECT * FROM problems', (error, result) => {
        if(error){
            return callback(error, null);
        } else {
            return callback(null, result);
        }
    });
}

const getProblemsByIDFromDB = (problemId, callback) => {
    db.query('SELECT * FROM problems WHERE problemid = ?', [problemId], (error, result) => {
        if(error){
            return callback(error, null);
        } else {
            return callback(null, result);
        }
    })
}


module.exports = {
    getProblemsFromDB,
    getProblemsByIDFromDB
}