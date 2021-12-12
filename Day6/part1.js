const fs = require('fs');

var args = process.argv.slice(2);

const lines = fs.readFileSync(args[0], 'utf8').trim().split('\n');
let fishTimers = lines[0].split(',').map(stringFishTimer => parseInt(stringFishTimer));
const newBornInitialTimer = 8;
const newTimer = 6;

const days = 80;

// console.log('Initial state', JSON.stringify(fishTimers));

for(let currentDay = 0; currentDay < days; currentDay++) {
  const babyFish = [];

  for(let i = 0; i < fishTimers.length; i++) {
    if(fishTimers[i] == 0) {
      babyFish.push(newBornInitialTimer);
      fishTimers[i] = newTimer;
    } else {
      fishTimers[i]--;
    }
  };
  fishTimers = fishTimers.concat(babyFish);
  // console.log('After day', currentDay + 1, JSON.stringify(fishTimers));
}

console.log(`Answer: ${fishTimers.length}`)