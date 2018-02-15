(() =>
{
  const RANKS = 13;
  const SUITS = 4;

  const MAX_PLAYERS = 2;
  const MAX_CARDS_PER_PLAYER = RANKS * SUITS / 2;
  const BOOLEAN_CONVERT = [ false, true ];

  const WAR_BET = 3;

  this.RANKS = RANKS;
  this.SUITS = SUITS;
  this.MAX_PLAYERS = MAX_PLAYERS;
  this.MAX_CARDS_PER_PLAYER = MAX_CARDS_PER_PLAYER;
  this.BOOLEAN_CONVERT = BOOLEAN_CONVERT;
  this.WAR_BET = WAR_BET;
}).call(this);
