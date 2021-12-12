const fs = require('fs');

var args = process.argv.slice(2);

const rows = fs.readFileSync(args[0], 'utf8').trim().split('\n');

const map = new Array(rows.length);

const getValue = function(map, row, col) {
  if(typeof map[row] === 'undefined') return Number.MAX_SAFE_INTEGER;
  if(typeof map[row][col] === 'undefined') return Number.MAX_SAFE_INTEGER;
  return map[row][col];
}

const isLowPoint = function(map, row, col) {
  const up = getValue(map, row+1, col);
  const down = getValue(map, row-1, col);
  const left = getValue(map, row, col-1);
  const right = getValue(map, row, col+1);
  const current = map[row][col];
  return current < up &&
    current < down && 
    current < left &&
    current < right;
};

rows.forEach((row, rowI) => {
  [...row].forEach((point, colI) => {
    if(typeof map[rowI] === 'undefined') map[rowI] = new Array(rows[rowI].length);
    map[rowI][colI] = parseInt(point);
  })
});

let lowPointTotal = 0;
map.forEach((row, rowI) => {
  row.forEach((point, colI) => {
    if(isLowPoint(map, rowI, colI)) lowPointTotal += (point + 1);
  })
});

const printMap = function(map) {
  map.forEach(row => {
    console.log(row.join(''));
  });
};

printMap(map);

console.log('Answer:', lowPointTotal);
