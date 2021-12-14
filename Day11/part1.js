const fs = require('fs');

var args = process.argv.slice(2);

const rows = fs.readFileSync(args[0], 'utf8').trim().split('\n');

const octoGrid = new Array(rows.length);

const tracker = {
  flashCount: 0,
  alreadyFlashed: [],
};

rows.forEach((row, y) => {
  octoGrid[y] = new Array(row.length);
  [...row].forEach((point, x) => {
    octoGrid[y][x] = parseInt(point);
  });
});

const increaseCharge = function(grid, y, x) {
  if(typeof grid[y] !== 'undefined' && typeof grid[y][x] !== 'undefined') grid[y][x]++;
};

const getCharge = function(grid, y, x) {
  if(typeof grid[y] === 'undefined') return -1;
  if(typeof grid[y][x] === 'undefined') return -1;
  return grid[y][x];
}

const charge = function(grid) {
  grid.forEach((row, y) => {
    row.forEach((point, x) => {
      grid[y][x]++;
    })
  });
};

const processFlashes = function(grid, flash, tracker) {
  grid.forEach((row, y) => {
    row.forEach((point, x) => {
      flash(grid, y, x, false, tracker);
    })
  });
};

const flash = function(grid, y, x, charge, tracker) {
  if(charge && !tracker.alreadyFlashed.includes(`${x}${y}`)) increaseCharge(grid, y, x);
  if(getCharge(grid, y, x) > 9) {
    tracker.alreadyFlashed.push(`${x}${y}`);
    tracker.flashCount++;
    grid[y][x] = 0;
    flash(grid, y+1, x, true, tracker);
    flash(grid, y+1, x+1, true, tracker);
    flash(grid, y, x+1, true, tracker);
    flash(grid, y-1, x+1, true, tracker);
    flash(grid, y-1, x, true, tracker);
    flash(grid, y-1, x-1, true, tracker);
    flash(grid, y, x-1, true, tracker);
    flash(grid, y+1, x-1, true, tracker);
  }
};

const resetAlreadyFlashed = function(tracker) {
  tracker.alreadyFlashed = [];
};

const printGrid = function(grid) {
  grid.forEach(row => {
    console.log(row.join(''));
  });
};

printGrid(octoGrid);

for(let i = 0; i < 100; i++) {
  charge(octoGrid);
  processFlashes(octoGrid, flash, tracker);
  resetAlreadyFlashed(tracker);

  console.log('After step', i + 1, tracker.flashCount);
  printGrid(octoGrid);
}

console.log('Answer:', tracker.flashCount);
