const { getUserAuth } = require("../service/auth");

async function restrictToLoggedInUserOnly(req, res, next) {
  const authorizationHeaderValue = req.headers["authorization"];
  if (
    !authorizationHeaderValue ||
    !authorizationHeaderValue.startsWith("Bearer")
  ) {
    return res.json({ message: " Please re-login!" });
  }

  const token = authorizationHeaderValue.split("Bearer ")[1];

  const user = getUserAuth(token);

  if (!user) {
    return res.json({ message: "Error" });
  }

  req.user = user;

  next();
}

async function restrictToLoggedInAdminOnly(req, res, next) {
  const authorizationHeaderValue = req.headers["authorization"];

  if (
    !authorizationHeaderValue ||
    !authorizationHeaderValue.startsWith("Bearer")
  ) {
    return res.json({ message: " Please re-login!" });
  }

  const token = authorizationHeaderValue.split("Bearer ")[1];
  const admin = getUserAuth(token);

  if (!admin) {
    return res.json({ message: "Error" });
  }

  req.admin = admin;

  next();
}

module.exports = {
  restrictToLoggedInUserOnly,
  restrictToLoggedInAdminOnly,
};
