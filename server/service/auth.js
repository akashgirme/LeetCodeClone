const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtSecretKey =  process.env.JWT_SECRET_KEY;

function setUserAuth(user) {
  return jwt.sign(
    {
      email: user.email,
    },
    jwtSecretKey,
  );
}

function getUserAuth(jwtToken) {
  if (!jwtToken) return null;

  try {
    return jwt.verify(jwtToken, jwtSecretKey);
  } catch (error) {
    return null;
  }
}

function getEmailFromJWT(jwtToken){
  if (!jwtToken) return null;

  try {
    const decodedToken = jwt.decode(jwtToken, { complete: true });
    if (!decodedToken) return null;

    const email = decodedToken.payload.email;
    return email;

  } catch (error) {
    return null;
  }
}

module.exports = {
  setUserAuth,
  getUserAuth,
  getEmailFromJWT,
};
