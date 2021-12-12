const fs = require('fs');

var args = process.argv.slice(2);

const lines = fs.readFileSync(args[0], 'utf8').trim().split('\n');
let fishTimers = lines[0].split(',').map(stringFishTimer => parseInt(stringFishTimer));

const days = 256;

const fishesByState = [0,0,0,0,0,0,0,0,0];

fishTimers.forEach(fishState => {
  fishesByState[fishState]++;
});


console.log('Inital state', JSON.stringify(fishesByState));

for(let currentDay = 0; currentDay < days; currentDay++) {
  const babyFish = fishesByState[0];
  const resetFish = fishesByState[0];

  fishesByState[0] = fishesByState[1];
  fishesByState[1] = fishesByState[2];
  fishesByState[2] = fishesByState[3];
  fishesByState[3] = fishesByState[4];
  fishesByState[4] = fishesByState[5];
  fishesByState[5] = fishesByState[6];
  fishesByState[6] = fishesByState[7] + resetFish;
  fishesByState[7] = fishesByState[8];
  fishesByState[8] = babyFish;

  console.log('After day', currentDay, JSON.stringify(fishesByState));
}

const fishReducer = (previousValue, currentValue) => previousValue + currentValue;
const fishTotal = fishesByState.reduce(fishReducer);

console.log(`Answer: ${fishTotal}`)