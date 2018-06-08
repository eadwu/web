(() =>
{
  class Card
  {
    rank: number;
    suit: number;

    constructor ({ rank, suit }: {
      rank: string,
      suit: string
    })
    {
      this.rank = parseInt(rank, 10);
      this.suit = parseInt(suit, 10);
    }
  }

  this.Card = Card;
}).call(this);
