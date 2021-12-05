const fs = require('fs');

var args = process.argv.slice(2);

const vectors = fs.readFileSync(args[0], 'utf8').trim().split('\n');

const map = [];
const size = 1000;

for(let i = 0; i < size; i++) {
  map[i] = [];
  for(let j = 0; j < size; j++) {
    map[i][j] = 0;
  }
}

const printMap = function(map) {
  for(let i = 0; i < size; i++) {
    for(let j = 0; j < size; j++) {
      process.stdout.write(map[j][i].toString());
    }
    process.stdout.write('\n');
  }
  process.stdout.write('\n');
};

const drawLine = function(between, isVertical, rowOrColIndex, map) {
  between = between.sort((x, y) => x - y);
  console.log('drawing line between', between, `on ${isVertical ? 'col' : 'row'}`, rowOrColIndex);
  for(let i = between[0]; i <= between[1]; i++) {
    if(isVertical) {
      map[rowOrColIndex][i]++;
    } else {
      map[i][rowOrColIndex]++;
    }
  }
  // printMap(map);
}.bind(printMap);

vectors.forEach((vector) => {
  const points = vector.split(' -> ');
  const a = points[0].split(',').map(string => parseInt(string));
  const b = points[1].split(',').map(string => parseInt(string));

  if(a[0] === b[0]) {
    drawLine([a[1],b[1]], true, a[0], map);
  } else if(a[1] === b[1]) {
    drawLine([a[0],b[0]], false, a[1], map);
  }
});

let hotPointCount = 0;
console.log('\n');
for(let i = 0; i < size; i++) {
  for(let j = 0; j < size; j++) {
    process.stdout.write(map[j][i].toString());
    if(map[j][i] > 1) {
      hotPointCount++;
    }
  }
  process.stdout.write('\n');
}

console.log(`Answer: ${hotPointCount}`);