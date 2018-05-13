import { readFile } from "fs";
import { resolve } from "path";

const vowels = [ "a", "e", "i", "o", "u", "y",
  "A", "E", "I", "O", "U", "Y" ];

readFile(resolve(__dirname, "input.txt"), { encoding: "utf8" }, (err, res) =>
{
  if (err) console.error(err);
  console.log(res);

  console.log(res.trim().split(".").map(sentence =>
    sentence.trim().split(" ").filter(word => word.length > 0).map(word =>
    {
      const i = vowels.map(vowel => word.indexOf(vowel)).filter(i => i > -1).sort((a, b) => a - b)[ 0 ];

      return word.substring(i) + word.substring(0, i) + "ay";
    }).join(" ")).join(". "));
});

console.log("Reading...");
