class Player
{
  redTokens: number;
  blackTokens: number;
  constructor ()
  {
    this.redTokens = 10;
    this.blackTokens = 10;
  }

  getRedTokens ()
  {
    return this.redTokens;
  }

  getBlackTokens ()
  {
    return this.blackTokens;
  }

  setRedTokens (amount)
  {
    this.redTokens += amount;
  }

  setBlackTokens (amount)
  {
    this.blackTokens += amount;
  }
}
