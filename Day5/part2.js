const fs = require('fs');

var args = process.argv.slice(2);

const printMap = function(map) {
  for(let i = 0; i < size; i++) {
    for(let j = 0; j < size; j++) {
      process.stdout.write(map[j][i].toString());
    }
    process.stdout.write('\n');
  }
  process.stdout.write('\n');
};

const normalise = function(number) {
  if(number > 0) return 1;
  if(number === 0) return 0;
  return -1;
};

const normaliseVector = function(vector) {
  return [normalise(vector[0]), normalise(vector[1])];
}

const getLargestCoord = function(c) {
  if(Math.abs(c[0]) > Math.abs(c[1])) return Math.abs(c[0]);

  return Math.abs(c[1]);
}

const vectorCheck = function(c) {
  if(c[0] === 0) return true;
  if(c[1] === 0) return true;
  if(Math.abs(c[0]) === Math.abs(c[1])) return true;
  return false;
}

const drawLine = function(a, b, map) {
  // vector a -> b
  const vector = [b[0] - a[0], b[1] - a[1]];
  const normalisedVector = normaliseVector(vector);

  if(vectorCheck(vector) && normalisedVector) {
    console.log('Drawing line between', a, b);
    for(let i = 0; i <= getLargestCoord(vector); i++) {
      const x = a[0] + (i*normalisedVector[0]);
      const y = a[1] + (i*normalisedVector[1]);
      map[x][y] += 1;
    }
  }
  // printMap(map);
}.bind(printMap);

const vectors = fs.readFileSync(args[0], 'utf8').trim().split('\n');

const map = [];
const size = 1000;

for(let i = 0; i < size; i++) {
  map[i] = [];
  for(let j = 0; j < size; j++) {
    map[i][j] = 0;
  }
}

vectors.forEach((vector) => {
  const points = vector.split(' -> ');
  const a = points[0].split(',').map(string => parseInt(string));
  const b = points[1].split(',').map(string => parseInt(string));

  drawLine(a, b, map);
});

let hotPointCount = 0;
for(let i = 0; i < size; i++) {
  for(let j = 0; j < size; j++) {
    if(map[j][i] > 1) {
      hotPointCount++;
    }
  }
}

console.log(`Answer: ${hotPointCount}`);