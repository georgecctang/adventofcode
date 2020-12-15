const fs = require('fs');
const { get } = require('https');

const getEndIndexAndAccumulator = (instructions) => {
  let accumulator = 0;
  let processLog = Array(instructions.length).fill(null);
  let index = 0;
  let counter = 1;
  while (!processLog[index] && index !== instructions.length) {
    processLog[index] = counter;
    counter ++;
    const [operation, value] = instructions[index];
    if (operation === 'acc') {
      accumulator += value;
      index++;
    } else if (operation === 'nop') {
      index++;
    } else if (operation === 'jmp') {
      index += value
    }
  }

  return [index, accumulator];
}

const getAccumulatorWithSwapOperations = (instructions, operation) => {

  const swapIndexList = instructions.map((instruction, index) => {
    return instruction[0] === operation ? index : null; 
  }).filter(item => item !== null);

  let currentSwapIndex = 0;
  let endIndex = 0;
  let accumulator = 0;
  
  while (currentSwapIndex < swapIndexList.length && endIndex !== instructions.length) {
    const instructions2 = JSON.parse(JSON.stringify(instructions));
    const swapOperation = operation === 'jmp' ? 'nop' : 'jmp';

    instructions2[swapIndexList[currentSwapIndex]][0] = swapOperation;
    [endIndex, accumulator] = getEndIndexAndAccumulator(instructions2);
    currentSwapIndex++;
  }
  if (endIndex === instructions.length) {
    return accumulator;
  } else {
    return 'not find';
  }
}

const question1 = () => {
  fs.readFile('./data/Day08-data.txt', (err, data) => {
    if (err) {
      throw err;
    }
    let instructions = data.toString().split("\n");
    instructions = instructions.map(instruction => {
      const [operation, value] = instruction.split(" ");
      return [operation, Number(value)]
    })
    const [endIndex, accumulator] = getEndIndexAndAccumulator(instructions);
    
    console.log('*** Question 1 ***')
    console.log('endIndex', endIndex);
    console.log('accumulator', accumulator);
  })
}

question1();


const question2 = () => {
  fs.readFile('./data/Day08-data.txt', (err, data) => {
    if (err) {
      throw err;
    }
    let instructions = data.toString().split("\n");
    instructions = instructions.map(instruction => {
      const [operation, value] = instruction.split(" ");
      return [operation, Number(value)]
    })
    
    console.log('*** Question 2 ***')

    const accumulator1 = getAccumulatorWithSwapOperations(instructions, 'jmp');
    console.log(accumulator1);
    const accumulator2 = getAccumulatorWithSwapOperations(instructions, 'nop');
    console.log(accumulator2);

  })
}
question2();