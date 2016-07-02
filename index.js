var fs = require('fs');

// some constants we need for later
var NORTH = 'N';
var EAST = 'E';
var SOUTH = 'S';
var WEST = 'W';
var DIRECTIONS = [NORTH, EAST, SOUTH, WEST];
var LEFT = 'L';
var RIGHT = 'R';
var FORWARD = 'F';

// read the input file
fs.readFile('input.txt', 'utf8', function(err, input) {
  // create out output string, which we'll add to later
  var output = '';

  // split the input on the newline char and loop over each line
  input.split('\n').map((line, i) => {
    if(i === 0) {
      // the first line is always the grid size, store that for later
      this.grid = parseGrid(line);
    } else {
      // add each robot's output to the string
      output += parseRobot(this.grid, line)
    }
  });

  // write out file out to output.txt
  fs.writeFileSync('output.txt', output);
  console.log('All the robots got thier instructions. \nThe output has been saved to output.txt.');
  if(this.grid.lostRobots.length > 0) console.log('Sadly we lost ' + this.grid.lostRobots.length)
});

var parseGrid = function(gridInput) {
  // return the grid as an object
  return {width: gridInput[0], height: gridInput[1], lostRobots: []};
}

var parseRobot = function(grid, robotInput) {
  // some text editors add an extra line at the end of files,
  // check if the input has a zero length and ignore it
  if(robotInput.length === 0) return '';

  // split the input, the first part is the robot's origin
  // the second part is the instructions
  var robot = parseOrigin(robotInput.split(' ')[0]);
  var instructions = robotInput.split(' ')[1];

  // loop over the instructions and call the appropriate
  // method for moving or changing orientation
  for (var i = 0; i < instructions.length; i++) {
    var instruction = instructions[i];
    if(instruction === FORWARD) {
      changePosition(grid, robot, instruction);
    } else {
      changeOrientation(robot, instruction);
    }
  }

  var isLost = (robot.lost) ? 'LOST' : '';
  // return our output
  return robot.x.toString() + robot.y.toString() + robot.orientation + isLost + '\n';
}

var parseOrigin = function(originInput) {
  // return our robot information as an object with x, y, orientation and lost boolean
  return {x: parseInt(originInput[0]), y: parseInt(originInput[1]), orientation: originInput[2], lost: false}
}

var changeOrientation = function(robot, instruction) {
  // if our robot is already lost just return it
  if(robot.lost) return robot;

  // create our newOrientation var for use later
  var newOrientation;

  // loop over the directions
  for (var i = 0; i < DIRECTIONS.length; i++) {
    var direction = DIRECTIONS[i];

    // when the orientations match
    if(direction === robot.orientation) {
      // switch over the instruction and set the newOrientation based on the
      // index in the directions array
      switch (instruction) {
        case LEFT:
          newOrientation = (i === 0) ? DIRECTIONS[DIRECTIONS.length - 1] : DIRECTIONS[i-1];
          break;
        case RIGHT:
          newOrientation = (i === DIRECTIONS.length - 1) ? DIRECTIONS[0] : DIRECTIONS[i+1];
          break;
      }
    }
  }

  // return the robot with it's new orientation
  return robot.orientation = newOrientation;
}

var changePosition = function(grid, robot, instruction) {
  // if our robot is already lost just return it
  if(robot.lost) return robot;

  // create our newPosition, we'll need that later
  var newPosition;

  // switch over the orientation and add or subtract 1 from the appropriate axis
  switch (robot.orientation) {
    case NORTH:
      newPosition = {x: robot.x, y: robot.y + 1};
      break;
    case EAST:
      newPosition = {x: robot.x + 1, y: robot.y};
      break;
    case SOUTH:
    newPosition = {x: robot.x, y: robot.y - 1};
      break;
    case WEST:
    newPosition = {x: robot.x - 1, y: robot.y};
      break;
    default:
  }

  // check if the robot is outside the grid bounds
  if(newPosition.x > grid.width || newPosition.x < 0
    || newPosition.y > grid.height || newPosition.y < 0) {

    // loop over the saved scents where robots have disappeared
    for (var i = 0; i < this.grid.lostRobots.length; i++) {
      var scent = this.grid.lostRobots[i];
      // if the robot's position matches the scent, ignore the instruction
      if(robot.x === scent.x && robot.y === scent.y){
        return robot;
      }
    }

    // save the "scent" where the robot dropped off the grid
    this.grid.lostRobots.push({x: robot.x, y: robot.y})

    // return the robot with lost set to true
    return robot.lost = true;
  } else {
    // update the robots position and return it
    robot.x = newPosition.x;
    robot.y = newPosition.y;
    return robot;
  }
}
