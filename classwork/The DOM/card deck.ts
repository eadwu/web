(() =>
{
  const JACK = 11;
  const QUEEN = 12;
  const KING = 13;
  const ACE = 1;
  const CLUB = 0;
  const DIAMOND = 1;
  const HEART = 2;
  const SPADE = 3;
  const BLUE_BACK = "back-blue-75-3.png";

  function generateStandardDeck ()
  {
    const deck = [];
    for (let r = ACE; r <= KING; r++)
      for (let s = CLUB; s <= SPADE; s++)
      {
        const card: { rank: number, suit: number, imgFile: string } = {
          rank: r,
          suit: s,
          imgFile: r + "-" + s + ".png"
        };
        deck.push(card);
      }

    return deck;
  }

  function shuffleDeck (deck)
  {
    const tmp = [];
    while (deck.length > 0)
      tmp.push(deck.splice(getRandomInteger(0, deck.length - 1), 1)[ 0 ]);

    return tmp;
  }

  function dealCard (deck)
  {
    return deck.splice(0, 1)[ 0 ];
  }

  function peekCard (deck, idx)
  {
    if (!idx || idx == null)
      idx = 0;

    return deck[ idx ];
  }

  this.generateStandardDeck = generateStandardDeck;
  this.shuffleDeck = shuffleDeck;
  this.dealCard = dealCard;
}).call(this);
