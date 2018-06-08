(() =>
{
  function getRandomInteger (min: number, max: number): number
  {
    return parseInt((Math.random() * (max + 1 - min)).toString(), 10) + min;
  }

  function flatten2D (matrix: any[][])
  {
    return matrix.reduce((a, v) => a.concat(v));
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

  function mapRange (n: number, func: (i: number) => any): any[]
  {
    const arr = [];
    forNDo(n, i => arr.push(func(i)));
    return arr;
  }

  function matrix2D (r: number, c: number)
  {
    return new Array(r).fill(undefined).map(() => new Array(c).fill(undefined));
  }

  this.getRandomInteger = getRandomInteger;
  this.flatten2D = flatten2D;
  this.forNDo = forNDo;
  this.mapRange = mapRange;
  this.matrix2D = matrix2D;
}).call(this);
