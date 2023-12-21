const jwt = require("jsonwebtoken");

const jwtSecretKey = "LeetCodeClone@akash";

function setUserAuth(user) {
  return jwt.sign(
    {
      email: user.email,
    },
    jwtSecretKey,
  );
}

function getUserAuth(userJwtToken) {
  if (!userJwtToken) return null;

  try {
    return jwt.verify(userJwtToken, jwtSecretKey);
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
