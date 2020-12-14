const fs = require('fs');

// Example
// const obj = {a:['b','c','d'],b:['d'], c:['e'], d:[],e:['f'],f:[]}

const getTotalBagCount = (obj, key) => {
  let count = 1;
  for (let countBagArray of obj[key]) {
    if (countBagArray[0] !==0) {
      count += countBagArray[0] * getTotalBagCount(obj, countBagArray[1]);
    }
  }
  return count;
}


const getAllParentBags = (obj, key) => {
  let parents = obj[key];
  for (let parent of parents) {
    parents = parents.concat(getAllParentBags(obj, parent))
  }
  return [...new Set(parents)];
}

// console.log(getAllBags(obj,'a'))


fs.readFile('./data/Day07-data.txt',  (err, data) => { 
  if (err) throw err; 
  const instructions = data.toString().split("\n");

  // // Part 1
  
  // const bagObj1 = {};
  // for (let instruction of instructions) {
  //   if (instruction.includes("no other")) {continue;}
  //   instruction = instruction.replace(/\sbag[s]*[.]*/g,'');
  //   instruction = instruction.replace(/\s[0-9]+/g,'');
  //   instruction = instruction.split(' contain ');
  //   const parentBag = instruction[0];
  //   const childBags = instruction[1].split(', ');

  //   for (let childBag of childBags) {
      
  //     if (bagObj1[childBag]) {
  //       bagObj1[childBag].push(parentBag);
  //     } else {
  //       bagObj1[childBag] = [parentBag];
  //     }
  //   }
  // }
  // let allBags = [];
  // for (let bag of Object.keys(bagObj1)){
  //   allBags = allBags.concat(bagObj1[bag]);
  // }
  
  // for (let bag of allBags) {
  //   if (!bagObj1[bag]) {
  //     bagObj1[bag] = [];
  //   }
  // }

  // console.log(getAllParentBags(bagObj1, 'shiny gold').length);

  // Part 2
  const bagObj2 = {};
  for (instruction of instructions) {
    instruction = instruction.replace(/\sbag[s]*[.]*/g,'');
    instruction = instruction.split(' contain ');
    const parentBag = instruction[0];
    let childBags = [];
    if (instruction[1].includes('no other')) {
      childBags.push([0]);
    } else {
      for (let countBag of instruction[1].split(', ')) {
        const count = Number(countBag.match(/[0-9]+/g)[0]);
        const bag = countBag.match(/[a-z]+\s[a-z]+/g)[0];
        childBags.push([count, bag]);
      };
    }

    bagObj2[parentBag] = childBags;
  }
  // console.log(bagObj2);
  console.log(getTotalBagCount(bagObj2,'shiny gold') - 1);


});