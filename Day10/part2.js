const fs = require('fs');

var args = process.argv.slice(2);

const lines = fs.readFileSync(args[0], 'utf8').trim().split('\n');

const pointMap = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};

const lineScores = [];
for(let row = 0; row < lines.length; row++) {
  const line = lines[row];
  const tracker = {
    '}': 0,
    ']': 0,
    '>': 0,
    ')': 0,
    openList: [],
    mismatchFlag: false,
  };

  const close = function(char, tracker) {
    tracker[char]--;
    if(tracker.openList[tracker.openList.length - 1] !== char) {
      tracker.mismatchFlag = true;
    } else {
      tracker.openList.pop();
    }
  };

  const open = function(char, tracker) {
    tracker[char]++;
    tracker.openList.push(char);
  };

  for(let i = 0; i < line.length; i++) {
    const char = line[i];

    switch (char) {
      case '{':
        open('}', tracker)
        break;
      case '}':
        close('}', tracker);
        break;
      case '[':
        open(']', tracker)
        break;
      case ']':
        close(']', tracker);
        break;
      case '<':
        open('>', tracker)
        break;
      case '>':
        close('>', tracker);
        break;
      case '(':
        open(')', tracker)
        break;
      case ')':
        close(')', tracker);
        break;
      default:
        break;
    }

    if(tracker.mismatchFlag) {
      // Ignore line
      break;
    };
  };

  let lineScore = 0;
  if(!tracker.mismatchFlag) {
    tracker.openList.reverse();
    tracker.openList.forEach(char => {
      lineScore *= 5;
      lineScore += pointMap[char];
    });
    lineScores.push(lineScore);
  };
};

const midPoint = Math.ceil(lineScores.length/2) - 1;
lineScores.sort((a, b) => a - b)
const middleScore = lineScores[midPoint];

console.log('length', lineScores.length);
console.log(lineScores)
console.log(midPoint);
console.log(middleScore);
console.log('Answer:', middleScore);
