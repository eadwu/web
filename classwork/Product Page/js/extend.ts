Object.fold = function (obj, func)
{
  for (k in obj)
  {
    func(obj[ k ], k);
  }
};

Object.size = function (obj)
{
  return Object.keys(obj).length;
};

Object.random = function (obj)
{
  const nKeys = Object.size(obj);

  return obj[ Object.keys(obj)[ Utility.getRandomInteger(0, nKeys - 1) ] ];
}
