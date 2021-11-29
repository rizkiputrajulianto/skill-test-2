const { Users } = require('../../models');

const service = async (req, res, next) => {
	try {
		const requestDB = await Users.findAll({ attributes: [ 'name', 'gender', 'phone' ] });
		if (requestDB) {
			return res.json({ data: requestDB });
		}
	} catch (error) {
		return res.status(500).json({ msg: error.toString() });
	}
};

module.exports = { service };
