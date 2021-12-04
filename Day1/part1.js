const fs = require('fs')

var args = process.argv.slice(2);

const measurements = fs.readFileSync(args[0], 'utf8').trim().split('\n');

let increases = 0;
let decreases = 0;
for(let i = 1; i < measurements.length; i++) {
  const current = parseInt(measurements[i]);
  const previous = parseInt(measurements[i - 1]);
  if(current > previous) {
    increases++;
  } else if(current < previous) {
    decreases++
  }
}
console.log(`Decreases: ${decreases}/${measurements.length}`);
console.log(`Increases: ${increases}/${measurements.length}`);