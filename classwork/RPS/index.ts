var ROCK = 1;
var PAPER = 2;
var SCISSOR = 3;
var TIE = 0;
var COMPUTER = 1;
var PLAYER = 2;

var playerScore = 0;
var computerScore = 0;

var plrScore;
var compScore;
var playerChoice;
var computerChoice;
var gameStatus;

var roundWinner;
var playerSelection;
var computerSelection;

function computerSelects ()
{
  return Math.floor(Math.random() * 3) + 1;
}

function determineWinner ()
{
  if (playerSelection - computerSelection === 0)
    return TIE;
  else if ((playerSelection === 1 && computerSelection === 3) ||
    (playerSelection === 3 && computerSelection === 2) ||
    (playerSelection === 2 && computerSelection === 1))
    return PLAYER;
  else
    return COMPUTER;
}

function updateScore ()
{
  if (roundWinner === PLAYER)
    playerScore++;
  else if (roundWinner === COMPUTER)
    computerScore++;
}

function display ()
{
  plrScore.innerHTML = playerScore;
  compScore.innerHTML = computerScore;

  playerChoice.setAttribute(
    "src",
    document.getElementById(playerSelection)
      .getAttribute("src")
  );
  computerChoice.setAttribute(
    "src",
    document.getElementById(computerSelection)
      .getAttribute("src")
  );

  if (roundWinner === 0)
    gameStatus.innerHTML = "TIE";
  else if (roundWinner === 1)
    gameStatus.innerHTML = "COMPUTER";
  else
    gameStatus.innerHTML = "PLAYER";
}

function game (choice)
{
  playerSelection = window[ choice ] || choice;
  computerSelection = computerSelects();
  roundWinner = determineWinner();
  updateScore();
  display();
}

document.addEventListener("DOMContentLoaded", function ()
{
  plrScore = document.querySelector("#PlayerScore");
  compScore = document.querySelector("#ComputerScore");
  playerChoice = document.querySelector("#PlayerChoice");
  computerChoice = document.querySelector("#ComputerChoice");
  gameStatus = document.querySelector("#GameStatus");
});
