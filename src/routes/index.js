var express = require('express');
var router = express.Router();
const registers = require('../controller/Register/routes');
const logins = require('../controller/Login/routes');
const user = require('../controller/Users/routes');

router.use('/register', registers);
router.use('/login', logins);
router.use('/user', user);

module.exports = router;
