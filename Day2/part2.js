const fs = require('fs')

var args = process.argv.slice(2);

const commands = fs.readFileSync(args[0], 'utf8').trim().split('\n');

let X = 0;
let Y = 0;
let aim = 0;
for(let i = 0; i < commands.length; i++) {
  const command = commands[i].split(' ');
  const delta = parseInt(command[1]);
  switch (command[0]) {
    case 'down':
      aim += delta;
      break;
    case 'up':
      aim -= delta;
      break;
    case 'forward':
      X += delta;
      Y += (aim * delta);
      break;
    default:
      break;
  }
}
console.log(`Final X: ${X}`);
console.log(`Final Y: ${Y}`);
console.log(`Answer: ${X*Y}`)