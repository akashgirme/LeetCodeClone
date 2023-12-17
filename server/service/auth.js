const jwt = require('jsonwebtoken');

const jwtSecretKey = 'LeetCodeClone@akash';

function setUserAuth(user){
    return jwt.sign(
        {
            _id: user.user_id,
            email: user.email,
        },
        jwtSecretKey
    );
}

function getUserAuth(token) {
    if(!token) return null;

    try{
        return jwt.verify(token, jwtSecretKey);
    } catch (error) {
        return null;
    }
}

module.exports = {
    setUserAuth,
    getUserAuth,
}