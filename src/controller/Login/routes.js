const express = require('express');
const router = express.Router();
const login = require('./login.userController');
const validator = require('../../helpers/validator');

router.post('/', login.validator, validator, login.service);

module.exports = router;
