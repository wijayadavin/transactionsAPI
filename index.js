const express = require('express');
const app = express();
const permissionHelper = require('./helpers/permissionHelper');
const auth = require('./middlewares/jwtMiddleware');

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
const publicRoutesPath = path.resolve('routes/public/');
const userRoutesPath = path.resolve('routes/user/');
const adminRoutesPath = path.resolve('routes/admin/');

// Get file paths:
const publicRoutesFilePaths = readDir.readDirDeepSync(publicRoutesPath);
const userRoutesFilePaths = readDir.readDirDeepSync(userRoutesPath);
const adminRoutesFilePaths = readDir.readDirDeepSync(adminRoutesPath);

// Load public routes:
publicRoutesFilePaths.forEach((filePath) => {
  const relativeFilePath = `./${filePath}`;
  console.log(`${filePath} loaded for public!`);
  const route = require(relativeFilePath);
  app.use(route);
});
// // Load user routes:
// userRoutesFilePaths.forEach((filePath) => {
//   const relativeFilePath = `./${filePath}`;
//   console.log(`${filePath} loaded for user!`);
//   const route = require(relativeFilePath);
//   app.use(route, auth.passport.authenticate('bearer', {session: false})
//       , permissionHelper(['user', 'admin']));
// });
// Load admin routes:
adminRoutesFilePaths.forEach((filePath) => {
  const relativeFilePath = `./${filePath}`;
  console.log(`${filePath} loaded for admin!`);
  const route = require(relativeFilePath);
  app.use(route, auth.passport.authenticate('bearer', {session: false})
      , permissionHelper('admin'),
  );
});


// it's always a good idea to make a port variable
// because if you change the port, you also change the console.log()
const port = 3000;
app.listen(port, () => {
  console.log(`The app was listening in http://localhost:${port}`);
});
