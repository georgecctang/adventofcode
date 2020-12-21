const fs = require('fs');

fs.readFile('./data/Day13-data.txt', (err, data) => {
  const numbers = data.toString().split("\n");
  const time = Number(numbers[0]);
  const busRoutes = numbers[1].split(',').map(number => {
    return Number(number) ? Number(number) : number
  })
  
  const waitingTimeObj = {};
  busRoutes.forEach(busRoute => {
    if (Number(busRoute)) {
      waitingTimeObj[busRoute] = (time % busRoute === 0) ? 0 : (busRoute - time % busRoute);
    }    
  })
  const minTimeIndex = Object.values(waitingTimeObj).indexOf(Math.min(...Object.values(waitingTimeObj)));
  console.log(Object.keys(waitingTimeObj)[minTimeIndex] * Object.values(waitingTimeObj)[minTimeIndex]);
})