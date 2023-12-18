const { getUserAuth } = require("../service/auth");

async function restrictToLoggedInUserOnly(req, res, next) {
  const userJwtToken = req.cookies.jwtToken;

  if (!userJwtToken)
    return res.redirect("/users/login?message=Please%20Login%21%20to%20Access");

  const user = getUserAuth(userJwtToken);

  if (!user) return res.redirect("/users/login");

  req.user = user;

  next();
}

module.exports = {
  restrictToLoggedInUserOnly,
};
