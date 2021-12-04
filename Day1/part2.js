const fs = require('fs')

var args = process.argv.slice(2);

const measurements = fs.readFileSync(args[0], 'utf8').trim().split('\n');

const getWindowSum = (i) => {
  return parseInt(measurements[i-1]) + parseInt(measurements[i]) + parseInt(measurements[i+1]);
};

let increases = 0;
let decreases = 0;
for(let i = 2; i < (measurements.length - 1); i++) {
  const current = getWindowSum(i);
  const previous = getWindowSum(i-1);
  if(current > previous) {
    increases++;
  } else if(current < previous) {
    decreases++
  }
}
console.log(`Decreases: ${decreases}/${measurements.length}`);
console.log(`Increases: ${increases}/${measurements.length}`);