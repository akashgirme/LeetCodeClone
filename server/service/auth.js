const jwt = require("jsonwebtoken");

const jwtSecretKey = "LeetCodeClone@akash";

function setUserAuth(user) {
  return jwt.sign(
    {
      _id: user.user_id,
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

module.exports = {
  setUserAuth,
  getUserAuth,
};
