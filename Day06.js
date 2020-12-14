const fs = require('fs');

const findIntersect = (array1, array2) => {
  return array1.filter(item => array2.includes(item))
}

const findIntersectOfArrays = (arrayOfArrays) => {
  if (arrayOfArrays.length === 1) {
    return arrayOfArrays[0];
  }

  let tempIntersect = findIntersect(arrayOfArrays[0], arrayOfArrays[1]);
  
  for (let i = 2; i < arrayOfArrays.length; i++) {
    tempIntersect = tempIntersect.filter(item => arrayOfArrays[i].includes(item));
  }
  return tempIntersect;

}


fs.readFile('./data/Day06-data.txt',  (err, data) => { 
  if (err) throw err; 
  const answersList = data.toString().split("\n\n");  
  
  // // Part 1
  // let sumOfCount1 = 0; 
  // for (let i = 0; i < answersList.length; i++) {
  //     const answers = answersList[i].replace(/\n/g, "").split("");
  //     sumOfCount1 += [...new Set(answers)].length;
  // }
  // console.log(sumOfCount1);

  let sumOfCount2 = 0;
  for (let i = 0; i < answersList.length; i++) {
    const answers = answersList[i].split("\n");
    const answerArray = [];
    for (const answer of answers) {
      answerArray.push(answer.split(''));
    }
    const answerYes = findIntersectOfArrays(answerArray);
    sumOfCount2 += answerYes.length;
  }
  console.log(sumOfCount2);
});