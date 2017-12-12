(() =>
{
  let redRoll;
  let blackRoll;
  let gameEnded = false;
  // Use Objects when bored to make this much nicer
  document.addEventListener("DOMContentLoaded", () =>
  {
    const User = new Player();
    const Computer = new Player();

    const stdout = document.querySelector("#game_output") as HTMLSpanElement;
    // Take advantage of logic, returns first element that matches `selectors`
    const rollDieButton = document.querySelector("button") as HTMLButtonElement;
    const dataTableElement = document.querySelector("#data_table") as HTMLTableElement;
    const dieOutputSpans = document.querySelectorAll("span span");
    const strategyButtons = document.querySelectorAll("button.strategy");

    const dataTable = new Table(dataTableElement);
    // Destructuring, could just use indexes and original NodeList
    const [ redDieOutput, blackDieOutput ] = Array.from(dieOutputSpans);
    // Ugly implementation of strategies
    const strategies = [
      (a, b) =>
      {
        a.setRedTokens(-redRoll);
        b.setBlackTokens(blackRoll);
      },
      (a, b) =>
      {
        a.setRedTokens(redRoll);
        b.setBlackTokens(-blackRoll);
      },
      (a, b) =>
      {
        a.setBlackTokens(-blackRoll);
        b.setRedTokens(redRoll);
      },
      (a, b) =>
      {
        a.setBlackTokens(blackRoll);
        b.setRedTokens(-redRoll);
      }
    ];
    /**
     * Returns a boolean that determines whether or not the game has ended
     * @return {boolean} True if any Player has less than or equal to 0 black tokens
     */
    function isGameDone ()
    {
      return User.getBlackTokens() <= 0 || Computer.getBlackTokens() <= 0;
    }
    /**
     * Adds a row into the table containing the amount of tokens the players have
     */
    function updateCurrentTokens ()
    {
      dataTable.addEntry([
        User.getRedTokens(), User.getBlackTokens(),
        Computer.getRedTokens(), Computer.getBlackTokens()
      ]);
    }
    /**
     * Rolls two die and updates the globals (at least to current scope)
     */
    function rollDie ()
    {
      redRoll = getRandomInteger(1, 6);
      blackRoll = getRandomInteger(1, 6);
    }
    /**
     * Runs a turn in a game
     * @param {number} strategyIndex The index of the strategy to invoke
     * @param {Player} p1 The first Player to pass to the function
     * @param {Player} p2 The second Player to pass to the function
     */
    function runTurn (strategyIndex: number, p1: Player, p2: Player)
    {
      if (gameEnded) return;

      strategies[ strategyIndex ](p1, p2);
      updateCurrentTokens();

      if (isGameDone())
      {
        const determinedWinner = User.getRedTokens() > Computer.getRedTokens() ? "Player" : "Computer";
        stdout.textContent = `The winner is the ${determinedWinner}!`;
        gameEnded = true;
      }
    }
    // Initialize step
    updateCurrentTokens();
    // Button events
    rollDieButton.addEventListener("click", () =>
    {
      // If the game ended, don't allow further moves
      if (gameEnded) return;
      // Roll the die and update the text
      rollDie();
      redDieOutput.textContent = redRoll;
      blackDieOutput.textContent = blackRoll;
      // Disable the roll die button and enable the strategy buttons
      rollDieButton.setAttribute("disabled", "");
      forNDo(strategyButtons.length, index => { strategyButtons[ index ].removeAttribute("disabled"); });
    });

    forNDo(strategyButtons.length, index =>
    {
      // Store the current button in a variable
      const currentButton = strategyButtons[ index ] as HTMLButtonElement;

      currentButton.addEventListener("click", () =>
      {
        // Disable the strategy buttons and enable the roll die button
        rollDieButton.removeAttribute("disabled");
        forNDo(strategyButtons.length, index => { strategyButtons[ index ].setAttribute("disabled", ""); });
        // Take advantage of DOM structure, instead of using attributes, use position in DOM
        // Run the events, ugly implementation[2]
        runTurn(index, User, Computer);
        rollDie();
        runTurn(index, Computer, User);
      });
    });
  });
}).call(this);
