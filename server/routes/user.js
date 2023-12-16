const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();


router.get('/', userController.getUser);

router.post('/register',userController.registerUser);


module.exports = router;