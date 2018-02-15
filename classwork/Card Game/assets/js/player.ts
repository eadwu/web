(() =>
{
  class Player
  {
    human: boolean;
    hand: Array<Card>;

    constructor (isPlayer: number)
    {
      // this.human = BOOLEAN_CONVERT[ isPlayer % BOOLEAN_CONVERT.length ];
      this.human = isPlayer;
      this.hand = [];
    }

    getRandomCard ()
    {
      const chosenIndex = getRandomInteger(0, this.hand.length - 1);
      const chosenCard = this.hand[ chosenIndex ];

      this.hand.splice(chosenIndex, 1);
      return chosenCard;
    }
  }

  this.Player = Player;
}).call(this);
