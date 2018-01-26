(() =>
{
  const { floor, random } = Math;

  const tmp = [ 3, 3, 3 ];
  const unkInsults = [
    "I don't engage in mental combat with the unarmed.",
    "You have two parts of brain, 'left' and 'right'. In the left side, there's nothing right. In the right side, there's nothing left.",
    "It's better to let someone think you are an idiot than to open your mouth and prove it.",
    "You're a person of rare intelligence. It's rare when you show any.",
    "You fear success, but really have nothing to worry about."
  ];

  /** @type {HTMLSpanElement} */
  let unkOutput: HTMLSpanElement;
  /** @type {HTMLButtonElement[]} */
  let takeStoneButtons: NodeList;

  let activeGame = true;
  let isPlayerTurn = false;
  let stonePiles = tmp.slice();
  /**
   * Recursion through a(n) [transformed] Array
   * @param {number} index - The index to start the function on
   * @param {*} source - An Object that is convertable to an Array
   * @param {function(param0: number, param1: Array<any>): boolean} condition - Function
   *   with parameters of the current index and the new array; should
   *   return a boolean that tells whether or not the recursion should
   *   continue
   * @param {function(param0: *, param1: number): void} func - The function to invoke on
   *   the value of the current index
   */
  const recurse = source => index => condition => func =>
  {
    const [ value, ..._ ] = Array.isArray(source) ? source : Array.from(source);
    func(value)(index);
    if (condition(index)(_)) recurse(_)(++index)(condition)(func);
  };
  /**
   * Randomly picks an insult from the array `unkInsults`
   * @return {string} The string containing the insult picked
   */
  const getRandomInsult = () => (unkInsults[ floor(random() * unkInsults.length) ]);
  /**
   * Disables buttons that would make a pile negative if clicked upon
   */
  function disableInvalidButtons ()
  {
    recurse(takeStoneButtons)(0)(() => arr => (arr.length > 0))(takeStoneButton => () =>
    {
      const pileIndex = takeStoneButton.parentNode.getAttribute("data-pile");
      const stoneAmount = takeStoneButton.getAttribute("data-amount");

      if (stoneAmount > stonePiles[ pileIndex ])
        takeStoneButton.setAttribute("disabled", "");
    });
  }
  /**
   * Displays the locally stored data onto the front-end display
   */
  function syncDisplayToSource ()
  {
    recurse(stonePiles)(0)(() => arr => (arr.length > 0))(amount => pile =>
    {
      document.querySelector(`#count${pile}`).textContent = amount;
    });
  }
  /**
   * Retrieves one of the largest or the largest stone pile
   * @return {number} The index to retrieve the pile in `stonePiles`
   */
  function getLargestStonePile ()
  {
    let tmp = 0;
    let largestPiles = [];
    recurse(stonePiles)(0)(() => arr => (arr.length > 0))(amount => pile =>
    {
      if (amount > tmp)
      {
        largestPiles = [ pile ];
        tmp = amount;
      }
      else if (amount === tmp)
        largestPiles.push(pile);
    });
    return largestPiles[ floor(random() * largestPiles.length) ];
  }
  /**
   * Takes the amount of `stones` from `stonePiles[pile]` and handles some end
   *   game procedures
   *
   * @param {number} pile - The index to get the target stone pile
   * @param {number} stones - The amount of stones to take from the pile
   * @param {boolean} isPlayer - Whether this is an action of the player
   */
  function takeStonesFromPile (pile: number, stones: number, isPlayer: boolean)
  {
    if (!activeGame) return;
    stonePiles[ pile ] -= stones;
    syncDisplayToSource();
    disableInvalidButtons();
    if (!isGameOver()) return;

    activeGame = false;
    if (isPlayer)
      unkOutput.textContent = "You lose!";
    else
      unkOutput.innerHTML = "Tch! I lost.";
  }
  /**
   * Execute a move for the "computer"
   */
  function initArtificalMove ()
  {
    const chosenPile = getLargestStonePile();
    takeStonesFromPile(
      chosenPile,
      floor(random() * stonePiles[ chosenPile ]) + 1,
      false
    );
    isPlayerTurn = !isPlayerTurn;
  }
  /**
   * Determines whether the game is over or not
   * @return {boolean} A boolean that is true if the game is over and false if
   *   it isn't
   */
  function isGameOver ()
  {
    let gameOver = true;
    recurse(takeStoneButtons)(0)(() => arr => (arr.length > 0))(takeStoneButton => () =>
    {
      if (!takeStoneButton.hasAttribute("disabled"))
        gameOver = false;
    });
    return gameOver;
  }
  /**
   * Properly start the game
   */
  function initialize ()
  {
    unkOutput.textContent = "My friend Gloob shall go first!";
    initArtificalMove();
  }

  document.addEventListener("DOMContentLoaded", () =>
  {
    const resetButton = document.querySelector(".reset");

    unkOutput = document.querySelector("#unk");
    takeStoneButtons = document.querySelectorAll("div > button");

    initialize();

    recurse(takeStoneButtons)(0)(() => arr => (arr.length > 0))(takeStoneButton => () =>
    {
      takeStoneButton.addEventListener("click", () =>
      {
        if (!isPlayerTurn) return;
        const stoneArrayIndex = takeStoneButton.parentNode.getAttribute("data-pile");
        const amount = takeStoneButton.getAttribute("data-amount");

        isPlayerTurn = !isPlayerTurn;
        takeStonesFromPile(stoneArrayIndex, amount, true);
        initArtificalMove();
        if (activeGame)
          unkOutput.textContent = getRandomInsult();
      });
    });

    resetButton.addEventListener("click", () =>
    {
      stonePiles = tmp.slice();
      recurse(takeStoneButtons)(0)(() => arr => (arr.length > 0))(takeStoneButton => () =>
      {
        activeGame = true;
        isPlayerTurn = false;
        if (takeStoneButton.hasAttribute("disabled"))
          takeStoneButton.removeAttribute("disabled");
      });
      initialize();
    });
  });
}).call(this);
