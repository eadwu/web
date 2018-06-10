(() =>
{
  document.addEventListener("DOMContentLoaded", () =>
  {
    // Setup
    const { deck, matrix } = Game.init(); // Game.init shouldn't really return the instance
    const deckElement = document.querySelector(".dk-Deck img") as HTMLImageElement;
    const deckCountElement = document.querySelector(".dk-Count span") as HTMLSpanElement;
    const matrixCardElements = document.querySelectorAll(".bd-Card img") as NodeListOf<HTMLDivElement>;

    const titleElement = document.querySelector(".ct-Title span") as HTMLSpanElement;

    // Oops, mutable values, totally not because I'm lazy
    let currentCard;
    let currentState = STATES.NORMAL;

    /**
     * Computes and executes the computer's action/response
     */
    function computerExec ()
    {
      if (currentState === STATES.NORMAL)
      {
        // Simple algorithm, first spot that has nothing, left to right, top to down
        // const targetPlace = flatten2D(matrix).indexOf(undefined);

        updateDeckView();
        const validSpaces = validSpots(currentCard.rank);

        if (validSpaces.length > 0)
        {
          const targetPlace = validSpaces[ 0 ];

          matrix[ Math.floor(targetPlace / MATRIX_R) ][ targetPlace % MATRIX_C ] = currentCard;
          updateGameState();
        }
        else
        {
          currentState = STATES.WIN;
          endGame();
          return;
        }

        currentCard = null;
        updateBoard();
      }
      else if (currentState === STATES.REMOVE)
      {
        // Don't really see the point of having to do this
      }
    }

    /**
     * Computes and executes the endgame action.
     */
    function endGame ()
    {
      titleElement.textContent = currentState === STATES.WIN ? "Player wins!" : "Player loses!";
    }

    /**
     * Determines whether or not a card can be placed in a certain spot on the board
     * @param {number} index - The target index that the player wants to place the card in
     * @param {number} rank - The rank of the card the player wants to use
     * @return {boolean} A boolean representing whether or not it can be placed in `index`
     */
    function validConstraint (index: number, rank: number): boolean
    {
      // Might be better to adjust flattening algorithm?
      return rank === SPECIAL.JACK
        ? index < 5 || (index >= 7 && index <= 8) || index >= 11
        : rank === SPECIAL.QUEEN
          ? index < 4 || index > 11
          : rank === SPECIAL.KING
            ? index === 0 || index === 3 || index === 12 || index === 15
            : true;
    }

    /**
     * Determines the places a card can be placed on the board
     * @param rank - The rank of the card the player currently hasAttribute
     * @return {Array<number>} An Array that contains all possible places the card can be placed
     */
    function validSpots (rank: number): Array<number>
    {
      const matrix1D = flatten2D(matrix);
      // Given [ 0, n ], get valid spots and retrieve first or if none exist player wins
      return mapRange(MATRIX_R * MATRIX_C, i => i)
        .filter(v => !matrix1D[ v ] && validConstraint(v, rank));
    }

    /**
     * Updates the displayed board to match matrix
     */
    function updateBoard ()
    {
      flatten2D(matrix).fold((v, i) =>
      {
        const cardElement = matrixCardElements[ i ];

        // Normalize
        if (cardElement.hasAttribute("active")) cardElement.removeAttribute("active");
        if (!v)
        {
          cardElement.setAttribute(
            "src",
            `images/${i % 2 === 0 ? "back-blue-75-2.png" : "back-red-75-2.png"}`
          );
        }
        else
        {
          cardElement.setAttribute("active", "");
          cardElement.setAttribute("src", `images/${v.rank}-${v.suit}.png`);
        }
      });
    }

    /**
     * Updates the deck to display currently revealed card
     */
    function updateDeckView ()
    {
      const nextCard = deck.nextCard();

      currentCard = nextCard;
      deckCountElement.textContent = deck.cardsLeft;
      deckElement.setAttribute("src", `images/${nextCard.rank}-${nextCard.suit}.png`);
    }

    /**
     * Adjusts the game state inbetween turns
     */
    function updateGameState ()
    {
      const matrix1D = flatten2D(matrix);
      const emptySpaces = mapRange(MATRIX_R * MATRIX_C, i => i).filter(v => !matrix1D[ v ]);

      currentState = currentState === STATES.NORMAL
        ? emptySpaces.length > 0
          ? STATES.NORMAL
          : STATES.REMOVE
        // : currentState === STATES.REMOVE
        // ? validDuos.length > 0
        // ? STATES.REMOVE
        // : STATES.NORMAL
        : currentState;

      // Automate cleanup if STATES.REMOVE
      if (currentState === STATES.REMOVE)
      {
        const intStream = mapRange(MATRIX_R * MATRIX_C, i => i);
        const matrix1D = flatten2D(matrix);

        matrix1D.fold((cV, i: number) =>
        {
          if (!cV) return;
          let targetIndex;

          if (cV.rank === 10)
          {
            targetIndex = i;
          }
          else
          {
            const validCompanions = intStream
              .filter(v => v !== i && matrix1D[ v ] && matrix1D[ v ].rank + cV.rank === 10);

            targetIndex = validCompanions.length > 0 ? validCompanions[ 0 ] : null;
          }

          if (!targetIndex) return;
          matrix[ Math.floor(i / MATRIX_R) ][ i % MATRIX_C ] = undefined;
          matrix[ Math.floor(targetIndex / MATRIX_R) ][ targetIndex % MATRIX_C ] = undefined;

          matrix1D[ i ] = undefined;
          matrix1D[ targetIndex ] = undefined;
        });
      }

      updateBoard();

      // Check to see if all picture cards are valid
      // "all of the picture cards into the proper spaces" to win
      // Turn seems irrelevant?
      if (validSpots(SPECIAL.JACK).length <= 0 &&
        validSpots(SPECIAL.QUEEN).length <= 0 &&
        validSpots(SPECIAL.KING).length <= 0 &&
        emptySpaces.length === 4)
      {
        currentState = STATES.WIN;
        endGame();
        return;
      }

      currentState = STATES.NORMAL;
    }

    deckElement.addEventListener("click", () =>
    {
      if (!deck.hasNext || currentCard || currentState !== STATES.NORMAL) return;

      updateDeckView();
      if (validSpots(currentCard.rank).length <= 0)
      {
        currentState = STATES.LOSE;
        endGame();
      }
    });

    Array.from(matrixCardElements).fold((cardElement: HTMLDivElement, i: number) =>
    {
      cardElement.addEventListener("click", function ()
      {
        if (!currentCard || this.hasAttribute("active")) return;

        if (currentState === STATES.NORMAL && validConstraint(i, currentCard.rank))
        {
          matrix[ Math.floor(i / MATRIX_R) ][ i % MATRIX_C ] = currentCard;
          currentCard = null;
          updateBoard();
          computerExec();
        }
        else if (currentState === STATES.REMOVE)
        {
          // Don't really see the point of having to do this
        }

        // Just in case, probably when only 1 duo
        updateGameState();
      });
    });
  });
}).call(this);
