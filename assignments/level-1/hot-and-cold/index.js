var randomNumber;

var resetButton;
var outputTable;
var displayInput;

var tries = 5;
var userInput = "";
var rangeDegree = "";

function setDegree ()
{
  const displacement = Math.abs(randomNumber - userInput);

  if (displacement === 0)
  {
    endGame(true);
    // Prevent extra guesses at endgame
    tries = 0;
  }
  else if (displacement <= 5)
  {
    rangeDegree = "Very Hot";
    tries++;
  }
  else if (tries === 0)
  {
    endGame(false);
  }
  else if (displacement <= 8)
  {
    rangeDegree = "Hot";
  }
  else if (displacement <= 15)
  {
    rangeDegree = "Very Warm";
  }
  else if (displacement <= 20)
  {
    rangeDegree = "Warm";
  }
  else if (displacement <= 30)
  {
    rangeDegree = "Cool";
  }
  else if (displacement <= 40)
  {
    rangeDegree = "Very Cool";
  }
  else if (displacement <= 55)
  {
    rangeDegree = "Cold";
  }
  else if (displacement > 55)
  {
    rangeDegree = "Very Cold";
  }
}

function endGame (trueEnd)
{
  if (trueEnd)
    rangeDegree = "You Win!";
  else
    rangeDegree = `You Lose! The number was ${randomNumber}.`;

  resetButton.textContent = "Reset Game";
}

function resetUserInput ()
{
  userInput = "";
  displayInput.textContent = "";
}

function display ()
{
  if (tries < 0) return;
  const entry = outputTable.insertRow();
  const entryGuess = entry.insertCell();
  const entryStatus = entry.insertCell();

  entryGuess.textContent = userInput;
  entryStatus.textContent = rangeDegree;

  resetUserInput();
}

document.addEventListener("DOMContentLoaded", () =>
{
  // parseInt rounds down; Math.floor does the same; add 0.5 to fix rounding problems
  randomNumber = Math.floor(Math.random() * 100 + 0.5);

  resetButton = document.querySelector("#reset");
  outputTable = document.querySelector("#data_table");
  displayInput = document.querySelector("#input");

  const fakeNumberPad = document.querySelectorAll("div button");
  const submitGuess = document.querySelector("#submit_guess");

  for (let index = 0; index < fakeNumberPad.length; index++)
  {
    const padNumberButton = fakeNumberPad[index];

    padNumberButton.addEventListener("click", () =>
    {
      userInput = userInput + padNumberButton.textContent;
      displayInput.textContent = userInput;
    });
  }

  resetButton.addEventListener("click", () =>
  {
    resetUserInput();
    if (resetButton.textContent === "Reset Game")
    {
      // lazy bum way
      // window.location.reload();
      tries = 5;
      resetButton.textContent = "Reset";
      randomNumber = Math.floor(Math.random() * 100 + 0.5);

      const outputTableData = outputTable.querySelector("tbody");
      const outputTableEntries = outputTableData.childNodes.length - 1;
      for (let child = 0; child < outputTableEntries; child++)
        outputTableData.removeChild(outputTableData.lastChild);
    }
  });

  submitGuess.addEventListener("click", () =>
  {
    if (userInput.length <= 0) return;
    tries--;
    setDegree();
    display();
  });
});
