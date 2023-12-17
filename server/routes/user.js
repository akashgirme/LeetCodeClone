const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

const { restrictToLoggedInUserOnly } = require('../middleware/auth');


router.get('/', restrictToLoggedInUserOnly, userController.handleGetUser);

router.post('/register',userController.handleRegisterUser);

router.post('/login', userController.handleLoginUser);

module.exports = router;