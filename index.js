const express = require('express');
const app = express();
const passport = require('passport')
// now, we don't need body-parser, express has their built-in body parser
app.use(express.json());


/**
 * ⚠️ Propietary code! Do not change! ⚠️
 * What this does is reading all files inside routes folder recrusively
 * and use it by app.use(), so you don't need to import / require any route.
 * Reference: https://www.npmjs.com/package/read-dir-deep
 */
//  read-dir-deep
//  --> Returns a sorted recursive list of all files inside a directory:
const readDir = require('read-dir-deep');
//  import path --> to get a path directory:
const path = require('path');
//  routesPath --> get a directory path named routes:
const routesPath = path.resolve('routes');

const filePaths = readDir.readDirDeepSync(routesPath);
filePaths.forEach((filePath) => {
  const relativeFilePath = `./${filePath}`;
  console.log(`${relativeFilePath} loaded!`);
  const route = require(relativeFilePath);
  app.use(route);
});


// it's always a good idea to make a port variable
// because if you change the port, you also change the console.log()
const port = 3000;
app.listen(port, () => {
  console.log(`The app was listening in http://localhost:${port}`);
});
