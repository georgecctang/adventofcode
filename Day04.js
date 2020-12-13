const fs = require('fs');


// Part 1
const checkValidity1 = (credentials) => {
  const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  const presentFields = [];
  for (const credential of credentials) {
    const field = credential.split(':')[0];
    presentFields.push(field);
  }
  return requiredFields.every(field => presentFields.includes(field));
}


// Part 2
const checkValidity2 = (credentials) => {
  const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  
  const credentialsObj = {};
  for (const credential of credentials) {
    const [key, value] =  credential.split(":");
    credentialsObj[key] = value;
  }
  // Return false for not all required fields present 
  if (!requiredFields.every(field => Object.keys(credentialsObj).includes(field))) {
    console.log('Not all required field are present.')
    return false;
  }
  // Return false for invalid byr
  const byr = credentialsObj.byr;
  if (byr.length !== 4 || !(Number(byr) >= 1920 && Number(byr) <= 2002)) {
    console.log('invalid byr.')
    return false;
  }
  // Return false for invalid iyr
  const iyr = credentialsObj.iyr;
  if (iyr.length !==4 || !(Number(iyr) >= 2010 && Number(iyr) <= 2020)) {
    console.log('invalid iyr.')
    return false;
  }

  // return false for invalid eyr
  const eyr = credentialsObj.eyr;
  if (eyr.length !==4 || !(Number(eyr) >= 2020 && Number(eyr) <= 2030)) {
    console.log('invalid eyr.')
    return false;
  }

  // retrun false for invalid hgt
  console.log(credentialsObj.hgt);
  const hgtUnit = credentialsObj.hgt.match(/[a-z]+/);
  const hgtValue = credentialsObj.hgt.match(/[0-9]+/);
  // console.log('hgtUnit: ', hgtUnit);
  // console.log('hgtValue: ', hgtValue);
  if (!hgtUnit || !['cm','in'].includes(hgtUnit[0])) {
    console.log('invalid hgt unit.');
    return false;
  }
  if (hgtUnit[0] === 'cm' && !(hgtValue[0] >= 150 && hgtValue[0] <= 193)) {
    console.log('invalid hgt range');
    return false;
  }
  if (hgtUnit[0] === 'in' && !(hgtValue[0] >= 59 && hgtValue[0] <= 76)) {
    console.log('invalid hgt range');
    return false;
  }
  // return false for invalid hcl
  const hcl = credentialsObj.hcl;
  if (hcl.length !== 7 || !hcl.match(/#[a-f0-9]+/)) {
    console.log('invalid hcl');
    return false;
  }
  // return false for invalid ecl
  const validEcl = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
  const ecl = credentialsObj.ecl;
  if (!validEcl.includes(ecl)) {
    console.log('invalid ecl.');
    return false;
  };
  // return false for invalid pid
  const pid = credentialsObj.pid;
  if (pid.length !== 9 || Number(pid) === NaN) {
    console.log('invalid pid');
    return false;
  }
  return true;
}



fs.readFile('./data/Day04-data.txt',  (err, data) => { 
  if (err) throw err; 
  const credentialsList = data.toString().split("\n\n");
  // let validPassportCount = 0;
  // for (let i = 0; i < credentialsList.length; i++) {
  //   const credentials = credentialsList[i].replace(/\n/g, " ").split(" ");
  //   if (checkValidity1(credentials)) {
  //     validPassportCount++;
  //   }
  // };
  // console.log("Part 1", validPassportCount);

  let validPassportCount2 = 0;

  for (let i = 0; i < credentialsList.length; i++) {
    const credentials = credentialsList[i].replace(/\n/g, " ").split(" ");
    if (checkValidity2(credentials)) {
      validPassportCount2++;
    };
  }
  console.log('Part 2: ', validPassportCount2);
});