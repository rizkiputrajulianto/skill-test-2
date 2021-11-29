const { Users } = require('../../models');
const { body } = require('express-validator');

const service = async (req, res, next) => {
	try {
		const payload = req.body;
		const requestDB = await Users.create(payload);
		if (requestDB) {
			return res.json({ msg: 'Berhasil daftar', data: requestDB });
		}
		else {
			return res.json({ msg: 'Gagal daftar' });
		}
	} catch (error) {
		return res.status(500).json({ msg: error.toString() });
	}
};

const validator = [
	body('email').isEmail().withMessage('Email tidak valid').custom((value) => {
		return Users.findOne({ where: { email: value } }).then((data) => {
			if (data) {
				return Promise.reject('Email sudah digunakan');
			}
		});
	}),
	body('password').isLength({ min: 8 }).withMessage('Password minimal 8 karakter'),
	body('gender').isIn([ 'laki-laki', 'perempuan' ]).withMessage('Gender Hanya Laki-Laki dan Perempuan'),
	body('phone')
		.isLength({ min: 10, max: 13 })
		.withMessage('Nomor Telepon minimal 10 angka dan maksimal 13 angka')
		.custom((values) => {
			return Users.findOne({ where: { phone: values } }).then((datas) => {
				if (datas) {
					return Promise.reject('Nomor Telepon sudah digunakan');
				}
			});
		}),
	body('name').notEmpty().withMessage('Nama Tidak Boleh Kosong'),
	body('address').notEmpty().withMessage('Alamat Tidak Boleh Kosong')
];

module.exports = { service, validator };
