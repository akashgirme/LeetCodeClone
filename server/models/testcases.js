const db = require("../connection/database");


const getTestCasesFromDB = (problemId, callback) => {
    db.query('SELECT * FROM testcases WHERE problemid = ?', [problemId], 
    (err, result) => {
        if(err){
            return callback(err, null);
        } else {
            return callback(null, result);
        }
    });
}


module.exports ={
    getTestCasesFromDB,
  }