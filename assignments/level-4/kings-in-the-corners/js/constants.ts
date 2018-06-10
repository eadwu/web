(() =>
{
  const RANKS = 13;
  const SUITS = 4;

  const MATRIX_R = 4;
  const MATRIX_C = 4;

  const STATES = {
    NORMAL: 0,
    REMOVE: 1,
    WIN: 2,
    LOSE: 3
  };

  const SPECIAL = {
    JACK: 11,
    QUEEN: 12,
    KING: 13
  };

  this.RANKS = RANKS;
  this.SUITS = SUITS;
  this.MATRIX_R = MATRIX_R;
  this.MATRIX_C = MATRIX_C;
  this.STATES = STATES;
  this.SPECIAL = SPECIAL;
}).call(this);
