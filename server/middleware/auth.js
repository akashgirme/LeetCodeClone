const { getUserAuth } = require("../service/auth");

async function restrictToLoggedInUserOnly(req, res, next) {
  const jwtToken = req.cookies.jwtToken;

  if (!jwtToken) {
    return res.json({ message: "Error! Please re-Login to get Access" });
  }

  const user = getUserAuth(jwtToken);

  if (!user) return res.redirect("/user/login");

  req.user = user;

  next();
}

module.exports = {
  restrictToLoggedInUserOnly,
};
