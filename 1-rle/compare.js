const fs = require('fs');

const [path1, path2] = process.argv.slice(2);

const input1 = fs.readFileSync(path1, { encoding: 'utf-8' });
const input2 = fs.readFileSync(path2, { encoding: 'utf-8' });

console.log(input1 === input2);
