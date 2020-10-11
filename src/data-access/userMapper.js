const logger = require('../services/customLogger');
const MODULE_NAME = 'userMapper.js';

const { Sequelize } = require('sequelize');
const user = require('../models/user.model');

// Passing a connection URI for postgres
const sequelize = new Sequelize('postgres://rqlfyilj:UfAPfkv30_-czBUTz8d50Q8hUw6mzDiq@balarama.db.elephantsql.com:5432/rqlfyilj');

const User = sequelize.define('User', user, {});
const userMapper = {};

userMapper.createTable = function() {
	User.sync().then(() => {
		logger.info(`[${MODULE_NAME}]: User table has been created.`);
	});
};

userMapper.populateTable = function() {
	let users = [
		{ login: 'Latte',  password: 'latte1', age: 34, isDeleted: false },
		{ login: 'Cappuccino',  password: 'cappuccino1', age: 30, isDeleted: false },
		{ login: 'Americano',  password: 'americano1', age: 27, isDeleted: false },
		{ login: 'Espresso',  password: 'espresso1', age: 35, isDeleted: false },
		{ login: 'Doppio',  password: 'doppio1', age: 22, isDeleted: false },
		{ login: 'Frappuccino',  password: 'frappuccino1', age: 35, isDeleted: false }
	];
	
	return sequelize.sync({ force: true }).then(() => {
		User.bulkCreate(users, { validate: true }).then(() => {
			logger.info(`[${MODULE_NAME}]: bulkCreate() invoked with params <users> ${users}`);
		}).catch((err) => {
			logger.error( `[${MODULE_NAME}]: bulkCreate() failed. See the log: ${err}`);
		});
	});

};

userMapper.getRecords = function() {
	logger.info(`[${MODULE_NAME}]: findAll() invoked without params`);
	return User.findAll();
};

userMapper.getRecordById = function(id) {
	logger.info(`[${MODULE_NAME}]: findOne() invoked with param <id> ${id}`);
	return User.findOne({ where: { id: id } });
};

userMapper.addRecord = function(newUser) {
	logger.info(`[${MODULE_NAME}]: create() invoked with param <newUser> ${newUser}`);
	return User.create(newUser);
};

userMapper.updateRecord = function(id, newProps) {
	logger.info(`[${MODULE_NAME}]: update() invoked with params <id> ${id} <newProps> ${newProps}`);
	return User.update(newProps, { where: { id: id } });
};

module.exports = userMapper;
