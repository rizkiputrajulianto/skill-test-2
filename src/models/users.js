'use strict';
const { Model } = require('sequelize');
const { genSaltSync, hashSync } = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
	class Users extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
		}
	}
	Users.init(
		{
			id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
			name: DataTypes.STRING(50),
			address: DataTypes.STRING,
			phone: { type: DataTypes.STRING(13), unique: true },
			gender: DataTypes.ENUM('laki-laki', 'perempuan'),
			email: { type: DataTypes.STRING, unique: true },
			password: {
				type: DataTypes.STRING,
				set(value) {
					this.setDataValue('password', hashSync(value, genSaltSync(9)));
				}
			}
		},
		{
			sequelize,
			modelName: 'Users',
			tableName: 'users'
		}
	);
	return Users;
};
