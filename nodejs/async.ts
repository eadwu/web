import * as fs from "fs";

fs.readFile(`${__dirname}/input.txt`, (err, data) =>
{
  if (err) console.error(err);
  console.log(data.toString());
});

console.log("Program Ended");
