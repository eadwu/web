var randomNumber;

var resetButton;
var outputTable;
var displayInput;

var tries = 5;
var userInput = "";
var rangeDegree = "";
/**
 * setDegree()
 * Gets the degree of the guess and handles pre-end game procedures
 */
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
/**
 * endGame(trueEnd)
 * @param {boolean} trueEnd - A boolean whose value represents whether or not
 * the Player successfully guessed the number (true) or used all tries (false)
 */
function endGame (trueEnd)
{
  if (trueEnd)
    rangeDegree = "You Win!";
  else
    rangeDegree = `You Lose! The number was ${randomNumber}.`;

  resetButton.textContent = "Reset Game";
}
/**
 * resetUserInput()
 * Does what the function name says, resets the currently inputted `guess`
 */
function resetUserInput ()
{
  userInput = "";
  displayInput.textContent = "";
}
/**
 * display()
 * Adds cells to the table to show the guess and its degree
 */
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
  randomNumber = Math.floor(Math.random() * 101);

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
      tries = 5;
      resetButton.textContent = "Reset";
      randomNumber = Math.floor(Math.random() * 101);
      // Remove all guesses from the table, outputTableData can be defined out of this scope
      const outputTableData = outputTable.querySelector("tbody");
      const outputTableEntries = outputTableData.childNodes.length - 1; // Don't target the first 2 cells
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
