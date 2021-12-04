const fs = require('fs')

var args = process.argv.slice(2);

const readings = fs.readFileSync(args[0], 'utf8').trim().split('\n');

const normalise = (array) => {
  for(let i = 0; i < array.length; i++) {
    if(array[i] > 0) array[i] = 1;
    else array[i] = 0;
  }
}

const getBinaryString = (array)  => {
  let binaryString = '';

  array.forEach(item => {
    binaryString = binaryString.concat(item);
  });
  return binaryString;
}

const invert = (array) => {
  const inverted = [];
  array.forEach((item, index) => {
    if(item) inverted[index] = 0;
    else inverted[index] = 1;
  });

  return inverted;
};

let gamma = [];

for(let i = 0; i < readings[i].length; i++) {
  gamma.push(0);
}

for(let i = 0; i < readings.length; i++) {
  for(let j = 0; j < readings[i].length; j++) {
    gamma[j] += (parseInt(readings[i][j]) ? 1 : -1);
  }
}

console.log(gamma);

normalise(gamma);

console.log(`Gamma: ${getBinaryString(gamma)}`);
console.log(`Epsilon: ${getBinaryString(invert(gamma))}`);

const gammaDecimal = parseInt(getBinaryString(gamma), 2);
const epsilonDecimal = parseInt(getBinaryString(invert(gamma)), 2);
console.log(`Answer: ${gammaDecimal}*${epsilonDecimal}=${gammaDecimal*epsilonDecimal}`)