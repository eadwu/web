(() =>
{
  const _window = this;

  const ROCK = 1;
  const PAPER = 2;
  const SCISSOR = 3;
  const TIE = 0;
  const COMPUTER = 1;
  const PLAYER = 2;

  let playerScore = 0;
  let computerScore = 0;

  let plrScore;
  let compScore;
  let playerChoice;
  let computerChoice;
  let gameStatus;

  let roundWinner;
  let playerSelection;
  let computerSelection;

  function computerSelects ()
  {
    return Math.floor(Math.random() * 3) + 1;
  }

  function determineWinner ()
  {
    if (playerSelection - computerSelection === 0)
      return TIE;

    if ((playerSelection === 1 && computerSelection === 3) ||
      (playerSelection === 3 && computerSelection === 2) ||
      (playerSelection === 2 && computerSelection === 1))
      return PLAYER;

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

  _window.game = (choice) =>
  {
    playerSelection = _window[ choice ] || choice;
    computerSelection = computerSelects();
    roundWinner = determineWinner();
    updateScore();
    display();
  };

  document.addEventListener("DOMContentLoaded", function ()
  {
    plrScore = document.querySelector("#PlayerScore");
    compScore = document.querySelector("#ComputerScore");
    playerChoice = document.querySelector("#PlayerChoice");
    computerChoice = document.querySelector("#ComputerChoice");
    gameStatus = document.querySelector("#GameStatus");
  });
}).call(this);
