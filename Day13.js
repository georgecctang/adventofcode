const fs = require('fs');


question1 = () => {
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
}

const question2 = () => {
  fs.readFile('./data/Day13-data.txt', (err, data) => {
    const numbers = data.toString().split("\n");
    let mods = [];
    let remainders = [];
    let firstNumber;
    numbers[1].split(',').forEach((number, index) => {
      if (index === 0) {
        firstNumber = Number(number);
      }
      else if (Number(number) && index !== 0) {
        mods.push(Number(number));
        let remainder = Number(number) - index;
        while (remainder <= 0) {
          remainder += Number(number);
        } 
        remainders.push(remainder);
      };   
    });
    const N = mods.reduce((acc, cur) => cur * acc, 1);
    const NArray = [];

    for (let i = 0; i < mods.length; i++) {
      NArray.push(N/mods[i]);
    }
    const xArray = [];

    for (let i = 0; i < NArray.length; i++) {
      let NValue = NArray[i];
      let modValue = mods[i];
      let x = 1;
      while (NValue * x % modValue !== 1) {
        x++;
      }
      xArray[i] = x;
    }

    console.log('mods',mods);
    console.log('remainders', remainders);

    const products = [];
    for (let i = 0; i < mods.length; i++) {
      products.push(remainders[i] * NArray[i] * xArray[i]);
    }

    /*
      I have no idea what i need to add 1 to X to make it work
    */
    let X = products.reduce((acc, cur) => cur + acc, 0) % N + 1;
    console.log('X', X);
    console.log('N', N)
    while (X % firstNumber !== 0) {
      X += N;
    }

    console.log(X);
  });

}
question2();