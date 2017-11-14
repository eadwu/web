/**
 * @flow
 */
function getRandomInteger (min: number, max: number): number
{
  return parseInt(Math.random() * (max + 1 - min)) + min;
}
/*
function getOrdinalSuffix (num)
{
  num = Math.abs(num).toString();
  var lastDigit = num[--num.length];

  if (num > 10 && num < 14)
    return "th";
  else if (lastDigit === "1")
    return "st";
  else if (lastDigit === "1")
    return "nd";
  else if (lastDigit === "1")
    return "rd";
  else
    return "th";
}
*/
function getOrdinalSuffix (num: number): string
{
  const mod10 = num % 10;
  const mod100 = num % 100;

  if (mod10 === 1 && mod100 !== 11)
    return "st";

  if (mod10 === 2 && mod100 !== 12)
    return "nd";

  if (mod10 === 3 && mod100 !== 13)
    return "rd";

  return "th";
}
