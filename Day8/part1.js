const fs = require('fs');

var args = process.argv.slice(2);

const entries = fs.readFileSync(args[0], 'utf8').trim().split('\n');

const lengthCheck = function(inputDigit) {
  switch (inputDigit.length) {
    case 2:
      return [1];
    case 3:
      return [7];
    case 4:
      return [4];
    case 5:
      return [3,5,6];
    case 6:
      return [0,6,9];
    case 7:
      return [8];
    default:
      return [];
  }
}

const calculateEntry = function(entry, tracker) {
  const inputCodes = entry.split('|')[1].trim().split(' ');
  const codedDigits = entry.split('|')[0].trim().split(' ');

  const outputCode = [];
  
  inputCodes.forEach(inputDigit => {
    const possibileDigits = lengthCheck(inputDigit);

    if(possibileDigits.length === 1) {
      outputCode.push(possibileDigits[0]);
      tracker.count++;
    } else {
      outputCode.push('#');
    }
  })

  return outputCode;
};

const decodedEntries = [];
const tracker = {
  count: 0
};

for(let i = 0; i < entries.length; i++) {
  decodedEntries.push(calculateEntry(entries[i], tracker));
}

console.log('Answer:', tracker.count);
