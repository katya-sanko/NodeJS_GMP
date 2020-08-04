const csvFilePath = './csv/Book1.csv';
const fs = require('fs');
const { pipeline } = require('stream');
const csv = require('csvtojson');


pipeline(
	fs.createReadStream(csvFilePath),
	csv(),
	fs.createWriteStream('nodejs-hw1-ex2.txt'),
	(error) => {
		if (error) {
			console.log(error);
		} else {
			console.log('finished');
		}
	}
);
