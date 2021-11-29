const { Users } = require('../../models');
const { compareSync } = require('bcrypt');
const { createJWT } = require('../../middleware/jwt');
const { body } = require('express-validator');

const service = async (req, res, next) => {
	try {
		const payload = req.body;
		const requestDB = await Users.findOne({ where: { email: payload.email } });
		if (requestDB) {
			const validUser = compareSync(payload.password, requestDB.password);
			if (validUser) {
				const name = requestDB.name;
				delete requestDB.dataValues.password;
				return res.json({ msg: `Berhasil Login, Welcome ${name}`, token: createJWT(requestDB) });
			}
			else {
				return res.status(400).json({ msg: 'Email dan Password tidak Cocok' });
			}
		}
		else {
			return res.status(400).json({
				msg: 'Email tidak Terdaftar'
			});
		}
	} catch (error) {
		return res.status(500).json({ msg: error.toString() });
	}
};

const validator = [
	body('email').isEmail().withMessage('Email tidak Valid').notEmpty().withMessage('Email tidak boleh kosong'),
	body('password').notEmpty().withMessage('Password tidak boleh kosong')
];

module.exports = { service, validator };
