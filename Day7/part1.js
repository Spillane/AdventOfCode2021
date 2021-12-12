const fs = require('fs');

var args = process.argv.slice(2);

const lines = fs.readFileSync(args[0], 'utf8').trim().split('\n');
let crabPositions = lines[0].split(',').map(position => parseInt(position));

const calculateFuelCost = function(positions, target) {
  let fuelCost = 0;
  positions.forEach(position => {
    fuelCost += Math.abs(position - target);
  });

  return fuelCost;
};

const bruteForceCalcs = [];

for(let i = 0; i <= Math.max(...crabPositions); i++) {
  bruteForceCalcs[i] = calculateFuelCost(crabPositions, i);
}

console.log('Answer:', Math.min(...bruteForceCalcs));
