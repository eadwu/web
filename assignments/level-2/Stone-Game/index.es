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

  let unkOutput;
  let takeStoneButtons;

  let activeGame = true;
  let isPlayerTurn = false;
  let stonePiles = tmp.slice();

  // λsource. λindex. λcondition. λfunc. void
  const recurse = source => index => condition => func =>
  {
    const [ value, ..._ ] = source;
    func(value)(index);
    if (condition(index)(_)) recurse(_)(++index)(condition)(func);
  };

  // λ. string
  const getRandomInsult = () => unkInsults[floor(random() * unkInsults.length)];

  function disableInvalidButtons ()
  {
    recurse(takeStoneButtons)(0)(() => arr => arr.length > 0)(takeStoneButton => () =>
    {
      const pileIndex = takeStoneButton.parentNode.getAttribute("data-pile");
      const stoneAmount = takeStoneButton.getAttribute("data-amount");

      if (stoneAmount > stonePiles[pileIndex])
        takeStoneButton.setAttribute("disabled", "");
    });
  }

  function syncDisplayToSource ()
  {
    recurse(stonePiles)(0)(() => arr => arr.length > 0)(amount => pile =>
    {
      document.querySelector(`#count${pile}`).textContent = amount;
    });
  }

  function getLargestStonePile ()
  {
    let tmp = 0;
    let largestPiles = [];
    recurse(stonePiles)(0)(() => arr => arr.length > 0)(amount => pile =>
    {
      if (amount > tmp)
      {
        largestPiles = [ pile ];
        tmp = amount;
      }
      else if (amount === tmp)
      {
        largestPiles.push(pile);
      }
    });
    return largestPiles[floor(random() * largestPiles.length)];
  }

  function takeStonesFromPile (pile, stones, isPlayer)
  {
    if (!activeGame) return;
    stonePiles[pile] -= stones;
    syncDisplayToSource();
    disableInvalidButtons();
    if (isGameOver())
    {
      activeGame = false;
      if (isPlayer)
        unkOutput.textContent = "You lose!";
      else
        unkOutput.innerHTML = "Tch! I lost.";
    }
  }

  function initArtificalMove ()
  {
    const chosenPile = getLargestStonePile();
    takeStonesFromPile(
      chosenPile,
      floor(random() * stonePiles[chosenPile]) + 1,
      false
    );
    isPlayerTurn = !isPlayerTurn;
  }

  function isGameOver ()
  {
    let gameOver = true;
    recurse(takeStoneButtons)(0)(() => arr => arr.length > 0)(takeStoneButton => () =>
    {
      if (!takeStoneButton.hasAttribute("disabled"))
        gameOver = false;
    });
    return gameOver;
  }

  function initialize ()
  {
    unkOutput.textContent = "My friend Gloob shall go first!";
    initArtificalMove();
  }

  document.addEventListener("DOMContentLoaded", () =>
  {
    const resetButton = document.querySelector("#reset");

    unkOutput = document.querySelector("#unk");
    takeStoneButtons = document.querySelectorAll("div > button");

    initialize();

    recurse(takeStoneButtons)(0)(() => arr => arr.length > 0)(takeStoneButton => () =>
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
      recurse(takeStoneButtons)(0)(() => arr => arr.length > 0)(takeStoneButton => () =>
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
