(() =>
{
  class Deck
  {
    private _contents: Card[];
    private _currentIndex: number;

    constructor ()
    {
      this._currentIndex = 0;
      this._contents = Deck.shuffleDeck(
        mapRange(RANKS * SUITS, i => new Card({
          rank: Math.ceil((i + 1) / SUITS),
          suit: i % 4
        }))
      );
    }

    static shuffle (deck: Deck): Deck
    {
      deck.contents = Deck.shuffleDeck(deck.contents);
      return deck;
    }

    static shuffleDeck (cardDeck: Card[]): Card[]
    {
      const newDeck = [ ...cardDeck ];

      forNDo(getRandomInteger(1, newDeck.length), () =>
      {
        const firstIndex = getRandomInteger(0, newDeck.length);
        const secondIndex = getRandomInteger(firstIndex, newDeck.length);
        const indexDiff = secondIndex - firstIndex;
        const deckCut = newDeck.splice(firstIndex, indexDiff);

        newDeck.push(...deckCut);
      });
      return newDeck;
    }

    get cardsLeft ()
    {
      return this.contents.length - this.currentIndex;
    }

    get contents ()
    {
      return this._contents;
    }

    get currentIndex ()
    {
      return this._currentIndex;
    }

    get hasNext ()
    {
      return this.currentIndex < this.contents.length;
    }

    get nextIndex ()
    {
      return this._currentIndex++;
    }

    nextCard ()
    {
      return this.contents[ this.nextIndex ];
    }
  }

  this.Deck = Deck;
}).call(this);
