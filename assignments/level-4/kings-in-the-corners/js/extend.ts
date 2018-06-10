interface Array<T>
{
  fold (func: (value: any, index: any) => any): any[];
  sum (): number;
}

Array.prototype.includesArr = function (this: any[], arr: any): boolean
{
  const self = this;
  return JSON.stringify(self).indexOf(JSON.stringify(arr)) > -1;
};

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
