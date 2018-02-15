(() =>
{
  function getRandomInteger (min: number, max: number): number
  {
    return parseInt((Math.random() * (max + 1 - min)).toString(), 10) + min;
  }

  function forNDo (n: number, func: (index: number) => any): void
  {
    for (let index = 0; index < n; index++)
      func(index);
  }

  function mapRange (n: number, func: (index: number) => void): Array<any>
  {
    const arr = [];
    forNDo(n, i => { arr.push(func(i)); });
    return arr;
  }

  function loop (source: Array<any>, func: (value: any, index: number, source: Array<any>) => void)
  {
    if (source.length <= 0) return;
    for (let i = 0; i < source.length; i++) func(source[ i ], i, source);
  }

  this.getRandomInteger = getRandomInteger;
  this.forNDo = forNDo;
  this.mapRange = mapRange;
  this.loop = loop;
}).call(this);
