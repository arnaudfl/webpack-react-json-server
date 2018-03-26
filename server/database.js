const path = require('path');
const fs = require('fs');
const faker = require('./faker');

isDirSync = (aPath) => {
  try {
    return fs.statSync(aPath).isFile();
  } catch (e) {
    if (e.code === 'ENOENT') {
      return false;
    } else {
      throw e;
    }
  }
};

const getDatabase = () => {
  const filename = path.join(__dirname, 'db.json');
  if (isDirSync(filename)) {
    console.log('db.json file exists, we use it.');
    return filename;
  } else {
    console.log(
        'db.json file not exists, use non persistent data.',
        'Use command line "npm run generate-mock" to create file.'
    );
    return faker();
  }
};

module.exports = getDatabase;