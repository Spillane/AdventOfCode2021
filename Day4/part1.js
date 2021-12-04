const fs = require('fs');
const { exit } = require('process');

var args = process.argv.slice(2);

const lines = fs.readFileSync(args[0], 'utf8').trim().split('\n');

const getBoards = (rawLines) => {
  const generatedBoards = [];
  for(let i = 2; typeof rawLines[i] !== 'undefined'; i++) {
    const generatedBoard = [];
    for(; rawLines[i] !== '' && typeof rawLines[i] !== 'undefined'; i++) {
      generatedBoard.push(rawLines[i].split(' ').filter(number => number !== '').map(number => parseInt(number)));
    }
    generatedBoards.push(generatedBoard);
  }

  return generatedBoards;
};

const createCombinations = (board) => {
  // Generate vertical and diagonal
  const extraCombos = [];
  for(let i = 0; i < board[0].length; i++) {
    const extraCombo = [];
    for(let j = 0; j < board.length; j++) {
      extraCombo.push(board[j][i]);
    }
    extraCombos.push(extraCombo);
  }

  return {
    board,
    combinations: board.concat(extraCombos),
  };
}

const flattenBoard = (board) => {
  const flat = [];
  for(let i = 0; i < board.length; i++) {
    for(let j = 0; j < board[i].length; j++) {
      flat.push(board[i][j]);
    }
  }
  return flat;
}

const comboChecker = (combo, nos) => {
  return combo.every(number => nos.includes(number));
}

const playGame = (numbersToPlay, boardsToPlay) => {
  for(let turn = 0; turn < numbersToPlay.length; turn++) {
    const calledNumbers = numbersToPlay.slice(0, turn);
    for(let boardIndex = 0; boardIndex < boardsToPlay.length; boardIndex++) {
      const board = boardsToPlay[boardIndex];
      const isWinningBoard = board.combinations.some(combo => comboChecker(combo, calledNumbers));
      if(isWinningBoard) {
        return {
          boardIndex,
          numberIndex: turn - 1,
        };
      }
    }
  }

  console.log('NO WINNER!?');
  exit;
}

const numbers = lines[0].split(',').map(stringNumber => parseInt(stringNumber));

let boards = getBoards(lines);

boards = boards.map(board => createCombinations(board));

const win = playGame(numbers, boards);
const winningCalledNumbers = numbers.slice(0, win.numberIndex + 1)

console.log('Called numbers:', winningCalledNumbers)
console.log('Winning number:', numbers[win.numberIndex]);
console.log('Winning board:', boards[win.boardIndex].board);

const boardNumbers = flattenBoard(boards[win.boardIndex].board);
const uncalledNumbers = boardNumbers.filter(number => !winningCalledNumbers.includes(number));

const sumValues = (previousValue, currentValue) => previousValue + currentValue;
const summedUnusedValues = uncalledNumbers.reduce(sumValues);

console.log(`Answer: ${summedUnusedValues*numbers[win.numberIndex]}`)