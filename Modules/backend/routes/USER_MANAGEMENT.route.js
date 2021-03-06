const express = require('express');
const router = express.Router();

// 2 controllers needed
// Controller 1: User management
const USER_MANAGEMENT_controller = require('../controllers/USER_MANAGEMENT.controller');

//===========//
// PART A: FOR USER MANAGEMENT
//===========//
// a simple test url to check that all of our files are communicating correctly.
router.get('/test', USER_MANAGEMENT_controller.test);
// user creation (Signup)
router.post('/signup', USER_MANAGEMENT_controller.signup);
// User login
router.post('/login', USER_MANAGEMENT_controller.login);
// User logout
router.get('/logout', USER_MANAGEMENT_controller.logout);


module.exports = router;
