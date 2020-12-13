const fs = require('fs');

const checkValidity = (credentials) => {
  const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  const presentFields = [];
  for (const credential of credentials) {
    const field = credential.split(':')[0];
    presentFields.push(field);
  }
  return requiredFields.every(field => presentFields.includes(field));
}

fs.readFile('./data/Day04-data.txt',  (err, data) => { 
  if (err) throw err; 
  const credentialsList = data.toString().split("\n\n");
  let validPassportCount = 0;
  for (let i = 0; i < credentialsList.length; i++) {
    const credentials = credentialsList[i].replace(/\n/g, " ").split(" ");
    if (checkValidity(credentials)) {
      validPassportCount++;
    }
  };
  console.log(validPassportCount);
});