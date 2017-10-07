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

  function arrayLoop (array, func)
  {
    if (!array) return;
    for (let index = 0; index < array.length; index++)
      func(array[index], index);
  }

  function setRandomInsult ()
  {
    if (!activeGame) return;
    const arrayIndex = floor(random() * unkInsults.length);
    unkOutput.textContent = unkInsults[arrayIndex];
  }

  function disableInvalidButtons ()
  {
    arrayLoop(takeStoneButtons, (takeStoneButton) =>
    {
      const pileIndex = takeStoneButton.parentNode.getAttribute("data-pile");
      const stoneAmount = takeStoneButton.getAttribute("data-amount");

      if (stoneAmount > stonePiles[pileIndex])
        takeStoneButton.setAttribute("disabled", "");
    });
  }

  function syncDisplayToSource ()
  {
    arrayLoop(stonePiles, (amount, pile) =>
    {
      document.querySelector(`#count${pile}`).textContent = amount;
    });
  }

  function getLargestStonePile ()
  {
    let index;
    let tmp = 0;
    arrayLoop(stonePiles, (amount, pile) =>
    {
      if (amount > tmp)
      {
        tmp = amount;
        index = pile;
      }
    });
    return index;
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
      Math.floor(Math.random() * stonePiles[chosenPile]) + 1,
      false
    );
    isPlayerTurn = !isPlayerTurn;
  }

  function isGameOver ()
  {
    let gameOver = true;
    arrayLoop(takeStoneButtons, (takeStoneButton) =>
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

    arrayLoop(takeStoneButtons, (takeStoneButton) =>
    {
      takeStoneButton.addEventListener("click", () =>
      {
        if (!isPlayerTurn) return;
        const stoneArrayIndex = takeStoneButton.parentNode.getAttribute("data-pile");
        const amount = takeStoneButton.getAttribute("data-amount");

        isPlayerTurn = !isPlayerTurn;
        takeStonesFromPile(stoneArrayIndex, amount, true);
        initArtificalMove();
        setRandomInsult();
      });
    });

    resetButton.addEventListener("click", () =>
    {
      stonePiles = tmp.slice();
      arrayLoop(takeStoneButtons, (takeStoneButton) =>
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
