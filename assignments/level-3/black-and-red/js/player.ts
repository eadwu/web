interface PlayerParam
{
  lastStrategy?: number;
  redTokens?: number;
  blackTokens?: number;
}

class Player
{
  _params: PlayerParam;
  constructor (params?: PlayerParam)
  {
    this._params = {
      lastStrategy: undefined,
      redTokens: 10,
      blackTokens: 10,
      ...params
    };
  }

  getRedTokens ()
  {
    return this._params.redTokens;
  }

  getBlackTokens ()
  {
    return this._params.blackTokens;
  }

  setRedTokens (amount)
  {
    this._params.redTokens += amount;
  }

  setBlackTokens (amount)
  {
    this._params.blackTokens += amount;
  }
}
