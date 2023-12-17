const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const auth = require('../service/auth');


const getUser = (req, res) => {
    userModel.getUserFromDB((err, result)=> {
        if(err){
            return res.status(500).json({error:'Internal Server Error'});
        } else {
          res.status(200).json(result);
        }
    })
}

const registerUser = (req, res) => {
    const userData = req.body;

    userModel.checkExistingUserFromDB(userData, (err, result) => {

        if(result.length > 0){
          return res.json({error: 'User Already Existed'});
        } else {

            bcrypt.hash(userData.password, 10, (hashErr, hashedPassword) => {
                if (hashErr) {
                  console.error("Password hashing error", hashErr);
                  return res.status(500).json({ message: "Internal Server Error" });
                }

                userModel.registerUserToDB(userData, hashedPassword, (err, result) => {
                    if(err){
                        return res.status(500).json({error: 'Internal Server Error'});
                    } else {
                        res.status(200).json({message: 'User Registration Successful'});
                    }
                })
            })  
            
        }
    }); 
}


const loginUser = (req, res) => {
    const userData = req.body;

    userModel.loginUserDB(userData, (err, result) => {

        if (result.length === 0) {
            return res.status(403).json({ msg: "User not found" });
        }
    
        const storedPassword = result[0].password;
        const user = result[0];
    
        bcrypt.compare(userData.password, storedPassword, (compareErr, isMatch) => {
            if (compareErr) {
              console.error("Password comparison error", compareErr);
              return res.status(500).json({ message: "Internal Server Error" });
            }
    
            if(isMatch){
              const jwtToken = auth.setUserAuth(user);
              return res.json({ jwtToken });
            } else {
                return res.status(401).json({ message: "Incorrect Password" });
            }
        });
    })    
}

module.exports ={
    getUser,
    registerUser,
    loginUser
}