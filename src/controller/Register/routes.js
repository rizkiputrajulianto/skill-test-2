const express = require('express');
const router = express.Router();
const registerUser = require('./create.usersController');
const validator = require('../../helpers/validator');

router.post('/', registerUser.validator, validator, registerUser.service);

module.exports = router;
