const db = require("../../connection/database");

const getAdminFromDB = (adminData, callback) => {
  db.query(
    "SELECT * FROM admin WHERE email = ?",
    [adminData.email],
    (err, result) => {
      if (err) {
        console.error("Error in AdminUserDB query:", err);
        return callback(err, null);
      } else {
        console.log(result);
        return callback(null, result);
      }
    },
  );
};

module.exports = {
  getAdminFromDB,
};
