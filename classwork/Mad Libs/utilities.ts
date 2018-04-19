(() =>
{
  function getRandomInteger (min: number, max: number): number
  {
    return parseInt((Math.random() * (max + 1 - min)).toString(), 10) + min;
  }

  function forNDo (n: number, func: (iteration: number) => any)
  {
    function recurse (i: number, n: number, func: (iteration: number) => any)
    {
      if (i >= n) return;

      func(i);
      recurse(++i, n, func);
    }

    recurse(0, n, func);
  }

  this.getRandomInteger = getRandomInteger;
  this.forNDo = forNDo;
}).call(this);
