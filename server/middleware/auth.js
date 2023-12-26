const { getUserAuth } = require("../service/auth");

async function restrictToLoggedInUserOnly(req, res, next) {
  const jwtToken = req.cookies.jwtToken;
  
  if (!jwtToken) {
    return res.json({ message: "Error! Please re-Login to get Access" });
  }

  const user = getUserAuth(jwtToken);

  if (!user) return res.redirect("/api/user/login");

  req.user = user;

  next();
}

async function restrictToLoggedInAdminOnly(req, res, next) {
  const jwtToken = req.cookies.adminJwtToken;

  if (!jwtToken) {
    return res.json({ message: "Error! Please re-Login to get Access" });
  }

  const admin = getUserAuth(jwtToken);

  if (!admin) return res.redirect("/api/admin/login");

  req.admin = admin;
  next();
}

module.exports = {
  restrictToLoggedInUserOnly,
  restrictToLoggedInAdminOnly,
};
