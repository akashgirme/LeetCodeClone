const express = require("express");

const router = express.Router();

const adminAuth = require("../controller/auth");

//router.post('/', adminAuth.handleNothing);

router.post("/login", adminAuth.handleAdminLogin);

router.use((req, res) => {
  console.log("Request to /api/admin/login not handled:", req.url);
  res.status(404).json({ message: "Not Found" });
});

module.exports = router;
