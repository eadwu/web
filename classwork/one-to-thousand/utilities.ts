function getRandomInteger (min: number, max: number): number
{
  return parseInt(Math.random() * (max + 1 - min), 10) + min;
}

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
