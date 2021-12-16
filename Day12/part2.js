const fs = require('fs');

var args = process.argv.slice(2);

const paths = fs.readFileSync(args[0], 'utf8').trim().split('\n');

const network = {};

// 0: Lowercase
// 1: Uppercase
// -1: neither
const checkCase = function(c) {
  var u = c.toUpperCase();
  return (c.toLowerCase() === u ? -1 : (c === u ? 1 : 0));
};

paths.forEach(path => {
  const start = path.split('-')[0];
  const end = path.split('-')[1];

  if(typeof network[start] === 'undefined') network[start] = [];
  if(typeof network[end] === 'undefined') network[end] = [];
  network[start].push(end);
  network[end].push(start);
});

const countCharAndMaxLowerCase = function(array, value) {
  var map = {};
  var max = 0;
  array.forEach(v => {
    if(checkCase(v) === 0) {
      if(typeof map[v] === 'undefined') map[v] = 0; 
      map[v]++;
      if(map[v] > max) max = map[v];
    }
  });

  return {
    max,
    count: map[value] ? map[value] : 0,
  };
};

const getMaxAllowedChars = function(currentMax) {
  return currentMax >= 2 ? 1 : 2; 
};

// recurse the cave!
const explore = function(network, currentPos, history, completePaths) {
  // console.log('Current Position', currentPos);
  if(currentPos === 'end') {
    completePaths.push([...history, 'end']);
  } else {
    history.push(currentPos);
    network[currentPos].forEach(dest => {
      // console.log('checking:', currentPos, '->', dest);
      // are we allowed to explore dest
      if(dest !== 'start' && !history.includes('end')) {  // dest isn't start or we havn't been to end already
        const counts = checkCase(dest) === 0 ? countCharAndMaxLowerCase(history, dest) : {};
        if (
          checkCase(dest) !== 0 || //  is uppercase
          (checkCase(dest) === 0 && counts.count < getMaxAllowedChars(counts.max)) // lowercase not visted twice
        ) {
        // console.log('EXPLORING:', currentPos, '->', dest);
        explore(network, dest, [...history], completePaths);
      }
      }
    });
  }
  // console.log('returning undefined for', currentPos);
};

const completePaths = [];
explore(network, 'start', [], completePaths);

// console.log(JSON.stringify(network, null, 2));
completePaths.forEach(completed => console.log(completed.join(',')));

console.log('Answer:', completePaths.length);
