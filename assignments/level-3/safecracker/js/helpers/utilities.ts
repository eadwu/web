(() =>
{
  const _window = this;

  function loop (source: Array<any>, func: (value: any, index: number, source: Array<any>) => void)
  {
    if (source.length <= 0) return;
    for (let i = 0; i < source.length; i++) func(source[ i ], i, source);
  }

  function forNDo (n: number, func: (iteration: number) => any)
  {
    for (let i = 1; i <= n; i++) func(i);
  }

  function mapRange (n: number, func: (iteration: number) => void): Array<any>
  {
    const arr = [];
    forNDo(n, i => { arr.push(func(i)); });
    return arr;
  }

  function getRandomInteger (min: number, max: number): number
  {
    return min + Math.floor(Math.random() * (max + 1 - min));
  }

  _window.loop = loop;
  _window.forNDo = forNDo;
  _window.mapRange = mapRange;
  _window.getRandomInteger = getRandomInteger;
}).call(this);
