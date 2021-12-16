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

const deleteFromNetwork = function(network, deleteNode) {
  // console.log('deleting', deleteNode);
  delete network[deleteNode];
  Object.keys(network).forEach(node => {
    network[node] = network[node].filter(dest => dest !== deleteNode);
  });
};

// tree shake single nodes
Object.keys(network).forEach(node => {
  if(
    node !== 'start' &&
    node !== 'end' &&
    checkCase(node) === 0 &&
    network[node].every(dest => checkCase(dest) === 0)
  ) {
    deleteFromNetwork(network, node);
  }
});

// recurse the cave!
const explore = function(network, currentPos, history, completePaths) {
  // console.log('Current Position', currentPos);
  if(currentPos === 'end') {
    completePaths.push([...history]);
  } else {
    history.push(currentPos);
    network[currentPos].forEach(dest => {
      // console.log('checking:', currentPos, '->', dest);
      // are we allowed to explore dest
      if(
        (checkCase(dest) === 0 && !history.includes(dest)) || // lowercase not in history (indludes start)
        checkCase(dest) !== 0 //  is uppercase
      ) {
        // console.log('EXPLORING:', currentPos, '->', dest);
        explore(network, dest, [...history], completePaths);
      }
    });
  }
  // console.log('returning undefined for', currentPos);
};

const completePaths = [];
explore(network, 'start', [], completePaths);

// console.log(JSON.stringify(network, null, 2));
// console.log(completePaths);

console.log('Answer:', completePaths.length);
