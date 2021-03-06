const fs = require('fs');

var args = process.argv.slice(2);

const lines = fs.readFileSync(args[0], 'utf8').trim().split('\n');

const pointMap = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

let pointTotal = 0;
for(let row = 0; row < lines.length; row++) {
  const line = lines[row];
  const tracker = {
    '}': 0,
    ']': 0,
    '>': 0,
    ')': 0,
    openList: [],
    closeList: [],
    mismatchFlag: false,
  };

  const close = function(char, tracker, pointTotal, pointMap) {
    tracker[char]--;
    if(tracker.openList[tracker.openList.length - 1] !== char) {
      pointTotal += pointMap[char];
      tracker.mismatchFlag = true;
      console.log('Adding', pointMap[char], 'for', char);
      console.log('Mismatch expected', tracker.openList[tracker.openList.length - 1], 'but recieved', char);
    } else {
      tracker.openList.pop();
    }
    return pointTotal;
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
        pointTotal = close('}', tracker, pointTotal, pointMap);
        break;
      case '[':
        open(']', tracker)
        break;
      case ']':
        pointTotal = close(']', tracker, pointTotal, pointMap);
        break;
      case '<':
        open('>', tracker)
        break;
      case '>':
        pointTotal = close('>', tracker, pointTotal, pointMap);
        break;
      case '(':
        open(')', tracker)
        break;
      case ')':
        pointTotal = close(')', tracker, pointTotal, pointMap);
        break;
      default:
        break;
    }

    if(tracker.mismatchFlag) {
      break;
    };
  };

  console.log('end of line');
};

console.log('Answer:', pointTotal);
