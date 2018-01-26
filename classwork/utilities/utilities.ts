function getRandomInteger (min: number, max: number): number
{
  return parseInt((Math.random() * (max + 1 - min)).toString(), 10) + min;
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

function forNDo (n: number, func: (index: number) => any): void
{
  for (let index = 0; index < n; index++)
    func(index);
}

function mapRange (n: number, func: (iteration: number) => void): Array<any>
{
  const arr = [];
  for (let i = 1; i <= n; i++) arr.push(func(i));
  return arr;
}

function loop (source: Array<any>, func: (value: any, index: number, source: Array<any>) => void)
{
  if (source.length <= 0) return;
  for (let i = 0; i < source.length; i++) func(source[ i ], i, source);
}
