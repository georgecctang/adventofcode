// https://adventofcode.com/2020/day/3

const checkTreeCountInLandscapes = (landscapes, rightMove, downMove, treeSymbol) => {
  const landscapeLength = landscapes.length;
  const landscapeWidth = landscapes[0].length;
  let landscapeIndex = 0;
  let treeCount = 0;
  let position = 0;
  while (landscapeIndex < landscapeLength) {
    if (checkTree(landscapes[landscapeIndex], position, treeSymbol)) {
      treeCount++;
    }
    landscapeIndex += downMove;

    position += rightMove;
    if (position >=landscapeWidth) {
      position = position - landscapeWidth;
    }
  }
  return treeCount;

}


const checkTree = (landscape, position, treeSymbol) => {
  return landscape[position] === treeSymbol;
}


const fs = require('fs');

fs.readFile('./data/Day03-data.txt',  (err, data) => { 
  if (err) throw err; 
  const landscapes = data.toString().split("\n");

  const numberOfTreesR1D1 = checkTreeCountInLandscapes(landscapes, 1, 1, "#");
  const numberOfTreesR3D1 = checkTreeCountInLandscapes(landscapes, 3, 1, "#");
  const numberOfTreesR5D1 = checkTreeCountInLandscapes(landscapes, 5, 1, "#");
  const numberOfTreesR7D1 = checkTreeCountInLandscapes(landscapes, 7, 1, "#");
  const numberOfTreesR1D2 = checkTreeCountInLandscapes(landscapes, 1, 2, "#");
  console.log(numberOfTreesR1D1*numberOfTreesR3D1*numberOfTreesR5D1*numberOfTreesR7D1*numberOfTreesR1D2);
});
