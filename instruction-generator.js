var fs = require('fs');

var output = ''
var defaultNumInstructions = 10;
var numInputs = (process.argv[2]) ? process.argv[2] : defaultNumInstructions;

var getRandomInt = function(max) {
  return Math.floor(Math.random() * max);
}

var getRandomStartPosition = function() {
  return 10 + getRandomInt(89);
}

var getRandomOrientation = function() {
  // Duplicated 3 times to try and increase random distribution
  var orientations = ['N', 'E', 'S', 'W', 'N', 'E', 'S', 'W', 'N', 'E', 'S', 'W'];
  return orientations[Math.floor(Math.random()*orientations.length)];
}

var getRandomInstructions = function() {
  // Duplicated 3 times to try and increase random distribution
  var instructions = ['L', 'R', 'F', 'L', 'R', 'F', 'L', 'R', 'F'];
  var numInstructions = Math.random() * 100;
  var returnInstructions = ''
  for (var i = 0; i < numInstructions; i++) {
    returnInstructions += instructions[Math.floor(Math.random() * instructions.length)];
  }

  return returnInstructions;
}

for (var i = 0; i < numInputs; i++) {
    output += getRandomStartPosition() + getRandomOrientation() + ' ' + getRandomInstructions() + '\n';
}

fs.writeFileSync('generated-instructions.txt', output);
