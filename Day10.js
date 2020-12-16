const fs = require('fs');

const question1 = () => {
  fs.readFile('./data/Day10-data.txt', (err, data) => {
    let joltages = data.toString().split('\n').map(n => Number(n));
    joltages = joltages.sort((a,b) => a > b ? 1 : -1)

    let i = 0;
    const countObj = {};
    for (let i = 0; i < joltages.length - 1; i++) {
      const difference = joltages[i+1] - joltages[i];
      if (countObj[difference]) {
        countObj[difference] += 1;
      } else {
        countObj[difference] = 1;
      }
    }
    // head
    const first = 0;
    countObj[joltages[0] - first] += 1;
    // connect to device
    countObj['3'] +=1;

    console.log(countObj);
    console.log(countObj['1'] * countObj['3']);
  })
}

// question1();

const question2 = () => {
  fs.readFile('./data/Day10-data.txt', (err, data) => {
    let joltages = data.toString().split('\n').map(n => Number(n));
    joltages = joltages.sort((a,b) => a > b ? 1 : -1);
    
    //Add groundJoltage and deviceJoltage to joltages
    const groundJoltage = 0;
    const deviceJoltage = joltages[joltages.length - 1] + 3;
    joltages = [groundJoltage, ...joltages, deviceJoltage];

    // Number of connection at that position
    const numConnection = Array(deviceJoltage + 1).fill(0);

    for (let joltage of joltages.reverse()) {
      if (joltage === deviceJoltage) {
        numConnection[joltage] = 1;
      } else {
        numConnection[joltage] = numConnection.slice(joltage + 1, joltage + 4).reduce((acc, cur) => acc + cur);
      }      
    }

    console.log(numConnection);
    // console.log(numConnection[0]);
  });
}

question2();