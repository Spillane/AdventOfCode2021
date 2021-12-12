const fs = require('fs');

var args = process.argv.slice(2);

const rows = fs.readFileSync(args[0], 'utf8').trim().split('\n');

const map = new Array(rows.length);

const getValue = function(map, row, col) {
  if(typeof map[row] === 'undefined') return Number.MAX_SAFE_INTEGER;
  if(typeof map[row][col] === 'undefined') return Number.MAX_SAFE_INTEGER;
  return map[row][col].height;
}

const setBasin = function(map, row, col, basins) {
  if(typeof map[row] === 'undefined') return;
  if(typeof map[row][col] === 'undefined') return;
  if(getValue(map, row, col) === 9) return;
  if(map[row][col].basin) return;
  map[row][col].basin = getBasin(basins);
  return 1;
}

const basins = [];
const createNewBasin = function(basins) {
  const currentIndex = basins.length;
  const newBasin = {
    count: 0,
    index: currentIndex,
  };
  basins.push(newBasin);
  return newBasin;
};

const getBasin = function(basins) {
  basins[basins.length - 1].count++;
  return basins[basins.length - 1];
};

const calculateBasin = function(map, row, col, basins) {
  const basin = setBasin(map, row, col, basins);
  if(typeof basin !== 'undefined') {
    calculateBasin(map, row+1, col, basins);
    calculateBasin(map, row-1, col, basins);
    calculateBasin(map, row, col-1, basins);
    calculateBasin(map, row, col+1, basins);
  }
  return;
};

rows.forEach((row, rowI) => {
  [...row].forEach((point, colI) => {
    if(typeof map[rowI] === 'undefined') map[rowI] = new Array(rows[rowI].length);
    map[rowI][colI] = {
      height: parseInt(point),
      basinIndex: undefined,
    };
  })
});

createNewBasin(basins);

map.forEach((row, rowI) => {
  row.forEach((point, colI) => {
    calculateBasin(map, rowI, colI, basins);
    createNewBasin(basins);
  })
});


const printMap = function(map) {
  process.stdout.write('\n');
  map.forEach(row => {
    row.forEach(point => {
      process.stdout.write(JSON.stringify(point.height));
    })
    process.stdout.write('\n');
  });
  process.stdout.write('\n');
  map.forEach(row => {
    row.forEach(point => {
      if(typeof point.basin === 'undefined') process.stdout.write('###\t');
      else if(typeof point.basin.index === 'undefined') process.stdout.write('?\t');
      else process.stdout.write(point.basin.index.toString() + '\t');
    })
    process.stdout.write('\n');
  });
};

// printMap(map);

function compare(a, b) {
  return b.count - a.count;
}

basins.sort(compare);

console.log('Answer:', basins[0].count * basins[1].count * basins[2].count);
