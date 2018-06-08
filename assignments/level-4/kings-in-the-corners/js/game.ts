(() =>
{
  class Game
  {
    deck: Deck;
    matrix: number[][];

    static init ()
    {
      Game.deck = Deck.shuffle(new Deck());
      Game.matrix = matrix2D(MATRIX_R, MATRIX_C);

      return Game;
    }
  }

  this.Game = Game;
}).call(this);
