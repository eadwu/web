/*
 eslint
 quotes: [2, "double"]
 brace-style: [2, "allman"]
 curly: [2, "multi", "consistent"]
 */

var input = "";

var number;
var degree;
var tableElement;
var statusElement;
var displayElement;

var activeGame = true;

function display ()
{
  const entry = tableElement.insertRow();
  const entryGuess = entry.insertCell();
  const entryStatus = entry.insertCell();

  if (!activeGame)
  {
    degree = "";
    statusElement.textContent = "You win!";
  }

  entryGuess.textContent = input;
  entryStatus.textContent = degree;

  input = "";
  displayElement.textContent = "";
}

function getStatus ()
{
  const displacement = Math.abs(number - input);

  if (displacement === 0)
    activeGame = false;
  else if (displacement <= 5)
    degree = "Very Hot";
  else if (displacement <= 8)
    degree = "Hot";
  else if (displacement <= 15)
    degree = "Very Warm";
  else if (displacement <= 20)
    degree = "Warm";
  else if (displacement <= 30)
    degree = "Cool";
  else if (displacement <= 40)
    degree = "Very Cool";
  else if (displacement <= 55)
    degree = "Cold";
  else if (displacement > 55)
    degree = "Very Cold";
  else
    degree = "";
}

document.addEventListener("DOMContentLoaded", () =>
{
  let tries = 5;
  const inputButtons = document.querySelectorAll("div button");
  const submitGuess = document.querySelector("#submit_guess");

  number = Math.floor(Math.random() * 100 + 0.5);
  tableElement = document.querySelector("#data_table");
  displayElement = document.querySelector("#input");
  statusElement = document.querySelector("#game_status");

  for (let index = 0; index < inputButtons.length; index++)
  {
    const inputButton = inputButtons[index];

    inputButton.addEventListener("click", () =>
    {
      input = input + inputButton.textContent;
      displayElement.textContent = input;
    });
  }

  submitGuess.addEventListener("click", () =>
  {
    tries = tries - 1;

    if (activeGame)
    {
      getStatus();
      display();

      if (tries === 0 && activeGame)
      {
        activeGame = false;
        statusElement.textContent = "You lose!";
      }
    }
  });
});
