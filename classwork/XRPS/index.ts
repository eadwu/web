const { floor, random } = Math;

const ROCK = 1;
const PAPER = 2;
const SCISSOR = 3;
const TIE = 0;
const COMPUTER = 1;
const PLAYER = 2;

let playerScore = 0;
let computerScore = 0;

let playerRocks = 5;
let playerPapers = 5;
let playerScissors = 5;

let computerRocks = 5;
let computerPapers = 5;
let computerScissors = 5;

let plrRocks: HTMLSpanElement;
let plrPapers: HTMLSpanElement;
let plrScissors: HTMLSpanElement;
let compRocks: HTMLSpanElement;
let compPapers: HTMLSpanElement;
let compScissors: HTMLSpanElement;

let plrScore: HTMLSpanElement;
let compScore: HTMLSpanElement;
let playerChoice: HTMLImageElement;
let computerChoice: HTMLImageElement;
let gameStatus: HTMLSpanElement;
let gameFinale: HTMLSpanElement;

let roundWinner: number;
let playerSelection: number;
let computerSelection: number;

let computerStrategies: Function[];

function transformSelection (user: string | number, selection: string): string
{
  const newSelection = selection.charAt(0).toUpperCase() + selection.slice(1).toLowerCase();

  return `${user}${newSelection}s`;
}

function getValidUserWeapons (user: string): Array<string>
{
  let validWeapons = [];

  if (window[ `${user}Rocks` ] > 0)
    validWeapons.push("ROCK");
  if (window[ `${user}Papers` ] > 0)
    validWeapons.push("PAPER");
  if (window[ `${user}Scissors` ] > 0)
    validWeapons.push("SCISSOR");

  return validWeapons;
}
/*
function getLeastUserWeapon (user: string): string
{
  let leastWeapon = `${user}Rocks`;

  if (computerPapers <= window[leastWeapon])
    leastWeapon = `${user}Papers`;
  if (computerScissors <= window[leastWeapon])
    leastWeapon = `${user}Scissors`;

  return leastWeapon;
}

function getWeaponWeakness (weaponName: string): string
{
  const user = /player/.test(weaponName) ? "player" : "computer";
  let weaponWeakness = "ROCK";

  if (/Rock/.test(weaponName) && window[`${user}Papers`] > 0)
    weaponWeakness = "PAPER";
  else if (/Paper/.test(weaponName) && window[`${user}Scissors`] > 0)
    weaponWeakness = "SCISSOR";

  return window[weaponWeakness];
}

function getUnbeatableWeapon ()
{
  let chosenWeapon = "ROCK";

  if (playerRocks <= 0)
    chosenWeapon = "PAPER";
  else if (playerPapers <= 0)
    chosenWeapon = "SCISSOR";

  return window[chosenWeapon];
}

function playerHasWeaponEmpty (): boolean
{
  return playerRocks <= 0 || playerPapers <= 0 || playerScissors <= 0;
}
*/

function getRandomWeapon (weapons: Array<string>): number
{
  return window[ weapons[ floor(random() * weapons.length) ] ];
}

function computerSelects ()
{
  const strategyIndex = floor(random() * computerStrategies.length);
  return computerStrategies[ strategyIndex ]();
}

function determineWinner (): number
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

function selectionFromValue (value)
{
  if (value === 1)
    return "Rocks";
  else if (value === 2)
    return "Papers";
  else
    return "Scissors";
}

function updateScore ()
{
  const plrSelection = selectionFromValue(playerSelection);
  const compSelection = selectionFromValue(computerSelection);

  if (roundWinner === PLAYER)
  {
    playerScore++;
    window[ `computer${compSelection}` ] -= 1;
    window[ `player${compSelection}` ] += 1;
  }
  else if (roundWinner === COMPUTER)
  {
    computerScore++;
    window[ `player${plrSelection}` ] -= 1;
    window[ `computer${plrSelection}` ] += 1;
  }
}

function display ()
{
  const playerTargetImage = document.getElementById(playerSelection.toString()) as HTMLImageElement;
  const computerTargetImage = document.getElementById(computerSelection.toString()) as HTMLImageElement;

  plrRocks.innerHTML = playerRocks.toString();
  plrPapers.innerHTML = playerPapers.toString();
  plrScissors.innerHTML = playerScissors.toString();

  compRocks.innerHTML = computerRocks.toString();
  compPapers.innerHTML = computerPapers.toString();
  compScissors.innerHTML = computerScissors.toString();

  plrScore.innerHTML = playerScore.toString();
  compScore.innerHTML = computerScore.toString();

  playerChoice.setAttribute(
    "src",
    playerTargetImage.getAttribute("src") || ""
  );
  computerChoice.setAttribute(
    "src",
    computerTargetImage.getAttribute("src") || ""
  );

  if (roundWinner === 0)
    gameStatus.innerHTML = "TIE";
  else if (roundWinner === 1)
    gameStatus.innerHTML = "COMPUTER";
  else
    gameStatus.innerHTML = "PLAYER";

  if (getValidUserWeapons("player").length <= 0)
    gameFinale.innerHTML = "COMPUTER";
  else if (getValidUserWeapons("computer").length <= 0)
    gameFinale.innerHTML = "PLAYER";
}

function game (choice: string | number)
{
  // reform to Rock, Paper, or Scissor
  const reformedChoice = transformSelection("player", choice.toString());
  // access playerRocks, playerPapers, playerScissors or if the player/computer runs out of weapons
  if (window[ reformedChoice ] <= 0 ||
    getValidUserWeapons("player").length <= 0 ||
    getValidUserWeapons("computer").length <= 0)
    return;

  playerSelection = window[ choice ] || parseInt(choice, 10);
  computerSelection = computerSelects();
  roundWinner = determineWinner();
  updateScore();
  display();
}

document.addEventListener("DOMContentLoaded", function ()
{
  // Player Arsenal
  plrRocks = document.querySelector("#PlayerRocks");
  plrPapers = document.querySelector("#PlayerPapers");
  plrScissors = document.querySelector("#PlayerScissors");
  // Computer Arsenal
  compRocks = document.querySelector("#ComputerRocks");
  compPapers = document.querySelector("#ComputerPapers");
  compScissors = document.querySelector("#ComputerScissors");
  // Scoreboard
  plrScore = document.querySelector("#PlayerScore");
  compScore = document.querySelector("#ComputerScore");
  // Game Status
  playerChoice = document.querySelector("#PlayerChoice");
  computerChoice = document.querySelector("#ComputerChoice");
  gameStatus = document.querySelector("#GameStatus");
  gameFinale = document.querySelector("#GameFinale");
  // Computer Strategies
  computerStrategies = [
    () => getRandomWeapon(getValidUserWeapons("computer"))
    // () => getWeaponWeakness(getLeastUserWeapon("computer")),
    // () => getWeaponWeakness(getLeastUserWeapon("player")),
    // getUnbeatableWeapon
  ];
});
