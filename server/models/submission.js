const db = require('../connection/database');

const addSolutionToDB = (problemId, code , email, callback) => {

    db.query('SELECT user_id FROM users WHERE email = ?',
    [email],
    (getUserIdErr, getUserIdResult) => {
      if (getUserIdErr) {
        console.error('MySQL query error' ,getUserIdErr);
        return callback(getUserIdErr, null);
      }

      if (getUserIdResult.length === 0) {
        console.error('No User Found');
        return 
      }

      const userId = getUserIdResult[0].user_id;

      db.query('SELECT * FROM submission WHERE user_id = ? AND problemid = ?',
      [userId, problemId],
      (existingSubmissionErr, existingSubmissionResults) => {
        if (existingSubmissionErr) {
          console.error("MySQL query error:", existingSubmissionErr);
          return callback(existingSubmissionErr, null);
        }

        if (existingSubmissionResults.length > 0) {
            console.error({ msg: "Submission already exists for this problem" });
            const existingSubmissionResults = json({message:'Submission already exists for this problem'});
            return callback(null, existingSubmissionResults);
        }

        db.query(
            'INSERT INTO submission (user_id, problemid, code) VALUES (?, ?, ?)',
            [userId, problemId, code],
            (insertErr, insertResult) => {

              if (insertErr) {
                console.error("MySQL query error:", insertErr);
                return callback(insertErr, null);

              } else {
                return callback(null, insertResult);
              }
            });
       });

    });
}



module.exports = {
    addSolutionToDB,
}