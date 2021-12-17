const fs = require('fs');

var args = process.argv.slice(2);

const input = fs.readFileSync(args[0], 'utf8').trim().split('\n');

const getMaxBounds = function(rows) {
  let maxX = 0;
  let maxY = 0;
  rows.forEach(row => {
    if(row.includes(',')) {
      const x = parseInt(row.split(',')[0]);
      const y = parseInt(row.split(',')[1]);

      if(x > maxX) maxX = x;
      if(y > maxY) maxY = y;
    }
  });

  return [maxY + 1, maxX];
};

const getFolds = function(rows) {
  const folds = [];

  rows.forEach(row => {
    if(row.includes('=')) {
      const line = row.split('=')[1];
      const newFold = {
        foldIndex: line,
      };
      if(row.includes('y')) {
        newFold.direction = 'y';
      } else {
        newFold.direction = 'x';
      }
      folds.push(newFold);
    }
  });

  return folds;
}

const bounds = getMaxBounds(input);

const grid = new Array(bounds[0]);
for(let i = 0; i <= bounds[0]; i++) {
  grid[i] = new Array(bounds[1]);
  for(let j = 0; j <= bounds[1]; j++) {
    grid[i][j] = '.';
  }
}

input.forEach(row => {
  if(row.includes(',')) {
    const x = parseInt(row.split(',')[0]);
    const y = parseInt(row.split(',')[1]);

    grid[y][x] = '#';
  }
});

const printGrid = function(grid) {
  let count = 0;
  grid.forEach(row => {
    console.log(row.join(''));
    row.forEach(point => {
      if(point === '#') count++;
    })
  });

  return count;
};

const combine = function(a, b) {
  if(a === '#' || b === '#') return '#';
  return '.';
};

const makeFold = function(grid, direction, foldIndex) {
  console.log('make fold', direction, foldIndex);
  const newGrid = [];

  if(direction === 'y') {
    for(let i = 0; i < foldIndex; i++) {
      for(let j = 0; j < grid[0].length; j++) {
        if(typeof newGrid[i] === 'undefined') newGrid[i] = [];
        newGrid[i][j] = combine(grid[grid.length - i - 1][j], grid[i][j]);
      }
    }
  } else {
    for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j < foldIndex; j++) {
        if(typeof newGrid[i] === 'undefined') newGrid[i] = [];
        newGrid[i][j] = combine(grid[i][grid[i].length - j - 1], grid[i][j]);
      }
    }
  }

  return newGrid;
}

let iteratedGird = grid;

const folds = getFolds(input);
for(let i = 0; i < folds.length; i++) {
  const fold = folds[i];
  iteratedGird = makeFold(iteratedGird, fold.direction, fold.foldIndex);
  console.log(printGrid(iteratedGird));
}
