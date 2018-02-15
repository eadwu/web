(() =>
{
  class Card
  {
    rank: string;
    suit: string;

    constructor ({ rank, suit }: {
      rank: string,
      suit: string
    })
    {
      this.rank = rank;
      this.suit = suit;
    }
  }

  this.Card = Card;
}).call(this);
