const fs = require('fs');

checkIsSumOfNumbers = (numArray, target) => {
  numObj = {};
  for (let n of numArray) {
    let requiredNumber = target - n;
    if (requiredNumber < 0) {continue;}
    if (numObj[requiredNumber]) {
      return true;
    } else {
      numObj[n] = true;
    }
  }
  return false;
}

const checkIsSumExist = (numArray, sliceSize, target) => {
  let index = 0;
  while (index + sliceSize <= numArray.length) {
    let numSlice = numArray.slice(index,index + sliceSize);
    if (numSlice.reduce((acc, currentValue) => acc + currentValue) === target) {
      return numSlice;
    }
    index++;
  }
  return false;
}


const question1 = () => {
  fs.readFile('./data/Day09-data.txt', (err, data) => {
    const numbers = data.toString().split('\n').map(n => Number(n));
    let numberOfNumbers = 25;
    let index = 0;
    let target = numbers[index + numberOfNumbers];
    let result = true;
    while (index + numberOfNumbers < numbers.length && result) {
      result = checkIsSumOfNumbers(numbers.slice(index,index + numberOfNumbers), target);
      if (!result) {
        console.log(result, target);
      }
      index++;
      target = numbers[index + numberOfNumbers];
    }
  })
} 
question1();

const question2 = () => {
  fs.readFile('./data/Day09-data.txt', (err, data) => {
    const numbers = data.toString().split('\n').map(n => Number(n));
    target = 1639024365;  // From part 1 
    const targetIndex = numbers.indexOf(target);
    const numbersSlice = numbers.slice(0,targetIndex);
    
    let sliceSize = 2;
    let result = false;
    while (sliceSize <= numbersSlice.length && !result) {
      result = checkIsSumExist(numbersSlice, sliceSize, target);
      sliceSize++;
    }
    if (result) {
      console.log([result]);    
      console.log(Math.min(...result) + Math.max(...result));    
    } else {
      console.log('not found');
    }
  })
}

question2();