import * as fs from 'fs';
import { csv } from 'csvtojson';
import { pipeline } from 'stream';

const csvFilePath = './csv/Book1.csv';


export function task1() {
    process.stdin.setEncoding('utf8');
    console.log('String: \n');

    process.stdin.on('readable', () => {
        let chunk;

        while ((chunk = process.stdin.read()) !== null) {
            process.stdout.write(`${chunk.split('').reverse().join('')}\n`);
        }
    });
}

export function task2() {
    pipeline(
        fs.createReadStream(csvFilePath),
        csv(),
        fs.createWriteStream('nodejs-hw1-ex2.txt'),
        (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log('finished');
                task1();
            }
        }
    );
}

export default task2;
