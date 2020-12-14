const fs = require('fs');

// Example
// const obj = {a:['b','c','d'],b:['d'], c:['e'], d:[],e:['f'],f:[]}

const getAllConatiners = (obj, key) => {
  let containers = obj[key];
  for (let container of containers) {
    containers = containers.concat(getAllConatiners(obj, container))
  }
  return [...new Set(containers)];
}

// console.log(getAllConatiners(obj,'a'))


fs.readFile('./data/Day07-data.txt',  (err, data) => { 
  if (err) throw err; 
  const instructions = data.toString().split("\n");

  const bagObj = {};

  for (let instruction of instructions) {
    if (instruction.includes("no other")) {continue;}
    instruction = instruction.replace(/\sbag[s]*[.]*/g,'');
    instruction = instruction.replace(/\s[0-9]+/g,'');
    instruction = instruction.split(' contain ');
    const parentBag = instruction[0];
    const childBags = instruction[1].split(', ');

    for (let childBag of childBags) {
      
      if (bagObj[childBag]) {
        bagObj[childBag].push(parentBag);
      } else {
        bagObj[childBag] = [parentBag];
      }
    }
  }
  let allBags = [];
  for (let bag of Object.keys(bagObj)){
    allBags = allBags.concat(bagObj[bag]);
  }
  
  for (let bag of allBags) {
    if (!bagObj[bag]) {
      bagObj[bag] = [];
    }
  }

  console.log(getAllConatiners(bagObj, 'shiny gold').length);
});