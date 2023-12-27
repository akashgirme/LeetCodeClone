const adminAuthModel = require("../models/auth");
const bcrypt = require("bcrypt");
const auth = require("../../service/auth");

const handleAdminLogin = (req, res) => {
  const adminData = req.body;

  adminAuthModel.getAdminFromDB(adminData, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (result.length === 0) {
      return res.status(403).json({ msg: "Admin not found" });
    }

    const storedPassword = result[0].password;
    const storedEmail = result[0].email;

    const admin = result[0];

    if (storedPassword === adminData.password) {
      const adminJwtToken = auth.setUserAuth(admin);
      return res.json({ adminJwtToken, message: "Admin Login Successful" });
      
    } else {
      return res.status(401).json({ message: "Incorrect Password" });
    }
  });
};

const handleNothing = (req, res) => {
  return;
};

module.exports = {
  handleAdminLogin,
  handleNothing,
};
