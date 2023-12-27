const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtSecretKey = process.env.JWT_SECRET_KEY;

function setUserAuth(user) {
  return jwt.sign( { email: user.email }, jwtSecretKey );
}

function getUserAuth(token) {
  if (!token) return null;

  try {
    const payload = jwt.verify(token, jwtSecretKey);
    return payload;
  } catch (error) {
    return null;
  }
}


/*

function getEmailFromJWT(token) {
  if (!token) return null;

  try {
    const decodedToken = jwt.decode(token, { complete: true });
    if (!decodedToken) return null;

    const email = decodedToken.payload.email;
    return email;
  } catch (error) {
    return null;
  }
}


*/


module.exports = {
  setUserAuth,
  getUserAuth
};
