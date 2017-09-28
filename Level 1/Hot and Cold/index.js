/*
 eslint
 quotes: [2, "double"]
 brace-style: [2, "allman"]
 curly: [2, "multi", "consistent"]
 */

var number;
var degree;
var inputElement;
var tableElement;
var statusElement;

var activeGame = true;

function display ()
{
  const entry = tableElement.insertRow();
  const entryGuess = entry.insertCell();
  const entryStatus = entry.insertCell();

  if (!activeGame)
  {
    degree = "";
    statusElement.innerHTML = "You win!";
  }

  entryGuess.innerHTML = inputElement.value;
  entryStatus.innerHTML = degree;
  inputElement.value = "";
}

function getStatus ()
{
  const guess = inputElement.value;
  const displacement = Math.abs(number - guess);

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
  const submitGuess = document.querySelector("#submit_guess");

  number = Math.floor(Math.random() * 100 + 0.5);
  inputElement = document.querySelector("#user_input");
  tableElement = document.querySelector("#data_table");
  statusElement = document.querySelector("#game_status");

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
        statusElement.innerHTML = "You lose!";
      }
    }
  });
});
