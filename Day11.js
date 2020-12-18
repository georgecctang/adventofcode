const fs = require('fs');

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

question1();






// const ar = [[10,20,30],[40,50,60], [70,80,90]];

// const result = [];
// for (let i = 0; i < ar.length; i++) {
//   const resultRow = [];
//   for (let j = 0; j <ar[0].length; j++){
//     let sum = 0;
//     console.log('******');
//     console.log(ar[i][j]);
//     for (let row of [i-1, i, i + 1]) {
//       for (let col of [j-1, j, j + 1]) {
//         if (row < 0 || row >= ar.length) {
//           continue;
//         }
//         if (col < 0 || col >= ar[0].length) {
//           continue;
//         }
//         if (row === i && col === j) {
//           continue;
//         }
//         console.log('row:', row, 'col:', col, 'number:', ar[row][col]);
//         sum += ar[row][col];        
//       }
//     }
//     console.log('sum:',sum);
//     resultRow.push(sum);
//   }
//   result.push(resultRow);
// }

// console.log(result);