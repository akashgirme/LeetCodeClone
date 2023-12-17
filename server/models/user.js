const db = require("../connection/database");

const getUserFromDB = (callback) => {
    db.query('SELECT * FROM users', (err, result) => {
        if (err) {
          console.error('MySQL query error:', err);
          callback(err,null);
        } else {
            callback(null, result);
        }
    });
};

const checkExistingUserFromDB = (userData, callback) => {

    db.query('SELECT * FROM users WHERE email = ?', [userData.email], (err, result) => {
        if(err){
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

const registerUserToDB = (userData, hashedPassword, callback) => {
    
    db.query('INSERT INTO users (email, password) VALUES (?, ?)',
    [userData.email, hashedPassword], (err, result) => {
        if (err) {  
          console.error("MySQL Query error", err);
          return callback(err, null);
        } else {
          return callback(null, result);
        }
    });
}

const loginUserDB = (userData, callback) => {

    db.query('SELECT * FROM users WHERE email = ?', [userData.email], (err, result) => {
        if(err){
            console.error('Error in loginUserDB query:', err);
            return callback(err, null);
        } else {
            return callback(null, result);
        }
    });
}


module.exports = {
    getUserFromDB,
    checkExistingUserFromDB,
    registerUserToDB,
    loginUserDB
}
