const { Sequelize } = require('sequelize');
const user = require('../models/user.model');

// Passing a connection URI for postgres
const sequelize = new Sequelize('postgres://rqlfyilj:UfAPfkv30_-czBUTz8d50Q8hUw6mzDiq@balarama.db.elephantsql.com:5432/rqlfyilj');

const User = sequelize.define('User', user, {
	// Other model options go here
});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

const entity = {};
entity.authenticate = function () {
	sequelize.authenticate().then(() => {
		console.log('Connection established successfully.');
	}).catch(err => {
		console.error('Unable to connect to the database:', err);
	}).finally(() => {
		sequelize.close();
	});
}

// User.sync().then(() => {
//     console.log('New table created');
// }).finally(() => {
//     sequelize.close();
// });


module.exports = entity;
