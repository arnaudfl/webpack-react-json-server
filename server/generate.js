const faker = require('./faker');
const path = require('path');
const fs = require('fs');

const json = JSON.stringify(faker());
fs.writeFile(path.join(__dirname, 'db.json'), json, function (err) {
  if (err) {
    return console.log(err);
  } else {
    console.log("Mock data generated.");
  }
});
