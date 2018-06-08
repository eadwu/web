interface Array<T>
{
  fold (func: (value: any, index: any) => any): any[];
  sum (): number;
}

Array.prototype.fold = function (this: any[], func: (value: any, index: any) => any): any[]
{
  const self = this;
  forNDo(self.length, function (i)
  {
    func(self[ i ], i);
  });
  return self;
};

Array.prototype.sum = function (this: any[]): number
{
  const self = this;
  return self.reduce((a, v) => v ? a + v : a, 0);
};
