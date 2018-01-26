(() =>
{
  const _window = this;

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

  function mapRange (n: number, func: (index: number) => any): any[]
  {
    const result = [];
    forNDo(n, index => result.push(func(index)));
    return result;
  }

  _window.getRandomInteger = getRandomInteger;
  _window.getOrdinalSuffix = getOrdinalSuffix;
  _window.forNDo = forNDo;
  _window.mapRange = mapRange;
}).call(this);
