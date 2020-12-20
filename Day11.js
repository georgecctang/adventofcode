const fs = require('fs');


const lookForOccupiedSeat = (seatings, rowIndex, colIndex, rowDirection, colDirection) => {
  let rowPosition = rowIndex + rowDirection;
  let colPosition = colIndex + colDirection;
  let seat;
  while ((rowPosition >= 0 && rowPosition < seatings.length) 
    && (colPosition >= 0 && colPosition < seatings[0].length)
    && (!['#', 'L'].includes(seat))
    ) {
      seat = seatings[rowPosition][colPosition];
      rowPosition += rowDirection;
      colPosition += colDirection;
  }
  return seat === "#" ? 1 : 0;
}

const countOccupiedSeats = (seatings) => {
  let occupiedSeats = 0;
  seatings.forEach(row => {
    row.forEach(seat => {
      if (seat === "#") {
        occupiedSeats++;
      }
    })
  })
  return occupiedSeats;
}

const getSurroundingOccupiedSeats = (seatings, rowIndex, colIndex) => {
  
  let surroundingOccupiedSeats = 0;
  for (let row of [rowIndex - 1, rowIndex, rowIndex + 1]) {
    for (let col of [colIndex - 1, colIndex, colIndex + 1]) {
      if (row < 0 || row >= seatings.length) {
        continue;
      }
      if (col < 0 || col >= seatings[0].length) {
        continue;
      }
      if (row === rowIndex && col === colIndex) {
        continue;
      }
      if (seatings[row][col] === "#") {
        surroundingOccupiedSeats++;
      }
    }
  }
  return surroundingOccupiedSeats;


}

const getSurroundingOccupiedSeats2 = (seatings, rowIndex, colIndex) => {
  let surroundingOccupiedSeats = 0;
  // Look top
  surroundingOccupiedSeats += lookForOccupiedSeat(seatings, rowIndex, colIndex, -1, 0);
  // Loop top right
  surroundingOccupiedSeats += lookForOccupiedSeat(seatings, rowIndex, colIndex, -1, 1);
  // Look right
  surroundingOccupiedSeats += lookForOccupiedSeat(seatings, rowIndex, colIndex, 0, 1);
  // Look bottom right
  surroundingOccupiedSeats += lookForOccupiedSeat(seatings, rowIndex, colIndex, 1, 1);
  // Look bottom
  surroundingOccupiedSeats += lookForOccupiedSeat(seatings, rowIndex, colIndex, 1, 0);
  // Look bottom left
  surroundingOccupiedSeats += lookForOccupiedSeat(seatings, rowIndex, colIndex, 1, -1);
  // Look left
  surroundingOccupiedSeats += lookForOccupiedSeat(seatings, rowIndex, colIndex, 0, -1);
  // Look top left
  surroundingOccupiedSeats += lookForOccupiedSeat(seatings, rowIndex, colIndex, -1, -1);

  return surroundingOccupiedSeats;
}


const getNewSeatings = (seatings) => {

  const newSeatings = [];

  // loop through the existing seatings
  for (let i = 0; i < seatings.length; i++) {
    const newSeatingsRow = [];
    for (let j = 0; j <seatings[0].length; j++) {
      
      // set newState to the current state as initial value
      let newState = seatings[i][j];
      
      // evaluate surrounding seats for an existing empty seat
      if (seatings[i][j] === 'L') {
        const surroundingOccupiedSeats = getSurroundingOccupiedSeats(seatings, i, j);
        if (surroundingOccupiedSeats === 0) {
          newState = "#";
        }
      } else if (seatings[i][j] === '#') {
        const surroundingOccupiedSeats = getSurroundingOccupiedSeats(seatings, i, j);
        if (surroundingOccupiedSeats >= 4) {
          newState = "L";
        }
      }
      newSeatingsRow.push(newState);
    }
    newSeatings.push(newSeatingsRow);
  }
  return newSeatings;
}

const getNewSeatings2 = (seatings) => {
  const newSeatings = [];

  // loop through the existing seatings
  for (let i = 0; i < seatings.length; i++) {
    const newSeatingsRow = [];
    for (let j = 0; j <seatings[0].length; j++) {
      
      // set newState to the current state as initial value
      let newState = seatings[i][j];
      
      // evaluate surrounding seats for an existing empty seat
      if (seatings[i][j] === 'L') {
        const surroundingOccupiedSeats = getSurroundingOccupiedSeats2(seatings, i, j);
        if (surroundingOccupiedSeats === 0) {
          newState = "#";
        }
      } else if (seatings[i][j] === '#') {
        const surroundingOccupiedSeats = getSurroundingOccupiedSeats2(seatings, i, j);
        if (surroundingOccupiedSeats >= 5) {
          newState = "L";
        }
      }
      newSeatingsRow.push(newState);
    }
    newSeatings.push(newSeatingsRow);
  }
  return newSeatings;
}

const question1 = () => {
  fs.readFile('./data/Day11-data.txt', (err, data) => {
    const seatings = data.toString().split("\n").map(row => row.split(''));
    
    let newSeatings = getNewSeatings(seatings);
    let occupiedSeats = countOccupiedSeats(newSeatings);
    const occupiedSeatsArray = [occupiedSeats];
    
    while (occupiedSeatsArray[occupiedSeatsArray.length - 1] !== occupiedSeatsArray[occupiedSeatsArray.length - 2]) {
      newSeatings = getNewSeatings(newSeatings);
      occupiedSeats = countOccupiedSeats(newSeatings)
      occupiedSeatsArray.push(occupiedSeats);
    }
    
    console.log(occupiedSeatsArray);

    // const newSeatingsAsStrings = newSeatings.map(row => row.join(''));
    // newSeatingsAsStrings.forEach(row => console.log(row));
  
  })
};

// question1();

const question2 = () => {
  fs.readFile('./data/Day11-data.txt', (err, data) => {
    const seatings = data.toString().split("\n").map(row => row.split(''));
    
    let newSeatings = getNewSeatings2(seatings);
    let occupiedSeats = countOccupiedSeats(newSeatings);
    const occupiedSeatsArray = [occupiedSeats];
    
    while (occupiedSeatsArray[occupiedSeatsArray.length - 1] !== occupiedSeatsArray[occupiedSeatsArray.length - 2]) {
      newSeatings = getNewSeatings2(newSeatings);
      occupiedSeats = countOccupiedSeats(newSeatings)
      occupiedSeatsArray.push(occupiedSeats);
    }
    
    console.log(occupiedSeatsArray);

    // const newSeatingsAsStrings = newSeatings.map(row => row.join(''));
    // newSeatingsAsStrings.forEach(row => console.log(row));
  
  })
};

question2();



