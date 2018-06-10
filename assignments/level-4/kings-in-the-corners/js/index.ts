(() =>
{
  // TODO: Don't use variables in switch

  document.addEventListener("DOMContentLoaded", () =>
  {
    // Setup
    const { deck, matrix } = Game.init(); // Game.init shouldn't really return the instance
    const deckElement = document.querySelector(".dk-Deck img") as HTMLImageElement;
    const deckCountElement = document.querySelector(".dk-Count span") as HTMLSpanElement;
    const matrixCardElements = document.querySelectorAll(".bd-Card img") as NodeListOf<HTMLDivElement>;

    const titleElement = document.querySelector(".ct-Title span") as HTMLSpanElement;

    // Arrays can be a "constant", but it's contents are still mutable as a const
    const selectedCards = [];

    // Oops, mutable values, totally not because I'm lazy
    let currentCard;
    let currentState = STATES.NORMAL;

    /**
     * Computes and executes the computer's action/response
     */
    function computerExec ()
    {
      switch (currentState)
      {
        case STATES.NORMAL:
          updateDeckView();
          const validSpaces = validSpots(currentCard.rank);

          if (validSpaces.length > 0)
          {
            const targetPlace = validSpaces[ 0 ];

            matrix[ Math.floor(targetPlace / MATRIX_R) ][ targetPlace % MATRIX_C ] = currentCard;
          }
          else
          {
            currentState = STATES.WIN;
            endGame();
            return;
          }

          currentCard = null;
          break;
        case STATES.REMOVE:
          removeSpots()[ 0 ].fold(v =>
          {
            matrix[ Math.floor(v / MATRIX_R) ][ v % MATRIX_C ] = undefined;
          });
          break;
      }

      updateBoard();
      updateGameState();
    }

    /**
     * Computes and executes the endgame action.
     */
    function endGame ()
    {
      titleElement.textContent = currentState === STATES.WIN
        ? "Player wins!"
        : "Player loses!";
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
     * Determines the combinations that can be removed from the board (includes redundants)
     * @return {Array<number[]>} An Array that contains another Array which contains the indexes
     *   from the flattened matrix that can be removed
     */
    function removeSpots (): Array<number[]>
    {
      const intStream = mapRange(MATRIX_R * MATRIX_C, i => i);
      const matrix1D = flatten2D(matrix);

      // Transform from 1D to multidimensional which is then flattened to get a 2D Array
      // Not really what I should've done
      return flatten2D(matrix1D.map((cV, i) =>
      {
        if (!cV) return null;
        if (cV.rank === 10) return [ [ i ] ];
        const validCompanions = intStream
          .filter(v => v !== i && matrix1D[ v ] && matrix1D[ v ].rank + cV.rank === 10);

        return validCompanions.length > 0
          ? [ ...validCompanions.map(v => [ i, v ]) ]
          : null;
      }).filter(v => Array.isArray(v)));
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
        : currentState === STATES.REMOVE
          ? removeSpots().length > 0
            ? STATES.REMOVE
            : STATES.NORMAL
          // Should never end up at this point
          : currentState;

      // Check to see if all picture cards are valid
      // "player must place all of the picture cards into the proper spaces" to win
      // Turn seems irrelevant?
      if (validSpots(SPECIAL.JACK).length > 0 ||
        validSpots(SPECIAL.QUEEN).length > 0 ||
        validSpots(SPECIAL.KING).length > 0 ||
        emptySpaces.length !== 4) return;

      currentState = STATES.WIN;
      endGame();
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
        if (currentState === STATES.NORMAL &&
          (!currentCard ||
            this.hasAttribute("active") ||
            !validConstraint(i, currentCard.rank))
        ) return;

        switch (currentState)
        {
          case STATES.NORMAL:
            matrix[ Math.floor(i / MATRIX_R) ][ i % MATRIX_C ] = currentCard;
            currentCard = null;
            computerExec();
            break;
          case STATES.REMOVE:
            const removeable = removeSpots();

            selectedCards.push(i);
            // Determine if selection(s) can be removed
            // Possible selections, last [2] card(s)
            const s0 = selectedCards.slice(selectedCards.length - 1);
            const s1 = selectedCards.slice(selectedCards.length - 2);
            // Select valid target section
            const s2 = removeable.includesArr(s0) ? s0 : removeable.includesArr(s1) ? s1 : null;

            if (!s2) break;
            s2.fold(v =>
            {
              matrix[ Math.floor(v / MATRIX_R) ][ v % MATRIX_C ] = undefined;
            });
            // Just in case, probably when only 1 duo
            updateGameState();
            computerExec();
            break;
        }

        updateBoard();
        // Redundant?
        updateGameState();
      });
    });
  });
}).call(this);
