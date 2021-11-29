const express = require('express');
const router = express.Router();
const list = require('./get.usersController');
const auth = require('../../middleware/jwt');

router.get('/', auth.checkJwt, list.service);

module.exports = router;
