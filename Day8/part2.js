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
      return [3,5,2];
    case 6:
      return [0,6,9];
    case 7:
      return [8];
    default:
      return [];
  }
}

const aContainsAllOfB = function(a,b) {
  return [...b].every(letter => a.includes(letter));
};

const match = function(a,b) {
  return [...b].every(letter => a.includes(letter)) && [...a].every(letter => b.includes(letter));
};

const missingChar = function(a) {
  let possibleChars = 'abcdefg';
  for(let i = 0; i < a.length; i++) {
    possibleChars = possibleChars.replace(a[i], '');
  }
  return possibleChars;
}

const calculateEntry = function(entry, tracker) {
  const inputCodes = entry.split('|')[1].trim().split(' ');
  const codedDigits = entry.split('|')[0].trim().split(' ');

  const conversionMap = {};

  conversionMap[codedDigits.filter(codedDigit => codedDigit.length === 2)[0]] = 1;
  conversionMap[codedDigits.filter(codedDigit => codedDigit.length === 3)[0]] = 7;
  conversionMap[codedDigits.filter(codedDigit => codedDigit.length === 4)[0]] = 4;
  conversionMap[codedDigits.filter(codedDigit => codedDigit.length === 7)[0]] = 8;

  conversionMap[7] = codedDigits.filter(codedDigit => codedDigit.length === 3)[0];
  conversionMap[1] = codedDigits.filter(codedDigit => codedDigit.length === 2)[0];
  conversionMap[4] = codedDigits.filter(codedDigit => codedDigit.length === 4)[0];
  conversionMap[8] = codedDigits.filter(codedDigit => codedDigit.length === 7)[0];

  codedDigits.filter(codedDigit => codedDigit.length === 6).forEach(a => {
    console.log('missingChar(a)', a, missingChar(a), conversionMap[4], !conversionMap[4].includes(missingChar(a)));
    if(conversionMap[1].includes(missingChar(a))) {
      conversionMap[a] = 6;
      conversionMap[6] = a;
    } else if(conversionMap[4].includes(missingChar(a))) {
      conversionMap[a] = 0;
      conversionMap[0] = a;
    } else {
      conversionMap[a] = 9;
      conversionMap[9] = a;
    }
  })

  codedDigits.filter(codedDigit => codedDigit.length === 5).forEach(a => {
    if(aContainsAllOfB(a, conversionMap[1])) {
      conversionMap[a] = 3;
      conversionMap[3] = a;
    } else if(aContainsAllOfB(conversionMap[9], a)) {
      conversionMap[a] = 5;
      conversionMap[5] = a;
    } else {
      console.log(conversionMap[9], a, aContainsAllOfB(conversionMap[9], a))
      conversionMap[a] = 2;
      conversionMap[2] = a;
    }
  })

  let outputCode = '';
  
  inputCodes.forEach(inputDigit => {
    console.log(inputDigit);
    Object.keys(conversionMap).forEach(letters => {
      if(match(letters, inputDigit)) {
        outputCode += conversionMap[letters].toString();
      }
    })
  })

  return outputCode;
};

const decodedEntries = [];
const tracker = {
  count: 0
};

for(let i = 0; i < entries.length; i++) {
  decodedEntries.push(calculateEntry(entries[i], tracker));
  tracker.count += parseInt(decodedEntries[i]);
}

console.log('decodedEntries:', decodedEntries);
console.log('Answer:', tracker.count);
