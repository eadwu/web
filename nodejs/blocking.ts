import * as fs from "fs";
const data = fs.readFileSync(`${__dirname}/input.txt`);

console.log(data);
console.log(data.toString());
console.log("Program Ended");
