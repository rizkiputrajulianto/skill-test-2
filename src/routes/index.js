var express = require('express');
var router = express.Router();
const registers = require('../controller/Register/routes');
const logins = require('../controller/Login/routes');

router.use('/register', registers);
router.use('/login', logins);

module.exports = router;
