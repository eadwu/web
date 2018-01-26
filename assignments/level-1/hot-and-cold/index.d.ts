declare let randomNumber: any;
declare let resetButton: any;
declare let outputTable: any;
declare let displayInput: any;
declare let tries: number;
declare let userInput: string;
declare let rangeDegree: string;
/**
 * setDegree()
 * Gets the degree of the guess and handles pre-end game procedures
 */
declare function setDegree(): void;
/**
 * endGame(trueEnd)
 * @param {boolean} trueEnd - A boolean whose value represents whether or not
 * the Player successfully guessed the number (true) or used all tries (false)
 */
declare function endGame(trueEnd: any): void;
/**
 * resetUserInput()
 * Does what the function name says, resets the currently inputted `guess`
 */
declare function resetUserInput(): void;
/**
 * display()
 * Adds cells to the table to show the guess and its degree
 */
declare function display(): void;
