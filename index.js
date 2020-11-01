const express = require('express');
const app = express();
const passport = require('passport');
const {passportJwt} = require('./middlewares/jwtMiddleware')
const cookieSession = require('cookie-session')
// now, we don't need body-parser, express has their built-in body parser
app.set('view engine', 'ejs')
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieSession({
  name: 'user-session',
  keys: ['key1, key2']
}))

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

// Load user routes:
userRoutesFilePaths.forEach((filePath) => {
  const relativeFilePath = `./${filePath}`;
  console.log(`${filePath} loaded for user!`);
  const route = require(relativeFilePath);
  app.use(route,
    // passportJwt.authenticate('bearer', { session: true }),
  );
});

// Load admin routes:
adminRoutesFilePaths.forEach((adminFilePath) => {
  const relativeAdminFilePath = `./${adminFilePath}`;
  console.log(`${adminFilePath} loaded for admin!`);
  const adminRoute = require(relativeAdminFilePath);
  app.use(adminRoute,
    // passportJwt.authenticate('bearer', { session: true }),
  );
});


// it's always a good idea to make a port variable
// because if you change the port, you also change the console.log()
const port = 3000;
app.listen(port, () => {
  console.log(`The app was listening in http://localhost:${port}`);
});
