const { Sequelize } = require('sequelize');
const user = require('../models/user.model');

// Passing a connection URI for postgres
const sequelize = new Sequelize('postgres://rqlfyilj:UfAPfkv30_-czBUTz8d50Q8hUw6mzDiq@balarama.db.elephantsql.com:5432/rqlfyilj');

const User = sequelize.define('User', user, {
	// Other model options go here
});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

const userMapper = {};

userMapper.createTable = function() {
	User.sync().then(() => {
		console.log('New table created');
	}).finally(() => {
		//sequelize.close();
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
	
	sequelize.sync({ force: true }).then(() => {
		User.bulkCreate(users, { validate: true }).then(() => {
			console.log('Users populated');
		}).catch((err) => {
			console.log('Failed to populate Users');
			console.log(err);
		}).finally(() => {
			// sequelize.close();
		});
	});

};

userMapper.getRecords = function() {
	return User.findAll();
};

userMapper.getRecordById = function(id) {
	return User.findOne({ where: { id: id } });
};

userMapper.addRecord = function(newUser) {
	return User.create(newUser);
};

userMapper.updateRecord = function(id, newProps) {
	return User.update(newProps, { where: { id: id } });
};

module.exports = userMapper;
