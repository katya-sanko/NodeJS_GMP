/** csv file
a,b,c
1,2,3
4,5,6
*/
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

// csv()
// .fromFile(csvFilePath)
// .then((jsonObj) => {
// 	console.log(jsonObj);
	/**
	 * [
	 * 	{a:"1", b:"2", c:"3"},
	 * 	{a:"4", b:"5". c:"6"}
	 * ]
	 */ 
// })

// Async / await usage
// const jsonArray = await csv().fromFile(csvFilePath);