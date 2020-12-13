// https://adventofcode.com/2020/day/2

const fs = require('fs');

// Part 1
const checkPassword1 = (minCount, maxCount, character, password) => {
  const charCount = password.split('').filter(c => c === character).length;
  return charCount >= minCount && charCount <=maxCount ? true : false;
}

// Part 2
const checkPassword2 = (position1, position2, character, password) => {
  const isCharInPos1 = password[position1 - 1] === character;
  const isCharInPos2 = password[position2 - 1] === character;
  console.log(password[position1 - 1], password[position2 - 1]);
  return (isCharInPos1 || isCharInPos2) && (!(isCharInPos1 && isCharInPos2));
}

fs.readFile('./data/Day02-data.txt',  (err, data) => { 
  if (err) throw err; 

  const testPasswords = data.toString().split("\n");
  let validPasswordCount1 = 0;
  let validPasswordCount2 = 0;
  for (let testPassword of testPasswords) {
    const testData = testPassword.split(' ');
    const number1 = Number(testData[0].split('-')[0]);
    const number2 = Number(testData[0].split('-')[1]);
    const char = testData[1][0];
    const password = testData[2];

    if (checkPassword1(number1, number2, char, password)) {
      validPasswordCount1++;
    }
    if (checkPassword2(number1, number2, char, password)) {
      validPasswordCount2++;
    }
  }
  console.log(validPasswordCount1);
  console.log(validPasswordCount2);
});
