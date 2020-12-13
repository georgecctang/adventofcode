const fs = require('fs');

const findTwoNumbers = (inputArray, target) => {
  // Sort array 
  const numArray = inputArray.sort((a,b) => a - b); 
  let length = numArray.length;

  let i = 0;
  // End search if sum of left number and right number < target;
  while (i < length  - 1) {
    let continueSearch = true;
    let j = length - 1;
    while (continueSearch && i < j ) {
      console.log(numArray[i],numArray[j], numArray[i] + numArray[j]);
      if (numArray[i] + numArray[j] === target) {
        return numArray[i] * numArray[j];
      }
      if (numArray[i] + numArray[j] < target) {
        continueSearch = false;
      }
      j--;
    }
    i++;
  }
  return "Does not exist";
}

const findThreeNumbers = (inputArray, target) => {
  // Sort array 
  const numArray = inputArray.sort((a,b) => a - b); 
  let length = numArray.length;

  let i = 0;
  // End search if sum of left number and right number < target;
  while (i < length  - 2) {
    let j = i + 1;
    while (j < length - 1) {
      let k = j + 1;
      let continueSearch = true;
      while (continueSearch &&  k < length) {
        console.log(numArray[i],numArray[j], numArray[k], numArray[i] + numArray[j] + numArray[k]);
        if (numArray[i] + numArray[j] + numArray[k]  === target) {
          return numArray[i] * numArray[j] * numArray[k];
        }
        if (numArray[i] + numArray[j] + numArray[k] > target) {
          continueSearch = false;
        }
        k++;
      }
      j++;
    }
    i++;
  }
  return "Does not exist";
}



fs.readFile('./Day01-data.txt',  (err, data) => { 
  if (err) throw err; 

  const str = data.toString().split("\n");
  const numbers = [];
  for (let item of str) {
    numbers.push(Number(item));
  }
  console.log(findThreeNumbers(numbers, 2020));
}) 

console.log('hello');