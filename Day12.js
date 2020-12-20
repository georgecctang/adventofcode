const fs = require('fs');

const setDirection = (currentDirection, rotation, degree) => {
  const directions = ['E', 'S', 'W', 'N'];
  let index = directions.indexOf(currentDirection);
  if (rotation === "R") {
    index += degree / 90; 
  }  else {
    index -= degree / 90;
  }
  if (index >= directions.length) {
    index = index - directions.length;
  }
  return directions.splice(index,1)[0];
}

const moveDirection = (currentPosition, direction, step) => {
  const directionObj = {
    N: {x: 0, y: 1},
    E: {x: 1, y: 0},
    S: {x: 0, y: -1},
    W: {x: -1, y: 0}
  };
  currentPosition.x += directionObj[direction]['x'] * step;
  currentPosition.y += directionObj[direction]['y'] * step;
}

setWaypointDirection = (currentWaypoint, rotation, degree) => {
  const currentDirections = Object.keys(currentWaypoint);
  const currentValues = Object.values(currentWaypoint);
  let newDirections;
  if (rotation === 'R') {
    const shiftIndex = degree / 90;
    newDirections = currentDirections.slice(shiftIndex).concat(currentDirections.slice(0,shiftIndex));
  } else {
    const shiftIndex = - degree / 90;
    newDirections = currentDirections.slice(shiftIndex).concat(currentDirections.slice(0,currentDirections.length + shiftIndex));
  }
  const newWaypoint = {};
  for (let i = 0; i < newDirections.length; i++) {
    newWaypoint[newDirections[i]] = currentValues[i];
  }
  return newWaypoint;
}

const updateWaypoint = (currentWaypoint, direction, step) => {
  currentWaypoint[direction] += step;
}
const moveForward = (currentPosition, wayPoint, step) => {
  currentPosition.x += wayPoint['E'] * step; 
  currentPosition.x -= wayPoint['W'] * step;
  currentPosition.y += wayPoint['N'] * step;
  currentPosition.y -= wayPoint['S'] * step;
}

const question1 = () => {

  fs.readFile('./data/Day12-data.txt', (err, data) => {
    const instructions = data.toString().split('\n')
      .map(item => [item.match(/[A-Z]/)[0], Number(item.match(/[0-9]+/)[0])]);
    let currentDirection = 'E';
    let currentPosition = {x: 0, y: 0};
    instructions.forEach(instruction => {
      if (['L','R'].includes(instruction[0])) {
        currentDirection = setDirection(currentDirection, instruction[0], instruction[1]);
      } else if (instruction[0] === 'F') {
        moveDirection(currentPosition, currentDirection, instruction[1]);
      } else {
        moveDirection(currentPosition, instruction[0], instruction[1]);
      }
    })

    console.log(Math.abs(currentPosition.x) + Math.abs(currentPosition.y));
  })

}

// question1();

const question2 = () => {

  fs.readFile('./data/Day12-data.txt', (err, data) => {
    const instructions = data.toString().split('\n')
      .map(item => [item.match(/[A-Z]/)[0], Number(item.match(/[0-9]+/)[0])]);

    let currentWaypoint = {E: 10, S: 0, W: 0, N: 1};
    let currentPosition = {x: 0, y: 0};

    instructions.forEach(instruction => {
      if (['L', 'R'].includes(instruction[0])) {
        currentWaypoint = setWaypointDirection(currentWaypoint, instruction[0], instruction[1])
      }  else if (instruction[0] === 'F') {
        moveForward(currentPosition,currentWaypoint, instruction[1]);
      } else {
        updateWaypoint(currentWaypoint, instruction[0], instruction[1]);
      }
      console.log(instruction);
      console.log(currentPosition);
      console.log(currentWaypoint);
    })
    console.log(Math.abs(currentPosition['x']) + Math.abs(currentPosition['y']));
  });
}
question2();