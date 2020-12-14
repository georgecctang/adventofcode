const fs = require('fs');


const findSeatNumber = (ticket) => {
  let lowRowNumber = 0;
  let highRowNumber = 127;
  let lowColNumber = 0;
  let highColNumber = 7;
  let rowNumber = null;
  let colNumber = null;
  for (i = 0; i < 6; i++) {
    if (ticket[i] === 'F') {
      highRowNumber = Math.floor((highRowNumber + lowRowNumber) / 2);
    } else {
      lowRowNumber = Math.ceil((highRowNumber + lowRowNumber) / 2);
    }
  }
  rowNumber = ticket[6] === 'F' ? lowRowNumber : highRowNumber;

  for (i = 7; i < 9; i++) {
    if (ticket[i] === 'L') {
      highColNumber = Math.floor((highColNumber + lowColNumber) / 2);
    } else {
      lowColNumber = Math.ceil((highColNumber + lowColNumber) / 2);
    }
  }
  colNumber = ticket[9] === 'L' ? lowColNumber : highColNumber;
  return rowNumber * 8 + colNumber; 
}

fs.readFile('./data/Day05-data.txt',  (err, data) => { 
  if (err) throw err; 
  
  const tickets = data.toString().split("\n");


  // Part 1
  let highestTicketNumber = -1;
  
  for (let ticket of tickets) {
    const ticketNumber = findSeatNumber(ticket);
    highestTicketNumber = ticketNumber > highestTicketNumber ? ticketNumber : highestTicketNumber;
  }
  console.log('highestTicketNumber:', highestTicketNumber);

  // Part 2
  let seatArray = Array(128 * 8).fill(0);
  let lowestTicketNumber = Infinity;
  for (let ticket of tickets) {
    const ticketNumber = findSeatNumber(ticket);
    seatArray[ticketNumber] = 1;
    lowestTicketNumber = ticketNumber < lowestTicketNumber ? ticketNumber : lowestTicketNumber;
  }
  console.log('mySeat', seatArray.indexOf(0, lowestTicketNumber));


});