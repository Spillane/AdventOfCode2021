const fs = require('fs')

var args = process.argv.slice(2);

const readings = fs.readFileSync(args[0], 'utf8').trim().split('\n');

const getBinaryString = (array)  => {
  let binaryString = '';

  for(let i = 0; i < array.length; i++) {
    binaryString = binaryString.concat(array[i]);
  }

  return binaryString;
}

const filter = (binaryStrings, index, option) => {
  const filtered = [];
  binaryStrings.forEach(binaryString => {
    if(binaryString[index] === option) filtered.push(binaryString);
  });

  return filtered;
};

const calculateCommon = (binaryStrings, index, isLeastCommon) => {
  let total = 0;
  binaryStrings.forEach(binaryString => {
    total += (parseInt(binaryString[index]) ? 1 : -1);
  });

  if(isLeastCommon) {
    total *= -1;
  }

  if(total === 0) return isLeastCommon ? '0' : '1';
  if(total > 0) return '1';
  return '0';
};

const iterate = (array, index, isLeastCommon) => {
  const numbers = filter(array, index, calculateCommon(array, index, isLeastCommon));
  if(numbers.length !== 1) {
    return iterate(numbers, index+1, isLeastCommon);
  } else {
    return numbers[0];
  }
};

const O2 = iterate(readings, 0, false);
const CO2 = iterate(readings, 0, true);

console.log(`O2: ${getBinaryString(O2)}`);
console.log(`CO2: ${getBinaryString(CO2)}`);

const O2Dec = parseInt(getBinaryString(O2), 2);
const CO2Dec = parseInt(getBinaryString(CO2), 2);
console.log(`Answer: ${O2Dec}*${CO2Dec}=${O2Dec*CO2Dec}`)